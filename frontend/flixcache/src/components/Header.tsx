import { Link, useNavigate } from "react-router-dom"
import { useIsLoggedInQuery, useLogoutUserMutation } from "../services/flixcache"
import Search from "./Search"

function Header() {

    const { data, error, isLoading } = useIsLoggedInQuery(undefined)
    const [logoutUser] = useLogoutUserMutation()
    const navigate = useNavigate()

    return(
        <>
            <nav>
                <div className="left-0 top-0 flex flex-wrap items-center justify-between mx-auto p-4 bg-headerbg text-secondary drop-shadow-lg">
                    <div>
                        <a></a>
                    </div>
                    <Link to="/cache" className="text-lg font-semibold hover:text-secbright">Cache</Link>
                    <Link to="/discover" className="text-lg font-semibold hover:text-secbright">Discover</Link>
                    <span className="basis-6/12"><Search/></span>
                    <div className="text-secondary me-5 text-lg font-semibold">
                        {
                            error && error.status == 401 ?
                        (<>
                            <Link to="/log-in" className="hover:text-secbright">Log In</Link>
                            <span> / </span>
                            <Link to="/sign-up" className="hover:text-secbright">Sign Up</Link>
                        </>) :
                        (<>
                            <button onClick={() => {logoutUser(undefined); navigate("/"); navigate(0)}}>Log Out</button>
                        </>)
                        }
                    </div>
                    {/* <Link to="/" onClick={() => logoutUser(undefined)}>Log Out</Link> */}
                </div>
            </nav>
        </>
    )

}

export default Header