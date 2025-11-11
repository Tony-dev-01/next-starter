import Sidebar from "../../../components/dashboard/Sidebar";

export default async function Layout({children}) {
    return(
    <div className="drawer lg:drawer-open">
      <input id="drawer-toggle" type="checkbox" className="drawer-toggle" />
      
      {/* Page content */}
      <div className="drawer-content flex flex-col">
        {/* Mobile header with hamburger */}
        <div className="navbar lg:hidden bg-base-100 border-b border-base-300">
          <div className="navbar-start">
            <label htmlFor="drawer-toggle" className="btn btn-square btn-ghost">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
          </div>
          <div className="navbar-center">
            <span className="text-xl font-semibold">Dashboard</span>
          </div>
        </div>
        
        {/* Main content */}
        <main className="flex-1 p-6 bg-base-200">
          {children}
        </main>
      </div>
      
      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="drawer-toggle" className="drawer-overlay"></label>
        <Sidebar />
      </div>
    </div>
    )
}