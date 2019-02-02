import React, { Component } from 'react';
import {
  FormLabel,
  TextField,
  Button
} from '@material-ui/core';
import { Formik } from 'formik';
import axios from 'axios';

export default class UserForm extends Component {

  constructor() {
    this.state = {
      users: []
    }
  }

  _formValidation = (values) => {
    console.log({ values });
    let errors = {};
    if (!values.email) {
      errors.email = 'Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }
    if (values.firstName.length < 10) {
      errors.firstName = 'Should be more than 10 characteres'
    }
    return errors;
  }

  _onFormSubmit = (values, actions) => {
    axios.post(`${process.env.REACT_APP_HOST}/users`, values)
      .then(res => {
        actions.setSubmitting(false);
        console.log(res.data);
      })
      .catch(err => {

        actions.setSubmitting(false);
      });
  }

  render() {
    return (
      <div>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: ''
          }}
          validate={this._formValidation}
          onSubmit={this._onFormSubmit}
        >
          {
            //Children function
            ({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              handleBlur,
              isSubmitting
            }) => (
                <form onSubmit={handleSubmit}>
                  <div>
                    <FormLabel>First Name</FormLabel>
                    <TextField
                      id="firstName"
                      type="text"
                      name="firstName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.firstName}
                      error={errors.firstName && touched.firstName}
                    />
                  </div>
                  <div>
                    <FormLabel>Last Name</FormLabel>
                    <TextField
                      id="lastName"
                      type="text"
                      name="lastName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lastName}
                    />
                  </div>
                  <div>
                    <FormLabel>Email</FormLabel>
                    <TextField
                      id="email"
                      type="text"
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      error={errors.email && touched.email}
                    />
                  </div>
                  <div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Submit
                    </Button>
                  </div>
                </form>
              )
          }
        </Formik>
      </div>
    );
  }
}