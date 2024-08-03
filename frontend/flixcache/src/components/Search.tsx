import { useAppDispatch, useAppSelector } from "../reduxHooks"
import { setQuery } from "../features/search/searchSlice"
import { useNavigate } from "react-router-dom"

function Search() {
    const { query } = useAppSelector((state) => state.search)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const searchWithQuery = () => 
        navigate({
            pathname: '/search',
            search: `?query=${query}&page=1`
        })

    return(
        <>
            <span className="flex flex-row justify-center">
                <input
                    className="ps-6 basis-4/5 rounded-l-full"
                    type="text"
                    placeholder="Search for a movie or tv show..."
                    onChange={(e) => dispatch(setQuery(e.target.value))}/>
                <button
                    className="rounded-r-full pe-6"
                    onClick={searchWithQuery}>
                    Search
                </button>
            </span>
        </>
    )    
}

export default Search