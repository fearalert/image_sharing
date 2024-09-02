import { useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {

    const location = useLocation()
    const navigate = useNavigate()

    return (
        <div className='flex justify-center gap-4 
        sm:gap-8 h-16 items-center text-white
         bg-black p-2 sm:p-4'>

            <div onClick={() => {
                navigate("/")
            }} className={`transition-all cursor-pointer hover:font-bold ${location.pathname === "/" ? "font-bold" : ""}`}>
                All Images
            </div>

            <div onClick={() => {
                navigate("/upload")
            }} className={`transition-all cursor-pointer hover:font-bold ${location.pathname === "/upload" ? "font-bold" : ""}`}>
                Upload Image
            </div>

        </div>
    )
}

export default Navbar
