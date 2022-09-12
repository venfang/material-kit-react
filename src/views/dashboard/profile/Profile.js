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
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Input from '@mui/material/Input';
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
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import PageNavBar from '../../../layouts/dashboard/PageNavBar';
import Loader from '../../../components/loader/Loader';
import { AlertBox, TimerAlertBox } from '../../../components/alert/SweetAlert';

// components

import Page from '../../../components/Page';

import Scrollbar from '../../../components/Scrollbar';
import Iconify from '../../../components/Iconify';

import { getUserDetail } from '../../../data/user/user';

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
  const [showCookieUserID, setCookieUserID] = useState(Cookies.get('user_name'));

  useEffect(() => {
    formik.setSubmitting(true);
    getUserDetail(showCookieUserID)
      .then((data) => {
        formik.setValues(data);
        console.log(data);
        formik.setSubmitting(false);
      })
      .catch(() => {
        TimerAlertBox('error', 'Database Connection Error', '', 1500, 'center');
        formik.setSubmitting(false);
      })
  }, []);

  const handleReset = () => {
    window.location.reload(true);
  };

  const EditProfileSchema = Yup.object().shape({
    user_name: Yup.string().required('User ID is required.'),
    name: Yup.string().required('Name is required.').matches(/^[a-zA-Z\s]+$/, "Only letters and space are allowed. "),
    email: Yup.string().email('Email must be a valid email address.').required('Email is required'),
  });

  const formik = useFormik({
    initialValues: {
      user_name: '',
      user_type: '',
      name: '',
      center_id: '',
      email: '',
      designation: '',
      mobile_phone: '',
    },
    validationSchema: EditProfileSchema,
    onSubmit: () => {
      const formValues = {
        user_name: values.user_name,
        name: values.name,

      };

      // updateProfileDetail(formValues)
      //   .then((response) => {
      //     formik.setSubmitting(false);

      //     window.localStorage.setItem("user_image", values.image);

      //     AlertBox('success', 'Updated Successfully', 'Profile has been updated.', false, '', true, 'OK').then(() => {
      //       window.location.href = `${window.location.origin}/dashboard/profile`;
      //     });
      //   })
      //   .catch((error) => {
      //     formik.setSubmitting(false);

      //     if (error.response.data.message === 'duplicate') {
      //       AlertBox(
      //         'error',
      //         'Update Failed',
      //         'The following user name has already existed.',
      //         false,
      //         '',
      //         true,
      //         'OK'
      //       ).then(() => { });
      //     } else {
      //       AlertBox('error', 'Update Failed', error.response.data.message, false, '', true, 'OK').then(() => { });
      //     }
      //   });
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
  const topValue = 64;
  const title_name = "Profile";
  const to = "/dashboard/app";
  return (
    <Page title="Profile">
      <Container>
        <Loader spinner={isSubmitting} />
        <PageNavBar topValue={topValue} title_name={title_name} to={to} />
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Card sx={{ marginTop: 8, }} >
              <Scrollbar>
                <Container sx={{ minHeight: 500, p: 5 }} >
                  <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Stack direction="row">
                      <Item>
                        <Button
                          color="error"
                          onClick={handleReset}
                          variant="contained"
                          component={RouterLink}
                          to="#"
                          startIcon={<Iconify icon="bx:reset" />}
                        >
                          Reset
                        </Button>
                      </Item>

                      <Item>
                        <Button variant="contained" type="submit" startIcon={<Iconify icon="eva:save-fill" />}>
                          Update
                        </Button>
                      </Item>
                    </Stack>
                  </Stack>
                  <Grid container spacing={2} sx={{ maxWidth: '100%' }} xs={12} md={12} lg={12} >
                    <Grid item container xs={12} md={6} lg={6}  >
                      <Grid item xs={12} md={12} lg={12}>
                        <Item>
                          <Typography variant="title_page">Personal Info</Typography>
                        </Item>
                      </Grid>
                      <Grid item xs={12} md={12} lg={12}>
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
                      <Grid item xs={12} md={12} lg={12}>
                        <Item>
                          <FormControl fullWidth>
                            <InputLabel>Center</InputLabel>
                            <Select
                              readOnly
                              style={{ textAlign: 'left' }}
                              label="Center"
                              {...getFieldProps('center_id')}

                            >
                              <MenuItem
                                value="1"
                              >KL</MenuItem>
                              <MenuItem
                                value="2"
                              >JB</MenuItem>
                            </Select>
                            <FormHelperText error id="center_id-error" sx={{ fontWeight: 600 }}>
                              {touched.center_id && errors.center_id}
                            </FormHelperText>
                          </FormControl>
                        </Item>
                      </Grid>
                      <Grid item xs={12} md={12} lg={12}>
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
                      <Grid item xs={12} md={12} lg={12}>
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
                      <Grid item xs={12} md={12} lg={12}>
                        <Item>
                          <FormControl fullWidth>
                            <InputLabel>Email</InputLabel>
                            <OutlinedInput
                              type="text"
                              {...getFieldProps('email')}
                              error={Boolean(touched.email && errors.email)}
                              label="Email"
                              endAdornment={
                                <InputAdornment position="end">
                                  <CustomWidthTooltip arrow placement="top-end" title="Please provide real email.">
                                    <IconButton aria-label="Email ToolTip Icon" edge="end">
                                      <Iconify icon="eva:question-mark-circle-outline" />
                                    </IconButton>
                                  </CustomWidthTooltip>
                                </InputAdornment>
                              }
                            />
                            <FormHelperText error id="email-error" sx={{ fontWeight: 600 }}>
                              {touched.email && errors.email}
                            </FormHelperText>
                          </FormControl>
                        </Item>
                      </Grid>
                    </Grid>
                    <Grid item container xs={12} md={6} lg={6} alignContent="start">
                      <Grid item xs={12} md={12} lg={12}>
                        <Item>
                          <Typography variant="title_page">Login Info</Typography>
                        </Item>
                      </Grid>
                      <Grid item xs={12} md={12} lg={12} >
                        <Item>
                          <FormControl fullWidth>
                            <InputLabel>User Name</InputLabel>
                            <OutlinedInput
                              readOnly
                              sx={{ color: "#696969" }}
                              type="text"
                              {...getFieldProps('user_name')}
                              error={Boolean(touched.user_name && errors.user_name)}
                              label="User Name"
                              endAdornment={
                                <InputAdornment position="end">
                                  <CustomWidthTooltip
                                    arrow
                                    placement="top-end"
                                    title="Unique code that represents the user."
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
                      <Grid item xs={12} md={12} lg={12} >
                        <Item>
                          <Button
                            component={RouterLink}
                            to={'/dashboard/change-password'}
                            variant="outlined"
                            type="submit"
                            size="medium"
                            startIcon={<Iconify icon="material-symbols:change-circle-outline" />}
                          >
                            Change password
                          </Button>
                        </Item>
                      </Grid>
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
