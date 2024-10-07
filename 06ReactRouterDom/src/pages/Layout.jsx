import { Outlet, Link } from "react-router-dom";

// Header Component
const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold">My Application</h1>
      </div>
    </header>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 My Application. All rights reserved.</p>
      </div>
    </footer>
  );
};

// Sidebar Component
const Sidebar = () => {
  return (
    <nav className="w-64 bg-gray-200 p-6 h-full">
      <ul className="space-y-4">
        <li>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/blogs" className="text-blue-600 hover:text-blue-800">
            Blogs
          </Link>
        </li>
        <li>
          <Link to="/calendermaster" className="text-blue-600 hover:text-blue-800">
            CalenderMaster
          </Link>
        </li>
        <li>
          <Link to="/appversion" className="text-blue-600 hover:text-blue-800">
            AppVersion
          </Link>
        </li>
        <li>
          <Link to="/DataContent" className="text-blue-600 hover:text-blue-800">
            DataContent
          </Link>
        </li>
        <li>
          <Link to="/MediaContent" className="text-blue-600 hover:text-blue-800">
            MediaContent
          </Link>
        </li>
      </ul>
    </nav>
  );
};

// Layout Component with Sidebar
const Layout = () => {
  return (
    <>
      <Header />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>

      <Footer />
    </>
  );
};

export default Layout;
