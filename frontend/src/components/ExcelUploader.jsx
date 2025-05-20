// components/ExcelUploader.jsx
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadStudents } from '../services/studentService';

const ExcelUploader = () => {
  const onDrop = async (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const formData = new FormData();
      formData.append('file', file);

      try {
        await uploadStudents(formData); // Assuming uploadStudents handles FormData
        alert('Estudiantes cargados exitosamente!');
      } catch (error) {
        console.error('Error uploading students:', error);
        alert('Error: ' + error.message);
      }
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} style={{ border: '1px dashed #ccc', padding: '20px', textAlign: 'center' }}>
      <input {...getInputProps()} />
      <p>Arrastra tu archivo Excel aquí, o haz click para seleccionar uno</p>
    </div>
  );
};

export default ExcelUploader;