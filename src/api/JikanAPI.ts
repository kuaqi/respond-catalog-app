import { AnimeSearchResponse } from "../types"

export const JikanService = {
  getAnimeSearch,
}

export async function getAnimeSearch(status: string, query?: string) {
  const baseUrl = 'https://api.jikan.moe'
  const version = 'v4'
  const type = 'anime'
  const titleQuery = query ? `q=${query}` : ''
  const url = baseUrl + '/' + version + '/' + type + '?' + `status=${status}` + titleQuery

  const controller = new AbortController()
  const duration = 5000
  const timeoutId = setTimeout(() => controller.abort(), duration)

  const config = {
    method: 'GET',
    signal: controller.signal,
  }

  try {
    const response = await fetch(url, config)
    if (response.status === 404) throw new Error('404')
    const jsonData: AnimeSearchResponse = await response.json()
    return jsonData.data
  } catch (error) {
    console.error('getAnimeSearch error:', error)
  } finally {
    clearTimeout(timeoutId)
  }
}
