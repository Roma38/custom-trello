import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { connect } from "react-redux";
import { register } from "../redux/actions/auth";


const RegisterPage = props => (
  <div>
    <h1>Register</h1>
    <Formik
      initialValues={{ email: '', password: '', nickname: '' }}
      validate={values => {
        let errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        props.register(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="div" />
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="div" />
          <Field type="text" name="nickname" />
          <ErrorMessage name="nickname" component="div" />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

const mapDispatchToProps = dispatch => ({
  register: data => dispatch(register(data))
});

export default connect(null, mapDispatchToProps)(RegisterPage);