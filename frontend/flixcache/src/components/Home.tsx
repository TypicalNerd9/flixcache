import TrendingMovies from "../features/trending/TrendingMovies"
import DiscoverHeader from "./DiscoverHeader"
import Search from "./Search"

function Home() {
    
    return (
        <>
            <Search/>
            <DiscoverHeader/>
            <TrendingMovies/>
        </>
    )
}

export default Home