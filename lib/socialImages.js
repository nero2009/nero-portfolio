const crypto = require('crypto')
const fs = require('fs/promises')
const path = require('path')

process.env.FONTCONFIG_FILE =
  process.env.FONTCONFIG_FILE || path.join(__dirname, 'fontconfig.xml')
process.env.XDG_CACHE_HOME =
  process.env.XDG_CACHE_HOME || path.resolve('.cache')

const sharp = require('sharp')

const IMAGE_WIDTH = 1200
const IMAGE_HEIGHT = 630
const IMAGE_DIRECTORY = 'social-images'
// Bump when the visual template changes so social platforms receive a new URL.
const TEMPLATE_VERSION = 1

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

const escapePangoMarkup = value =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

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

const renderText = async ({
  text,
  fontFile,
  fontSize,
  fontWeight,
  width,
  color = COLORS.text,
  spacing = 0,
  wrap = 'word',
  preventWordBreaks = false,
}) => {
  const escapedText = preventWordBreaks
    ? text
        .split(' ')
        .map(word => `<span allow_breaks="false">${escapePangoMarkup(word)}</span>`)
        .join(' ')
    : escapePangoMarkup(text)
  const input = {
    text: {
      text: `<span foreground="${color}">${escapedText}</span>`,
      font: `Inter${fontWeight ? ` ${fontWeight}` : ''} ${fontSize}`,
      fontfile: fontFile,
      align: 'left',
      rgba: true,
      dpi: 96,
      spacing,
    },
  }

  if (width) {
    input.text.width = width
    input.text.wrap = wrap
  }

  return sharp(input).png().toBuffer({ resolveWithObject: true })
}

const fitBlogTitle = async title => {
  const normalizedTitle = normalizeTitle(title)
  const words = normalizedTitle.split(' ')

  for (const word of words) {
    const { info } = await renderText({
      text: word,
      fontFile: TITLE_FONT_FILE,
      fontSize: TITLE_FONT_SIZES[TITLE_FONT_SIZES.length - 1],
      fontWeight: 'Bold',
    })

    if (info.width > TITLE_AREA.width) {
      throw new Error(
        `Blog title cannot fit legibly because "${word}" is wider than the title area.`
      )
    }
  }

  for (const fontSize of TITLE_FONT_SIZES) {
    const rendered = await renderText({
      text: normalizedTitle,
      fontFile: TITLE_FONT_FILE,
      fontSize,
      fontWeight: 'Bold',
      width: TITLE_AREA.width,
      spacing: 4,
      preventWordBreaks: true,
    })

    if (
      rendered.info.width <= TITLE_AREA.width &&
      rendered.info.height <= TITLE_AREA.height
    ) {
      return {
        ...rendered,
        fontSize,
        title: normalizedTitle,
      }
    }
  }

  throw new Error(
    `Blog title cannot fit legibly at the minimum font size: "${normalizedTitle}".`
  )
}

const createBaseImage = () => {
  const accents = Buffer.from(`
    <svg width="${IMAGE_WIDTH}" height="${IMAGE_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${IMAGE_WIDTH}" height="${IMAGE_HEIGHT}" fill="${COLORS.background}" />
      <rect x="1070" y="40" width="170" height="650" rx="85" fill="${COLORS.green}" />
      <rect x="970" y="180" width="160" height="500" rx="80" fill="${COLORS.pink}" />
      <rect x="900" y="330" width="145" height="350" rx="72.5" fill="${COLORS.blue}" />
    </svg>
  `)

  return sharp(accents)
}

const renderSiteLabel = () =>
  renderText({
    text: SITE_IMAGE_CONTENT.siteName,
    fontFile: LABEL_FONT_FILE,
    fontSize: 28,
    fontWeight: 'SemiBold',
  })

const renderBlogSocialImage = async title => {
  const [siteLabel, fittedTitle] = await Promise.all([
    renderSiteLabel(),
    fitBlogTitle(title),
  ])
  const titleTop =
    TITLE_AREA.top + Math.round((TITLE_AREA.height - fittedTitle.info.height) / 2)

  return createBaseImage()
    .composite([
      { input: siteLabel.data, left: 72, top: 62 },
      { input: fittedTitle.data, left: TITLE_AREA.left, top: titleTop },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer()
}

const renderSiteSocialImage = async () => {
  const [siteLabel, ownerName, role] = await Promise.all([
    renderSiteLabel(),
    renderText({
      text: SITE_IMAGE_CONTENT.ownerName,
      fontFile: TITLE_FONT_FILE,
      fontSize: 64,
      fontWeight: 'Bold',
    }),
    renderText({
      text: SITE_IMAGE_CONTENT.role,
      fontFile: LABEL_FONT_FILE,
      fontSize: 34,
      fontWeight: 'SemiBold',
    }),
  ])

  return createBaseImage()
    .composite([
      { input: siteLabel.data, left: 72, top: 62 },
      { input: ownerName.data, left: 72, top: 255 },
      { input: role.data, left: 72, top: 360 },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer()
}

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
  fitBlogTitle,
  generateSocialImages,
  getBlogSocialImagePath,
  getSiteSocialImagePath,
  renderBlogSocialImage,
  renderSiteSocialImage,
  slugFromBlogPath,
}
