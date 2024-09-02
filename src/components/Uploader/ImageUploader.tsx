import axios from 'axios'
import { ChangeEvent, FormEvent, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from '../Loaders/Loader'
import AppContext, { AppContextValue } from '../../Context/AppContext'
import convertToBase64 from '../../utils/ConvertTobase64'

const ImageUploader = () => {

    const context = useContext<AppContextValue | undefined>(AppContext)

    const navigate = useNavigate()

    const [file, setfile] = useState<string>("")
    const [title, settitle] = useState<string>("")
    const [key, setkey] = useState<number>(0)
    const [loading, setloading] = useState<boolean>(false)

    async function handleFileChange(event: ChangeEvent<HTMLInputElement>): Promise<void> {

        if (event.target.files && event.target.files[0]) {
            const base64 = await convertToBase64(event.target.files[0])

            console.log(base64);

            setfile(base64 as string)
        }
    }

    function handleTitleChange(event: ChangeEvent<HTMLInputElement>): void {
        settitle(event.target.value)
    }

    function handleDiscard(e: FormEvent<HTMLButtonElement>): void {

        e.preventDefault()

        setfile("")
        settitle("")
        setkey(prevKey => prevKey + 1)

    }

    // async function handleUploadImage(event: FormEvent<HTMLFormElement>): Promise<void> {
    //     event.preventDefault();
        
    //     if (!file) return;
    
    //     setloading(true);
    
    //     try {
    //         const formData = new FormData();
    //         formData.append('title', title);
    //         formData.append('image', file);

    //         console.log("Form Data", formData)
            
            
    //         // Use the appropriate endpoint URL for production or development
    //         const response = await axios.post("http://localhost:4000/api/upload", formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //         });
    
    //         console.log('Upload successful:', response.data);
            
    //         // Clear form states and update key
    //         setfile("");  // Use null if file is not an empty string
    //         settitle("");
    //         setkey(prevKey => prevKey + 1);
    //         context?.setrefresh(prevKey => prevKey + 1);
    
    //         navigate("/");
            
    //     } catch (error) {
    //         console.error('Error uploading image:', error);
    //     } finally {
    //         setloading(false);
    //     }
    // }
    
    async function handleUploadImage(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault()
        try {
            if (!file) return

            setloading(true)

            const payload = {
                title: title,
                image: file
            }

            console.log("Payload", payload)

            // await axios.post("https://image-sharing-222.vercel.app/api/upload", payload)
            await axios.post("http://localhost:4000/api/upload", payload)

            setfile("")
            settitle("")
            setkey(prevKey => prevKey + 1)
            context?.setrefresh(prevKey => prevKey + 1)
            setloading(false)
            navigate("/")

        } catch (error) {
            setloading(false)
            console.log(error);

        }
    }

    return (
        <div className='flex items-center justify-center h-full absolute w-full right-0 p-4 sm:p-8'>
            <div className='bg-white p-6 w-full sm-w-[600px] rounded-lg shadow-lg'>
                <h2 className='text-xl font-semibold mb-4'>Upload Image</h2>
                <form onSubmit={handleUploadImage} className='space-y-4 flex flex-col'>
                    <input key={key} onChange={handleFileChange} type="file" className='border-gray-300 border p-2 rounded-md' />
                    <input value={title} onChange={handleTitleChange} type="text" placeholder='Image Title' className='border-gray-300 border p-2 rounded-md' />
                    {!loading ? <div className='flex justify-end gap-2'>
                        <button onClick={handleDiscard} className='bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded-md' >Discard</button>
                        <button disabled={!file} className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md disabled:opacity-70' >Upload</button>
                    </div> :
                        <Loader />}
                </form>
            </div>
        </div>
    )
}

export default ImageUploader



