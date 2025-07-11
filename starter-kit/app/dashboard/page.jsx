"use client"
import { useRouter } from "next/navigation";
import { authClient } from "../../lib/auth-client";


export default function Dashboard () {
    const {data:session} = authClient.useSession();
    const router = useRouter();

    console.log(session)

    const handleSignOut = async () => {
        console.log('Signing out...');
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                router.push("/"); // redirect to login page
                },
            },
        });
    }

    const handleSignIn = async () => {
        await authClient.signIn.social({
            provider: "github", 
        })
    }

    return(
        <>
        <h1>Dashboard</h1>
        <p>Welcome, {session?.user.name}</p>
        {session ?
        <button className="btn btn-primary" onClick={handleSignOut}>Sign out</button> : <button className="btn btn-primary" onClick={handleSignIn}>Sign out</button>}
        </>
    )
}