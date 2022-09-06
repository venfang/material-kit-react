/* eslint-disable object-shorthand */
/* eslint-disable no-useless-concat */
/* eslint-disable prefer-const */
/* eslint-disable no-const-assign */
/* eslint-disable no-var */
/* eslint-disable arrow-body-style */
/* eslint-disable prefer-template */
/* eslint-disable camelcase */
// eslint-disable-next-line prefer-template
/* eslint-disable react/jsx-boolean-value */
import Swal from 'sweetalert2';

import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { Link as RouterLink } from 'react-router-dom';
import { stubTrue, valuesIn } from 'lodash';
// material
import { Card, Stack, Button, Container, Typography, tablePaginationClasses, Autocomplete } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Label from '../../../components/Label';
import Loader from '../../../components/loader/Loader';
import { AlertBox, TimerAlertBox } from '../../../components/alert/SweetAlert';
import PageNavBar from '../../../layouts/dashboard/PageNavBar';
import { createUser } from '../../../data/user/user';
// components

import Page from '../../../components/Page';

import Scrollbar from '../../../components/Scrollbar';
import Iconify from '../../../components/Iconify';

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

export default function CreateUser() {
      const [showCookieUserID, setCookieUserID] = useState(Cookies.get('user_id'));

      const handleClickShowPassword = () => {
            formik.setValues({
                  ...values,
                  showPassword: !values.showPassword,
            });
      };

      const handleMouseDownPassword = (event) => {
            event.preventDefault();
      };

      const [options, setOptions] = useState([]);

      const CreateUserSchema = Yup.object().shape({
            user_name: Yup.string().required('User ID is required.').matches(/^[a-zA-Z0-9_]+$/, 'Only letters, digits and underscore are allowed.').matches(/^(?![0-9._])/, 'User ID must start with letters.').matches(/^(?!.*[_]$)/, 'User ID must not end with underscore.'),
            name: Yup.string().required('Name is required.').matches(/^[a-zA-Z\s]+$/, "Only letters and space are allowed. "),
            mobile_phone: Yup.string().required('Mobile Phone is required.'),
            user_type: Yup.string().required('Role is required.'),
      });

      const formik = useFormik({
            initialValues: {
                  user_name: '',
                  user_type: '',
                  name: '',
                  center: '',
                  designation: '',
                  mobile_phone: '',
                  showPassword: false,
                  password: '',
            },
            validationSchema: CreateUserSchema,
            onSubmit: () => {
                  const formValues = {
                        user_name: values.user_name,
                        user_type: values.user_type,
                        name: values.name,
                        center: values.center,
                        designation: values.designation,
                        mobile_phone: values.mobile_phone,
                        password: values.password,
                        status: true,
                        created_by: showCookieUserID || null,
                  };

                  createUser(formValues)
                        .then((response) => {
                              formik.setSubmitting(false);
                              AlertBox(
                                    'success',
                                    'Created Successfully',
                                    "User '" + values.name + "' has been created.",
                                    false,
                                    '',
                                    true,
                                    'OK'
                              ).then(() => {
                                    window.location = '../user';
                              });
                        })
                        .catch((error) => {
                              formik.setSubmitting(false);
                              if (error.response.data.message === 'duplicate') {
                                    AlertBox(
                                          'error',
                                          'Create Failed',
                                          'The following user name has already existed.',
                                          false,
                                          '',
                                          true,
                                          'OK'
                                    ).then(() => { });
                              } else {
                                    AlertBox('error', 'Create Failed', error.response.data.message, false, '', true, 'OK').then(() => { });
                              }
                        });
            },
      });

      const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
      const topValue = 64;
      const title_name = "Create User";
      const to = "/dashboard/app";
      return (
            <Page title="User">
                  <Container>
                        <Loader spinner={isSubmitting} />
                        <PageNavBar topValue={topValue} title_name={title_name} to={to} />
                        <FormikProvider value={formik}>
                              <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                                    <Card sx={{ marginTop: 8, }} >
                                          <Scrollbar>
                                                <Container sx={{ minHeight: 500, p: 5 }}>
                                                      <Grid container spacing={2} sx={{ maxWidth: '100%' }}>
                                                            <Grid item xs={12} md={6} lg={6}>
                                                                  <Item>
                                                                        <FormControl fullWidth>
                                                                              <InputLabel>User Name</InputLabel>
                                                                              <OutlinedInput
                                                                                    type="text"
                                                                                    {...getFieldProps('user_name')}
                                                                                    error={Boolean(touched.user_name && errors.user_name)}
                                                                                    label="User Name"
                                                                                    endAdornment={
                                                                                          <InputAdornment position="end">
                                                                                                <CustomWidthTooltip
                                                                                                      arrow
                                                                                                      placement="top-end"
                                                                                                      title="User Name will be use for login."
                                                                                                >
                                                                                                      <IconButton aria-label="User ID ToolTip Icon" edge="end">
                                                                                                            <Iconify icon="eva:question-mark-circle-outline" />
                                                                                                      </IconButton>
                                                                                                </CustomWidthTooltip>
                                                                                          </InputAdornment>
                                                                                    }
                                                                              />

                                                                              <FormHelperText error id="user_name-error" sx={{ fontWeight: 600 }}>
                                                                                    {touched.user_name && errors.user_name}
                                                                              </FormHelperText>
                                                                        </FormControl>
                                                                  </Item>
                                                            </Grid>
                                                            <Grid item xs={12} md={6} lg={6}>
                                                                  <Item>
                                                                        <FormControl fullWidth>
                                                                              <InputLabel>Name</InputLabel>
                                                                              <OutlinedInput
                                                                                    type="text"
                                                                                    {...getFieldProps('name')}
                                                                                    error={Boolean(touched.name && errors.name)}
                                                                                    label="Name"
                                                                                    endAdornment={
                                                                                          <InputAdornment position="end">
                                                                                                <CustomWidthTooltip arrow placement="top-end" title="Name of the user.">
                                                                                                      <IconButton aria-label="Name ToolTip Icon" edge="end">
                                                                                                            <Iconify icon="eva:question-mark-circle-outline" />
                                                                                                      </IconButton>
                                                                                                </CustomWidthTooltip>
                                                                                          </InputAdornment>
                                                                                    }
                                                                              />
                                                                              <FormHelperText error id="name-error" sx={{ fontWeight: 600 }}>
                                                                                    {touched.name && errors.name}
                                                                              </FormHelperText>
                                                                        </FormControl>
                                                                  </Item>
                                                            </Grid>
                                                      </Grid>
                                                      <Grid container spacing={2} sx={{ maxWidth: '100%' }}>
                                                            <Grid item xs={12} md={6} lg={6}>
                                                                  <Item>
                                                                        <FormControl fullWidth>
                                                                              <InputLabel>Center</InputLabel>
                                                                              <OutlinedInput
                                                                                    type="text"
                                                                                    {...getFieldProps('center')}
                                                                                    error={Boolean(touched.center && errors.center)}
                                                                                    label="Center"
                                                                                    endAdornment={
                                                                                          <InputAdornment position="end">
                                                                                                <CustomWidthTooltip arrow placement="top-end" title="Name of the user.">
                                                                                                      <IconButton aria-label="center ToolTip Icon" edge="end">
                                                                                                            <Iconify icon="eva:question-mark-circle-outline" />
                                                                                                      </IconButton>
                                                                                                </CustomWidthTooltip>
                                                                                          </InputAdornment>
                                                                                    }
                                                                              />
                                                                              <FormHelperText error id="center-error" sx={{ fontWeight: 600 }}>
                                                                                    {touched.center && errors.center}
                                                                              </FormHelperText>
                                                                        </FormControl>
                                                                  </Item>
                                                            </Grid>
                                                            <Grid item xs={12} md={6} lg={6}>
                                                                  <Item>
                                                                        <FormControl fullWidth>
                                                                              <InputLabel>Designation</InputLabel>
                                                                              <OutlinedInput
                                                                                    type="text"
                                                                                    {...getFieldProps('designation')}
                                                                                    error={Boolean(touched.designation && errors.designation)}
                                                                                    label="Designation"
                                                                                    endAdornment={
                                                                                          <InputAdornment position="end">
                                                                                                <CustomWidthTooltip arrow placement="top-end" title="Name of the user.">
                                                                                                      <IconButton aria-label="designation ToolTip Icon" edge="end">
                                                                                                            <Iconify icon="eva:question-mark-circle-outline" />
                                                                                                      </IconButton>
                                                                                                </CustomWidthTooltip>
                                                                                          </InputAdornment>
                                                                                    }
                                                                              />
                                                                              <FormHelperText error id="designation-error" sx={{ fontWeight: 600 }}>
                                                                                    {touched.designation && errors.designation}
                                                                              </FormHelperText>
                                                                        </FormControl>
                                                                  </Item>
                                                            </Grid>
                                                      </Grid>
                                                      <Grid container spacing={2} sx={{ maxWidth: '100%' }}>
                                                            <Grid item xs={12} md={6} lg={6}>
                                                                  <Item>
                                                                        <FormControl fullWidth>
                                                                              <InputLabel>Mobile Phone</InputLabel>
                                                                              <OutlinedInput
                                                                                    type="text"
                                                                                    {...getFieldProps('mobile_phone')}
                                                                                    error={Boolean(touched.mobile_phone && errors.mobile_phone)}
                                                                                    label="Mobile Phone"

                                                                              />
                                                                              <FormHelperText error id="mobile_phone-error" sx={{ fontWeight: 600 }}>
                                                                                    {touched.mobile_phone && errors.mobile_phone}
                                                                              </FormHelperText>
                                                                        </FormControl>
                                                                  </Item>
                                                            </Grid>
                                                            <Grid item xs={12} md={6} lg={6}>
                                                                  <Item>
                                                                        <FormControl fullWidth>
                                                                              <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                                                              <Select
                                                                                    error={Boolean(touched.user_type && errors.user_type)}
                                                                                    {...getFieldProps('user_type')}
                                                                                    required
                                                                                    label="Role"
                                                                                    style={{ textAlign: 'left' }}
                                                                              >
                                                                                    <MenuItem
                                                                                          value="1"
                                                                                    >Manager</MenuItem>
                                                                                    <MenuItem
                                                                                          value="2"
                                                                                    >Staff</MenuItem>

                                                                              </Select>
                                                                              <FormHelperText error id="user_type-error" sx={{ fontWeight: 600 }}>
                                                                                    {touched.user_type && errors.user_type}
                                                                              </FormHelperText>
                                                                        </FormControl>
                                                                  </Item>
                                                            </Grid>
                                                      </Grid>
                                                      <Grid container spacing={2} sx={{ maxWidth: '100%' }}>
                                                            <Grid item xs={12} md={6} lg={6}>
                                                                  <Item>
                                                                        <FormControl fullWidth>
                                                                              <InputLabel id="">Password</InputLabel>
                                                                              <OutlinedInput
                                                                                    error={Boolean(touched.password && errors.password)}
                                                                                    type={values.showPassword ? 'text' : 'password'}
                                                                                    {...getFieldProps('password')}
                                                                                    endAdornment={
                                                                                          <InputAdornment position="end">
                                                                                                <IconButton
                                                                                                      aria-label="toggle password visibility"
                                                                                                      onClick={handleClickShowPassword}
                                                                                                      onMouseDown={handleMouseDownPassword}
                                                                                                      edge="start"
                                                                                                >
                                                                                                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                                                                                </IconButton>
                                                                                                <CustomWidthTooltip
                                                                                                      arrow
                                                                                                      placement="top-end"
                                                                                                      title={
                                                                                                            <span style={{ whiteSpace: 'pre-line' }}>
                                                                                                                  {'This is a default password. \n You can change it when user is created.'}
                                                                                                            </span>
                                                                                                      }
                                                                                                >
                                                                                                      <IconButton aria-label="Password ToolTip Icon" edge="end">
                                                                                                            <Iconify icon="eva:question-mark-circle-outline" />
                                                                                                      </IconButton>
                                                                                                </CustomWidthTooltip>
                                                                                          </InputAdornment>
                                                                                    }
                                                                                    label="Password"
                                                                              />
                                                                              <FormHelperText error id="password-error" sx={{ fontWeight: 600 }}>
                                                                                    {touched.password && errors.password}
                                                                              </FormHelperText>
                                                                        </FormControl>

                                                                  </Item>
                                                            </Grid>
                                                            <Grid item xs={12} md={6} lg={6}>
                                                                  <Item>
                                                                        <Button variant="contained" type="submit" startIcon={<Iconify icon="eva:save-fill" />}>
                                                                              Save
                                                                        </Button>
                                                                  </Item>
                                                            </Grid>
                                                      </Grid>

                                                </Container>
                                          </Scrollbar>
                                    </Card>
                              </Form>
                        </FormikProvider>
                  </Container>
            </Page >
      );
}
