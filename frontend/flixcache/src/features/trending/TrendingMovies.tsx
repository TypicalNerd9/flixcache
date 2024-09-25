
import { RootState } from "../../state/store";
import { useEffect } from "react"
import axios from 'axios'
import { useAppDispatch, useAppSelector } from "../../reduxHooks";
import { useGetConfigQuery, useGetTrendingQuery } from "../../services/flixcache";
import { updateModal } from "../modal/detailsModalSlice";
import FlixDisplay from "../../components/FlixDisplay";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

function TrendingMovies({type}: {type: string}) {

    const trending = useAppSelector((state) => state.trending.flixList)
    const dispatch = useAppDispatch()

    const { data, error, isLoading } = useGetTrendingQuery({type: type, timeframe: 'week'})
    const { data: configData, error: configError, isLoading: configIsLoading } = useGetConfigQuery(undefined)

    const backdropSize: string = (configIsLoading && configData == null) ? "" : configData.images.backdrop_sizes[0].slice(1)

    const postersDisplayed: number = 4;

    const dispatchUpdateModal = (params: {open: boolean, mediaId: string, mediaType: string}) => {
        dispatch(updateModal(params))
    }

    const CustomChevron = () => (
        <svg xmlns="http://www.w3.org/2000/svg"
            width="60pt"
            height="120pt"
            viewBox="60 0 120 240"
            className="stroke-secondary hover:stroke-secbright">
            <defs/>
            <g id="group0" transform="translate(71.8800002269354, 4.8)" fill="none">
            <path id="shape0" transform="matrix(0.9375 0 0 1 0 115.2)" fill="none" stroke-width="10" stroke-linecap="round" stroke-linejoin="miter" stroke-miterlimit="1.92" d="M102.528 115.2L0 0"/>
            <path id="shape0" transform="matrix(-0.937500023256298 0 0 1.00000002480672 96.1199997730646 -8.88178419700125e-16)" fill="none" stroke-width="10" stroke-linecap="round" stroke-linejoin="miter" stroke-miterlimit="1.92" d="M102.528 115.2L0 0"/>
            </g>
        </svg>


    )

    return(
        <>
        <div className="mx-auto flex flex-col items-center w-min">
            <h1 className="text-start ms-28 mb-1 self-start text-2xl text-secondary font-medium">TRENDING</h1>
                {(error || configError) ? (
                    <>An error occurred</>
                ) : (isLoading || configIsLoading) ? (
                    <>Loading...</>
                ) : (data && configData) ? (
                    <div className="flex flex-row items-center ">
                        <button className=""><CustomChevron/></button>
                        <div className="mx-2 bg-darkbg p-3 pb-2 rounded-xl" style={{ maxWidth: (Number(backdropSize)*postersDisplayed) + (16*(postersDisplayed-1)) + 24 +'px'}}>
                            <ul className="flex flex-row gap-x-4 overflow-x-scroll snap-x no-scrollbar">
                                {data.results.map((flix: any, index: number) => 
                                    <li className={`snap-start`} key={data.results[index].id}
                                        onClick={() => dispatch(updateModal({open: true, mediaId: flix.id, mediaType: flix.media_type}))}>
                                        <FlixDisplay type={type} title={type == "movie" ? flix.title : flix.name} secure_base_url={configData.images.secure_base_url} 
                                        backdrop_path={data.results[index].backdrop_path} backdrop_size={backdropSize} id={flix.id} updateModal={dispatchUpdateModal}/>
                                    </li>
                                )}
                            </ul>
                            <div className="p-0.5 mt-2 bg-bg rounded relative">
                                <div className="bg-secondary rounded w-10 h-1 absolute top-0 left-0">
                                </div>
                            </div>
                        </div>
                        <button className="rotate-180"><CustomChevron/></button>
                    </div>
                ) : null }
            </div>
        </>
    )
}

export default TrendingMovies