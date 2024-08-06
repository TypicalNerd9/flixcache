import { useNavigate, useSearchParams } from "react-router-dom"
import { useGetConfigQuery, useGetSearchQuery } from "../../services/flixcache";
import Search from "../../components/Search";
import { useEffect } from "react";
import { updateModal } from "../modal/detailsModalSlice";
import { useAppDispatch } from "../../reduxHooks";

function FlixSearch() {
    const [searchParams, setSearchParams] = useSearchParams()

    const query = searchParams.get("query")
    const pageParam = searchParams.get("page")
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    if (query != null) {
        const page = pageParam != null ?  (Number.isInteger(+pageParam) ? +pageParam : 1) : 1
        const { data, error, isLoading } = useGetSearchQuery({type: 'movie', query: query, page: page})
        const { data: configData, error: configError, isLoading: configIsLoading } = useGetConfigQuery(undefined)
        
        const posterSize: string = configIsLoading ? "" : configData.images.poster_sizes[1].slice(1)
        const type: string = "movie"

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
        }, data);

        return (
            <>
                <Search/>
                {(error || configError) ? (
                <>An error occurred</>
                ) : (isLoading || configIsLoading) ? (
                <>Loading...</>
                ) : (data && configData) ? (
                    <>
                        <h3 className="mt-2 text-start">Showing {data.total_results} results for '{query}'...</h3>
                        <span className="flex justify-end justify-items-center items-center">
                            <button disabled={page==1} className={(page==1 ? 'cursor-not-allowed opacity-50' : '')} onClick={prevPage}>&lt;</button>
                                <span className="px-2">{page}/{data.total_pages}</span>
                            <button disabled={page==data.total_pages} className={(page==data.total_pages ? 'cursor-not-allowed opacity-50' : '')} onClick={nextPage}>&gt;</button>
                        </span>
                        <div className="mt-5 grid gap-4 grid-cols-4 grid-rows-5">
                            {data.results.map((flix: any, index: number) => 
                                <div className="text-center cursor-pointer" key={data.results[index].id} style={{ width: posterSize+'px' }}
                                    onClick={() => dispatch(updateModal({open: true, mediaId: flix.id, mediaType: type}))}>
                                    <img className="flex-none" src={configData.images.secure_base_url+'w'+posterSize+data.results[index].poster_path}></img>
                                    <p className="line-clamp-2">{type == "movie" ? flix.title : flix.name}</p>
                                </div>
                            )}
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