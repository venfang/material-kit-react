/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-inner-declarations */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable dot-notation */
/* eslint-disable prefer-const */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-else-return */
/* eslint-disable prefer-template */
/* eslint-disable camelcase */
import Swal from 'sweetalert2';

import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { stubTrue, valuesIn } from 'lodash';
// material
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
  TableContainer,
  tablePaginationClasses,
  Avatar,
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Loader from '../../../components/loader/Loader';
import PageNavBar from '../../../layouts/dashboard/PageNavBar';

// components

import Page from '../../../components/Page';

import Scrollbar from '../../../components/Scrollbar';
import Iconify from '../../../components/Iconify';
import account from '../../../_mock/account';
// import { verifyProfileOldPassword, changeProfilePassword } from '../../../data/user/user';

//   const StyledAvatar = withStyles({
//     root: {
//       '&:hover': {
//         cursor:"pointer",

//     },
//   }})(Avatar);
const ITEM_HEIGHT = 35;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const CustomWidthTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 500,
    fontSize: '0.8rem',
  },
});

export default function Profile() {
  const [showCookieUserID, setCookieUserID] = useState(Cookies.get('user_id'));

  const EditChangePasswordSchema = Yup.object().shape({
    old_password: Yup.string().required('Please enter your old password.'),
    new_password: Yup.string().required('Please enter your new password.'),
    confirm_new_password: Yup.string().when('new_password', {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref('new_password')], 'Confirm new password does not match new password!'),
    }).required('Confirm New Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      old_password: '',
      new_password: '',
      confirm_new_password: '',
      showOldPassword: false,
      showNewPassword: false,
      showConfirmNewPassword: false,
    },
    validationSchema: EditChangePasswordSchema,
    onSubmit: () => {
      const verifyOldPassword = {
        user_id: showCookieUserID,
        password: values.old_password,

      };

      const changeNewPassword = {
        user_id: showCookieUserID,
        password: values.new_password,
      };


      // verifyProfileOldPassword(verifyOldPassword)
      //   .then(() => {

      //     changeProfilePassword(changeNewPassword)
      //       .then(() => {
      //         formik.setSubmitting(false);

      //         AlertBox('success', 'Changed Successfully', 'Password has been changed.', false, '', true, 'OK').then(
      //           () => {
      //             window.location.href = `${window.location.origin}/dashboard/app`;
      //           }
      //         );
      //       })
      //       .catch((error) => {
      //         formik.setSubmitting(false);

      //         AlertBox('error', 'Changed Failed', error.response.data.message, false, '', true, 'OK').then(() => { });
      //       });

      //   })
      //   .catch((error) => {
      //     formik.setSubmitting(false);

      //     if (error.response.data.message === 'incorrect') {
      //       AlertBox('error', 'Change Failed', 'Old Password is incorrect!', false, '', true, 'OK').then(() => { });
      //     } else {
      //       AlertBox('error', 'Changed Failed', error.response.data.message, false, '', true, 'OK').then(() => { });
      //     }
      //   });
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleClickShowOldPassword = () => {
    formik.setValues({
      ...values,
      showOldPassword: !values.showOldPassword,
    });
  };

  const handleMouseDownOldPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowNewPassword = () => {
    formik.setValues({
      ...values,
      showNewPassword: !values.showNewPassword,
    });
  };

  const handleMouseDownNewPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowConfirmNewPassword = () => {
    formik.setValues({
      ...values,
      showConfirmNewPassword: !values.showConfirmNewPassword,
    });
  };

  const handleMouseDownConfirmNewPassword = (event) => {
    event.preventDefault();
  };
  const topValue = 64;
  const title_name = "Change Password";
  const to = "/dashboard/app";
  return (
    <Page title="Change Password">
      <Container>
        <Loader spinner={isSubmitting} />
        <PageNavBar topValue={topValue} title_name={title_name} to={to} />
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Card sx={{ marginTop: 8, }} >
              <Scrollbar>
                <Container sx={{ minHeight: 500, p: 5 }}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                      Change Password
                    </Typography>

                    <Stack direction="row">
                      <Item>
                        <Button variant="contained" type="submit" startIcon={<Iconify icon="eva:save-fill" />}>
                          Change
                        </Button>
                      </Item>
                    </Stack>
                  </Stack>
                  <Grid container spacing={2} sx={{ maxWidth: '100%' }} xs={12} md={12} lg={12}>
                    <Grid item xs={12} md={6} lg={6}>
                      <Item>
                        <FormControl fullWidth>
                          <InputLabel id="">Old Password</InputLabel>
                          <OutlinedInput
                            error={Boolean(touched.old_password && errors.old_password)}
                            type={values.showOldPassword ? 'text' : 'password'}
                            {...getFieldProps('old_password')}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowOldPassword}
                                  onMouseDown={handleMouseDownOldPassword}
                                  edge="start"
                                >
                                  {values.showOldPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            }
                            label="Old Password"
                          />
                          <FormHelperText error id="old_password-error" sx={{ fontWeight: 600 }}>
                            {touched.old_password && errors.old_password}
                          </FormHelperText>
                        </FormControl>
                      </Item>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} sx={{ maxWidth: '100%' }} xs={12} md={12} lg={12}>
                    <Grid item xs={12} md={6} lg={6}>
                      <Item>
                        <FormControl fullWidth>
                          <InputLabel id="">New Password</InputLabel>
                          <OutlinedInput
                            error={Boolean(touched.new_password && errors.new_password)}
                            type={values.showNewPassword ? 'text' : 'password'}
                            {...getFieldProps('new_password')}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowNewPassword}
                                  onMouseDown={handleMouseDownNewPassword}
                                  edge="start"
                                >
                                  {values.showNewPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            }
                            label="New Password"
                          />
                          <FormHelperText error id="new_password-error" sx={{ fontWeight: 600 }}>
                            {touched.new_password && errors.new_password}
                          </FormHelperText>
                        </FormControl>
                      </Item>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                      <Item>
                        <FormControl fullWidth>
                          <InputLabel id="">Confirm New Password</InputLabel>
                          <OutlinedInput
                            error={Boolean(touched.confirm_new_password && errors.confirm_new_password)}
                            type={values.showConfirmNewPassword ? 'text' : 'password'}
                            {...getFieldProps('confirm_new_password')}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowConfirmNewPassword}
                                  onMouseDown={handleMouseDownConfirmNewPassword}
                                  edge="start"
                                >
                                  {values.showConfirmNewPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            }
                            label="Confirm New Password"
                          />
                          <FormHelperText error id="confirm_new_password-error" sx={{ fontWeight: 600 }}>
                            {touched.confirm_new_password && errors.confirm_new_password}
                          </FormHelperText>
                        </FormControl>
                      </Item>
                    </Grid>
                  </Grid>
                </Container>
              </Scrollbar>
            </Card>
          </Form>
        </FormikProvider>
      </Container>
    </Page>
  );
}
