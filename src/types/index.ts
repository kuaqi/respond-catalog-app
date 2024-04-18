
export type AnimeSearchResponse = {
  data: Anime[],
  pagination: Pagination,
}

export type DetailSearchResponse = {
  data: Anime,
  pagination: Pagination,
}

export type Anime = {
  mal_id: number,
  url: string,
  images: ImageFormat,
  trailer: {},
  approved: boolean,
  titles: [],
  title: string,
  title_english: string,
  title_japanese: string,
  title_synonyms: [],
  type: string,
  source: string,
  episodes: number,
  status: string,
  airing: boolean,
  aired: {},
  duration: string,
  rating: string,
  score: number,
  rank: number,
  popularity: number,
  members: number,
  favorites: number,
  synopsis: string,
  background: string,
  season: string,
  year: number,
  broadcast: {},
  producers: [],
  licensors: [],
  studios: [],
  genres: [],
  explicit_genres: [],
  themes: [],
  demographics: [],
}

export type ImageFormat = {
  jpg: ImageUrl,
  webp: ImageUrl,
}

export type ImageUrl = {
  image_url: string,
  small_image_url: string,
  large_image_url: string,
}

export type Pagination = {
  last_visible_page: number,
  has_next_page: boolean,
  items: PaginationItem,
}

export type PaginationItem = {
  count: number,
  total: number,
  per_page: number,
}
