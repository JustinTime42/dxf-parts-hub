'use client';
import {useCollection} from 'react-firebase-hooks/firestore';
import {db} from '@/utils/firebase';
import { collection } from 'firebase/firestore';
import ShapeCard from './ShapeCard';

const ShapeSelector: React.FC = () => {
	const [value, loading, error] = useCollection(collection(db, 'part_templates'));
	
	return (
		<div className='justify-center items-center'>
			{error && <strong>Error: {JSON.stringify(error)}</strong>}
			{loading && <span>Collection: Loading...</span>}
			<h3 className='mb-2'>Select Part Template</h3>
			<div>
				{value && value.docs.map((document, index) => {
					return (
						<ShapeCard 
							key={index}
							name={document.data().label} 
							description={document.data().description} 
							imageUrl={document.data().image_url} 
							id={document.id}
						/>
					)
				})}
				<h4 className='ml-3'>More parts coming soon!</h4>
			</div>
		</div>
	);
};

export default ShapeSelector;