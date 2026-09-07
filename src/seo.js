const siteUrl = 'https://citydrip.com.ng'
const defaultImage = `${siteUrl}/logo.png`

function setMeta(attribute, value, content) {
  let element = document.head.querySelector(`meta[${attribute}="${value}"]`)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, value)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

function setCanonical(path) {
  let element = document.head.querySelector('link[rel="canonical"]')

  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', 'canonical')
    document.head.appendChild(element)
  }

  element.setAttribute('href', `${siteUrl}${path}`)
}

export function updateSeo({ title, description, path, image = defaultImage, schema }) {
  document.title = title
  setMeta('name', 'description', description)
  setMeta('property', 'og:title', title)
  setMeta('property', 'og:description', description)
  setMeta('property', 'og:url', `${siteUrl}${path}`)
  setMeta('property', 'og:image', image)
  setMeta('property', 'og:type', 'website')
  setMeta('property', 'og:site_name', 'City Drip')
  setMeta('name', 'twitter:card', 'summary_large_image')
  setMeta('name', 'twitter:title', title)
  setMeta('name', 'twitter:description', description)
  setMeta('name', 'twitter:image', image)
  setCanonical(path)

  let schemaElement = document.head.querySelector('script[data-seo-schema]')

  if (!schemaElement) {
    schemaElement = document.createElement('script')
    schemaElement.type = 'application/ld+json'
    schemaElement.dataset.seoSchema = 'true'
    document.head.appendChild(schemaElement)
  }

  schemaElement.textContent = JSON.stringify(schema)
}
