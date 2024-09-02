import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'

function Layout() {
    return (
        <div className='relative h-screen overflow-hidden'>
            <Navbar />
            <Outlet />
        </div>
    )
}

export default Layout