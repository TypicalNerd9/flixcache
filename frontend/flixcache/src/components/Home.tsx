import TrendingMovies from "../features/trending/TrendingMovies"
import DetailsModal from "../features/modal/DetailsModal"
import DiscoverHeader from "./DiscoverHeader"
import Search from "./Search"
import { useAppSelector } from "../reduxHooks"

function Home() {
    const open: boolean = useAppSelector((state) => state.detailsModal.open)
    return (
        <>
            <Search/>
            <DiscoverHeader/>
            <TrendingMovies/>
            {open && <DetailsModal/>}
        </>
    )
}

export default Home