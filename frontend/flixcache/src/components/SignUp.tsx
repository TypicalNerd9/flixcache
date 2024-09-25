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
            <div className="flex justify-center items-center mt-10">
                <form className="p-8 flex flex-col gap-4 text-start text-secondary w-80"
                    onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="font-semibold">Username</label><br/>
                        <input type="text" id="username" className="w-full h-8 align-middle pb-0.5 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"/>
                    </div>
                    <div>
                        <label htmlFor="email" className="font-semibold">Email</label><br/>
                        <input type="text" id="email" className="w-full h-8 align-middle pb-0.5 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"/>
                    </div>
                    <div>
                        <label htmlFor="password" className="font-semibold">Password</label><br/>
                        <input type="password" id="password" className="w-full h-8 align-middle pb-0.5 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"/>
                    </div>
                    <div>
                        <label htmlFor="password2" className="font-semibold">Re-enter Password</label><br/>
                        <input type="password" id="password2" className="w-full h-8 align-middle pb-0.5 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"/>
                    </div>
                    <button type="submit" className="bg-primary hover:bg-pribright text-bg font-medium rounded-lg text-xl pb-1 mt-5">Sign Up</button>
                </form>
            </div>
        </>
    )
}

export default SignUp