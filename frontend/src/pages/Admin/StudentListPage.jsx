import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllStudents, deleteStudent, uploadStudents } from '../../services/studentService'; // Import student service functions
import ExcelUploader from '../../components/ExcelUploader'; // Import the ExcelUploader component

const StudentListPage = () => {
  // State to store the list of students
  const [students, setStudents] = useState([]);
  // State to manage loading state for fetching students
  const [isLoading, setIsLoading] = useState(true);
  // State to handle errors during fetching
  const [error, setError] = useState(null);
  // State to manage loading state for deleting a student
  const [isDeleting, setIsDeleting] = useState(false);
  // State to manage loading state for uploading students
  const [isUploading, setIsUploading] = useState(false);
  // State to handle errors during upload
  const [uploadError, setUploadError] = useState(null);
  // State to manage success message after upload
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState(null);

  // Effect to fetch the list of students on component mount
  useEffect(() => {
    const fetchStudents = async () => {
      setIsLoading(true); // Start loading students
      setError(null); // Clear previous errors
      try {
        // Call the getAllStudents function from studentService
        // TODO: Implement getAllStudents in studentService.js to make an API call
        // Assumption: getAllStudents returns an array of student objects
        const studentsData = await getAllStudents();
        setStudents(studentsData);
      } catch (err) {
        console.error('Error fetching students:', err);
        setError("Error fetching students.");
      } finally {
        setIsLoading(false); // Stop loading students
      }
    };

    fetchStudents(); // Fetch students when the component mounts
  }, []); // Empty dependency array ensures this runs only once on mount

  // Handler for deleting a student
  const handleDeleteStudent = async (studentIdentifier) => { // Use studentIdentifier for consistency
    // Optional: Add a confirmation dialog before deleting
    if (window.confirm('Are you sure you want to delete this student?')) {
      setIsDeleting(true); // Start deleting loading
      setError(null); // Clear previous errors
      try {
        // Call the deleteStudent function from studentService
        // TODO: Implement deleteStudent in studentService.js to make an API call
        // Assumption: deleteStudent takes studentIdentifier and returns a success indicator
        await deleteStudent(studentIdentifier);
        // Remove the deleted student from the local state
        // Assuming student objects have an 'identityDocument' property
        setStudents(students.filter(student => student.identityDocument !== studentIdentifier));

      } catch (err) {
        console.error('Error deleting student:', err);
        setError("Error deleting student.");
      } finally {
        setIsDeleting(false); // Stop deleting loading
      }
    }
  };

  // Handler for file upload from ExcelUploader
  const handleFileUpload = async (file) => {
    setIsUploading(true); // Start uploading loading
    setUploadError(null); // Clear previous upload errors
    setUploadSuccessMessage(null); // Clear previous success message

    try {
      // Call the uploadStudents function from studentService
      // TODO: Implement uploadStudents in studentService.js to make an API call
      // Assumption: uploadStudents takes the file and returns a success indicator or details about the upload result
      const result = await uploadStudents(file);

      // Assumption: The upload was successful
      setUploadSuccessMessage('Students uploaded successfully!');
      // TODO: Optionally, refresh the student list after a successful upload
      // fetchStudents(); // Re-fetch the student list

    } catch (err) {
      console.error("Error uploading students:", err);
      setUploadError("Error uploading students.");
      // TODO: Handle specific upload errors and provide more detailed feedback to the user
    } finally {
      setIsUploading(false); // Stop uploading loading
    }
  };


  // Render loading, error, or the student list
  if (isLoading) {
    return <div>Loading students...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // TODO: Add better styling and presentation of the student list

  return (
    <div>
      <h2>Student List</h2>
      {/* Link to the Create Student page */}
      {/* TODO: Add the Link component here */}
      {/* <Link to="/admin/students/create">Create New Student</Link> */}

      {/* Excel Uploader Component */}
      <ExcelUploader
        onFileUpload={handleFileUpload}
        isLoading={isUploading} // Pass uploading state to the component
        error={uploadError} // Pass upload error to the component
        successMessage={uploadSuccessMessage} // Pass success message to the component
      />

      {/* Display the list of students */}
      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <table>
          {/* TODO: Use a table for better presentation */}
          <thead>
            <tr>
              {/* TODO: Add table headers for relevant student properties */}
              <th>Identity Document</th> {/* Based on backend structure */}
              <th>Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Map over the students and display them in table rows */}
            {students.map(student => (
              <tr key={student.id || student.identityDocument}> {/* Use a stable key */}
                {/* TODO: Display student properties in table cells */}
                <td>{student.identityDocument}</td> {/* Based on backend structure */}
                <td>{student.name}</td>
                <td>{student.lastName}</td>
                <td>{student.email}</td>
                <td>
                  {/* TODO: Add a Link or button to view/edit the student */}
                  {/* <Link to={`/admin/students/${student.id}`}>View</Link> {' | '} */}
                  {/* <Link to={`/admin/students/edit/${student.id}`}>Edit</Link> {' | '} */}
                  {/* Button to delete the student */}
                  {/* Use student.identityDocument for deletion based on backend endpoint */}
                  <button onClick={() => handleDeleteStudent(student.identityDocument)} disabled={isDeleting}>
                    {isDeleting ? 'Deleting...' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Display general fetch error */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default StudentListPage;
