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

import { useEffect, useState } from 'react';
import * as React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// @mui
import { styled } from '@mui/material/styles';
import {
  Container, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, tableCellClasses,
  Dialog, DialogTitle, Grid, DialogContent, DialogActions,
  FormControl, InputLabel, OutlinedInput, Select, MenuItem

} from '@mui/material';
import { getAllReport } from '../../../data/lab/lab';
import { getAllFacility } from '../../../data/facility/facility';
// components
import Loader from '../../../components/loader/Loader';
import Page from '../../../components/Page';
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import { TimerAlertBox } from '../../../components/alert/SweetAlert';
import PageNavBar from '../../../layouts/dashboard/PageNavBar';
import SearchNotFound from '../../../components/SearchNotFound';

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

const StyledTableRow = styled(TableRow)(() => ({
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
  const title_name = "LAB TEST";
  const to = "/dashboard/app";
  const [reportList, setReportList] = useState([]);
  const [facilityList, setFacilityList] = useState([]);
  const [filterDialog, setFilterDialog] = useState(false);
  const formik = useFormik({
    initialValues: {
      barcode: '',
      order_id: '',
      test_date: '',
      ic_no: '',
      facility_id: ''
    },
    onSubmit: () => {
      formik.setSubmitting(true);
      getAllReport(values).then((data) => {
        setReportList(data);
        formik.setSubmitting(false);
      }).catch((err) => {
        console.log(err);
        TimerAlertBox('error', 'Database Connection Error', '', 1500, 'center');
        formik.setSubmitting(false);
      });
    }

  })
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
  useEffect(() => {
    formik.setSubmitting(true);
    getAllReport(formik).then((data) => {
      setReportList(data);
      formik.setSubmitting(false);
    }).catch((err) => {
      console.log(err);
      TimerAlertBox('error', 'Database Connection Error', '', 1500, 'center');
      formik.setSubmitting(false);
    });
    getAllFacility().then((data) => {
      setFacilityList(data);
      formik.setSubmitting(false);
    }).catch((err) => {
      console.log(err);
      TimerAlertBox('error', 'Database Connection Error', '', 1500, 'center');
      formik.setSubmitting(false);
    });
  }, []);
  const openFilterDialog = () => {
    setFilterDialog(true);
  };

  const closeFilterDialog = () => {
    setFilterDialog(false);
  };

  return (
    < Page title="Lab"  >
      <Loader spinner={isSubmitting} />
      <PageNavBar topValue={topValue} title_name={title_name} to={to} />
      <Container sx={{ marginTop: 8, paddingRight: 1, paddingLeft: 1, width: "100%", height: "100%" }} disableGutters={true} >
        <Button startIcon={<Iconify icon="ci:filter" />} onClick={openFilterDialog}>Filter</Button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 800 }} aria-label="customized table" size="small">
            <TableHead>
              <TableRow>
                <StyledTableCell align='center'>Barcode</StyledTableCell>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">I/C</StyledTableCell>
                <StyledTableCell align="center">Age</StyledTableCell>
                <StyledTableCell align="center">Gender</StyledTableCell>
                <StyledTableCell align="center">Package</StyledTableCell>
                <StyledTableCell align="center">Facility</StyledTableCell>
                <StyledTableCell align="center">Immunology Test</StyledTableCell>
                <StyledTableCell align="center">Biochemistry Test</StyledTableCell>
                <StyledTableCell align="center">Urine Test</StyledTableCell>
                <StyledTableCell align="center">Blood Test</StyledTableCell>
                <StyledTableCell align="center">Verify report</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reportList !== null && reportList.map((row) => {
                let colorImmunology = "";
                let textImmunology = "";
                let colorBlood = "";
                let textBlood = "";
                let colorUrine = "";
                let textUrine = "";
                let colorBiochemistry = "";
                let textBiochemistry = "";
                if (row.immunology_confirm_date !== null && row.immunology_confirm_staff !== null) {
                  colorImmunology = "success";
                  textImmunology = "Completed";
                }
                else if (row.immunology_release_date !== null && row.immunology_release_staff !== null) {
                  colorImmunology = "primary";
                  textImmunology = "Release";
                }
                else {
                  colorImmunology = "error";
                  textImmunology = "Pending";
                }

                if (row.blood_confirm_date !== null && row.blood_confirm_staff !== null) {
                  colorBlood = "success";
                  textBlood = "Completed";
                }
                else if (row.blood_release_date !== null && row.blood_release_staff !== null) {
                  colorBlood = "primary";
                  textBlood = "Release";
                }
                else {
                  colorBlood = "error";
                  textBlood = "Pending";
                }

                if (row.urine_confirm_date !== null && row.urine_confirm_staff !== null) {
                  colorUrine = "success";
                  textUrine = "Completed";
                }
                else if (row.urine_release_date !== null && row.urine_release_staff !== null) {
                  colorUrine = "primary";
                  textUrine = "Release";
                }
                else {
                  colorUrine = "error";
                  textUrine = "Pending";
                }

                if (row.biochemistry_confirm_date !== null && row.biochemistry_confirm_staff !== null) {
                  colorBiochemistry = "success";
                  textBiochemistry = "Completed";
                }
                else if (row.biochemistry_release_date !== null && row.biochemistry_release_staff !== null) {
                  colorBiochemistry = "primary";
                  textBiochemistry = "Release";
                }
                else {
                  colorBiochemistry = "error";
                  textBiochemistry = "Pending";
                }


                return (
                  <StyledTableRow
                    hover
                    key={row.report_id}
                    onDoubleClick={() => { // <--- this is how you can catch DoubleClick on row
                      navigate(`./edit/${row.report_id}`, { replace: false });
                    }}
                  >
                    <StyledTableCell component="th" scope="row" align='center'>
                      {row.barcode}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row" align='center'>
                      {`${row.last_name} ${row.first_name}`}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row" align='center'>
                      {row.ic_no}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row" align='center'>
                      {row.age}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row" align='center'>
                      {row.gender}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row" align='center'>
                      {row.package_name}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row" align='center'>
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row" align='center'>
                      <Label variant="ghost" color={colorImmunology}>
                        {textImmunology}
                      </Label>
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row" align='center'>
                      <Label variant="ghost" color={colorBiochemistry}>
                        {textBiochemistry}
                      </Label>
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row" align='center'>
                      <Label variant="ghost" color={colorUrine}>
                        {textUrine}
                      </Label>
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row" align='center'>
                      <Label variant="ghost" color={colorBlood}>
                        {textBlood}
                      </Label>
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row" align='center'>
                      <Button component={RouterLink} to={`./edit/${row.report_id}`}>
                        <Iconify icon="ant-design:file-pdf-outlined" sx={{ fontSize: 20 }} />
                      </Button>
                    </StyledTableCell>

                  </StyledTableRow>
                )
              }
              )}
            </TableBody>
            {reportList.length < 1 && (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={12} sx={{ py: 3 }}>
                    <SearchNotFound />
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Container>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Dialog open={filterDialog} onClose={closeFilterDialog} fullWidth={true} maxWidth={"md"} sx={{ zIndex: 900, }}>
            <DialogTitle>Filter Lab Test</DialogTitle>
            <DialogContent>
              <Container>
                <Grid container spacing={2} sx={{ maxWidth: '100%' }}>
                  <Grid item xs={12} md={6} lg={6}>
                    <Item>
                      <FormControl fullWidth>
                        <InputLabel>Barcode</InputLabel>
                        <OutlinedInput
                          type="text"
                          {...getFieldProps('barcode')}
                          label="Barcode"
                        />
                      </FormControl>
                    </Item>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <Item>
                      <FormControl fullWidth>
                        <InputLabel>IC</InputLabel>
                        <OutlinedInput
                          type="text"
                          {...getFieldProps('ic_no')}
                          label="Name"
                        />
                      </FormControl>
                    </Item>
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ maxWidth: '100%' }}>
                  <Grid item xs={12} md={6} lg={6}>
                    <Item>
                      <FormControl fullWidth>
                        <InputLabel>Facility</InputLabel>
                        <Select
                          style={{ textAlign: 'left' }}
                          label="Facility"
                          {...getFieldProps('facility_id')}

                        >
                          <MenuItem
                            value=""
                          >All</MenuItem>
                          {facilityList.map((facility) => (
                            <MenuItem
                              key={facility.facility_id}
                              value={facility.facility_id}
                            >{facility.name}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Item>
                  </Grid>
                  {/* <Grid item xs={12} md={6} lg={6}>
                                                            <Item>
                                                                  <FormControl fullWidth>
                                                                        <InputLabel>test Date</InputLabel>
                                                                        <OutlinedInput
                                                                              type="text"
                                                                              {...getFieldProps('test_date')}
                                                                              label="Name"
                                                                        />
                                                                  </FormControl>
                                                            </Item>
                                                      </Grid> */}
                </Grid>

              </Container>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeFilterDialog}>Cancel</Button>
              <Button onClick={() => {
                closeFilterDialog();
                handleSubmit();
              }}>Search</Button>
            </DialogActions>
          </Dialog>
        </Form>
      </FormikProvider>
    </Page>
  )
}
