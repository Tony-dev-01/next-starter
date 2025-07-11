"use client"
import Link from "next/link";
import { authClient } from "../lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignButton () {
    const {data:session} = authClient.useSession();
    const router = useRouter();

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

    return(
        <div>
        {!session?.session ? 
        <Link className="btn" href={'/sign-in'}>Login</Link> :
        <button className="btn" onClick={handleSignOut}>Logout</button>
        }
        </div>
    )   
}