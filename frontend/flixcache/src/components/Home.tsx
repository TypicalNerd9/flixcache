import { Link } from "react-router-dom"
import Search from "./Search"

function Home() {
    return (
        <div className="h-screen">
            <div className="text-right text-secondary pt-4 pe-5 text-lg font-semibold">
                <Link to="/log-in" className="hover:text-secbright">Log In</Link>
                <span> / </span>
                <Link to="/sign-up" className="hover:text-secbright">Sign Up</Link>
            </div>
            <div className="flex h-full justify-center items-center">
                <div className="flex flex-col text-center w-screen gap-16 h-2/3">
                    <h1 className="text-center text-7xl text-primary font-bold">FLIX CACHE</h1>
                    <div className="text-center divide-x-4 divide-secondary text-4xl text-secondary font-medium">
                        <Link to="/cache" className="pr-3 hover:text-secbright">Cache</Link>
                        <Link to="/discover" className="pl-3 hover:text-secbright">Discover</Link>
                    </div>
                    <Search/>
                </div>
            </div>
        </div>
    )
}

export default Home