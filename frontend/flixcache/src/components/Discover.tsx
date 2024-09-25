import { useState } from "react"
import DetailsModal from "../features/modal/DetailsModal"
import TrendingMovies from "../features/trending/TrendingMovies"
import { useAppSelector } from "../reduxHooks"
import FlixTypeSelector from "./FlixTypeSelector"

function Discover() {
    const [type, setType] = useState("movie")
    const open: boolean = useAppSelector((state) => state.detailsModal.open)
    return (
        <>
            <div className="flex justify-center mt-6">
                <FlixTypeSelector type={type} setType={setType}/>
            </div>
            <TrendingMovies type={type}/>
            {open && <DetailsModal/>}
        </>
    )
}

export default Discover