import React, { useState } from 'react';
import Form from './components/Form';
import User from './components/User';
import { v4 as uuid } from 'uuid';
import './App.css';

function App() {
  const initialFormValues = {
    name: '',
    email: '',
    password: '',
    tos: {consent: false}
  }

  const initialUserList = [];

  // State
  const [formValues, setFormValues] = useState(initialFormValues);
  const [userList, setUserList] = useState(initialUserList);

  // Handlers
  const onChangeHandler = event => {
    const { name } = event.target;
    const { value } = event.target;

    setFormValues({...formValues, [name]: value});
  }

  const onCheckboxChange = event => {
    const { name } = event.target;
    const { checked } = event.target;

    setFormValues({
      ...formValues,
      tos: { [name]: checked }
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
