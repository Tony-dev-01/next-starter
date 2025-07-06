import Link from "next/link";

export default function SignButton () {
    const {session} = useSession();

    return(
        <Link className="btn" href={'/login'}>{session ? "Logout" : "Login"}</Link>
    )   
}