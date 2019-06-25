import React from 'react';
import { Formik, Form, Field } from 'formik';
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";

import { login } from "../../redux/actions/auth";
import InputField from "./InputField";

const LoginPage = props => (
  <div className="authPage">
    <h1>Login</h1>
    <Formik
      initialValues={{ email: '', password: '' }}
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
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        props.login(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, isValid }) => (
        <Form>
          <Field component={InputField} name="email" />
          <Field type="password" component={InputField} name="password" />
          <Button variant="outlined" type="submit" disabled={!isValid || isSubmitting}>Submit</Button>
        </Form>
      )}
    </Formik>
  </div>
);

const mapDispatchToProps = dispatch => ({
  login: data => dispatch(login(data))
});

export default connect(null, mapDispatchToProps)(LoginPage);