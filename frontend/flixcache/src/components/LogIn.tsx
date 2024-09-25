import { Link } from "react-router-dom"
import { useLoginUserMutation } from "../services/flixcache"

function LogIn() {

    const [loginUser] = useLoginUserMutation()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget
        const formElements = form.elements as typeof form.elements & {
            username: HTMLInputElement,
            password: HTMLInputElement,
        }

        loginUser({username: formElements.username.value, password: formElements.password.value}).unwrap()
            .then(
                fulfilled => console.log(fulfilled)
            )
            .catch(
                rejected => console.error(rejected)
            )

        return true

    }
    return (
        <>
            <div className="flex justify-center items-center mt-10">
                <form className="p-8 flex flex-col gap-4 text-start text-secondary w-80" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="font-semibold">Username/Email</label><br/>
                        <input type="text" id="username" className="w-full h-8 align-middle pb-0.5 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"/>
                    </div>
                    <div>
                        <label htmlFor="password" className="font-semibold">Password</label><br/>
                        <input type="password" id="password" className="w-full h-8 align-middle pb-0.5 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"/>
                    </div>
                    <button type="submit" className="bg-primary hover:bg-pribright text-bg font-medium rounded-lg text-xl pb-1 mt-5">Log In</button>
                    <p>Don't have an account yet? <Link to="/sign-up" className="font-medium underline text-secbright">Sign Up</Link></p>
                </form>
            </div>
        </>
    )
}

export default LogIn