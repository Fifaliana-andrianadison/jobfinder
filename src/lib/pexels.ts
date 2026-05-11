const PEXELS_API_KEY = "QuOWsDCU3pElDqziYxSbWuaJ6uB54e5d6QUXHEPqxLCR8kF46PEyOdpH"

const DEV_QUERIES = [
  "developer coding",
  "programmer working",
  "software engineer desk",
  "developer laptop",
  "coder setup",
  "tech workspace",
  "developer team collaboration",
]

let cachedPhotos: string[] = []
let lastFetch = 0

export async function getPexelsPhotos(count: number = 80): Promise<string[]> {
  if (cachedPhotos.length > 0 && Date.now() - lastFetch < 300000) {
    return cachedPhotos
  }
  try {
    const query = DEV_QUERIES[Math.floor(Math.random() * DEV_QUERIES.length)]
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${count}&orientation=landscape`,
      { headers: { Authorization: PEXELS_API_KEY } }
    )
    const data = await res.json()
    const photos = data.photos?.map((p: { src: { medium: string } }) => p.src.medium) ?? []
    cachedPhotos = photos
    lastFetch = Date.now()
    return photos
  } catch {
    return []
  }
}

export function getRandomPexelsImage(photos: string[], seed: number): string {
  if (photos.length === 0) return ""
  return photos[seed % photos.length]
}
