const assert = require('node:assert/strict')
const { spawnSync } = require('node:child_process')
const fs = require('node:fs/promises')
const os = require('node:os')
const path = require('node:path')
const test = require('node:test')

const {
  IMAGE_HEIGHT,
  IMAGE_WIDTH,
  TITLE_AREA,
  fitBlogTitle,
  generateSocialImages,
  getBlogSocialImagePath,
  getSiteSocialImagePath,
} = require('../lib/socialImages')
const sharp = require('sharp')

test('Fontconfig discovers the bundled Inter font', t => {
  const result = spawnSync(
    'fc-match',
    ['-f', '%{family} %{style}', 'Inter:weight=bold'],
    {
      env: {
        ...process.env,
        FONTCONFIG_FILE: path.resolve('lib/fontconfig.xml'),
        XDG_CACHE_HOME: path.resolve('.cache'),
      },
      encoding: 'utf8',
    }
  )

  if (result.error?.code === 'ENOENT') {
    t.skip('fc-match is not available in this environment')
    return
  }

  assert.equal(result.status, 0, result.stderr)
  assert.match(result.stdout, /Inter.*Bold/)
})

test('Blog image paths are deterministic and change with the title', () => {
  const input = {
    blogPath: '/customer-support-ai-case-study-part-2',
    title: 'Customer Support AI Case Study (Part 2)',
  }

  const firstPath = getBlogSocialImagePath(input)
  const secondPath = getBlogSocialImagePath(input)
  const renamedPath = getBlogSocialImagePath({
    ...input,
    title: `${input.title} Updated`,
  })

  assert.equal(firstPath, secondPath)
  assert.notEqual(firstPath, renamedPath)
  assert.match(
    firstPath,
    /^\/social-images\/customer-support-ai-case-study-part-2-[a-f0-9]{10}\.png$/
  )
  assert.match(getSiteSocialImagePath(), /^\/social-images\/site-[a-f0-9]{10}\.png$/)
})

test('the longest current Blog title fits inside the approved title area', async () => {
  const fitted = await fitBlogTitle(
    "Fix BoringSSL GRPC unsupported option '-G' for target arm64-apple-ios on Xcode 16"
  )

  assert.ok(fitted.fontSize >= 48)
  assert.ok(fitted.info.width <= TITLE_AREA.width)
  assert.ok(fitted.info.height <= TITLE_AREA.height)
})

test('an illegibly long title fails instead of being cropped or truncated', async () => {
  await assert.rejects(
    () => fitBlogTitle('unbroken'.repeat(100)),
    /cannot fit legibly/
  )
})

test('generation writes valid 1200 by 630 PNG files', async t => {
  const outputDirectory = await fs.mkdtemp(
    path.join(os.tmpdir(), 'nero-social-images-')
  )
  t.after(() => fs.rm(outputDirectory, { recursive: true, force: true }))

  const generated = await generateSocialImages({
    posts: [
      {
        path: '/customer-support-ai-case-study-part-2',
        title: 'Customer Support AI Case Study (Part 2)',
      },
    ],
    outputDirectory,
  })

  const files = await fs.readdir(outputDirectory)
  assert.equal(files.length, 2)
  assert.equal(
    generated.blogImagePaths.get('/customer-support-ai-case-study-part-2'),
    getBlogSocialImagePath({
      blogPath: '/customer-support-ai-case-study-part-2',
      title: 'Customer Support AI Case Study (Part 2)',
    })
  )

  for (const filename of files) {
    const metadata = await sharp(path.join(outputDirectory, filename)).metadata()
    assert.equal(metadata.format, 'png')
    assert.equal(metadata.width, IMAGE_WIDTH)
    assert.equal(metadata.height, IMAGE_HEIGHT)
  }
})
