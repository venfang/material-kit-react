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

import { useEffect, useContext, useState } from 'react';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { faker } from '@faker-js/faker';
import * as React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import Cookies from 'js-cookie';
// @mui
import { useTheme, alpha, styled } from '@mui/material/styles';
import { Grid, Container, MenuItem, Select, InputLabel, OutlinedInput, Typography, FormHelperText, Radio, FormControl, FormControlLabel, RadioGroup, Box, Stack, Button, Tabs, InputAdornment, Tab, Paper, InputBase, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, tableCellClasses, } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { getAllUser } from '../../../data/user/user';
// components
import Loader from '../../../components/loader/Loader';
import Label from '../../../components/Label';
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import SearchNotFound from '../../../components/SearchNotFound';
import { AlertBox, TimerAlertBox } from '../../../components/alert/SweetAlert';
import PageNavBar from '../../../layouts/dashboard/PageNavBar';

const Item = styled(Paper)(({ theme }) => ({
      backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.head}`]: {
            backgroundColor: "#1565c0",
            color: theme.palette.common.white,
            fontSize: 12,
      },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
      // hide last border
      '& td, & th': {
            fontSize: 11,
            fontWeight: 500,
            '&:hover': {
                  color: '#1565c0',
                  cursor: "pointer",
            },
      },
      '&:last-child td, &:last-child th': {
            border: 0,
      },

}));

export default function Lab() {
      const navigate = useNavigate()
      const topValue = 64;
      const title_name = "User";
      const to = "/dashboard/app";
      const [userList, setUserList] = useState([]);
      const formik = useFormik({
            initialValues: {
                  name: '',
                  status: '',
                  center_id: ''
            },
            onSubmit: () => {
                  formik.setSubmitting(true);
                  getAllUser(values).then((data) => {
                        setUserList(data);
                        formik.setSubmitting(false);
                  }).catch(() => {
                        TimerAlertBox('error', 'Database Connection Error', '', 1500, 'center');
                        formik.setSubmitting(false);
                  });
            }

      })
      const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

      useEffect(() => {
            formik.setSubmitting(true);
            getAllUser(formik.initialValues).then((data) => {
                  setUserList(data);
                  formik.setSubmitting(false);
            }).catch(() => {
                  TimerAlertBox('error', 'Database Connection Error', '', 1500, 'center');
                  formik.setSubmitting(false);
            });
      }, []);
      useEffect(() => {
            if (values.status === "1") {
                  formik.setFieldValue("status", null);
            }
      }, [formik.values.status]);
      return (
            <Page Page title="User"  >
                  <Loader spinner={isSubmitting} />
                  <PageNavBar topValue={topValue} title_name={title_name} to={to} />
                  <Container sx={{ marginTop: 8, paddingRight: 1, paddingLeft: 1, width: "100%", height: "100%" }} disableGutters={true} >
                        <Paper>
                              <Grid container spacing={1} sx={{ maxWidth: '100%' }}>
                                    <Grid item xs={12} md={2.4} lg={2.4}>
                                          <Item>
                                                <FormControl fullWidth>
                                                      <InputLabel>Name</InputLabel>
                                                      <OutlinedInput
                                                            type="text"
                                                            {...getFieldProps('name')}
                                                            label="Name"
                                                      />
                                                </FormControl>
                                          </Item>
                                    </Grid>
                                    <Grid item xs={12} md={2.4} lg={2.4}>
                                          <Item>
                                                <FormControl fullWidth>
                                                      <InputLabel>Status</InputLabel>
                                                      <Select
                                                            style={{ textAlign: 'left' }}
                                                            label="Status"
                                                            {...getFieldProps('status')}
                                                      >
                                                            <MenuItem
                                                                  value="1"
                                                            >All</MenuItem>
                                                            <MenuItem
                                                                  value={true}
                                                            >Active</MenuItem>
                                                            <MenuItem
                                                                  value={false}
                                                            >Inactive</MenuItem>
                                                      </Select>
                                                </FormControl>
                                          </Item>
                                    </Grid>
                                    <Grid item xs={12} md={2.4} lg={2.4}>
                                          <Item>
                                                <FormControl fullWidth>
                                                      <InputLabel>Center</InputLabel>
                                                      <Select
                                                            style={{ textAlign: 'left' }}
                                                            label="center_id"
                                                            {...getFieldProps('center_id')}

                                                      >
                                                            <MenuItem
                                                                  value={null}
                                                            >All</MenuItem>
                                                            <MenuItem
                                                                  value="1"
                                                            >KL</MenuItem>
                                                            <MenuItem
                                                                  value="2"
                                                            >JB</MenuItem>
                                                      </Select>
                                                      <FormHelperText error id="center_id_id-error" sx={{ fontWeight: 600 }}>
                                                            {touched.center_id && errors.center_id}
                                                      </FormHelperText>
                                                </FormControl>
                                          </Item>
                                    </Grid>
                                    <Grid item xs={12} md={2.4} lg={2.4}>
                                          <Item>
                                                <Button
                                                      startIcon={<Iconify icon="akar-icons:search" />}
                                                      fullWidth
                                                      onClick={() => {
                                                            handleSubmit();
                                                      }}>Search
                                                </Button>
                                          </Item>
                                    </Grid>
                                    <Grid item xs={12} md={2.4} lg={2.4}>
                                          <Item>
                                                <Button variant="return" component={RouterLink} to="./create"
                                                      startIcon={<Iconify icon="ant-design:user-add-outlined" />}
                                                >
                                                      New User
                                                </Button>
                                          </Item>
                                    </Grid>

                              </Grid>
                        </Paper>
                        <TableContainer component={Paper}>
                              <Table sx={{ minWidth: 800 }} aria-label="customized table" size="small">
                                    <TableHead>
                                          <TableRow>
                                                <StyledTableCell align='center'>User Name</StyledTableCell>
                                                <StyledTableCell align="center">Name</StyledTableCell>
                                                <StyledTableCell align="center">Role</StyledTableCell>
                                                <StyledTableCell align="center">Center</StyledTableCell>
                                                <StyledTableCell align="center">Designation</StyledTableCell>
                                                <StyledTableCell align="center">Mobile Phone</StyledTableCell>
                                                <StyledTableCell align="center">Status</StyledTableCell>
                                          </TableRow>
                                    </TableHead>
                                    <TableBody>
                                          {userList.map((row) => {
                                                let center_text = "";
                                                if (row.center_id === "1") {
                                                      center_text = "KL";
                                                }
                                                else if (row.center_id === "2") {
                                                      center_text = "JB";
                                                }
                                                let user_type_text = "";
                                                if (row.user_type === "1") {
                                                      user_type_text = "Manager";
                                                }
                                                else if (row.user_type === "2") {
                                                      user_type_text = "Staff";
                                                }
                                                return (
                                                      <StyledTableRow
                                                            hover
                                                            key={row.user_name}
                                                            onDoubleClick={e => { // <--- this is how you can catch DoubleClick on row
                                                                  navigate(`./edit/${row.user_name}`, { replace: false });
                                                            }}
                                                      >
                                                            <StyledTableCell component="th" scope="row" align='center'>
                                                                  {row.user_name}
                                                            </StyledTableCell>
                                                            <StyledTableCell component="th" scope="row" align='center'>
                                                                  {row.name}
                                                            </StyledTableCell>
                                                            <StyledTableCell component="th" scope="row" align='center'>
                                                                  {user_type_text}
                                                            </StyledTableCell>
                                                            <StyledTableCell component="th" scope="row" align='center'>
                                                                  {center_text}
                                                            </StyledTableCell>
                                                            <StyledTableCell component="th" scope="row" align='center'>
                                                                  {row.designation}
                                                            </StyledTableCell>
                                                            <StyledTableCell component="th" scope="row" align='center'>
                                                                  {row.mobile_phone}
                                                            </StyledTableCell>
                                                            <StyledTableCell component="th" scope="row" align='center'>
                                                                  <Label variant="ghost" color={(row.status === false && 'error') || 'success'}>
                                                                        {(row.status === false && 'inactive') || 'active'}
                                                                  </Label>
                                                            </StyledTableCell>
                                                      </StyledTableRow>
                                                )
                                          }
                                          )}
                                    </TableBody>
                                    {userList.length < 1 && (
                                          <TableBody>
                                                <TableRow>
                                                      <TableCell align="center" colSpan={7} sx={{ py: 3 }}>
                                                            <SearchNotFound />
                                                      </TableCell>
                                                </TableRow>
                                          </TableBody>
                                    )}
                              </Table>
                        </TableContainer>
                  </Container>

            </Page >
      )
}
