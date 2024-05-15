'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { makeDXF } from '@/app/api/makeDXF';
import { useDocument } from 'react-firebase-hooks/firestore';
import { doc } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import AsyncActionButton from '@/components/ui/Button/AsyncActionButton';

type ShapeEditorProps = {
  params: {
    shape: string;
  };
};

type Dimension = {
  name: string;
  value: number;
  label: string;
};

const ShapeEditor: React.FC<ShapeEditorProps> = ({ params }: { params: { shape: string } }) => {
  const [value, loading, error] = useDocument(doc(db, 'part_templates', params.shape));
  const [dimensions, setDimensions] = useState<{[key: string]: number | string}>({});
  const [spacing, setSpacing] = useState('');
  const [rows, setRows] = useState('');
  const [cols, setCols] = useState('');
  const [fileName, setFileName] = useState('');
  const [svgFile, setSvgFile] = useState('');

  const handleSubmit = async (shouldMakeFile: boolean = true) => {
    const numbers: { [key: string]: number } = {}; 
    Object.keys(dimensions).forEach((key) => {
      numbers[key] = Number(dimensions[key]);
    });
    const numSpacing = spacing ? Number(spacing) : 0;
    const numRows = rows ? Number(rows) : 1;
    const numCols = cols ? Number(cols) : 1;
    const shapeSpecs = {
      ...numbers, 
      partType: value?.id,
      spacing: numSpacing, 
      rows: numRows, 
      cols: numCols, 
      fileName, 
      shouldMakeFile
    }
    try {
      const res = await makeDXF(
        shapeSpecs,         
        'https://part-request-6jrllpvp7a-uc.a.run.app'
      );
      const dxfText = await res.body; 
      if (shouldMakeFile) {
        const dxfBlob = new Blob([dxfText], { type: 'application/dxf' }); 
        const dxfUrl = URL.createObjectURL(dxfBlob);
        const downloadLink = document.createElement('a');
        downloadLink.href = dxfUrl;
        downloadLink.download = `${fileName || 'untitled'}.dxf`;
        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);
        downloadLink.click(); 
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(dxfUrl);
      }     
      else {
        const blob = new Blob([dxfText], { type: 'image/svg+xml' });
        setSvgFile(URL.createObjectURL(blob));
      }
    } catch (error) {
      alert('Error generating gasket');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!value) {
    return <div>Shape not found</div>;
  }
  return (
    <div className="p-2 max-w-prose border border-gray-300 rounded-lg">
      <form className="">
        <div>
          {
            value.data()?.dimensions &&
            (value.data()?.dimensions as Array<Dimension>).map((dimension, index) => {
              return (
                <Input
                  style={{margin: '1rem'}}
                  key={index}
                  label={`${dimension.label} *`}
                  value={dimensions[dimension.name] || ''}
                  onChange={(e) => {
                      setDimensions({...dimensions, [dimension.name]: e})
                  }}
                />
              );
            
            })
          }
          <Input
            label= 'Spacing'
            style={{margin: '1rem'}}
            placeholder="Spacing"          
            value={spacing || ''}
            onChange={(e) => setSpacing(e)}
          />
          <Input
            label='Rows'
            aria-label='rows'
            style={{margin: '1rem'}}
            placeholder="Rows"
            value={rows}
            onChange={(e) => setRows(e)}
          />
          <Input
            label='Columns'
            aria-label='columns'
            style={{margin: '1rem'}}
            placeholder="Columns"
            value={cols}
            onChange={(e) => setCols(e)}
          />
          <Input
            label='File Name'
            style={{margin: '1rem'}}
            placeholder="File Name"
            value={fileName}
            onChange={(e) => setFileName(e)}
          />
        </div>   
        <div> 
          <AsyncActionButton 
            style={{margin: '1rem'}} 
            asyncAction={() => handleSubmit(false)}
            label="Generate Preview"
          />
          <AsyncActionButton 
            style={{margin: '1rem'}} 
            asyncAction={() => handleSubmit(true)}
            label="Generate DXF"
          />    
        </div>
      </form>
      {svgFile &&
      <div>
        <Image 
          src={svgFile}   
          alt="gasket" 
          width={250}
          height={250}
        />
      </div>}
    </div>
  );
};

export default ShapeEditor;