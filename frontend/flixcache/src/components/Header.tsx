import { Link } from "react-router-dom"
import { useLogoutUserMutation } from "../services/flixcache"

function Header() {

    const [logoutUser] = useLogoutUserMutation()

    return(
        <>
        <header>
            <nav>
                <div className="flex flex-wrap items-center justify-between mx-auto p-4">
                    <div>
                        <a></a>
                    </div>
                    <Link to="/">Discover</Link>
                    <Link to="/cache">Cache</Link>
                    <Link to="/log-in">Log In</Link>
                    <Link to="/sign-up">Sign Up</Link>
                    <Link to="/" onClick={() => logoutUser(undefined)}>Log Out</Link>
                </div>
            </nav>
        </header>
        </>
    )

}

export default Header