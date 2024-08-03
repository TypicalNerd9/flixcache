
import { RootState } from "../../state/store";
import { useEffect } from "react"
import axios from 'axios'
import { useAppDispatch, useAppSelector } from "../../reduxHooks";
import { useGetConfigQuery, useGetTrendingQuery } from "../../services/flixcache";

function TrendingMovies() {

    const trending = useAppSelector((state) => state.trending.flixList)
    const dispatch = useAppDispatch()

    const { data, error, isLoading } = useGetTrendingQuery({type: 'shows', timeframe: 'week'})
    const { data: configData, error: configError, isLoading: configIsLoading } = useGetConfigQuery(undefined)
    console.log(data)
    console.log(configData)

    const posterSize: string = configIsLoading ? "" : configData.images.poster_sizes[1].slice(1)

    const postersDisplayed: number = 6;
    return(
        <>
        <h1 className="text-start ps-4">Trending</h1>
            {(error || configError) ? (
                <>An error occurred</>
            ) : (isLoading || configIsLoading) ? (
                <>Loading...</>
            ) : (data && configData) ? (
                <div style={{ maxWidth: (Number(posterSize)*postersDisplayed) + (16*(postersDisplayed-1))+'px'}}>
                    <ul  className="flex flex-row gap-x-4 overflow-x-scroll snap-x">
                        {data.results.map((flix: any, index: number) => 
                            <li style={{ minWidth: posterSize+'px' }} className={`basis-[${posterSize}px] snap-start my-8 text-wrap ${(index%2==0) ? 'translate-y-4' : '-translate-y-4'}`} key={data.results[index].id}>
                                <img className="flex-none" src={configData.images.secure_base_url+'w'+posterSize+data.results[index].poster_path}></img>
                                <p className="">{flix.media_type == "movie" ? flix.title : flix.name}</p>
                            </li>
                        )}
                    </ul>
                </div>
            ) : null }
        </>
    )
}

export default TrendingMovies