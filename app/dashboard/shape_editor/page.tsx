import React from 'react';
import Image from 'next/image';
import { shapes } from "../../../utils/shapes";
import Link from 'next/link';

const ShapeSelector: React.FC = () => {
  return (
    <div className='flex justify-center items-center'>
        {shapes.map((image, index) => (
          <div>
            <h3>Select Part Template</h3>
            <Link href={`/shape-editor/${image.name}`} passHref>
            <Image src={`/shapes/${image.image_path}`} alt={`Image ${index}`} width={256} height={256}/>
            </Link>
          </div>
        ))}

    </div>
  );
};

export default ShapeSelector;