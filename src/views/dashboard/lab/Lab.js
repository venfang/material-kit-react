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
import { Grid, Container, Typography, FormHelperText, Radio, FormControl, FormControlLabel, RadioGroup, Box, Stack, Button, Tabs, InputAdornment, Tab, Paper, InputBase, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, tableCellClasses, } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { getAllReport } from '../../../data/lab/lab';
// components
import Loader from '../../../components/loader/Loader';
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import { AlertBox, TimerAlertBox } from '../../../components/alert/SweetAlert';
import SequenceBar from '../../../layouts/dashboard/SequenceBar';
import PageNavBar from '../../../layouts/dashboard/PageNavBar';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.head}`]: {
            backgroundColor: "#1565c0",
            color: theme.palette.common.white,
      },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
      // hide last border
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
      const [isSubmitting, setSubmitting] = useState(true);
      useEffect(() => {
            getAllReport().then((data) => {
                  setReportList(data);
                  setSubmitting(false);
            }).catch(() => {
                  TimerAlertBox('error', 'Database Connection Error', '', 1500, 'center');
                  setSubmitting(false);
            });
      }, []);
      return (
            <Page Page title="Lab"  >
                  <Loader spinner={isSubmitting} />
                  <PageNavBar topValue={topValue} title_name={title_name} to={to} />
                  <Container sx={{ marginTop: 8, paddingRight: 8, paddingLeft: 8, width: "100%", height: "100%" }} disableGutters={true} >
                        <TableContainer component={Paper}>
                              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                    <TableHead>
                                          <TableRow>
                                                <StyledTableCell align='center'>Seq No.</StyledTableCell>
                                                <StyledTableCell align="center">Name</StyledTableCell>
                                                <StyledTableCell align="center">Age</StyledTableCell>
                                                <StyledTableCell align="center">Gender</StyledTableCell>
                                                <StyledTableCell align="center">Package</StyledTableCell>
                                                <StyledTableCell align="center">Immunology Test</StyledTableCell>
                                                <StyledTableCell align="center">Biochemistry Test</StyledTableCell>
                                                <StyledTableCell align="center">Urine Test</StyledTableCell>
                                                <StyledTableCell align="center">Blood Test</StyledTableCell>
                                          </TableRow>
                                    </TableHead>
                                    <TableBody>
                                          {reportList.map((row) => {
                                                let colorImmunology = "";
                                                let textImmunology = "";
                                                let colorBlood = "";
                                                let textBlood = "";
                                                let colorUrine = "";
                                                let textUrine = "";
                                                let colorBiochemistry = "";
                                                let textBiochemistry = "";
                                                if (row.immunology_confirm_date !== null && row.immunology_confirm_staff !== null) {
                                                      colorImmunology = "#00c853";
                                                      textImmunology = "Completed";
                                                }
                                                else if (row.immunology_confirm_date === null && row.immunology_confirm_staff === null) {
                                                      colorImmunology = "#e65100"
                                                      textImmunology = "Pending";
                                                }
                                                else {
                                                      colorImmunology = "transparent"
                                                      textImmunology = "-";
                                                }

                                                if (row.blood_confirm_date !== null && row.blood_confirm_staff !== null) {
                                                      colorBlood = "#00c853";
                                                      textBlood = "Completed";
                                                }
                                                else if (row.blood_confirm_date === null && row.blood_confirm_staff === null) {
                                                      colorBlood = "#e65100"
                                                      textBlood = "Pending";
                                                }
                                                else {
                                                      colorBlood = "transparent"
                                                      textBlood = "-";
                                                }

                                                if (row.urine_confirm_date !== null && row.urine_confirm_staff !== null) {
                                                      colorUrine = "#00c853";
                                                      textUrine = "Completed";
                                                }
                                                else if (row.urine_confirm_date === null && row.urine_confirm_staff === null) {
                                                      colorUrine = "#e65100"
                                                      textUrine = "Pending";
                                                }
                                                else {
                                                      colorUrine = "transparent"
                                                      textUrine = "-";
                                                }

                                                if (row.biochemistry_confirm_date !== null && row.biochemistry_confirm_staff !== null) {
                                                      colorBiochemistry = "#00c853";
                                                      textBiochemistry = "Completed";
                                                }
                                                else if (row.biochemistry_confirm_date === null && row.biochemistry_confirm_staff === null) {
                                                      colorBiochemistry = "#e65100"
                                                      textBiochemistry = "Pending";
                                                }
                                                else {
                                                      colorBiochemistry = "transparent"
                                                      textBiochemistry = "-";
                                                }

                                                return (
                                                      <StyledTableRow
                                                            key={row.report_id}
                                                            onDoubleClick={e => { // <--- this is how you can catch DoubleClick on row
                                                                  navigate(`./edit/${row.report_id}`, { replace: false });
                                                            }}
                                                      >
                                                            <StyledTableCell component="th" scope="row" align='center'>
                                                                  {row.report_id}
                                                            </StyledTableCell>
                                                            <StyledTableCell component="th" scope="row" align='center'>
                                                                  {`${row.last_name} ${row.first_name}`}
                                                            </StyledTableCell>
                                                            <StyledTableCell component="th" scope="row" align='center'>
                                                                  {row.age}
                                                            </StyledTableCell>
                                                            <StyledTableCell component="th" scope="row" align='center'>
                                                                  {row.gender}
                                                            </StyledTableCell>
                                                            <StyledTableCell component="th" scope="row" align='center'>
                                                                  {row.package_id}
                                                            </StyledTableCell>
                                                            <StyledTableCell component="th" scope="row" align='center'>
                                                                  <Typography><Iconify icon="akar-icons:circle-fill" height="10px" width="10px" color={colorImmunology} /> {textImmunology}</Typography>
                                                            </StyledTableCell>
                                                            <StyledTableCell component="th" scope="row" align='center'>
                                                                  <Typography><Iconify icon="akar-icons:circle-fill" height="10px" width="10px" color={colorBiochemistry} /> {textBiochemistry}</Typography>
                                                            </StyledTableCell>
                                                            <StyledTableCell component="th" scope="row" align='center'>
                                                                  <Typography><Iconify icon="akar-icons:circle-fill" height="10px" width="10px" color={colorUrine} /> {textUrine}</Typography>
                                                            </StyledTableCell>
                                                            <StyledTableCell component="th" scope="row" align='center'>
                                                                  <Typography><Iconify icon="akar-icons:circle-fill" height="10px" width="10px" color={colorBlood} /> {textBlood}</Typography>
                                                            </StyledTableCell>
                                                      </StyledTableRow>
                                                )
                                          }
                                          )}
                                    </TableBody>
                              </Table>
                        </TableContainer>
                  </Container>

            </Page>
      )
}
