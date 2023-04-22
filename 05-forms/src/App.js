import { useEffect } from 'react';
import './App.css';
import * as Yup from 'yup';
import { useFormik } from 'formik';

function App() {
  const userSchema = Yup.object({
    name: Yup.string().required().min(3, 'Name must be more than 3 character'),
    email: Yup.string().email(),
    password: Yup.string()
      .required()
      .min(6, 'Password must be more than 6 charcater')
      .max(12, 'Password cannot be more than 12 character'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      console.log(values);
      //API call
    },
  });

  const { errors, touched, getFieldProps } = formik;

  useEffect(() => {
    //code
    console.log('Useffect Working');
    console.log({ errors, touched });
  }, [errors, touched]);

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Login Form</h1>

        <form noValidate onSubmit={formik.handleSubmit}>
          <div>
            <input
              type='string'
              name='name'
              id='name'
              placeholder='Name'
              {...getFieldProps('name')}
            />
            <div className='error'>{errors.name}</div>
          </div>

          <div>
            <input
              type='email'
              name='email'
              id='email'
              placeholder='Email'
              {...getFieldProps('email')}
            />
            <div className='error'>{errors.email}</div>
          </div>
          <div>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='password'
              {...getFieldProps('password')}
            />
            <div className='error'>{errors.password}</div>
          </div>
          <button type='submit'>Login</button>
        </form>
      </header>
    </div>
  );
}

export default App;
