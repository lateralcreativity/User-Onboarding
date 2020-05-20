import React, { useState } from 'react';
import Form from './components/Form';
import User from './components/User';
import formSchema from './validation/formSchema';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import * as yup from 'yup';
import './App.css';

function App() {
  const initialFormValues = {
    name: '',
    email: '',
    password: '',
    tos: false
  }

  const initialUserList = [];

  const initialFormErrors = {
    name: '',
    email: '',
    password: '',
    tos: ''
  }

  // State
  const [formValues, setFormValues] = useState(initialFormValues);
  const [userList, setUserList] = useState(initialUserList);
  const [formErrors, setFormErrors] = useState(initialFormErrors);

  // Handlers
  const onChangeHandler = event => {
    const { name } = event.target;
    const { value } = event.target;

    yup
    .reach(formSchema, name)
    .validate(value)
    .then(resolve => {
      setFormErrors({
        ...formErrors,
        [name]: ''
      })
    })
    .catch(error => {
      setFormErrors({
        ...formErrors,
        [name]: error.errors[0]
      })
    })

    setFormValues({...formValues, [name]: value});
  }

  const onCheckboxChange = event => {
    setFormValues({
      ...formValues,
      tos: event.target.checked
    })
  }

  const onSubmitHandler = event => {
    const newUser = {...formValues, id: uuid()}

    event.preventDefault()

    setUserList([newUser, ...userList]);
    setFormValues(initialFormValues);
  }

  return (
    <div className="App">
      <Form formValues={formValues}
      onChangeHandler={onChangeHandler}
      onSubmitHandler={onSubmitHandler}
      onCheckboxChange={onCheckboxChange}
      errors={formErrors}
      />

      {userList.map(user => {
        return (
          <User key={user.id} details={user} />
        )
      })}
    </div>
  );
}

export default App;
