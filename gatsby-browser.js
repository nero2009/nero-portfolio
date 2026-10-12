/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import { renderMermaidDiagrams } from './src/utils/renderMermaid'

const scheduleMermaid = () => {
  // Wait a tick so Gatsby has swapped in the new page HTML.
  window.requestAnimationFrame(() => {
    renderMermaidDiagrams()
  })
}

export const onInitialClientRender = scheduleMermaid
export const onRouteUpdate = scheduleMermaid
