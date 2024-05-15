import {storage} from '@/utils/firebase';
import { ref, getDownloadURL  } from "firebase/storage";

export const downloadImage = async (path: string) => {
    const url = await getDownloadURL(ref(storage, path));
    return url;
}
