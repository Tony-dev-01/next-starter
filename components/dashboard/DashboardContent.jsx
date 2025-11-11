"use client"
import { useAuth } from "../../app/[lang]/providers/AuthProvider";
import { signOut } from "../../lib/auth-client";

export default function DashboardContent() {
  const { session, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-base-content">
            Good morning, {session?.user?.name?.split(' ')[0] || 'User'}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="btn btn-sm btn-neutral">Create new project +</button>
          <button className="btn btn-sm btn-neutral">Add expenses +</button>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-8 rounded-full bg-neutral text-neutral-content flex items-center justify-center">
                <span className="text-sm font-bold">
                  {session?.user?.name?.[0] || session?.user?.email?.[0] || 'U'}
                </span>
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52">
              <li><button onClick={handleSignOut}>Sign out</button></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:h-screen">
        {/* Left Column - Large Tile */}
        <div className="lg:col-span-2 ">
          <div className="card bg-base-100 shadow-lg h-100">
            <div className="card-body">
              <h2 className="card-title">Ongoing projects</h2>
              <p>Sample content for main tile.</p>
            </div>
          </div>
        </div>

        {/* Right Column - Smaller Tiles */}
        <div className="space-y-6">
          {/* Top Right Tile */}
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h3 className="card-title text-lg">Weekly expenses</h3>
              <p>Sample content for first tile.</p>
            </div>
          </div>

          {/* Middle Right Tile */}
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h3 className="card-title text-lg">Tile 2</h3>
              <p>Sample content for second tile.</p>
            </div>
          </div>
        </div>

        {/* Left Column - Large Tile */}
        <div className="lg:col-span-3 h-100">
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title">Recent activities</h2>
              <p>Sample content for main tile.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}