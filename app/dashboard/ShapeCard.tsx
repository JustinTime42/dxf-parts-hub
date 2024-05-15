'use client';
import Image from 'next/image';
import Link from 'next/link';
import {storage} from '@/utils/firebase';
import { ref, getDownloadURL  } from "firebase/storage";
import { useEffect, useState } from 'react';
import { downloadImage } from '../api/getImages';

const ShapeCard = ({name, imageUrl, id, description}: {name: string, imageUrl: string, id: string, description: string}) => {
	// const [value,     loading, error] = useDownloadURL(storageRef(storage, "gs://dxf-parts-hu.appspot.com/template_images/gasket-template.png"));    
    const [value, setValue] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    // useEffect(() => {
    //     setLoading(true);
    //     // For some reason, download from google is not working. 
    //     // TODO fix it!
    //     downloadImage("template_images/gasket-template.png").then((url) => {
    //         setValue(url);
    //         setLoading(false);
    //     }).catch((err) => {
    //         setError(err);
    //         setLoading(false);
    //     }).finally(() => {
    //         setLoading(false);
    //     });
    // }, [imageUrl]);

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    // if (error || !value) {
    //     console.error('Failed to load image or URL is undefined.');
    //     return <div>Error loading image.</div>;
    // }
	return (
		<div className="m-3">
			<Link href={`/dashboard/${id}`} passHref>
				<div>
					{/* <Image src={value} alt={description} width={256} height={256}/> */}
					<h3>{name}</h3>
				</div>
			</Link>
		</div>
	);
}

export default ShapeCard;
