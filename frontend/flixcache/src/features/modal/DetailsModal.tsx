import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../reduxHooks"
import { useGetConfigQuery, useGetDetailsQuery } from "../../services/flixcache"
import { skipToken } from "@reduxjs/toolkit/query"
import { updateModal } from "./detailsModalSlice"
import Header from "../../components/Header"

function DetailsModal() {
    const mediaId: string = useAppSelector((state) => state.detailsModal.mediaId)
    const mediaType: string = useAppSelector((state) => state.detailsModal.mediaType)

    const dispatch = useAppDispatch()

    if (!open) return null;

    const { data, error, isLoading } = useGetDetailsQuery(mediaId == "" ? skipToken : {type: mediaType, mediaId: mediaId, withImages: true, withVideos: true, withWatchProviders: true})

    const { data: configData, error: configError, isLoading: configIsLoading } = useGetConfigQuery(undefined)

    const backdropSize: string = (configIsLoading && configData == null) ? "" : configData.images.backdrop_sizes[0].slice(1)
    const posterSize: string = (configIsLoading && configData == null) ? "" : configData.images.poster_sizes[1].slice(1)
    const logoSize: string = (configIsLoading && configData == null) ? "" : configData.images.logo_sizes[0].slice(1)
    
    console.log("ID: " + mediaId)
    console.log("TYPE: " + mediaType)
    console.log(data)

    const displayWatchProviders = (watchProviders: any): JSX.Element[] => {
        let returnElements: JSX.Element[] = []
        if (!watchProviders.hasOwnProperty("US")) {
            returnElements.push(
                <>
                    <p>Not Available</p>
                </>
            )
            return returnElements
        }
        if (watchProviders.US.hasOwnProperty("flatrate")) {
            returnElements.push(
                <>
                    <h3 className="text-l">Stream</h3>
                    <ul className="flex flex-wrap gap-1">
                        {watchProviders.US["flatrate"].map((provider: any, index: number) => 
                            <li style={{ minWidth: logoSize+'px' }} key={index}>
                                <img className="flex-none" src={configData.images.secure_base_url+'w'+logoSize+provider.logo_path}></img>
                            </li>
                        )}
                    </ul>
                </>
            )
        }
        if (watchProviders.US.hasOwnProperty("rent")) {
            returnElements.push(
                <>
                    <h3 className="text-l">Rent</h3>
                    <ul className="flex flex-wrap gap-1">
                        {watchProviders.US["rent"].map((provider: any, index: number) => 
                            <li style={{ minWidth: logoSize+'px' }} key={index}>
                                <img className="flex-none" src={configData.images.secure_base_url+'w'+logoSize+provider.logo_path}></img>
                            </li>
                        )}
                    </ul>
                </>
            )
        }
        if (watchProviders.US.hasOwnProperty("buy")) {
            returnElements.push(
                <>
                    <h3 className="text-l">Buy</h3>
                    <ul className="flex flex-wrap gap-1">
                        {watchProviders.US["buy"].map((provider: any, index: number) => 
                            <li style={{ minWidth: logoSize+'px' }} key={index}>
                                <img className="flex-none" src={configData.images.secure_base_url+'w'+logoSize+provider.logo_path}></img>
                            </li>
                        )}
                    </ul>
                </>
            )
        }
        return returnElements
    }
    return (
        <>
            {(error || configError) ? (
                <>An error occurred</>
            ) : (isLoading || configIsLoading) ? (
                <div className="fixed left-0 top-0 bg-black bg-opacity-50 w-screen h-screen flex justify-center items-center">
                    <div className="bg-white w-[50%] p-10 text-black">
                        Loading...
                    </div>
                </div>
            ) : (data && configData) ? (
                <div className="fixed left-0 top-0 w-screen h-screen flex flex-col">
                    <div className="w-full"><Header/></div>
                    <div className="bg-bg w-full p-10 text-secondary">

                        <div className="flex items-center">
                            <button className="bg-secondary text-bg font-medium size-8 rounded" onClick={() => dispatch(updateModal({open: false, mediaId: "", mediaType: "movie"}))}>X</button>
                            <h1 className="text-4xl rounded px-3 py-2 text-center align-middle text-secondary w-fit font-medium ms-16"><span className="line-clamp-1 pb-1">{mediaType == "tv" ? data.name : data.title}</span></h1>
                        </div>
                        
                        <div className="flex gap-4 ms-20">
                            <img className="rounded-t-lg hover:rounded-t-lg" src={configData.images.secure_base_url+'w'+posterSize+data.poster_path}></img>
                            <div className="flex flex-col gap-y-8 basis-2/5">
                                <div className="flex gap-x-2">
                                    <h3 className="text-xl font-medium">Genres:</h3>
                                    <ul className="flex flex-wrap gap-x-2 gap-y-3 mt-1 h-fit">
                                        {data.genres.map((genre: any, index: number) => 
                                            <li key={index}>
                                                <span className="px-3 py-1 rounded-2xl bg-primary text-white font-medium">{genre.name}</span>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                                <div className="flex gap-x-2">
                                    <h3 className="text-xl font-medium">Runtime:</h3>
                                    <span className="px-3 py-1 rounded-2xl bg-primary text-white font-medium">{(data.runtime-(data.runtime%60))/60}h {data.runtime%60}m</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-y-8">
                                <div className="flex gap-x-2 items-center">
                                    <h3 className="text-xl font-medium">Release Date:</h3>
                                    <span className="px-3 py-1 rounded-2xl bg-primary text-white font-medium h-fit">{new Date(data.release_date).toLocaleDateString()}</span>
                                </div>
                                <div className="flex gap-x-2 items-center">
                                    <h3 className="text-xl font-medium">Country:</h3>
                                    <ul className="flex flex-wrap gap-x-2 gap-y-3 mt-1 h-fit">
                                        {data.origin_country.map((country: any, index: number) => 
                                            <li key={index}>
                                                <span className="px-3 py-1 rounded-2xl bg-primary text-white font-medium">{country}</span>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="ms-20">
                            <h2 className="text-2xl ms-4 font-medium">Overview</h2>
                            <p>{data.overview}</p>
                        </div>
                        <h2 className="text-xl">Trailers</h2>
                        <ul className="flex overflow-x-scroll gap-1">
                            {data.videos.results.filter((video: { site: string; type: string }) => video.site == "YouTube" && video.type == "Trailer").map((video: any, index: number) => 
                                <li key={index}>
                                    <iframe className="aspect-video" src={"https://www.youtube.com/embed/"+video.key} allowFullScreen/>
                                </li>
                            )}
                        </ul>
                        <h2 className="text-xl">Media</h2>
                        <ul className="flex overflow-x-scroll gap-1">
                            {data.images.backdrops.length > 0 ? data.images.backdrops.slice(0, 10).map((backdrop: any, index: number) => 
                                <li style={{ minWidth: backdropSize+'px' }} key={index}>
                                    <img className="flex-none" src={configData.images.secure_base_url+'w'+backdropSize+backdrop.file_path}></img>
                                </li>
                            ) : <p>No Media Found.</p>}
                        </ul>
                        <h2 className="text-xl">Where To Watch</h2>
                        {displayWatchProviders(data["watch/providers"].results)}
                    </div>
                </div>
            ): null }
        </>
    )
        
}

export default DetailsModal