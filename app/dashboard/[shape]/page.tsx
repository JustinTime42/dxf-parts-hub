'use client'
import React, { use, useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Database } from '@/types_db';
import { createClient } from '@/utils/supabase/client';

type ShapeEditorProps = {
  params: {
    shape: string;
  };
};

type ShapesTemplates = {
  shapesTemplates: Database['public']['Tables']['shapes_templates']['Row'] | null;
};

type Dimension = {
  name: string;
  value: number;
  label: string;
};

const ShapeEditor: React.FC<ShapeEditorProps> = ({ params }: { params: { shape: string } }) => {

  const supabase = createClient();
  const [shape, setShape] = useState<ShapesTemplates["shapesTemplates"]>(null);
  const [dimensions, setDimensions] = useState<{[key: string]: number | string}>({});
  const [spacing, setSpacing] = useState('');
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [fileName, setFileName] = useState('');
  const [svgFile, setSvgFile] = useState('');


  const getShape = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('shapes_templates')
        .select('*')
        .eq('name', params.shape)
        .single();
      if (error) {
        throw error;
      }
      if (data) {
        setShape(data);
      }
    } catch (error) {
      console.log('error', error);
    }
  }, [supabase, params.shape]);

  useEffect(() => {
    getShape();
  }, [getShape]);

  const handleSubmit = async (shouldMakeFile: boolean) => {
    const numbers: { [key: string]: number } = {}; 
    Object.keys(dimensions).forEach((key) => {
      numbers[key] = Number(dimensions[key]);
    });
    const numSpacing = spacing ? Number(spacing) : 0;
    console.log({...numbers, numSpacing, rows, cols, fileName});
    try {
      const file = await fetch(`/api/generate_gasket`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...numbers, spacing: numSpacing, rows, cols, fileName, shouldMakeFile}),
      });
      // save the returned file
      const blob = await file.blob();
      
      if (shouldMakeFile) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileName}.dxf` || 'untitled.dxf';
        a.click();
      }     
      else {
        setSvgFile(URL.createObjectURL(blob));
      } 
    } catch (error) {
      alert('Error generating gasket');
    }
  };

  if (!shape) {
    return <div>Shape not found</div>;
  }
  return (
    <div>      
      <form>
        <div>
          {
            shape.dimensions &&
            (shape.dimensions as Array<Dimension>).map((dimension, index) => {
              return (
                <Input
                  style={{margin: '1rem'}}
                  key={index}
                  placeholder={dimension.label}
                  value={dimensions[dimension.name] || ''}
                  onChange={(e) => {
                      setDimensions({...dimensions, [dimension.name]: e})
                  }}
                />
              );
            
            })
          }
          <Input
            style={{margin: '1rem'}}
            placeholder="Spacing"          
            value={spacing || ''}
            onChange={(e) => setSpacing(e)}
          />
          <Input
            style={{margin: '1rem'}}
            placeholder="Rows"
            value={Number(rows)}
            onChange={(e) => setRows(Number(e))}
          />
          <Input
            style={{margin: '1rem'}}
            placeholder="Columns"
            value={Number(cols)}
            onChange={(e) => setCols(Number(e))}
          />
          <Input
            style={{margin: '1rem'}}
            placeholder="File Name"
            value={fileName}
            onChange={(e) => setFileName(e)}
          />
        </div>   
        <div> 
          <Button 
            style={{margin: '1rem'}} 
            type="button" 
            color="primary"
            onClick={() => handleSubmit(false)}
          >
            Preview DXF
          </Button>
          <Button 
            style={{margin: '1rem'}} 
            type="button"  
            color="primary"
            onClick={() => handleSubmit(true)}
          >
            Generate DXF
          </Button>    
        </div>
      </form>
      <div>
        <Image 
          src={svgFile}  
          alt="gasket" 
          width={250}
          height={250}
        />
      </div>
    </div>
  );
};

export default ShapeEditor;