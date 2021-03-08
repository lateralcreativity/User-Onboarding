import { useState } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import formSchema from '../validation/formSchema';

const Form = ({users, setUsers}) => {
    const initialForm = {
        name: '',
        email: '',
        password: '',
        tos: false
    }
    const initialFormErrors = {
        name: '',
        email: '',
        password: '',
        tos: ''
      }
    const [formValues, setFormValues] = useState(initialForm);
    const [formErrors, setFormErrors] = useState(initialFormErrors);


    const inputHandler = event => {
        const { name, value } = event.target;
        
        if(event.target.name === 'tos') {
            setFormValues({ ...formValues, tos: event.target.checked });
        } else {
            setFormValues({ ...formValues, [name]: value });
        }

        yup.reach(formSchema, name)
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
    }

    const submitHandler = event => {
        event.preventDefault();
        if(!formValues.name.trim() || !formValues.email.trim() || !formValues.password.trim() || !formValues.tos){
            return
        }

        axios.post('https://reqres.in/api/users', formValues)
        .then(response => {
            setUsers([...users, response.data]);
        })
        .catch(error => console.log(error))
    }

    return (
        <>
        <form onSubmit={submitHandler}>
            <label htmlFor="">
                Name:
                <input type="text" name="name" onChange={inputHandler} />
            </label>
            <label htmlFor="">
                E-mail:
                <input type="text" name="email" onChange={inputHandler} />
            </label>
            <label htmlFor="">
                Password:
                <input type="text" name="password" onChange={inputHandler} />
            </label>
            <label htmlFor="">
                Do you accept our TOS?
                <input type="checkbox" name="tos" value={!formValues.tos} onChange={inputHandler} />
            </label>
            <input type="submit" value="submit" />
        </form>
        <div>
            <p>{formErrors.name}</p>
            <p>{formErrors.email}</p>
            <p>{formErrors.password}</p>
            <p>{formErrors.tos}</p>
        </div>
        </>
    )
}

export default Form;