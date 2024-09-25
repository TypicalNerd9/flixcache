import { useNavigate, useSearchParams } from "react-router-dom"
import { useGetConfigQuery, useGetSearchQuery } from "../../services/flixcache";
import Search from "../../components/Search";
import { useEffect, useState } from "react";
import { updateModal } from "../modal/detailsModalSlice";
import { useAppDispatch } from "../../reduxHooks";
import FlixTypeSelector from "../../components/FlixTypeSelector";
import FlixDisplay from "../../components/FlixDisplay";
import { ChevronDownIcon, ChevronUpIcon, PlusIcon } from "@heroicons/react/24/outline";

function FlixSearch() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [type, setType] = useState("movie")

    const query = searchParams.get("query")
    const pageParam = searchParams.get("page")
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    if (query != null) {

        const page = pageParam != null ?  (Number.isInteger(+pageParam) ? +pageParam : 1) : 1
        const { data, error, isLoading } = useGetSearchQuery({type: type, query: query, page: page})
        const { data: configData, error: configError, isLoading: configIsLoading } = useGetConfigQuery(undefined)
        
        const backdropSize: string = configIsLoading ? "" : configData.images.backdrop_sizes[0].slice(1)
        

        let genreList: string[] = []

        console.log(data)

        function dataLoadedAndAccessible(): boolean {
            return !isLoading && !configIsLoading && data && configData
        }

        const searchWithQuery = (newPage: number) =>  {
            console.log(newPage)
            navigate({
                pathname: '/search',
                search: `?query=${query}&page=${newPage}`
            })
        }
        const nextPage = () => {
            if (dataLoadedAndAccessible()) {
                if (page < data.total_pages) searchWithQuery(page+1)
            }
        }

        const prevPage = () => {
            if (dataLoadedAndAccessible()) {
                if (page > 1) searchWithQuery(page-1)
            }
        }

        useEffect(() => {
            //If page is manually set to higher than total pages for the query, automatically go to the last page of the query.
            if (dataLoadedAndAccessible() && page > data.total_pages) searchWithQuery(data.total_pages)
        }, [data, type]);

        const dispatchUpdateModal = (params: {open: boolean, mediaId: string, mediaType: string}) => {
            dispatch(updateModal(params))
        }

        return (
            <>
                {(error || configError) ? (
                <>An error occurred</>
                ) : (isLoading || configIsLoading) ? (
                <>Loading...</>
                ) : (data && configData) ? (
                    <>
                        <div className="flex justify-center mt-6">
                           <FlixTypeSelector type={type} setType={setType}/>
                        </div>
                        <h3 className="mt-2 text-start ms-6">Showing {data.total_results} results for '{query}'...</h3>
                        <span className="flex justify-end justify-items-center items-center">
                            <button disabled={page==1} className={(page==1 ? 'cursor-not-allowed opacity-50' : '')} onClick={prevPage}>&lt;</button>
                                <span className="px-2">{page}/{data.total_pages}</span>
                            <button disabled={page==data.total_pages} className={(page==data.total_pages ? 'cursor-not-allowed opacity-50' : '')} onClick={nextPage}>&gt;</button>
                        </span>
                        <div className="flex gap-5">
                            <div className="flex flex-col gap-3 ms-4">
                                <div className="border-4 border-secondary rounded-xl text-secondary px-3 pb-2">
                                    <div className="flex mb-2">
                                        <h2 className="font-medium text-xl grow select-none">Genres</h2>
                                        <button className="mt-1"><ChevronDownIcon className="h-5 w-5 stroke-secondary hover:stroke-secbright stroke-2"/></button>
                                    </div>
                                    
                                    <ul className="flex">
                                        {genreList.map((genre: string) => 
                                            <li className="border-2 border-secondary rounded-xl px-1.5 text-xl font-medium">{genre}</li> 
                                        )}
                                        <li className="border-2 border-secondary hover:border-secbright rounded-xl p-0.5 text-xl cursor-pointer group"><PlusIcon className="h-5 w-5 stroke-secondary stroke-2 group-hover:stroke-secbright"/></li> 
                                    </ul>
                                </div>

                                <div className="border-4 border-secondary rounded-xl text-secondary px-3 pb-2">
                                    <div className="flex mb-2">
                                        <h2 className="font-medium text-xl grow select-none">Year</h2>
                                        <button className="mt-1"><ChevronDownIcon className="h-5 w-5 stroke-secondary hover:stroke-secbright stroke-2"/></button>
                                    </div>
                                    
                                    <div className="flex gap-4">
                                        <div className="flex flex-col gap-2">
                                            <label className="h-[32px]" htmlFor="yearFrom">From</label>
                                            <label className="h-[32px]" htmlFor="yearTo">To</label>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <input id="yearFrom" type="text" className="border-2 border-secondary rounded-xl px-1.5 text-xl font-medium"/>
                                            <input id="yearTo" type="text" className="border-2 border-secondary rounded-xl px-1.5 text-xl font-medium"/>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-4 border-secondary rounded-xl text-secondary px-3 pb-2">
                                    <div className="flex mb-2">
                                        <h2 className="font-medium text-xl grow select-none">Keywords</h2>
                                        <button className="mt-1"><ChevronDownIcon className="h-5 w-5 stroke-secondary hover:stroke-secbright stroke-2"/></button>
                                    </div>
                                    
                                    <ul className="flex">
                                        {genreList.map((genre: string) => 
                                            <li className="border-2 border-secondary rounded-xl px-1.5 text-xl font-medium">{genre}</li> 
                                        )}
                                        <li className="border-2 border-secondary hover:border-secbright rounded-xl p-0.5 text-xl cursor-pointer group"><PlusIcon className="h-5 w-5 stroke-secondary stroke-2 group-hover:stroke-secbright"/></li> 
                                    </ul>
                                </div>

                                <div className="border-4 border-secondary rounded-xl text-secondary px-3 pb-2">
                                    <div className="flex mb-2">
                                        <h2 className="font-medium text-xl grow select-none">Watch Providers</h2>
                                        <button className="mt-1"><ChevronDownIcon className="h-5 w-5 stroke-secondary hover:stroke-secbright stroke-2"/></button>
                                    </div>
                                    
                                    <ul className="flex">
                                        {genreList.map((genre: string) => 
                                            <li className="border-2 border-secondary rounded-xl px-1.5 text-xl font-medium">{genre}</li> 
                                        )}
                                        <li className="border-2 border-secondary hover:border-secbright rounded-xl p-0.5 text-xl cursor-pointer group"><PlusIcon className="h-5 w-5 stroke-secondary stroke-2 group-hover:stroke-secbright"/></li> 
                                    </ul>
                                </div>
                            </div>
                            <div className="mt-5 grid gap-4 grid-cols-4 grid-rows-5">
                                {data.results.map((flix: any, index: number) => 
                                    <div key={data.results[index].id}>
                                        <FlixDisplay type={type} title={type == "movie" ? flix.title : flix.name} secure_base_url={configData.images.secure_base_url} 
                                        backdrop_path={data.results[index].backdrop_path} backdrop_size={backdropSize} id={flix.id} updateModal={dispatchUpdateModal}/>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                ) : null }
            </>
        )
    } else {
        return (
            <>
                <p>No search results found.</p>
            </>
        )
    }

    

}

export default FlixSearch