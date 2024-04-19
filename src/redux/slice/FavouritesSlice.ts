import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Anime } from "../../types"

export type FavouritesState = {
  items: Anime[],
}

const initialState: FavouritesState = {
  items: [],
}

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState: initialState,
  reducers: {
    addFavourite(state, action: PayloadAction<Anime>) {
      const index = state.items.findIndex((anime) => anime.mal_id === action.payload.mal_id)
      if (index === -1) {
        state.items.push(action.payload)
      }
    },
    removeFavourite(state, action: PayloadAction<Anime>) {
      const index = state.items.findIndex((anime) => anime.mal_id === action.payload.mal_id)
      if (index !== -1) {
        state.items.splice(index, 1)
      }
    },
  }
})

export const { addFavourite, removeFavourite } = favouritesSlice.actions
export const favouritesReducer = favouritesSlice.reducer
