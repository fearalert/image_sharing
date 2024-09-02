import { useContext } from 'react'

import { GrNext, GrPrevious } from "react-icons/gr"
import AppContext, { AppContextValue } from '../Context/AppContext'
import { LazyLoadImage } from 'react-lazy-load-image-component';


const ImageModal = () => {

    const context = useContext<AppContextValue | undefined>(AppContext)
    const handleNext = () => {
        context?.setcurrIndex((context.currIndex! + 1) % context?.AllImages!.length)
    }
    const handlePrevious = () => {
        context?.setcurrIndex((context.currIndex! - 1 + context?.AllImages!.length) % context?.AllImages!.length)
    }

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75'>

            <div className='bg-white w-[90vw] sm:w-4/6 rounded-lg p-4 sm:p-8 flex 
            flex-col text-black relative'>

                <div onClick={() => { context?.setcurrIndex(null) }} className='absolute top-2 sm:top-4 right-2 sm:right-4 h-8 w-8 flex flex-col justify-center items-center
                rounded-full cursor-pointer bg-black text-white'>
                    X
                </div>

                <div onClick={handleNext} className='absolute shadow-2xl cursor-pointer top-1/2 right-10 bg-white rounded-full p-2 sm:p-5 transform -translate-y-1/2'>
                    <GrNext />
                </div>

                <div onClick={handlePrevious} className='absolute shadow-2xl cursor-pointer top-1/2 left-10 bg-white rounded-full p-2 sm:p-5 transform -translate-y-1/2'>
                    <GrPrevious />
                </div>

                {context?.AllImages && <>
                    <LazyLoadImage className='aspect-video w-full rounded-2xl' src={context.AllImages[context.currIndex!].imageUrl} alt='Image' />
                    <p className='text-black mt-2 text-sm sm:text-base'>{context.AllImages[context.currIndex!].title || "No Title"}</p>
                </>}
            </div>
        </div>
    )
}

export default ImageModal
