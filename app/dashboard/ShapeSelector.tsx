'use client';
import Image from 'next/image';
import Link from 'next/link';
import {useCollection} from 'react-firebase-hooks/firestore';
import {db} from '@/utils/firebase';
import { collection, query } from 'firebase/firestore';

const ShapeSelector: React.FC = () => {
	const [value, loading, error] = useCollection(collection(db, 'part_templates'));

	return (
		<div className='justify-center items-center'>
			{error && <strong>Error: {JSON.stringify(error)}</strong>}
			{loading && <span>Collection: Loading...</span>}
			<h3 className='mb-2'>Select Part Template</h3>
			<div className='flex justify-center items-center'>
				{value && value.docs.map((document, index) => (
					<div className="m-1" key={index}>					
						<Link href={`/dashboard/${document.id}`} passHref>
						<p>{document.data().name}</p>
						<Image src={document.data().image_url} alt={`Image ${index}`} width={256} height={256}/>
						</Link>
					</div>
				))}
				<h4>More parts coming soon!</h4>
			</div>
		</div>
	);
};

export default ShapeSelector;