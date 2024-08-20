import { useCreateUserMutation } from "../services/flixcache"

function SignUp() {

    const [createUser] = useCreateUserMutation()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget
        const formElements = form.elements as typeof form.elements & {
            username: HTMLInputElement,
            email: HTMLInputElement,
            password: HTMLInputElement,
            password2: HTMLInputElement,
        }
        if (formElements.password.value != formElements.password2.value) {

            return false
        }
        const emailRegExp = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        if (!emailRegExp.test(formElements.email.value)) {
            return false
        }

        createUser({username: formElements.username.value, email: formElements.email.value, password: formElements.password.value}).unwrap()
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
                <form className="p-8 flex flex-col gap-4 text-start"
                    onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Username</label><br/>
                        <input type="text" id="username"/>
                    </div>
                    <div>
                        <label htmlFor="email">Email</label><br/>
                        <input type="text" id="email"/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label><br/>
                        <input type="password" id="password"/>
                    </div>
                    <div>
                        <label htmlFor="password2">Re-enter Password</label><br/>
                        <input type="password" id="password2"/>
                    </div>
                    <button type="submit" className="w-[60%] mx-auto">Sign Up</button>
                </form>
            </div>
        </>
    )
}

export default SignUp