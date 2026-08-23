interface RouteMetadata {
  title: string
  description: string
  favicon: string
}

export function setRouteMetadata({ title, description, favicon }: RouteMetadata) {
  document.title = title
  setMetaContent('meta[name="description"]', description)
  setMetaContent('meta[property="og:title"]', title)
  setMetaContent('meta[property="og:description"]', description)

  const link = document.querySelector("link[rel='icon']") as HTMLLinkElement | null
  if (link) link.href = favicon
}

function setMetaContent(selector: string, content: string) {
  const meta = document.querySelector(selector) as HTMLMetaElement | null
  if (meta) meta.content = content
}
