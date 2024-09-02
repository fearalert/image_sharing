import { LazyLoadImage } from 'react-lazy-load-image-component';
import { SlOptionsVertical } from "react-icons/sl";
import { FC, useContext } from 'react';
import AppContext, { AppContextValue } from '../Context/AppContext';
import Modal from './Modal';
import ImageModal from './ImageModal';
import SkeletonLoader from './SkeletonLoader';

const ImageCard: FC = () => {
    const context = useContext<AppContextValue | undefined>(AppContext);

    // Check if context is defined and AllImages is an array
    const images = Array.isArray(context?.AllImages) ? context.AllImages : [];

    return (
        <div className='h-[90vh] flex flex-wrap content-start overflow-y-scroll gap-14 p-4 sm:gap-x-6'>
            {images.length > 0 ? images.map((item, index) => (
                <div className='w-full h-fit sm:w-[28rem] relative hover:cursor-pointer' key={index}>
                    <div onClick={() => { context?.setcurrIndex(index); }} className='overflow-hidden rounded-t-lg'>
                        <LazyLoadImage 
                            className='aspect-video w-full hover:scale-110 hover:rotate-2 transition-transform duration-300' 
                            src={item.imageUrl} 
                            alt="img" 
                        />
                    </div>
                    <div className='flex justify-between items-start absolute w-full'>
                        <div className='bg-white shadow-lg py-2 flex items-center justify-between w-full transition-colors px-2 hover:bg-slate-400'>
                            <div className='text-sm max-w-[20rem] overflow-hidden whitespace-nowrap text-ellipsis'>
                                {item.title || "No Title"}
                            </div>
                            <button onClick={() => {
                                context?.setselectedImageId(item._id);
                                context?.setselectedImageTitle(item.title);
                            }} className='text-2xl font-bold'>
                                <SlOptionsVertical />
                            </button>
                        </div>
                    </div>
                </div>
            )) : <SkeletonLoader />}
            {context?.selectedImageId && <Modal />}
            {context?.currIndex != null && <ImageModal />}
        </div>
    );
};

export default ImageCard;
