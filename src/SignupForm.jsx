import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SignupForm.css';

const SignupForm = () => {
    const checkUserExists = async (email) => {
        try {
            const response = await axios.get(`http://localhost:5000/users?email=${email}`);
            return response.data.length > 0;
        } catch (error) {
            console.error('Error checking user existence:', error);
            return false;
        }
    };

    const handleSignup = async (newUser) => {
        try {
            const response = await axios.post('http://localhost:5000/users', newUser);
            console.log('User created:', response.data);
            toast.success('User created successfully!');
        } catch (error) {
            console.error('Error signing up:', error);
            toast.error('Error signing up, please try again.');
        }
    };

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            lastName: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string()
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()[\]{}\-_=+<>])[A-Za-z\d@$!%*?&#^()[\]{}\-_=+<>]{8,}$/,
                    'Password must be at least 8 characters and include uppercase, lowercase, number, and special character'
                )
                .required('Required')
        }),
        onSubmit: async (values, { resetForm }) => {
            const userExists = await checkUserExists(values.email);
            if (userExists) {
                toast.warning('User already exists');
                return;
            }
            await handleSignup(values);
            resetForm();
        },
    });

    return (
        <div className="signup-container">
            <div className="signup-form-wrapper">
                <h2 className="form-title">Create Your Account</h2>
                <form onSubmit={formik.handleSubmit} className="signup-form">
                    <div className="form-group">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            className={`form-input ${formik.touched.firstName && formik.errors.firstName ? 'error' : ''}`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.firstName}
                        />
                        {formik.touched.firstName && formik.errors.firstName ? (
                            <div className="error-message">{formik.errors.firstName}</div>
                        ) : null}
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            className={`form-input ${formik.touched.lastName && formik.errors.lastName ? 'error' : ''}`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.lastName}
                        />
                        {formik.touched.lastName && formik.errors.lastName ? (
                            <div className="error-message">{formik.errors.lastName}</div>
                        ) : null}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className={`form-input ${formik.touched.email && formik.errors.email ? 'error' : ''}`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="error-message">{formik.errors.email}</div>
                        ) : null}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className={`form-input ${formik.touched.password && formik.errors.password ? 'error' : ''}`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className="error-message">{formik.errors.password}</div>
                        ) : null}
                    </div>

                    <button type="submit" className="submit-button">
                        Create Account
                    </button>
                </form>
            </div>

            <ToastContainer 
                position="top-right" 
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
};

export default SignupForm;