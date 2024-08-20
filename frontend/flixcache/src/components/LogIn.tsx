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
            <div className="flex justify-center items-center">
                <form className="p-8 flex flex-col gap-4 text-start" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Username/Email</label><br/>
                        <input type="text" id="username"/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label><br/>
                        <input type="password" id="password"/>
                    </div>
                    <button type="submit" className="w-[60%] mx-auto">Log In</button>
                </form>
            </div>
        </>
    )
}

export default LogIn