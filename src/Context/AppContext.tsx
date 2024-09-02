import axios from "axios";
import { Dispatch, FC, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";

const AppContext = createContext<AppContextValue | undefined>(undefined);

interface AppContextProps {
    children: ReactNode
}

interface ImageData {
    _id: string
    title: string
    imageUrl: string
    public_id: string
}

export interface AppContextValue {
    AllImages: ImageData[] | undefined
    setrefresh: Dispatch<SetStateAction<number>>
    setselectedImageId: Dispatch<SetStateAction<string | null>>
    selectedImageId: string | null
    setselectedImageTitle: Dispatch<SetStateAction<string | null>>
    selectedImageTitle: string | null
    handleTitleUpdate: () => Promise<void>
    handleImageDelete: () => Promise<void>
    setisLoading: Dispatch<SetStateAction<boolean>>
    isLoading: boolean
    setcurrIndex: Dispatch<SetStateAction<number | null>>
    currIndex: number | null
}

export const AppContextProvider: FC<AppContextProps> = ({ children }) => {

    const [currIndex, setcurrIndex] = useState<number | null>(null)

    const [selectedImageId, setselectedImageId] = useState<string | null>(null)

    const [selectedImageTitle, setselectedImageTitle] = useState<string | null>(null)

    const [refresh, setrefresh] = useState<number>(0)

    const [AllImages, setAllImages] = useState<ImageData[] | undefined>(undefined)

    const [isLoading, setisLoading] = useState<boolean>(false)


    const getAllImages = async () => {
        try {
            const response = await axios.get("https://image-sharing-222.vercel.app/api/allImages")
            setAllImages(response.data)
            console.log(response.data);

        } catch (error) {
            console.log(error);
        }
    }

    const handleTitleUpdate = async () => {
        try {

            setisLoading(true)

            const payload = {
                "newTitle": selectedImageTitle
            }

            await axios.put(`https://image-sharing-222.vercel.app/api/image/${selectedImageId}`, payload)

            setselectedImageId(null)
            setselectedImageTitle(null)

            await getAllImages()
            setisLoading(false)

        } catch (error) {
            setisLoading(false)
            console.log(error);

        }
    }

    const handleImageDelete = async () => {
        try {
            setisLoading(true)

            await axios.delete(`https://image-sharing-222.vercel.app/api/image/${selectedImageId}`)


            const images = AllImages?.filter((img) => {
                return img._id != selectedImageId
            })

            setAllImages(images)
            setselectedImageId(null)
            setselectedImageTitle(null)

            setisLoading(false)

        } catch (error) {
            setisLoading(false)
            console.log(error);
        }
    }


    useEffect(() => {
        console.log("hello");

        getAllImages()
    }, [])

    useEffect(() => {

        getAllImages()
    }, [refresh])

    return (
        <AppContext.Provider value={{
            AllImages, setrefresh,
            setselectedImageId, selectedImageId, setselectedImageTitle,
            selectedImageTitle, handleTitleUpdate, handleImageDelete,
            isLoading, setisLoading, setcurrIndex, currIndex
        }}>
            {children}
        </AppContext.Provider>
    )

}


export default AppContext