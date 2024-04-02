'use client'
import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Database } from '@/types_db';
import { createClient } from '@/utils/supabase/client';

type ShapesTemplates = {
    shapesTemplates: Database['public']['Tables']['shapes_templates']['Row'][];
  };

const ShapeSelector: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [shapes, setShapes] = useState<ShapesTemplates["shapesTemplates"]>([]);
    const supabase = createClient();

    const getShapes = useCallback(async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('shapes_templates')
                .select('*')

            if (error) {
                throw error
            }
            if (data) {
                console.log(data)
                setShapes(data)            
            }
        }
        catch (error) {
            console.log('error', error)
        }
        finally {
            setLoading(false)
        }
    }, [supabase])

    useEffect(() => {
        getShapes()
    }, [getShapes])

  return (
    <div className='flex justify-center items-center'>
        {shapes.map((image, index) => (
          <div>
            <h3>Select Part Template</h3>
            <Link href={`/dashboard/${image.name}`} passHref>
            <Image src={image.image_path} alt={`Image ${index}`} width={256} height={256}/>
            </Link>
          </div>
        ))}

    </div>
  );
};

export default ShapeSelector;