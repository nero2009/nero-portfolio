import mermaid from 'mermaid'

let initialized = false

const initMermaid = () => {
  if (initialized) return

  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'strict',
    theme: 'base',
    themeVariables: {
      primaryColor: '#d7e6ef',
      primaryTextColor: '#1e2a32',
      primaryBorderColor: '#94b2c6',
      secondaryColor: '#efe8f6',
      secondaryTextColor: '#2a2433',
      secondaryBorderColor: '#b8a4cc',
      tertiaryColor: '#e8f3ea',
      tertiaryTextColor: '#243028',
      tertiaryBorderColor: '#9dbfa6',
      lineColor: '#6b8494',
      textColor: '#222',
      mainBkg: '#eef5f9',
      nodeBorder: '#94b2c6',
      clusterBkg: '#f7fafc',
      clusterBorder: '#c5d6e2',
      titleColor: '#1e2a32',
      edgeLabelBackground: '#fafbfc',
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
      fontSize: '14px',
    },
    flowchart: {
      curve: 'basis',
      padding: 16,
      htmlLabels: true,
      nodeSpacing: 42,
      rankSpacing: 48,
    },
  })

  initialized = true
}

const extractDiagramSource = node => {
  const code = node.querySelector('code')
  return (code ? code.textContent : node.textContent) || ''
}

/**
 * Turn Prism-highlighted ```mermaid blocks into rendered SVG diagrams.
 */
export const renderMermaidDiagrams = async () => {
  if (typeof document === 'undefined') return

  initMermaid()

  const blocks = Array.from(
    document.querySelectorAll(
      '.gatsby-highlight[data-language="mermaid"], pre.language-mermaid'
    )
  )

  if (!blocks.length) return

  await Promise.all(
    blocks.map(async (block, index) => {
      if (block.dataset.mermaidRendered === 'true') return

      const source = extractDiagramSource(block).trim()
      if (!source) return

      const id = `mermaid-diagram-${Date.now()}-${index}`
      const host = document.createElement('div')
      host.className = 'mermaid-diagram'
      host.setAttribute('role', 'img')
      host.setAttribute('aria-label', 'Diagram')

      try {
        const { svg } = await mermaid.render(id, source)
        host.innerHTML = svg
        block.replaceWith(host)
      } catch (error) {
        // Keep the original code block readable if rendering fails.
        console.error('Mermaid render failed:', error)
        block.dataset.mermaidRendered = 'error'
      }
    })
  )
}
