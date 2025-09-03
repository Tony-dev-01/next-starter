"use client"
import { useRouter } from "next/navigation";
import { useAuth } from "../providers/AuthProvider";
import WithAuth from "../../components/auth/WithAuth";

function DashboardContent() {
    const { session, signOut } = useAuth();
    const router = useRouter();

    const handleSignOut = async () => {
        console.log('Signing out...');
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/"); // redirect to login page
                },
            },
        });
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Welcome back!</h2>
                    <p>Hello, {session?.user?.name || session?.user?.email}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary" onClick={handleSignOut}>
                            Sign out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Dashboard() {
    return (
        <WithAuth>
            <DashboardContent />
        </WithAuth>
    );
}