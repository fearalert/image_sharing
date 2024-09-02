import axios from "axios";
import { Dispatch, FC, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";

const AppContext = createContext<AppContextValue | undefined>(undefined);

interface AppContextProps {
    children: ReactNode;
}

interface ImageData {
    _id: string;
    title: string;
    imageUrl: string;
    public_id: string;
}

export interface AppContextValue {
    AllImages: ImageData[];
    setrefresh: Dispatch<SetStateAction<number>>;
    setselectedImageId: Dispatch<SetStateAction<string | null>>;
    selectedImageId: string | null;
    setselectedImageTitle: Dispatch<SetStateAction<string | null>>;
    selectedImageTitle: string | null;
    handleTitleUpdate: () => Promise<void>;
    handleImageDelete: () => Promise<void>;
    setisLoading: Dispatch<SetStateAction<boolean>>;
    isLoading: boolean;
    setcurrIndex: Dispatch<SetStateAction<number | null>>;
    currIndex: number | null;
}

export const AppContextProvider: FC<AppContextProps> = ({ children }) => {
    const [currIndex, setcurrIndex] = useState<number | null>(null);
    const [selectedImageId, setselectedImageId] = useState<string | null>(null);
    const [selectedImageTitle, setselectedImageTitle] = useState<string | null>(null);
    const [refresh, setrefresh] = useState<number>(0);
    const [AllImages, setAllImages] = useState<ImageData[]>([]); // Initialize as an empty array
    const [isLoading, setisLoading] = useState<boolean>(false);

    const baseUrl = "http://localhost:4000";

    const getAllImages = async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/allImages`);
            console.log("Fetched Images Data:", response.data); // Debug: Check the structure
            setAllImages(response.data.Allimages || []); // Extract and set the images array
        } catch (error) {
            console.log("Error fetching images:", error);
        }
    };

    const handleTitleUpdate = async () => {
        try {
            setisLoading(true);
            const payload = { newTitle: selectedImageTitle };
            await axios.put(`${baseUrl}/api/image/${selectedImageId}`, payload);
            setselectedImageId(null);
            setselectedImageTitle(null);
            await getAllImages();
            setisLoading(false);
        } catch (error) {
            setisLoading(false);
            console.log("Error updating title:", error);
        }
    };

    const handleImageDelete = async () => {
        try {
            setisLoading(true);
            await axios.delete(`${baseUrl}/api/image/${selectedImageId}`);
            setAllImages(prev => prev.filter(img => img._id !== selectedImageId)); // Update locally
            setselectedImageId(null);
            setselectedImageTitle(null);
            setisLoading(false);
        } catch (error) {
            setisLoading(false);
            console.log("Error deleting image:", error);
        }
    };

    useEffect(() => {
        getAllImages(); // Initial fetch
    }, []);

    useEffect(() => {
        if (refresh > 0) getAllImages(); // Re-fetch on refresh
    }, [refresh]);

    return (
        <AppContext.Provider value={{
            AllImages, setrefresh,
            setselectedImageId, selectedImageId, setselectedImageTitle,
            selectedImageTitle, handleTitleUpdate, handleImageDelete,
            isLoading, setisLoading, setcurrIndex, currIndex
        }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;
