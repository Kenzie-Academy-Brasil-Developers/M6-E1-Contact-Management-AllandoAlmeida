import { SignUpForm } from "../components/Form/signUpForm/SignUpForm"

const Register = async () => {
    return(
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <SignUpForm/>
        </main>
    )
}

export default Register