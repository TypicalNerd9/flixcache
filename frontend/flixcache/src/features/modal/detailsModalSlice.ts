import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface DetailsModalState {
    open: boolean,
    mediaId: string,
    mediaType: string,
}

const initialState: DetailsModalState = {
    open: false,
    mediaId: "",
    mediaType: "movie",
}

export const detailsModalSlice = createSlice({
    name: 'detailsModal',
    initialState,
    reducers: {
        updateModal: (state, action: PayloadAction<{open: boolean, mediaId: string, mediaType: string}>) => {
            state.open = action.payload.open
            state.mediaId = action.payload.mediaId
            state.mediaType = action.payload.mediaType
        }
    },
})

export const { updateModal } = detailsModalSlice.actions
export default detailsModalSlice.reducer