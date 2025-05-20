import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { getStudentById, updateStudent } from '../../services/studentService'; // Import student service functions

const EditStudentPage = () => {
  // Get the student identifier from the URL parameters
  // Assuming the parameter name is 'studentId' or 'identityDocument'
  const { studentId } = useParams(); // Or { identityDocument } = useParams();
  // Initialize react-hook-form
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  // Hook for programmatic navigation
  const navigate = useNavigate();
  // State to manage loading state for fetching student details
  const [isLoadingDetails, setIsLoadingDetails] = useState(true);
  // State to manage loading state for updating the student
  const [isUpdating, setIsUpdating] = useState(false);
  // State to handle errors
  const [error, setError] = useState(null);
  // State to manage success message
  const [successMessage, setSuccessMessage] = useState(null);

  // Effect to fetch existing student details when the identifier changes
  useEffect(() => {
    const fetchStudentDetails = async () => {
      setIsLoadingDetails(true); // Start loading details
      setError(null); // Clear previous errors
      try {
        // Call the getStudentById function to fetch the student to be edited
        // TODO: Implement getStudentById in studentService.js to make an API call
        // Assumption: getStudentById takes the student identifier (studentId or identityDocument)
        // Assumption: The backend endpoint is GET /api/students/{identityDocument} as per README [1]
        // You might need to adjust this call based on which identifier you use in the URL parameter.
        const studentData = await getStudentById(studentId); // Or getStudentById(identityDocument);
        // Populate the form with the fetched data
        reset(studentData); // Use react-hook-form's reset to populate the form
      } catch (err) {
        console.error('Error fetching student details for editing:', err);
        setError("Error fetching student details for editing.");
      } finally {
        setIsLoadingDetails(false); // Stop loading details
      }
    };

    // Fetch details if the identifier is available
    if (studentId) { // Or if (identityDocument)
      fetchStudentDetails();
    }
  }, [studentId, reset]); // Effect depends on the identifier and reset from react-hook-form // Or [identityDocument, reset]

  // Function to handle form submission (updating the student)
  const onSubmit = async (data) => {
    setIsUpdating(true); // Start updating loading
    setError(null); // Clear previous errors
    setSuccessMessage(null); // Clear previous success message

    try {
      // Call the updateStudent function from studentService
      // TODO: Implement updateStudent in studentService.js to make an API call
      // Assumption: updateStudent takes the student identifier (studentId or identityDocument) and the updated student data
      // Assumption: The backend endpoint for updating a student might be PUT /api/students/{identityDocument}
      const updatedStudent = await updateStudent(studentId, data); // Or updateStudent(identityDocument, data);

      // Assumption: The update was successful if updatedStudent is returned or a success status is indicated
      if (updatedStudent) {
        setSuccessMessage('Student updated successfully!');
        // TODO: Optionally, redirect to the student details page or list page after a short delay
        // navigate(`/admin/students/${studentId}`); // Example redirection to details page
      } else {
        setError('Failed to update student.');
      }
    } catch (err) {
      console.error('Error updating student:', err);
      setError("Error updating student.");
    } finally {
      setIsUpdating(false); // Stop updating loading
    }
  };

  // Render loading, error, or the edit form
  if (isLoadingDetails) {
    return <div>Loading student details for editing...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // TODO: Add better styling and form layout

  return (
    <div>
      <h2>Edit Student</h2>
      {/* Form for editing the student */}
      {/* handleSubmit will trigger onSubmit function on valid form submission */}
      <form onSubmit={handleSubmit(onSubmit)}>
         {/* TODO: Add input fields for all relevant student properties based on your backend model */}
        {/* These should match the fields in CreateStudentPage.jsx */}
         <div>
          <label htmlFor="identityDocumentType">Document Type:</label>
          <select id="identityDocumentType" {...register('identityDocumentType', { required: 'Document type is required' })}>
            <option value="">-- Select --</option>
            <option value="CC">CC</option>
            <option value="TI">TI</option>
            <option value="CE">CE</option>
            {/* Add other types as needed */}
          </select>
          {errors.identityDocumentType && <p style={{ color: 'red' }}>{errors.identityDocumentType.message}</p>}
        </div>
         <div>
          <label htmlFor="identityDocument">Identity Document:</label>
          <input
            type="text"
            id="identityDocument"
            {...register('identityDocument', { required: 'Identity Document is required' })}
            disabled // Often, the identity document is not editable after creation
          />
          {errors.identityDocument && <p style={{ color: 'red' }}>{errors.identityDocument.message}</p>}
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            {...register('lastName', { required: 'Last name is required' })}
          />
          {errors.lastName && <p style={{ color: 'red' }}>{errors.lastName.message}</p>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            {...register('email', { required: 'Email is required', pattern: /^\S+@\S+$/i })}
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
        </div>
         {/* Add other fields like semester, universityId, address, phoneNumber */}
        {/* <div>
          <label htmlFor="semester">Semester:</label>
          <input type="number" id="semester" {...register('semester')} />
        </div>
        <div>
          <label htmlFor="universityId">University ID:</label>
          <input type="text" id="universityId" {...register('universityId')} />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" {...register('address')} />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input type="text" id="phoneNumber" {...register('phoneNumber')} />
        </div> */}

        {/* Submit button */}
        <button type="submit" disabled={isUpdating}>
          {isUpdating ? 'Updating...' : 'Update Student'}
        </button>
      </form>

      {/* Display messages */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default EditStudentPage;
