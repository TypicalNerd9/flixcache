import { useSearchParams } from "react-router-dom"
import { useGetConfigQuery, useGetSearchQuery } from "../../services/flixcache";
import Search from "../../components/Search";

function FlixSearch() {
    const [searchParams, setSearchParams] = useSearchParams()

    const query = searchParams.get("query")
    const pageParam = searchParams.get("page")

    if (query != null) {
        const page = pageParam != null ?  (Number.isInteger(+pageParam) ? +pageParam : 1) : 1
        const { data, error, isLoading } = useGetSearchQuery({type: 'movies', query: query, page: 1})
        const { data: configData, error: configError, isLoading: configIsLoading } = useGetConfigQuery(undefined)
        
        const posterSize: string = configIsLoading ? "" : configData.images.poster_sizes[1].slice(1)
        const type: string = "movies"

        console.log(data)
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
                        <span className="flex justify-end justify-items-center items-center"><button>&lt;</button><span className="px-2">{page}/{data.total_pages}</span><button>&gt;</button></span>
                        <div className="mt-5 grid gap-4 grid-cols-4 grid-rows-5">
                            {data.results.map((flix: any, index: number) => 
                                <div className="text-center" key={data.results[index].id} style={{ width: posterSize+'px' }}>
                                    <img className="flex-none" src={configData.images.secure_base_url+'w'+posterSize+data.results[index].poster_path}></img>
                                    <p className="line-clamp-2">{type == "movies" ? flix.title : flix.name}</p>
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