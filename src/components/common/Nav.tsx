
const Nav = ({children}:any) => {
    return (
        <nav className="bg-gray-800">
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <h1 className='text-white text-2xl'>Votez</h1>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">

                    <a href="/" className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Home</a>
                  </div>
                
                </div>
        
              </div>
        {children}
            </div>
          </div>
        
          <div className="sm:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
              <a href="/" className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium">Home</a>
        
            </div>
          </div>
        </nav>
        
    )
}

export default Nav
