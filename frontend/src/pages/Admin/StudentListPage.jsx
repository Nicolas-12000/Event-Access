import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllStudents, deleteStudent, uploadStudents } from '../../services/studentService';
import ExcelUploader from '../../components/ExcelUploader';

const StudentListPage = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState(null);

  useEffect(() => {
    fetchStudents();
    // eslint-disable-next-line
  }, []);

  const fetchStudents = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const studentsData = await getAllStudents();
      setStudents(studentsData);
    } catch (err) {
      console.error('Error fetching students:', err);
      setError("Error fetching students.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteStudent = async (identityDocument) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setIsDeleting(true);
      setError(null);
      try {
        await deleteStudent(identityDocument);
        setStudents(students.filter(student => student.identityDocument !== identityDocument));
      } catch (err) {
        console.error('Error deleting student:', err);
        setError("Error deleting student.");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleFileUpload = async (file) => {
    setIsUploading(true);
    setUploadError(null);
    setUploadSuccessMessage(null);

    try {
      await uploadStudents(file);
      setUploadSuccessMessage('Students uploaded successfully!');
      fetchStudents();
    } catch (err) {
      console.error("Error uploading students:", err);
      setUploadError("Error uploading students.");
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading) {
    return <div>Loading students...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Student List</h2>
      <Link to="/admin/students/create">Create New Student</Link>

      <ExcelUploader
        onFileUpload={handleFileUpload}
        isLoading={isUploading}
        error={uploadError}
        successMessage={uploadSuccessMessage}
      />

      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Identity Document</th>
              <th>Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.identityDocument}>
                <td>{student.identityDocument}</td>
                <td>{student.name}</td>
                <td>{student.lastName}</td>
                <td>{student.email}</td>
                <td>
                  <Link to={`/admin/students/edit/${student.identityDocument}`}>Edit</Link>{' | '}
                  <button onClick={() => handleDeleteStudent(student.identityDocument)} disabled={isDeleting}>
                    {isDeleting ? 'Deleting...' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default StudentListPage;
