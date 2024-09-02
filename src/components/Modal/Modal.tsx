import { ChangeEvent, useContext, useState } from 'react';
import AppContext, { AppContextValue } from '../../Context/AppContext';
import Loader from '../Loaders/Loader';

const Modal = () => {
    const appContext = useContext<AppContextValue | undefined>(AppContext);
    const [isUpdate, setisUpdate] = useState<boolean>(false);

    if (!appContext) {
        // Handle undefined context scenario appropriately, such as showing an error or returning null
        return null;
    }

    const {
        setselectedImageId,
        selectedImageId,
        selectedImageTitle,
        setselectedImageTitle,
        handleTitleUpdate,
        isLoading,
        handleImageDelete,
    } = appContext;


    function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
        setselectedImageTitle(event.target.value);
    }

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center transition-all duration-150
        bg-black bg-opacity-75 transform scale-100'>
            <div className='bg-white w-11/12 sm:w-[500px] h-80 rounded-lg p-4 sm:p-8 flex justify-between items-center text-white relative'>
                <div onClick={() => { setselectedImageId(selectedImageId) }} className='absolute top-2 right-2 sm:top-4 sm:right-4 h-8 w-8 flex justify-center items-center rounded-full cursor-pointer bg-black'>
                    X
                </div>
                {!isUpdate && !isLoading && (
                    <>
                        <button onClick={() => { setisUpdate(true) }} className='bg-blue-500 font-extrabold h-16 w-48 py-4 px-2 rounded-xl text-sm sm:text-base'>Update Image Title</button>
                        <button onClick={() => { handleImageDelete() }} className='bg-red-500 font-extrabold h-16 w-48 py-4 px-2 rounded-xl text-sm sm:text-base'>Delete Image</button>
                    </>
                )}
                {isUpdate && !isLoading && (
                    <div className='flex w-full flex-col gap-4'>
                        <input onChange={handleInputChange} value={selectedImageTitle || ''} type="text" autoFocus className='w-full h-12 rounded-lg bg-slate-300 text-black px-5 text-sm sm:text-base' />
                        <div className='flex justify-between gap-2'>
                            <button onClick={() => { setisUpdate(false) }} className='bg-gray-700 p-4 w-full hover:bg-gray-900 text-white rounded-md text-sm sm:text-base'>Discard</button>
                            <button onClick={() => { handleTitleUpdate() }} className='bg-blue-500 p-4 w-full hover:bg-blue-700 text-white rounded-md text-sm sm:text-base'>Update</button>
                        </div>
                    </div>
                )}
                {isLoading && (
                    <div className='flex w-full justify-center'>
                        <Loader />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;
