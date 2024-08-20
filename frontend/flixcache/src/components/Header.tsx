import { Link } from "react-router-dom"

function Header() {

    return(
        <>
        <header>
            <nav>
                <div className="flex flex-wrap items-center justify-between mx-auto p-4">
                    <div>
                        <a></a>
                    </div>
                    <Link to="/discover">Discover</Link>
                    <Link to="/cache">Cache</Link>
                    <Link to="/log-in">Log In</Link>
                    <Link to="/sign-up">Sign Up</Link>
                </div>
            </nav>
        </header>
        </>
    )

}

export default Header