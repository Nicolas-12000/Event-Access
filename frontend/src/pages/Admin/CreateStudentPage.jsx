import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createStudent } from '../../services/studentService';

const CreateStudentPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await createStudent(data);
      navigate('/admin/students');
    } catch (error) {
      console.error('Error creating student:', error);
    }
  };

  return (
    <div>
      <h2>Create New Student</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="identityDocument">Identity Document:</label>
          <input
            id="identityDocument"
            {...register('identityDocument', { required: 'Identity Document is required' })}
          />
          {errors.identityDocument && <p style={{ color: 'red' }}>{errors.identityDocument.message}</p>}
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            id="lastName"
            {...register('lastName', { required: 'Last Name is required' })}
          />
          {errors.lastName && <p style={{ color: 'red' }}>{errors.lastName.message}</p>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email format'
              }
            })}
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="documentType">Document Type:</label>
          <input
            id="documentType"
            {...register('documentType')}
          />
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
          <input
            id="universityId"
            {...register('universityId')}
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            id="address"
            {...register('address')}
          />
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
        <button type="submit">Create Student</button>
      </form>
    </div>
  );
};

export default CreateStudentPage;