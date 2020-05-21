import * as yup from 'yup'

const formSchema = yup.object().shape({
  name: yup.string()
    .trim()
    .min(3, 'Name must be at least three characters long.')
    .required('Name is a required field.'),
  email: yup.string()
    .email('Email must be a valid email address.')
    .required('Email is a required field.'),
    password: yup.string()
    .min(4, 'Password must be at least 4 characters long.')
    .required('Password is a required field.'),
    tos: yup.bool().oneOf([true], 'You must accept our TOS in order to use this site.')
})

export default formSchema