import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface TrendingState {
    flixList: any[]
}

const initialState: TrendingState = {
    flixList: [],
}

export const trendingSlice = createSlice({
    name: 'trending',
    initialState,
    reducers: {
        update: (state, action: PayloadAction<any[]>) => {
            state.flixList = action.payload
        }
    },
})

export const { update } = trendingSlice.actions
export default trendingSlice.reducer