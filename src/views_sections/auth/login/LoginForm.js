import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import Cookies from 'js-cookie';
// @mui
import { Link, Stack, IconButton, InputAdornment, Paper, InputBase, Typography, Box, FormHelperText } from '@mui/material';
import { LoadingButton } from '@mui/lab';
//

// components
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
import { AlertBox, TimerAlertBox } from '../../../components/alert/SweetAlert';

import { loginUser, verifyLoginUser } from '../../../data/auth/login/login';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    user_name: Yup.string().required('User Name is required'),
    // email: Yup.string()
    //           .email('Email must be a valid email address')
    //           .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      // .min(8, 'At least 8 characters.')
      .max(15, 'Maximum 15 characters.'),
  });

  const formik = useFormik({
    initialValues: {
      user_name: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      const formValues = {
        user_name: values.user_name,
        password: values.password,
      };

      loginUser(formValues)
        .then((loginResponse) => {
          // console.log(loginResponse.status);

          verifyLoginUser()
            .then((verifyResponse) => {
              formik.setSubmitting(false);


              // VERIFY SUCCESSFUL
              Cookies.set('user_name', verifyResponse.data.user_name, { expires: 1 });
              TimerAlertBox('success', 'Login Successfully', '', 1500, 'center').then(() => {

                if (Cookies.get('user_name') !== undefined) {

                  window.location.href = `${window.location.origin}/dashboard/app`;
                }

              });
            })
            .catch((verifyError) => {
              formik.setSubmitting(false);
              // VERIFY USER WITH JWT ERROR
              AlertBox(
                'error',
                'Login Failed',
                "Unauthorized.",
                false,
                '',
                true,
                'OK'
              );

            });
        })
        .catch((loginError) => {

          formik.setSubmitting(false);

          if (loginError.response.data.message === 'Invalid Account') {
            AlertBox('error', 'Login Failed', 'Account does not exist.', false, '', true, 'OK').then(() => { });
          }

          if (loginError.response.data.message === 'Invalid Password') {
            AlertBox('error', 'Login Failed', 'Incorrect password.', false, '', true, 'OK').then(() => { });
          }

        });
    },
  });
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              bgcolor: 'background.paper',
              borderRadius: 1,
            }}
          >
            <PersonOutlineIcon />
            <Typography sx={{ mx: 0.5 }} variant="label">
              User Name
            </Typography>
          </Box>

          <Paper
            component="div"
            variant="outlined"
            sx={{
              marginTop: '5px !important',
              p: '2px 10px',
              display: { xs: 'flex', sm: 'flex', md: 'flex', lg: 'flex' },
              alignItems: 'center',
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              name="user_name"
              placeholder="User Name"
              {...getFieldProps('user_name')}
              error={Boolean(touched.user_name && errors.user_name)}
            />
            <FormHelperText error id="user_name-error" sx={{ fontWeight: 600 }}>
              {touched.user_name && errors.user_name}
            </FormHelperText>
          </Paper>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              bgcolor: 'background.paper',
              borderRadius: 1,
            }}
          >
            <LockOutlinedIcon />
            <Typography sx={{ mx: 0.5 }} variant="label">
              Password
            </Typography>

          </Box>

          <Paper

            component="div"
            variant="outlined"
            sx={{
              marginTop: '5px !important',
              p: '2px 10px',
              display: { xs: 'flex', sm: 'flex', md: 'flex', lg: 'flex' },
              alignItems: 'center',
            }}
          >

            <InputBase
              sx={{ ml: 1, flex: 1 }}
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              {...getFieldProps('password')}
              error={Boolean(touched.password && errors.password)}

            />
            <FormHelperText error id="password-error" sx={{ fontWeight: 600 }}>
              {touched.password && errors.password}
            </FormHelperText>
            <IconButton type="button" sx={{ p: '10px' }} onClick={() => setShowPassword(!showPassword)}>
              <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
            </IconButton>
          </Paper>
          <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting} sx={{ marginTop: 3 }}>
            Login
          </LoadingButton>
        </Stack>



      </Form>
    </FormikProvider>
  );
}
