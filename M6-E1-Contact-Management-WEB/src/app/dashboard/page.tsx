import { SignUpForm } from "../../components/forms/signUpForm/SignUpForm"


const Dashboard = async () => {
    return(
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <SignUpForm/>
        </main>
    )
}

export default Dashboard