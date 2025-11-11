"use client"
import WithAuth from "../../../components/auth/WithAuth";
import DashboardContent from "../../../components/dashboard/DashboardContent";

function DashboardPage() {
    return (
       
        <DashboardContent />
        
    );
}

export default function Dashboard() {
    return (
        <WithAuth>
            <DashboardPage />
        </WithAuth>
    );
}