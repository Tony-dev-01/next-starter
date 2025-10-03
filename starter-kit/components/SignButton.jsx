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
        <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link className="justify-between" href={'/dashboard'}>
            Dashboard
          </Link>
        </li>
        <li><a>Settings</a></li>
        <li><button className="btn bg-red-400" onClick={handleSignOut}>Sign out</button></li>
      </ul>
    </div>
        
        }
        </div>
    )   
}