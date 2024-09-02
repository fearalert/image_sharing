import axios from 'axios'
import { ChangeEvent, FormEvent, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from './Loader'
import AppContext, { AppContextValue } from '../Context/AppContext'
import convertToBase64 from '../utils/ConvertTobase64'

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

    async function handleUploadImage(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault()
        try {
            if (!file) return

            setloading(true)

            const payload = {
                title: title,
                image: file
            }

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



