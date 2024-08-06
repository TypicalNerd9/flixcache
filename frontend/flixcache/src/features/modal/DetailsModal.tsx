import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../reduxHooks"
import { useGetDetailsQuery } from "../../services/flixcache"
import { skipToken } from "@reduxjs/toolkit/query"
import { updateModal } from "./detailsModalSlice"

function DetailsModal() {
    const mediaId: string = useAppSelector((state) => state.detailsModal.mediaId)
    const mediaType: string = useAppSelector((state) => state.detailsModal.mediaType)

    const dispatch = useAppDispatch()

    if (!open) return null;

    const { data, error, isLoading } = useGetDetailsQuery(mediaId == "" ? skipToken : {type: mediaType, mediaId: mediaId})


    console.log("ID: " + mediaId)
    console.log("TYPE: " + mediaType)
    console.log(data)
    return (
        <>
            {(error) ? (
                <>An error occurred</>
            ) : (isLoading) ? (
                <div className="fixed left-0 top-0 bg-black bg-opacity-50 w-screen h-screen flex justify-center items-center">
                    <div className="bg-white w-[30%] p-10 text-black">
                        Loading...
                    </div>
                </div>
            ) : (data) ? (
                <div className="fixed left-0 top-0 bg-black bg-opacity-50 w-screen h-screen flex justify-center items-center">
                    <div className="bg-white w-[30%] p-10 text-black">
                        <button onClick={() => dispatch(updateModal({open: false, mediaId: "", mediaType: "movie"}))}>X</button>
                        <h3 className="">{mediaType == "tv" ? data.name : data.title}</h3>
                        <p>{data.overview}</p>
                    </div>
                </div>
            ): null }
        </>
    )
        
}

export default DetailsModal