const crypto = require('crypto')
const fsSync = require('fs')
const fs = require('fs/promises')
const path = require('path')

const opentype = require('opentype.js')
const sharp = require('sharp')

const IMAGE_WIDTH = 1200
const IMAGE_HEIGHT = 630
const IMAGE_DIRECTORY = 'social-images'
// Bump when the visual template changes so social platforms receive a new URL.
const TEMPLATE_VERSION = 2

const COLORS = {
  background: '#FAF9F6',
  text: '#20242A',
  blue: '#94B2C6',
  pink: '#CD97A0',
  green: '#9EC6A7',
}

const TITLE_AREA = {
  left: 72,
  top: 190,
  width: 790,
  height: 330,
}

const TITLE_FONT_SIZES = [82, 78, 74, 70, 66, 62, 58, 54, 50, 48]
const TITLE_FONT_FILE = require.resolve(
  '@fontsource/inter/files/inter-latin-700-normal.woff'
)
const LABEL_FONT_FILE = require.resolve(
  '@fontsource/inter/files/inter-latin-600-normal.woff'
)
const loadFont = fontFile => {
  const fontData = fsSync.readFileSync(fontFile)
  const arrayBuffer = fontData.buffer.slice(
    fontData.byteOffset,
    fontData.byteOffset + fontData.byteLength
  )

  return opentype.parse(arrayBuffer)
}
const TITLE_FONT = loadFont(TITLE_FONT_FILE)
const LABEL_FONT = loadFont(LABEL_FONT_FILE)

const SITE_IMAGE_CONTENT = {
  siteName: 'finallynero.dev',
  ownerName: 'Oghenero Adaware',
  role: 'Software Engineer',
}

const normalizeTitle = title => {
  if (typeof title !== 'string' || title.trim() === '') {
    throw new Error('A non-empty Markdown title is required for a Blog social image.')
  }

  return title.trim().replace(/\s+/g, ' ')
}

const contentHash = value =>
  crypto
    .createHash('sha256')
    .update(JSON.stringify({ templateVersion: TEMPLATE_VERSION, ...value }))
    .digest('hex')
    .slice(0, 10)

const slugFromBlogPath = blogPath => {
  const slug = String(blogPath || '')
    .replace(/^\/+|\/+$/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  if (!slug) {
    throw new Error(`Cannot create a Blog social image filename from path "${blogPath}".`)
  }

  return slug
}

const getBlogSocialImagePath = ({ blogPath, title }) => {
  const normalizedTitle = normalizeTitle(title)
  const slug = slugFromBlogPath(blogPath)
  const hash = contentHash({ blogPath, title: normalizedTitle })

  return `/${IMAGE_DIRECTORY}/${slug}-${hash}.png`
}

const getSiteSocialImagePath = () => {
  const hash = contentHash(SITE_IMAGE_CONTENT)
  return `/${IMAGE_DIRECTORY}/site-${hash}.png`
}

const layoutText = ({
  text,
  font,
  fontSize,
  maxWidth,
  lineHeightMultiplier = 1.16,
}) => {
  const words = text.split(' ')
  const lines = []
  let currentLine = ''

  for (const word of words) {
    const candidate = currentLine ? `${currentLine} ${word}` : word
    const candidateWidth = font.getAdvanceWidth(candidate, fontSize, {
      kerning: true,
    })

    if (maxWidth && currentLine && candidateWidth > maxWidth) {
      lines.push(currentLine)
      currentLine = word
    } else {
      currentLine = candidate
    }
  }

  if (currentLine) {
    lines.push(currentLine)
  }

  const scale = fontSize / font.unitsPerEm
  const ascent = font.ascender * scale
  const descent = Math.abs(font.descender * scale)
  const lineHeight = fontSize * lineHeightMultiplier
  const width = Math.max(
    0,
    ...lines.map(line =>
      font.getAdvanceWidth(line, fontSize, { kerning: true })
    )
  )
  const height = ascent + descent + Math.max(0, lines.length - 1) * lineHeight

  return {
    ascent,
    font,
    fontSize,
    height,
    lineHeight,
    lines,
    width,
  }
}

const fitBlogTitle = async title => {
  const normalizedTitle = normalizeTitle(title)
  const words = normalizedTitle.split(' ')
  const minimumFontSize = TITLE_FONT_SIZES[TITLE_FONT_SIZES.length - 1]

  for (const word of words) {
    const wordWidth = TITLE_FONT.getAdvanceWidth(word, minimumFontSize, {
      kerning: true,
    })

    if (wordWidth > TITLE_AREA.width) {
      throw new Error(
        `Blog title cannot fit legibly because "${word}" is wider than the title area.`
      )
    }
  }

  for (const fontSize of TITLE_FONT_SIZES) {
    const layout = layoutText({
      text: normalizedTitle,
      font: TITLE_FONT,
      fontSize,
      maxWidth: TITLE_AREA.width,
    })

    if (layout.width <= TITLE_AREA.width && layout.height <= TITLE_AREA.height) {
      return {
        ...layout,
        title: normalizedTitle,
      }
    }
  }

  throw new Error(
    `Blog title cannot fit legibly at the minimum font size: "${normalizedTitle}".`
  )
}

const renderTextPaths = ({
  color = COLORS.text,
  font,
  fontSize,
  layout,
  text,
  x,
  y,
}) => {
  const textLayout =
    layout ||
    layoutText({
      text,
      font,
      fontSize,
    })

  return textLayout.lines
    .map((line, lineIndex) => {
      const baseline = y + textLayout.ascent + lineIndex * textLayout.lineHeight
      const pathData = textLayout.font
        .getPath(line, x, baseline, textLayout.fontSize, { kerning: true })
        .toPathData({ decimalPlaces: 2, optimize: true, flipY: false })

      return `<path d="${pathData}" fill="${color}" />`
    })
    .join('\n')
}

const createBaseSvg = content => `
    <svg width="${IMAGE_WIDTH}" height="${IMAGE_HEIGHT}" viewBox="0 0 ${IMAGE_WIDTH} ${IMAGE_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${IMAGE_WIDTH}" height="${IMAGE_HEIGHT}" fill="${COLORS.background}" />
      <rect x="1070" y="40" width="170" height="650" rx="85" fill="${COLORS.green}" />
      <rect x="970" y="180" width="160" height="500" rx="80" fill="${COLORS.pink}" />
      <rect x="900" y="330" width="145" height="350" rx="72.5" fill="${COLORS.blue}" />
      ${content}
    </svg>
  `

const renderSiteLabel = () =>
  renderTextPaths({
    text: SITE_IMAGE_CONTENT.siteName,
    font: LABEL_FONT,
    fontSize: 28,
    x: 72,
    y: 62,
  })

const createBlogSocialImageSvg = async title => {
  const fittedTitle = await fitBlogTitle(title)
  const titleTop =
    TITLE_AREA.top + (TITLE_AREA.height - fittedTitle.height) / 2

  return createBaseSvg(`
    ${renderSiteLabel()}
    ${renderTextPaths({
      layout: fittedTitle,
      x: TITLE_AREA.left,
      y: titleTop,
    })}
  `)
}

const createSiteSocialImageSvg = () =>
  createBaseSvg(`
    ${renderSiteLabel()}
    ${renderTextPaths({
      text: SITE_IMAGE_CONTENT.ownerName,
      font: TITLE_FONT,
      fontSize: 64,
      x: 72,
      y: 255,
    })}
    ${renderTextPaths({
      text: SITE_IMAGE_CONTENT.role,
      font: LABEL_FONT,
      fontSize: 34,
      x: 72,
      y: 360,
    })}
  `)

const rasterizeSvg = svg =>
  sharp(Buffer.from(svg))
    .png({ compressionLevel: 9 })
    .toBuffer()

const renderBlogSocialImage = async title =>
  rasterizeSvg(await createBlogSocialImageSvg(title))

const renderSiteSocialImage = async () =>
  rasterizeSvg(createSiteSocialImageSvg())

const writeImage = async ({ outputDirectory, publicPath, data }) => {
  await fs.mkdir(outputDirectory, { recursive: true })
  const filename = path.basename(publicPath)
  const outputPath = path.join(outputDirectory, filename)
  await fs.writeFile(outputPath, data)
  return outputPath
}

const generateSocialImages = async ({ posts, outputDirectory }) => {
  await fs.rm(outputDirectory, { recursive: true, force: true })
  await fs.mkdir(outputDirectory, { recursive: true })

  const siteImagePath = getSiteSocialImagePath()
  const siteImage = await renderSiteSocialImage()
  await writeImage({
    outputDirectory,
    publicPath: siteImagePath,
    data: siteImage,
  })

  const blogImages = await Promise.all(
    posts.map(async post => {
      const publicPath = getBlogSocialImagePath({
        blogPath: post.path,
        title: post.title,
      })
      const data = await renderBlogSocialImage(post.title)
      await writeImage({ outputDirectory, publicPath, data })
      return [post.path, publicPath]
    })
  )

  return {
    siteImagePath,
    blogImagePaths: new Map(blogImages),
  }
}

module.exports = {
  COLORS,
  IMAGE_DIRECTORY,
  IMAGE_HEIGHT,
  IMAGE_WIDTH,
  SITE_IMAGE_CONTENT,
  TITLE_AREA,
  createBlogSocialImageSvg,
  createSiteSocialImageSvg,
  fitBlogTitle,
  generateSocialImages,
  getBlogSocialImagePath,
  getSiteSocialImagePath,
  renderBlogSocialImage,
  renderSiteSocialImage,
  slugFromBlogPath,
}
