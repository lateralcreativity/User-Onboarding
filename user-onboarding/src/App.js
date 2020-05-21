import React, { useState } from 'react';
import Form from './components/Form';
import User from './components/User';
import formSchema from './validation/formSchema';
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

  const initialUsers = [];

  const initialFormErrors = {
    name: '',
    email: '',
    password: '',
    tos: ''
  }

  // State
  const [formValues, setFormValues] = useState(initialFormValues);
  const [users, setUsers] = useState(initialUsers);
  const [formErrors, setFormErrors] = useState(initialFormErrors);

  // Handlers
  const postNewUser = newUser => {
    axios.post('https://reqres.in/api/users', newUser)
    .then(resolve => {
      setUsers([resolve.data, ...users])
    })
    .catch(error => {
      debugger
    })
  }

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
    const newUser = {...formValues}

    event.preventDefault()
    
    if(!formValues.name.trim() || !formValues.email.trim() || !formValues.password.trim() || !formValues.tos){
      return
    }

    postNewUser(newUser);
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

      {users.map(user => {
        return (
          <User key={user.id} details={user} />
        )
      })}
    </div>
  );
}

export default App;
