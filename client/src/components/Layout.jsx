import { Outlet } from "react-router-dom";
import Navbar from './Navbar';
const Layout = () => {
    return (
        <div className="app m-0 bg-black">
            <nav className="navBar sticky top-0 z-20 bg-black flex justify-center items-center">
                <Navbar />
            </nav>
            <main className="main relative">
                <Outlet />
            </main>
            <footer className="footer">
                {/* contain footer component e.g. copy right mark, links to different general sections (news, list of currency pairs, trading journal) */}
            </footer>
        </div>
    )
}

export default Layout