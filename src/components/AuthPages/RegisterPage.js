import React from 'react';
import { Formik, Form, Field } from 'formik';
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';

import { register } from "../../redux/actions/auth";
import InputField from "./InputField";

const RegisterPage = props => (
  <div className="authPage">
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
        } else if (!values.password) {
          errors.password = 'Required';
        } else if (values.password.length < 5) {
          errors.password = 'Password should contain at least 5 characters';
        } else if (!values.nickname) {
          errors.nickname = 'Required';
        } else if (values.nickname.length < 5) {
          errors.nickname = 'Nickname should contain at least 5 characters';
        }

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        props.register(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, isValid }) => (
        <Form>
          <Field type="email" component={InputField} name="email" />
          <Field type="password" component={InputField} name="password" />
          <Field type="text" component={InputField} name="nickname" />
          <Button variant="outlined" type="submit" disabled={!isValid || isSubmitting}>Submit</Button>
        </Form>
      )}
    </Formik>
  </div>
);

const mapDispatchToProps = dispatch => ({
  register: data => dispatch(register(data))
});

export default connect(null, mapDispatchToProps)(RegisterPage);