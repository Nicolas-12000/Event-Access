import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { getStudentById, updateStudent } from '../../services/studentService';

const EditStudentPage = () => {
  const { studentId } = useParams();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [isLoadingDetails, setIsLoadingDetails] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      setIsLoadingDetails(true);
      setError(null);
      try {
        const studentData = await getStudentById(studentId);
        reset(studentData);
      } catch (err) {
        console.error('Error fetching student details for editing:', err);
        setError("Error fetching student details for editing.");
      } finally {
        setIsLoadingDetails(false);
      }
    };

    if (studentId) {
      fetchStudentDetails();
    }
  }, [studentId, reset]);

  const onSubmit = async (data) => {
    setIsUpdating(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const updatedStudent = await updateStudent(studentId, data);
      if (updatedStudent) {
        setSuccessMessage('Student updated successfully!');
      } else {
        setError('Failed to update student.');
      }
    } catch (err) {
      console.error('Error updating student:', err);
      setError("Error updating student.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoadingDetails) {
    return <div>Loading student details for editing...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="documentType">Document Type:</label>
          <select id="documentType" {...register('documentType', { required: 'Document type is required' })}>
            <option value="">-- Select --</option>
            <option value="CC">CC</option>
            <option value="TI">TI</option>
            <option value="CE">CE</option>
          </select>
          {errors.documentType && <p style={{ color: 'red' }}>{errors.documentType.message}</p>}
        </div>
        <div>
          <label htmlFor="identityDocument">Identity Document:</label>
          <input
            type="text"
            id="identityDocument"
            {...register('identityDocument', { required: 'Identity Document is required' })}
            disabled
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
        <div>
          <label htmlFor="semester">Semester:</label>
          <input
            id="semester"
            {...register('semester', {
              required: 'Semester is required',
              pattern: {
                value: /^[0-9]{1,2}$/,
                message: 'Semester must be a number between 1 and 12'
              },
              validate: value => {
                const num = Number(value);
                return num >= 1 && num <= 12 || 'Semester must be between 1 and 12';
              }
            })}
          />
          {errors.semester && <p style={{ color: 'red' }}>{errors.semester.message}</p>}
        </div>
        <div>
          <label htmlFor="universityId">University ID:</label>
          <input id="universityId" {...register('universityId')} />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input id="address" {...register('address')} />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            id="phoneNumber"
            {...register('phoneNumber', {
              pattern: {
                value: /^\+?[0-9]{10,15}$/,
                message: 'Phone number must be between 10 and 15 digits'
              }
            })}
          />
          {errors.phoneNumber && <p style={{ color: 'red' }}>{errors.phoneNumber.message}</p>}
        </div>
        <button type="submit" disabled={isUpdating}>
          {isUpdating ? 'Updating...' : 'Update Student'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default EditStudentPage;
