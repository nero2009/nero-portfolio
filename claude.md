# Nero Portfolio - Claude AI Context

## 🎯 Project Mission
Personal portfolio and technical blog showcasing Oghenero Adaware's (finallynero) journey as a software engineer. Content focuses on React, Gatsby, Golang, WebSockets, Docker, and software engineering best practices.

## 🏗️ Architecture Overview

### Static Site Generation (Gatsby)
This is a **JAMstack** application:
- **Build time:** Gatsby queries markdown files via GraphQL
- **gatsby-node.js** dynamically creates pages for each blog post
- **Output:** Static HTML/CSS/JS deployed to CDN
- **Benefit:** Fast, secure, SEO-optimized

### Data Flow
```
Markdown Files (src/articles/)
  ↓
Gatsby Source Filesystem
  ↓
GraphQL Layer (gatsby-transformer-remark)
  ↓
React Components (queries via GraphQL)
  ↓
Static HTML (build output in public/)
```

## 📝 Content Management System

### Blog Posts
- **Location:** `src/articles/YYYY-MM-DD-title/index.md`
- **Format:** Markdown with YAML frontmatter
- **Processing:** gatsby-transformer-remark converts to HTML
- **Syntax Highlighting:** Prismjs (Okaidia theme)
- **Embeds:** CodePen and Twitter via remark plugins

### Frontmatter Schema
```yaml
path: /url-slug          # Route for the post
date: YYYY-MM-DD         # Publication date
title: Post Title        # H1 and meta title
author: Full Name        # Author attribution
description: SEO text    # Meta description (important!)
tags: ["Tag1", "Tag2"]   # Optional: Array of tags (2-5 recommended)
```

### Page Generation Process
1. `gatsby-node.js` queries all markdown files (including tags)
2. For each file, creates page using `blogPost.js` template
3. Extracts all unique tags and creates tag pages using `tag.js` template
4. Passes slug/tag as context for single post/tag queries
5. Templates render posts with layout, SEO, sharing, and tags

## 🧩 Component Architecture

### Layout Hierarchy
```
Layout (wrapper)
├── Header (logo, navigation)
├── main (page content)
│   ├── Hero (homepage only)
│   ├── Blog list (homepage)
│   ├── About content (about page)
│   ├── Portfolio items (work page)
│   └── Article content (blog template)
└── Footer (site footer)
```

### Key Components

#### SEO Component (`seo.js`)
**Purpose:** Centralized SEO management
- Uses custom hook `useSiteMetadata()`
- Generates meta tags (Open Graph, Twitter Cards)
- Injects Schema.org JSON-LD structured data
- Handles canonical URLs

**Schema.org Types:**
- Person (author profile)
- WebSite (site entity)
- ProfilePage (page type)
- BlogPosting (article type - in template)

#### Blog Post Template (`blogPost.js`)
**Features:**
- Scroll-based floating share buttons
- Back navigation
- Date formatting
- Structured data for articles
- Social sharing integration

**Special Logic:**
- Tracks scroll position to show/hide floating share
- Uses `useEffect` for scroll listeners
- Cleanup on unmount

#### Hero Component (`hero.js`)
**Microdata Implementation:**
- Uses HTML microdata (`itemScope`, `itemProp`)
- Defines Person schema inline
- Includes semantic skills markup

### Custom Hooks

#### `useSiteMetadata()` Hook
```javascript
// Usage
const { title, siteUrl, image, social } = useSiteMetadata()
```
**Purpose:** Accesses site metadata from gatsby-config.js via GraphQL
**Returns:** Object with site configuration
**Why:** Centralized data source, no prop drilling

## 🎨 Styling Architecture

### SCSS Structure
- **Single stylesheet:** `src/components/index.scss`
- **Strategy:** Global styles + component-scoped classes
- **Naming:** BEM-inspired (`.component__element`)
- **No CSS Modules:** Relying on class naming convention

### Design System
```scss
// Colors
Background: #fff
Text: #111 (headings), #333 (body)
Accent: #94B2C6
Links: #111 → #555 on hover

// Typography
System fonts: -apple-system, SF Pro, Segoe UI, Roboto
Headings: 700 weight
Body: Line-height 1.6

// Spacing
Consistent margin-bottom on paragraphs (1.5em)
```

## 🔍 SEO Strategy

### Three-Layer Approach

**1. Technical SEO**
- Sitemap: Auto-generated at `/sitemap-index.xml`
- Robots.txt: Configured to allow all
- Canonical URLs: Via gatsby-plugin-canonical-urls
- Humans.txt: Author attribution file

**2. On-Page SEO**
- Unique titles per page
- Descriptive meta descriptions
- Semantic HTML5 structure
- Image alt text
- Internal linking

**3. Structured Data (Schema.org)**
- Person schema: Personal branding signals
- BlogPosting schema: Article metadata for rich snippets
- WebSite schema: Site-level entity
- BreadcrumbList: Navigation hierarchy
- sameAs links: Social profile connections

### SEO Best Practices Applied
✅ Mobile-first responsive design
✅ Fast load times (static generation)
✅ PWA capabilities (manifest + service worker)
✅ Social sharing optimization
✅ Accessibility standards

## 🚀 Performance Optimizations

### Gatsby Built-ins
- **Code splitting:** Per-route bundles
- **Prefetching:** Link components prefetch on hover
- **Image optimization:** gatsby-plugin-sharp
  - Responsive images (multiple sizes)
  - WebP format with fallbacks
  - Lazy loading with blur-up effect

### Service Worker
- **Plugin:** gatsby-plugin-offline
- **Features:** 
  - Offline page access
  - Asset caching
  - Faster repeat visits

### Build Output
- Minified JS/CSS
- Optimized images
- Inlined critical CSS
- Hash-based file names for cache busting

## 📊 Content Strategy

### Article Topics (By Frequency)
1. **React/Frontend** (57%): Hooks, Gatsby, WebSockets, PDF generation
2. **Backend/Golang** (21%): Docker, Database connections, GRPC
3. **CSS/Styling** (14%): Pseudo-elements, SCSS
4. **Career/Skills** (7%): Interviews, learning strategies

### Content Evolution
- **2018-2019:** Heavy frontend focus (9 articles)
- **2020-2023:** Content gap (career shift?)
- **2024-2025:** Return with backend content (full-stack evolution)

**Insight:** Content reflects growth from frontend specialist → full-stack engineer

## 🔧 Development Workflow

### Local Development
```bash
npm run develop  # Port 8000, hot reload
```
- GraphQL playground: `localhost:8000/___graphql`
- Preview drafts by setting future dates

### Production Build
```bash
npm run build    # Generates /public/
```
- Validates GraphQL queries
- Optimizes all assets
- Generates service worker

### Key Gatsby Files

**gatsby-config.js**
- Site metadata
- Plugin configuration
- Source filesystem paths

**gatsby-node.js**
- Creates pages from markdown
- Implements `createPages` API
- Passes slug context to template

**gatsby-browser.js**
- Imports Prismjs theme
- Client-side browser APIs

## 🎯 User Journey

### Visitor Flow
1. **Landing (/)** → Hero + Blog list
2. **Article Click** → Full post with sharing
3. **Navigation** → About/Work pages
4. **Social Share** → Twitter/LinkedIn

### Conversion Goals
- Read articles (engagement)
- Share content (virality)
- View portfolio (showcase)
- Contact via email (leads)

## 🐛 Known Issues & Considerations

### Technical Debt
1. **Mixed Component Styles:** Class (Header) vs Functional (others)
2. **Deprecated gatsby-image:** Should migrate to gatsby-plugin-image
3. **Empty LinkedIn URL:** Config has placeholder
4. **Typo in target attribute:** Some `__blank` should be `_blank`

### Migration Priorities
**High:** gatsby-image → gatsby-plugin-image
**Medium:** Header to functional component
**Low:** Add TypeScript for type safety

### Implemented Features
- ✅ **Tagging System** - Full implementation with tag pages and filtering

### Missing Features (Nice-to-Have)
- Search functionality (Algolia/Fuse.js)
- Comment system (Utterances/Giscus)
- RSS feed (gatsby-plugin-feed)
- Dark mode toggle
- Reading time estimates
- Tag cloud visualization
- Related posts by tags

## 🎨 Design Philosophy

### Minimalist Approach
- Clean, uncluttered layouts
- Focus on readability
- Generous whitespace
- Subtle interactions

### Accessibility First
- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation
- High contrast ratios
- Alt text on all images

**Note:** Author has written about accessibility (building accessible forms), so maintain these standards

## 📱 Responsive Strategy

### Breakpoints (Inferred)
- Mobile-first approach
- Fluid typography
- Flexible grid layouts
- Touch-friendly hit targets

## 🔗 External Integrations

### Social Platforms
- **Twitter:** Tweet intents for sharing
- **LinkedIn:** Share article URLs
- **GitHub:** Portfolio links, profile link

### Third-party Services
- **Google Analytics:** via gatsby-plugin-gtag
- **Icongr.am:** Social share icons (external CDN)
- **Prismjs:** Code syntax highlighting

## 💡 AI Assistant Guidelines

### When Helping with This Project

**DO:**
- Use functional components with hooks
- Export Head component for pages
- Include SEO metadata
- Test GraphQL queries in playground
- Maintain accessibility standards
- Keep structured data intact
- Use proper markdown frontmatter
- Follow BEM-like class naming

**DON'T:**
- Use gatsby-image (deprecated)
- Create class components (unless refactoring Header)
- Hard-code URLs (use siteMetadata)
- Skip alt text or ARIA labels
- Remove Schema.org structured data
- Forget rel="noopener" on external links
- Use inline styles (prefer SCSS classes)

### Common Tasks

**Adding a Blog Post:**
1. Create folder: `src/articles/YYYY-MM-DD-title/`
2. Add `index.md` with frontmatter
3. Run develop to test
4. Build to generate static page

**Editing SEO:**
1. Check `gatsby-config.js` for site metadata
2. Edit `seo.js` for Schema.org changes
3. Update Head exports on pages
4. Verify with Rich Results Test

**Styling Changes:**
1. Edit `src/components/index.scss`
2. Use existing class patterns
3. Test mobile responsiveness
4. Check contrast ratios

**Component Creation:**
1. Functional component with hooks
2. PropTypes validation
3. Export Head if it's a page
4. GraphQL query if data needed
5. Import in parent component

## 📚 Helpful Resources

### Gatsby Docs
- [Gatsby Node APIs](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/)
- [GraphQL Query Options](https://www.gatsbyjs.com/docs/graphql-reference/)
- [Gatsby Head API](https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/)

### Schema.org
- [Person Schema](https://schema.org/Person)
- [BlogPosting Schema](https://schema.org/BlogPosting)
- [WebSite Schema](https://schema.org/WebSite)

## 🎓 Learning from This Project

**Good Practices Demonstrated:**
- Comprehensive SEO implementation
- Static site generation for performance
- Structured data for rich snippets
- Component-based architecture
- Markdown-based content management
- Progressive Web App features

**This codebase shows:**
- Mature understanding of Gatsby ecosystem
- SEO-first development approach
- Accessibility considerations
- Performance optimization techniques
- Clean code organization

---

**Last Updated:** December 2025  
**Maintainer:** Oghenero Adaware (@finallynero)  
**Site:** https://finallynero.dev

