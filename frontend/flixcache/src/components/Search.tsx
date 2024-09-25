import { useAppDispatch, useAppSelector } from "../reduxHooks"
import { setQuery } from "../features/search/searchSlice"
import { useNavigate } from "react-router-dom"
import React from "react"

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
            <div className="">
                <span className="flex flex-row justify-center h-12">
                    <input
                        className="ps-6 basis-4/5 rounded-l-full focus:outline-none focus:ring-0 focus:ring-2 focus:ring-inset focus:ring-secondary"
                        type="text"
                        placeholder="Search for a movie or tv show..."
                        onChange={(e) => dispatch(setQuery(e.target.value))}
                        onKeyDown={(e) => e.key === 'Enter' ? searchWithQuery() : null}/>
                    <button
                        className="rounded-r-full px-5 bg-primary hover:bg-pribright text-bg font-medium text-lg"
                        onClick={searchWithQuery}>
                        Search
                    </button>
                </span>
            </div>
        </>
    )    
}

export default Search