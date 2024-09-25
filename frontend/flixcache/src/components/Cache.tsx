import { Link } from "react-router-dom"
import { useIsLoggedInQuery } from "../services/flixcache"

function Cache() {

    const { data, error, isLoading } = useIsLoggedInQuery(undefined)

    console.log(data)

    const displayNotLoggedInMsg = () => {
        return (
            <>
                <div className="mt-32 text-center text-secondary font-medium">
                    <p className="text-xl">You must be logged in to access your cache.</p>
                    <p>Click <Link to="/log-in" className="font-semibold underline text-secbright">here</Link> to log in.</p>
                </div>
            </>
        )
    }
    return (
        <>
            {(error) ? (
                <>{error.status == 401 ? displayNotLoggedInMsg() : "An error occurred"}</>
                ) : (isLoading) ? (
                <>Loading...</>
                ) : (data) ? (
                    <>
                        
                    </>
            ) : null }
        </>
    )
}

export default Cache