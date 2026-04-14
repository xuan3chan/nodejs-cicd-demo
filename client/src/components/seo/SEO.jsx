import { useEffect } from 'react'
import { useSiteConfig } from '../../context/SiteConfigContext'

export default function SEO() {
  const { config } = useSiteConfig()
  const seo = config?.seo || {}

  useEffect(() => {
    // Update Document Title
    if (seo.title) {
      document.title = seo.title
    }

    // Update Meta Description
    if (seo.description) {
      let metaDesc = document.querySelector('meta[name="description"]')
      if (!metaDesc) {
        metaDesc = document.createElement('meta')
        metaDesc.name = 'description'
        document.head.appendChild(metaDesc)
      }
      metaDesc.setAttribute('content', seo.description)
    }

    // Update Meta Keywords
    if (seo.keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]')
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta')
        metaKeywords.name = 'keywords'
        document.head.appendChild(metaKeywords)
      }
      metaKeywords.setAttribute('content', seo.keywords)
    }

    // Update Open Graph tags
    const updateOgTag = (property, content) => {
      if (!content) return
      let tag = document.querySelector(`meta[property="${property}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('property', property)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    }

    updateOgTag('og:title', seo.title)
    updateOgTag('og:description', seo.description)
    if (seo.ogImage) {
      updateOgTag('og:image', seo.ogImage)
    }

  }, [seo])

  return null
}
