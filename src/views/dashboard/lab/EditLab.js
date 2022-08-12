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
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import Cookies from 'js-cookie';
// @mui
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { useTheme, alpha, styled } from '@mui/material/styles';
import { Grid, Container, Typography, AppBar, FormHelperText, Radio, FormControl, FormControlLabel, RadioGroup, Box, Stack, Button, Tabs, InputAdornment, Tab, Paper, InputBase, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import { AlertBox, TimerAlertBox } from '../../../components/alert/SweetAlert';
import SequenceBar from '../../../layouts/dashboard/SequenceBar';
import { getReport, confirmBloodTest, confirmImmunology, confirmBiochemistry, confirmUrine } from '../../../data/lab/lab';

const Item = styled(Paper)(({ theme }) => ({
      backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
}));

export default function Lab() {
      const [value, setTabValue] = useState("1");
      const { report_id } = useParams();
      const navigate = useNavigate();
      const topValue = 64;
      const handleTabChange = (event, newValue) => {
            setTabValue(newValue);
      }
      const [submitAction, setSubmitAction] = useState("");

      useEffect(() => {
            getReport(report_id).then((data) => {
                  formik.setValues(data);
                  formik.setSubmitting(false);
            }).catch(() => {
                  formik.setSubmitting(false);
            });

      }, []);

      const LabSchema = Yup.object().shape({

      });
      const formik = useFormik({
            initialValues: {
                  BloodHB_current: '',
                  BloodHB_past: '-',
                  BloodHB_previous: '-',
                  BloodHB_unit: 'g/dl',
                  BloodRBC_current: '',
                  BloodRBC_past: '-',
                  BloodRBC_previous: '-',
                  BloodRBC_unit: 'x 10^6/uL',
                  BloodWBC_current: '',
                  BloodWBC_past: '-',
                  BloodWBC_previous: '-',
                  BloodWBC_unit: 'x 10^3/uL',
                  BloodW1_current: '',
                  BloodW1_past: '-',
                  BloodW1_previous: '-',
                  BloodW1_unit: '%',
                  BloodW2_current: '',
                  BloodW2_past: '-',
                  BloodW2_previous: '-',
                  BloodW2_unit: '%',
                  BloodW3_current: '',
                  BloodW3_past: '-',
                  BloodW3_previous: '-',
                  BloodW3_unit: '%',
                  BloodW4_current: '',
                  BloodW4_past: '-',
                  BloodW4_previous: '-',
                  BloodW4_unit: '%',
                  BloodW5_current: '',
                  BloodW5_past: '-',
                  BloodW5_previous: '-',
                  BloodW5_unit: '%',
                  BloodPLT_current: '',
                  BloodPLT_past: '-',
                  BloodPLT_previous: '-',
                  BloodPLT_unit: 'x 10^3/uL',
                  BloodHCT_current: '',
                  BloodHCT_past: '-',
                  BloodHCT_previous: '-',
                  BloodHCT_unit: '%',
                  BloodMCH_current: '',
                  BloodMCH_past: '-',
                  BloodMCH_previous: '-',
                  BloodMCH_unit: 'pg',
                  BloodMCV_current: '',
                  BloodMCV_past: '-',
                  BloodMCV_previous: '-',
                  BloodMCV_unit: 'fL',
                  BloodMCHC_current: '',
                  BloodMCHC_past: '-',
                  BloodMCHC_previous: '-',
                  BloodMCHC_unit: 'g/dl',
                  BloodType_current: '',
                  BloodType_previous: '-',
                  BloodType_past: '-',

                  HBsag_Status_current: '2',
                  HBsag_Status_previous: '2',
                  HBsag_Status_past: '2',
                  HBsag_Value_current: '',
                  HBsag_Value_previous: '-',
                  HBsag_Value_past: '-',
                  HBsag_unit: 'Negative',

                  AntiHBs_Status_current: '2',
                  AntiHBs_Status_previous: '2',
                  AntiHBs_Status_past: '2',
                  AntiHBs_Value_current: '',
                  AntiHBs_Value_previous: '-',
                  AntiHBs_Value_past: '-',
                  AntiHBs_unit: 'Negative',

                  RANormal_Status_current: '2',
                  RANormal_Status_previous: '2',
                  RANormal_Status_past: '2',
                  RANormal_Value_current: '',
                  RANormal_Value_previous: '-',
                  RANormal_Value_past: '-',
                  RANormal_unit: 'Negative',

                  HavIgG_Status_current: '2',
                  HavIgG_Status_previous: '2',
                  HavIgG_Status_past: '2',
                  HavIgG_Value_current: '',
                  HavIgG_Value_previous: '-',
                  HavIgG_Value_past: '-',
                  HavIgG_unit: 'Negative',

                  HIVNormal_Value_current: '',
                  HIVNormal_Value_previous: '-',
                  HIVNormal_Value_past: '-',
                  HIVNormal_Status_current: '2',
                  HIVNormal_Status_previous: '2',
                  HIVNormal_Status_past: '2',
                  HIVNormal_unit: 'Negative',

                  VDRLNormal_current: '',
                  VDRLNormal_previous: '-',
                  VDRLNormal_past: '-',
                  VDRLNormal_unit: 'Non Reactive',

                  RFFT4_current: '',
                  RFFT4_previous: '-',
                  RFFT4_past: '-',
                  RFFT4_unit: 'pmol/L',

                  Hpyloriab_current: '',
                  Hpyloriab_previous: '-',
                  Hpyloriab_past: '-',
                  Hpyloriab_unit: 'Negative',

                  YFPLevel_current: '',
                  YFPLevel_previous: '-',
                  YFPLevel_past: '-',
                  YFPLevel_unit: 'ng/ml',

                  CEALevel_current: '',
                  CEALevel_previous: '-',
                  CEALevel_past: '-',
                  CEALevel_unit: 'ng/ml',

                  CA15_3_current: '',
                  CA15_3_previous: '-',
                  CA15_3_past: '-',
                  CA15_3_unit: 'U/ml',
                  CA125_current: '',
                  CA125_previous: '-',
                  CA125_past: '-',
                  CA125_unit: 'U/ml',
                  CA19_9_current: '',
                  CA19_9_previous: '-',
                  CA19_9_past: '-',
                  CA19_9_unit: 'U/ml',

                  EBV_current: '',
                  EBV_previous: '-',
                  EBV_past: '-',
                  EBV_unit: '',

                  PSA_current: '',
                  PSA_previous: '-',
                  PSA_past: '-',
                  PSA_unit: 'ng/ml',

                  RFTSH_current: '',
                  RFTSH_previous: '-',
                  RFTSH_past: '-',
                  RFTSH_unit: 'm IU/L',

                  Homocy_current: '',
                  Homocy_previous: '-',
                  Homocy_past: '-',
                  Homocy_unit: '',


                  CRP_current: '',
                  CRP_previous: '-',
                  CRP_past: '-',
                  CRP_unit: '',

                  HbA1c_current: '',
                  HbA1c_previous: '-',
                  HbA1c_past: '-',
                  HbA1c_unit: '%',

                  UFBUN_current: '',
                  UFBUN_previous: '-',
                  UFBUN_past: '-',
                  UFBUN_unit: 'mmol/L',

                  UFCRE_current: '',
                  UFCRE_previous: '-',
                  UFCRE_past: '-',
                  UFCRE_unit: 'umol/L',

                  EFCA_current: '',
                  EFCA_previous: '-',
                  EFCA_past: '-',
                  EFCA_unit: 'mmol/L',

                  EFP_current: '',
                  EFP_previous: '-',
                  EFP_past: '-',
                  EFP_unit: 'mmol/L',

                  UFUA_current: '',
                  UFUA_previous: '-',
                  UFUA_past: '-',
                  UFUA_unit: 'mmol/L',

                  TFTP_current: '',
                  TFTP_previous: '-',
                  TFTP_past: '-',
                  TFTP_unit: 'g/L',

                  TFALB_current: '',
                  TFALB_previous: '-',
                  TFALB_past: '-',
                  TFALB_unit: 'g/L',

                  TFGLO_current: '',
                  TFGLO_previous: '-',
                  TFGLO_past: '-',
                  TFGLO_unit: 'g/L',

                  TFTBIL_current: '',
                  TFTBIL_previous: '-',
                  TFTBIL_past: '-',
                  TFTBIL_unit: 'g/L',

                  TFALP_current: '',
                  TFALP_previous: '-',
                  TFALP_past: '-',
                  TFALP_unit: 'U/L',

                  TFsGOT_current: '',
                  TFsGOT_previous: '-',
                  TFsGOT_past: '-',
                  TFsGOT_unit: 'U/L',

                  TFsGPT_current: '',
                  TFsGPT_previous: '-',
                  TFsGPT_past: '-',
                  TFsGPT_unit: 'U/L',

                  TFYGT_current: '',
                  TFYGT_previous: '-',
                  TFYGT_past: '-',
                  TFYGT_unit: 'U/L',

                  Glucose_current: '',
                  Glucose_previous: '-',
                  Glucose_past: '-',
                  Glucose_unit: 'mmol/L',

                  BGTG_current: '',
                  BGTG_previous: '-',
                  BGTG_past: '-',
                  BGTG_unit: 'mmol/L',

                  BGCHOL_current: '',
                  BGCHOL_previous: '-',
                  BGCHOL_past: '-',
                  BGCHOL_unit: 'mmol/L',

                  BGHDLC_current: '',
                  BGHDLC_previous: '-',
                  BGHDLC_past: '-',
                  BGHDLC_unit: 'mmol/L',

                  BGLDLC_current: '',
                  BGLDLC_previous: '-',
                  BGLDLC_past: '-',
                  BGLDLC_unit: 'mmol/L',

                  BGCH_current: '',
                  BGCH_previous: '-',
                  BGCH_past: '-',
                  BGCH_unit: 'mmol/L',


                  URLook_current: '',
                  URLook_previous: '-',
                  URLook_past: '-',

                  UREW_current: '',
                  UREW_previous: '-',
                  UREW_past: '-',

                  URS_current: '',
                  URS_previous: '-',
                  URS_past: '-',

                  URBR_current: '',
                  URBR_previous: '-',
                  URBR_past: '-',

                  URUBR_current: '',
                  URUBR_previous: '-',
                  URUBR_past: '-',

                  UBBH_current: '',
                  UBBH_previous: '-',
                  UBBH_past: '-',

                  UBKU_current: '',
                  UBKU_previous: '-',
                  UBKU_past: '-',

                  UBSNO_current: '',
                  UBSNO_previous: '-',
                  UBSNO_past: '-',

                  URLEU_current: '',
                  URLEU_previous: '-',
                  URLEU_past: '-',

                  URDENS_current: '',
                  URDENS_previous: '-',
                  URDENS_past: '-',

                  URTest_current: '',
                  URTest_previous: '-',
                  URTest_past: '-',

                  UBRBC1_current: '',
                  UBRBC1_previous: '-',
                  UBRBC1_past: '-',
                  UBRBC2_current: '',
                  UBRBC2_previous: '-',
                  UBRBC2_past: '-',

                  UBWBC1_current: '',
                  UBWBC1_previous: '-',
                  UBWBC1_past: '-',
                  UBWBC2_current: '',
                  UBWBC2_previous: '-',
                  UBWBC2_past: '-',

                  UBEPlit1_current: '',
                  UBEPlit1_previous: '-',
                  UBEPlit1_past: '-',
                  UBEPlit2_current: '',
                  UBEPlit2_previous: '-',
                  UBEPlit2_past: '-',

                  Cast1_current: '',
                  Cast1_previous: '-',
                  Cast1_past: '-',
                  Cast2_current: '',
                  Cast2_previous: '-',
                  Cast2_past: '-',
            },
            enableReinitialize: true,
            validationSchema: LabSchema,
            onSubmit: () => {
                  if (submitAction === "immunology") {
                        console.log(formik.values);
                        immunology();
                  } else if (submitAction === "blood_test") {
                        console.log(formik.values);
                        bloodTest();
                  }
                  else if (submitAction === "urine") {
                        urine();
                  } else if (submitAction === "biochemistry") {
                        biochemistry();
                  }
            },
      });
      const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

      function bloodTest() {
            const formValues = {
                  report_id: report_id,
                  BloodHB: values.BloodHB_current,
                  BloodRBC: values.BloodRBC_current,
                  BloodWBC: values.BloodWBC_current,
                  BloodW1: values.BloodW1_current,
                  BloodW2: values.BloodW2_current,
                  BloodW3: values.BloodW3_current,
                  BloodW4: values.BloodW4_current,
                  BloodW5: values.BloodW5_current,
                  BloodPLT: values.BloodPLT_current,
                  BloodHCT: values.BloodHCT_current,
                  BloodMCH: values.BloodMCH_current,
                  BloodMCV: values.BloodMCV_current,
                  BloodMCHC: values.BloodMCHC_current,
                  BloodType: values.BloodType_current,
                  blood_confirm_staff: Cookies.get('name'),
            };
            confirmBloodTest(formValues)
                  .then((response) => {
                        AlertBox(
                              'success',
                              'Update Successfully',
                              "Asset has been updated.",
                              false,
                              '',
                              true,
                              'OK'
                        )
                              .then(() => {
                                    window.location.reload();
                              });
                  })
                  .catch((error) => {
                        AlertBox(
                              'error',
                              'Update Failed',
                              error.response.data.message,
                              false,
                              '',
                              true,
                              'OK').then(() => {

                              });
                  }
                  );
      }
      function immunology() {
            const formValues = {
                  report_id: report_id,
                  HBsag_Value: values.HBsag_Value_current,
                  AntiHBs_Value: values.AntiHBs_Value_current,
                  RANormal_Value: values.RANormal_Value_current,
                  HavIgG_Value: values.HavIgG_Value_current,
                  HIVNormal_Value: values.HIVNormal_Value_current,
                  VDRLNormal: values.VDRLNormal_current,
                  RFFT4: values.RFFT4_current,
                  Hpyloriab: values.Hpyloriab_current,
                  YFPLevel: values.YFPLevel_current,
                  CEALevel: values.CEALevel_current,
                  CA15_3: values.CA15_3_current,
                  CA125: values.CA125_current,
                  CA19_9: values.CA19_9_current,
                  EBV: values.EBV_current,
                  PSA: values.PSA_current,
                  RFTSH: values.RFFT4_current,
                  Homocy: values.Homocy_current,
                  immunology_confirm_staff: Cookies.get('name'),
            };
            confirmImmunology(formValues)
                  .then((response) => {
                        AlertBox(
                              'success',
                              'Update Successfully',
                              "Asset has been updated.",
                              false,
                              '',
                              true,
                              'OK'
                        )
                              .then(() => {
                                    navigate('/dashboard/asset', { replace: true });
                              });
                  })
                  .catch((error) => {
                        AlertBox(
                              'error',
                              'Update Failed',
                              error.response.data.message,
                              false,
                              '',
                              true,
                              'OK').then(() => {

                              });
                  }
                  );
      }
      function urine() {
            const formValues = {
                  report_id: report_id,
                  BloodHB_current: values.BloodHB_current,
                  BloodRBC_current: values.BloodRBC_current,
                  BloodWBC_current: values.BloodWBC_current,
                  BloodW1_current: values.BloodW1_current,
                  BloodW2_current: values.BloodW2_current,
                  BloodW3_current: values.BloodW3_current,
                  BloodW4_current: values.BloodW4_current,
                  BloodW5_current: values.BloodW5_current,
                  BloodPLT_current: values.BloodPLT_current,
                  BloodHCT_current: values.BloodHCT_current,
                  BloodMCH_current: values.BloodMCH_current,
                  BloodMCV_current: values.BloodMCV_current,
                  BloodMCHC_current: values.BloodMCHC_current,
                  blood_confirm_staff: Cookies.get('name'),
            };
            confirmUrine(formValues)
                  .then((response) => {
                        AlertBox(
                              'success',
                              'Update Successfully',
                              "Asset has been updated.",
                              false,
                              '',
                              true,
                              'OK'
                        )
                              .then(() => {
                                    navigate('/dashboard/asset', { replace: true });
                              });
                  })
                  .catch((error) => {
                        AlertBox(
                              'error',
                              'Update Failed',
                              error.response.data.message,
                              false,
                              '',
                              true,
                              'OK').then(() => {

                              });
                  }
                  );
      }
      function biochemistry() {
            const formValues = {
                  report_id: report_id,
                  CRP: values.CRP_current,
                  HbA1c: values.HbA1c_current,
                  UFBUN: values.UFBUN_current,
                  UFCRE: values.UFCRE_current,
                  EFCA: values.EFCA_current,
                  UFUA: values.UFUA_current,
                  TFTP: values.TFTP_current,
                  TFALB: values.TFALB_current,
                  TFGLO: values.TFGLO_current,
                  TFTBIL: values.TFTBIL_current,
                  TFALP: values.TFALP_current,
                  TFsGOT: values.TFsGOT_current,
                  TFsGPT: values.TFsGPT_current,
                  TFYGT: values.TFYGT_current,
                  Glucose: values.Glucose_current,
                  BGTG: values.BGTG_current,
                  BGCHOL: values.BGCHOL_current,
                  BGHDLC: values.BGHDLC_current,
                  BGLDLC: values.BGLDLC_current,
                  BGCH: values.BGCH_current,
                  biochemistry_confirm_staff: Cookies.get('name'),
            };
            confirmBiochemistry(formValues)
                  .then((response) => {
                        AlertBox(
                              'success',
                              'Update Successfully',
                              "Asset has been updated.",
                              false,
                              '',
                              true,
                              'OK'
                        )
                              .then(() => {
                                    navigate('/dashboard/asset', { replace: true });
                              });
                  })
                  .catch((error) => {
                        AlertBox(
                              'error',
                              'Update Failed',
                              error.response.data.message,
                              false,
                              '',
                              true,
                              'OK').then(() => {

                              });
                  }
                  );
      }
      return (
            <Page Page title="Edit"  >
                  <SequenceBar topValue={topValue} />
                  <Container sx={{ marginTop: 11, width: "100%", height: "100%" }} disableGutters={true} >
                        <TabContext value={value} sx={{
                              margin: 0,
                              padding: 0,
                        }}>
                              <AppBar position="fixed" color="primary" sx={{ top: topValue + 40 }}>
                                    <Box sx={{ backgroundColor: "#FFFFFF", height: 60, width: "100%" }}>
                                          <Stack direction="row"
                                                display="flex"
                                                flexDirection="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                height="100%"
                                                width="100%"
                                          >
                                                <Button variant="return" component={RouterLink} to="/dashboard/lab" startIcon={<Iconify icon="ant-design:left-outlined" />} >
                                                      Back
                                                </Button>
                                                <Box sx={{ height: 55, width: "100%", display: "flex" }}>
                                                      <Tabs value={value}
                                                            onChange={handleTabChange}
                                                            aria-label="lab API tabs example"
                                                            centered
                                                            TabIndicatorProps={{ sx: { height: 0 } }}
                                                            sx={{
                                                                  minHeight: '40px !important',
                                                                  height: 55,
                                                                  width: "100%",
                                                                  padding: 0.5,
                                                                  '& button': { borderRadius: 0.5, backgroundColor: "#EDEDED", color: "#5A567B", marginRight: 2, maxWidth: { xs: 80, sm: 100, md: 200, lg: 200 }, width: "100%", height: "100%", minHeight: "100% !important", textAlign: "center", fontSize: { xs: 8, sm: 8, md: 12, lg: 12 } },
                                                                  '& button:hover': { backgroundColor: '#1e88e5', color: "#FFFFFF" },
                                                                  '& button:active': { backgroundColor: '#1565c0', color: "#FFFFFF" },
                                                                  '& button.Mui-selected': { backgroundColor: '#1565c0', color: "#FFFFFF" },
                                                            }}

                                                      >
                                                            <Tab label="Immunology" value="1" />
                                                            <Tab label="Biochemistry" value="2" />
                                                            <Tab label="Urine, Faeces & Groups" value="3" />
                                                            <Tab label="Blood Test" value="4" />
                                                      </Tabs>
                                                </Box>
                                          </Stack>
                                    </Box>
                              </AppBar>
                              <FormikProvider value={formik}>
                                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                                          <TabPanel value="1">
                                                <Container sx={{
                                                      backgroundColor: "#FFFFFF",
                                                      height: "100%",
                                                      margin: 0,
                                                      padding: 0,
                                                }}>
                                                      <TableContainer
                                                            component={Paper}
                                                            sx={{
                                                                  height: "100%",
                                                                  paddingTop: 2,
                                                                  paddingBottom: 2,
                                                                  marginLeft: 0,
                                                                  marginRight: 0,
                                                                  '&:last-child td, &:last-child th': { border: 0 },
                                                                  '& td:nth-of-type(2),& th:nth-of-type(2)': { backgroundColor: "#DDDDDD" },
                                                                  '& td:nth-of-type(3),& th:nth-of-type(3)': { backgroundColor: "#F9F9F9" },
                                                                  '& td:nth-of-type(4),& th:nth-of-type(4)': { backgroundColor: "#F9F9F9" },
                                                                  '& td:nth-of-type(1)': { paddingLeft: 0, paddingTop: 0, paddingBottom: 0, marginBottom: 0 },
                                                                  '& td:nth-of-type(2),& td:nth-of-type(3),& td:nth-of-type(4)': { paddingTop: 0, paddingBottom: 1, marginTop: 0, marginBottom: 1 }
                                                            }}>
                                                            <Table sx={{ width: "100%", minWidth: 650, height: "100%", tableLayout: "fixed" }} >
                                                                  <TableHead >
                                                                        <TableRow >
                                                                              <TableCell > </TableCell>
                                                                              <TableCell align="center" sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>Current</TableCell>
                                                                              <TableCell align="center" sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>Previous Check</TableCell>
                                                                              <TableCell align="center" sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>Past Check</TableCell>
                                                                        </TableRow>
                                                                  </TableHead>
                                                                  <TableBody>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">HBsAg</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('HBsag_Value_current')}
                                                                                          error={Boolean(touched.HBsag_Value_current && errors.HBsag_Value_current)}
                                                                                    />
                                                                                    <FormHelperText error id="HBsag_Value_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.HBsag_Value_current && errors.HBsag_Value_current}
                                                                                    </FormHelperText>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('HBsag_Status_current')}
                                                                                          endAdornment={<InputAdornment position="start">{values.HBsag_unit}</InputAdornment>}
                                                                                          error={Boolean(touched.HBsag_Status_current && errors.HBsag_Status_current)}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          {...getFieldProps('HBsag_Value_previous')}

                                                                                    />
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('HBsag_Status_previous')}
                                                                                          disabled
                                                                                          endAdornment={<InputAdornment position="start">{values.HBsag_unit}</InputAdornment>}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          {...getFieldProps('HBsag_Value_past')}

                                                                                    />
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('HBsag_Status_past')}
                                                                                          disabled
                                                                                          endAdornment={<InputAdornment position="start">{values.HBsag_unit}</InputAdornment>}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Anti-HBs</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('AntiHBs_Value_current')}

                                                                                          error={Boolean(touched.AntiHBs_Value_current && errors.AntiHBs_Value_current)}
                                                                                    />
                                                                                    <FormHelperText error id="AntiHBs_Status_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.AntiHBs_Status_current && errors.AntiHBs_Status_current}
                                                                                    </FormHelperText>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('AntiHBs_Status_current')}
                                                                                          endAdornment={<InputAdornment position="start">{values.AntiHBs_unit}</InputAdornment>}
                                                                                          error={Boolean(touched.AntiHBs_Status_current && errors.AntiHBs_Status_current)}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          {...getFieldProps('AntiHBs_Value_previous')}

                                                                                    />
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('AntiHBs_Status_previous')}
                                                                                          disabled
                                                                                          endAdornment={<InputAdornment position="start">{values.AntiHBs_unit}</InputAdornment>}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          {...getFieldProps('AntiHBs_Value_past')}

                                                                                    />
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('AntiHBs_Status_past')}
                                                                                          disabled
                                                                                          endAdornment={<InputAdornment position="start">{values.AntiHBs_unit}</InputAdornment>}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">RA Factor(RF)</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('RANormal_Value_current')}

                                                                                          error={Boolean(touched.RANormal_Value_current && errors.RANormal_Value_current)}
                                                                                    />
                                                                                    <FormHelperText error id="RANormal_Status_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.RANormal_Status_current && errors.RANormal_Status_current}
                                                                                    </FormHelperText>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('RANormal_Status_current')}
                                                                                          endAdornment={<InputAdornment position="start">{values.RANormal_unit}</InputAdornment>}
                                                                                          error={Boolean(touched.RANormal_Status_current && errors.RANormal_Status_current)}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          {...getFieldProps('RANormal_Value_previous')}

                                                                                    />
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('RANormal_Status_previous')}
                                                                                          disabled
                                                                                          endAdornment={<InputAdornment position="start">{values.RANormal_unit}</InputAdornment>}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          {...getFieldProps('RANormal_Value_past')}

                                                                                    />
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('RANormal_Status_past')}
                                                                                          disabled
                                                                                          endAdornment={<InputAdornment position="start">{values.RANormal_unit}</InputAdornment>}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Total Anti-HAV</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('HavIgG_Value_current')}

                                                                                          error={Boolean(touched.HavIgG_Value_current && errors.HavIgG_Value_current)}
                                                                                    />
                                                                                    <FormHelperText error id="HavIgG_Value_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.HavIgG_Value_current && errors.HavIgG_Value_current}
                                                                                    </FormHelperText>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('HavIgG_Status_current')}
                                                                                          endAdornment={<InputAdornment position="start">{values.HavIgG_unit}</InputAdornment>}
                                                                                          error={Boolean(touched.HavIgG_Status_current && errors.HavIgG_Status_current)}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          {...getFieldProps('HavIgG_Value_previous')}

                                                                                    />
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('HavIgG_Status_previous')}
                                                                                          disabled
                                                                                          endAdornment={<InputAdornment position="start">{values.HavIgG_unit}</InputAdornment>}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          {...getFieldProps('HavIgG_Value_past')}

                                                                                    />
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('HavIgG_Status_past')}
                                                                                          disabled
                                                                                          endAdornment={<InputAdornment position="start">{values.HavIgG_unit}</InputAdornment>}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">AIDS</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('HIVNormal_Value_current')}

                                                                                          error={Boolean(touched.HIVNormal_Value_current && errors.HIVNormal_Value_current)}
                                                                                    />
                                                                                    <FormHelperText error id="HIVNormal_Value_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.HIVNormal_Value_current && errors.HIVNormal_Value_current}
                                                                                    </FormHelperText>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('HIVNormal_Status_current')}
                                                                                          endAdornment={<InputAdornment position="start">{values.HIVNormal_unit}</InputAdornment>}
                                                                                          error={Boolean(touched.HIVNormal_Status_current && errors.HIVNormal_Status_current)}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          {...getFieldProps('HIVNormal_Value_previous')}

                                                                                    />
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('HIVNormal_Status_previous')}
                                                                                          disabled
                                                                                          endAdornment={<InputAdornment position="start">{values.HIVNormal_unit}</InputAdornment>}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          {...getFieldProps('HIVNormal_Value_past')}

                                                                                    />
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('HIVNormal_Status_past')}
                                                                                          disabled
                                                                                          endAdornment={<InputAdornment position="start">{values.HavIgG_unit}</InputAdornment>}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">RPR</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('VDRLNormal_current')}
                                                                                          endAdornment={<InputAdornment position="start">{values.VDRLNormal_unit}</InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="VDRLNormal_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.VDRLNormal_current && errors.VDRLNormal_current}
                                                                                    </FormHelperText>

                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          {...getFieldProps('VDRLNormal_previous')}
                                                                                          endAdornment={<InputAdornment position="start">{values.VDRLNormal_unit}</InputAdornment>}

                                                                                    />

                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          disabled
                                                                                          className='textField'
                                                                                          {...getFieldProps('VDRLNormal_past')}
                                                                                          endAdornment={<InputAdornment position="start">{values.VDRLNormal_unit}</InputAdornment>}

                                                                                    />

                                                                              </TableCell>
                                                                        </TableRow>


                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">F-T4</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('RFFT4_current')}
                                                                                          endAdornment={<InputAdornment position="start">{values.RFFT4_unit}</InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="RFFT4_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.RFFT4_current && errors.RFFT4_current}
                                                                                    </FormHelperText>

                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          {...getFieldProps('RFFT4_previous')}
                                                                                          endAdornment={<InputAdornment position="start">{values.RFFT4_unit}</InputAdornment>}

                                                                                    />

                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          disabled
                                                                                          className='textField'
                                                                                          {...getFieldProps('RFFT4_past')}
                                                                                          endAdornment={<InputAdornment position="start">{values.RFFT4_unit}</InputAdornment>}

                                                                                    />

                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">H.pylori Ab</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('Hpyloriab_current')}
                                                                                          endAdornment={<InputAdornment position="start">{values.Hpyloriab_unit}</InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="Hpyloriab_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.Hpyloriab_current && errors.Hpyloriab_current}
                                                                                    </FormHelperText>

                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          {...getFieldProps('Hpyloriab_previous')}
                                                                                          endAdornment={<InputAdornment position="start">{values.Hpyloriab_unit}</InputAdornment>}

                                                                                    />

                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          disabled
                                                                                          className='textField'
                                                                                          {...getFieldProps('Hpyloriab_past')}
                                                                                          endAdornment={<InputAdornment position="start">{values.Hpyloriab_unit}</InputAdornment>}

                                                                                    />

                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">a-FP</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('YFPLevel_current')}
                                                                                          endAdornment={<InputAdornment position="start">{values.YFPLevel_unit}</InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="YFPLevel_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.YFPLevel_current && errors.YFPLevel_current}
                                                                                    </FormHelperText>

                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          {...getFieldProps('YFPLevel_previous')}
                                                                                          endAdornment={<InputAdornment position="start">{values.YFPLevel_unit}</InputAdornment>}

                                                                                    />

                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          disabled
                                                                                          className='textField'
                                                                                          {...getFieldProps('Hpyloriab_past')}
                                                                                          endAdornment={<InputAdornment position="start">{values.YFPLevel_unit}</InputAdornment>}

                                                                                    />

                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">CEA(General/Smoker)</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('CEALevel_current')}
                                                                                          endAdornment={<InputAdornment position="start">{values.CEALevel_unit}</InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="CEALevel_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.CEALevel_current && errors.CEALevel_current}
                                                                                    </FormHelperText>

                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          {...getFieldProps('CEALevel_previous')}
                                                                                          endAdornment={<InputAdornment position="start">{values.CEALevel_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          disabled
                                                                                          className='textField'
                                                                                          {...getFieldProps('CEALevel_past')}
                                                                                          endAdornment={<InputAdornment position="start">{values.CEALevel_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">CA15-3</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('CA15_3_current')}
                                                                                          endAdornment={<InputAdornment position="start">{values.CA15_3_unit}</InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="CA15_3_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.CA15_3_current && errors.CA15_3_current}
                                                                                    </FormHelperText>

                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          {...getFieldProps('CA15_3_previous')}
                                                                                          endAdornment={<InputAdornment position="start">{values.CA15_3_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          disabled
                                                                                          className='textField'
                                                                                          {...getFieldProps('CA15_3_past')}
                                                                                          endAdornment={<InputAdornment position="start">{values.CA15_3_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">CA125</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('CA125_current')}
                                                                                          endAdornment={<InputAdornment position="start">{values.CA125_unit}</InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="CA125_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.CA125_current && errors.CA125_current}
                                                                                    </FormHelperText>

                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          {...getFieldProps('CA125_previous')}
                                                                                          endAdornment={<InputAdornment position="start">{values.CA125_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          disabled
                                                                                          className='textField'
                                                                                          {...getFieldProps('CA125_past')}
                                                                                          endAdornment={<InputAdornment position="start">{values.CA125_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">CA19-9</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('CA125_current')}
                                                                                          endAdornment={<InputAdornment position="start">{values.CA19_9_unit}</InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="CA125_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.CA125_current && errors.CA125_current}
                                                                                    </FormHelperText>

                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          {...getFieldProps('CA125_previous')}
                                                                                          endAdornment={<InputAdornment position="start">{values.CA19_9_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          disabled
                                                                                          className='textField'
                                                                                          {...getFieldProps('CA125_past')}
                                                                                          endAdornment={<InputAdornment position="start">{values.CA19_9_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">EBV anti-body</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('EBV_current')}
                                                                                          endAdornment={<InputAdornment position="start">{values.EBV_unit}</InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="EBV_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.EBV_current && errors.EBV_current}
                                                                                    </FormHelperText>

                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          {...getFieldProps('EBV_previous')}
                                                                                          endAdornment={<InputAdornment position="start">{values.EBV_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          disabled
                                                                                          className='textField'
                                                                                          {...getFieldProps('EBV_past')}
                                                                                          endAdornment={<InputAdornment position="start">{values.EBV_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">PSA</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('PSA_current')}
                                                                                          endAdornment={<InputAdornment position="start">{values.PSA_unit}</InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="PSA_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.PSA_current && errors.PSA_current}
                                                                                    </FormHelperText>

                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          {...getFieldProps('PSA_previous')}
                                                                                          endAdornment={<InputAdornment position="start">{values.PSA_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          disabled
                                                                                          className='textField'
                                                                                          {...getFieldProps('PSA_past')}
                                                                                          endAdornment={<InputAdornment position="start">{values.PSA_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">TSH</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('RFTSH_current')}
                                                                                          endAdornment={<InputAdornment position="start">{values.RFTSH_unit}</InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="RFTSH_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.RFTSH_current && errors.RFTSH_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          {...getFieldProps('RFTSH_previous')}
                                                                                          endAdornment={<InputAdornment position="start">{values.RFTSH_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          disabled
                                                                                          className='textField'
                                                                                          {...getFieldProps('RFTSH_past')}
                                                                                          endAdornment={<InputAdornment position="start">{values.RFTSH_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Homocysteine</Typography>
                                                                              </TableCell>
                                                                              <TableCell sx={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('Homocy_current')}
                                                                                          endAdornment={<InputAdornment position="start">{values.Homocy_unit}</InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="Homocy_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.Homocy_current && errors.Homocy_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          {...getFieldProps('Homocy_previous')}
                                                                                          endAdornment={<InputAdornment position="start">{values.Homocy_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          disabled
                                                                                          className='textField'
                                                                                          {...getFieldProps('Homocy_past')}
                                                                                          endAdornment={<InputAdornment position="start">{values.Homocy_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>

                                                                  </TableBody>
                                                            </Table>
                                                            <Button
                                                                  size="large"
                                                                  variant="contained"
                                                                  onClick={() => {
                                                                        setSubmitAction("immunology");
                                                                        handleSubmit();
                                                                  }}>
                                                                  Confirm
                                                            </Button>
                                                      </TableContainer>
                                                </Container>
                                          </TabPanel>
                                          <TabPanel value="2">
                                                <Container sx={{ backgroundColor: "#FFFFFF", height: "100%" }}>
                                                      <TableContainer
                                                            component={Paper}
                                                            sx={{
                                                                  height: "100%",
                                                                  paddingTop: 2,
                                                                  paddingBottom: 2,
                                                                  marginLeft: 0,
                                                                  '&:last-child td, &:last-child th': { border: 0 },
                                                                  '& td:nth-of-type(2),& th:nth-of-type(2)': { backgroundColor: "#DDDDDD" },
                                                                  '& td:nth-of-type(3),& th:nth-of-type(3)': { backgroundColor: "#F9F9F9" },
                                                                  '& td:nth-of-type(4),& th:nth-of-type(4)': { backgroundColor: "#F9F9F9" },
                                                                  '& td:nth-of-type(1)': { paddingLeft: 0, paddingTop: 0, paddingBottom: 0, marginBottom: 0 },
                                                                  '& td:nth-of-type(2),& td:nth-of-type(3),& td:nth-of-type(4)': { paddingTop: 0, paddingBottom: 1, marginTop: 0, marginBottom: 1 }
                                                            }}>
                                                            <Table sx={{ width: "100%", minWidth: 650, height: "100%", tableLayout: "fixed" }} >
                                                                  <TableHead >
                                                                        <TableRow >
                                                                              <TableCell > </TableCell>
                                                                              <TableCell align="center" sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>Current</TableCell>
                                                                              <TableCell align="center" sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>Previous Check</TableCell>
                                                                              <TableCell align="center" sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>Past Check</TableCell>
                                                                        </TableRow>
                                                                  </TableHead>
                                                                  <TableBody>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label_group">Blood Sugar Tests</Typography>
                                                                              </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Fasting Blood Glucose</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('Glucose_current')}
                                                                                          endAdornment={<InputAdornment position="start">{values.Glucose_unit}</InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="Glucose_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.Glucose_current && errors.Glucose_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          {...getFieldProps('Glucose_previous')}
                                                                                          endAdornment={<InputAdornment position="start">{values.Glucose_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          disabled
                                                                                          className='textField'
                                                                                          {...getFieldProps('Glucose_past')}
                                                                                          endAdornment={<InputAdornment position="start">{values.Glucose_unit}</InputAdornment>}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">HbA1c</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('HbA1c_current')}
                                                                                          endAdornment={<InputAdornment position="start">{values.HbA1c_unit}</InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="HbA1c_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.HbA1c_current && errors.HbA1c_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          {...getFieldProps('HbA1c_previous')}
                                                                                          endAdornment={<InputAdornment position="start">{values.HbA1c_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          disabled
                                                                                          className='textField'
                                                                                          {...getFieldProps('HbA1c_past')}
                                                                                          endAdornment={<InputAdornment position="start">{values.HbA1c_unit}</InputAdornment>}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label_group">Liver Function Tests</Typography>
                                                                              </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Total Bilirubin</Typography>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('TFTBIL_current')}
                                                                                          endAdornment={<InputAdornment position="start">{values.TFTBIL_unit}</InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="TFTBIL_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.TFTBIL_current && errors.TFTBIL_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          {...getFieldProps('TFTBIL_previous')}
                                                                                          endAdornment={<InputAdornment position="start">{values.TFTBIL_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          disabled
                                                                                          className='textField'
                                                                                          {...getFieldProps('TFTBIL_past')}
                                                                                          endAdornment={<InputAdornment position="start">{values.TFTBIL_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Total Protein</Typography>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('TFTP_current')}
                                                                                          endAdornment={<InputAdornment position="start">{values.TFTP_unit}</InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="TFTP_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.TFTP_current && errors.TFTP_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          {...getFieldProps('TFTP_previous')}
                                                                                          endAdornment={<InputAdornment position="start">{values.TFTP_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          disabled
                                                                                          className='textField'
                                                                                          {...getFieldProps('TFTP_past')}
                                                                                          endAdornment={<InputAdornment position="start">{values.TFTP_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Albumin</Typography>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('TFALB_current')}
                                                                                          endAdornment={<InputAdornment position="start">{values.TFALB_unit}</InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="TFALB_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.TFALB_current && errors.TFALB_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          {...getFieldProps('TFALB_previous')}
                                                                                          endAdornment={<InputAdornment position="start">{values.TFALB_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          disabled
                                                                                          className='textField'
                                                                                          {...getFieldProps('TFTP_past')}
                                                                                          endAdornment={<InputAdornment position="start">{values.TFTP_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Globulin</Typography>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('TFGLO_current')}
                                                                                          endAdornment={<InputAdornment position="start">{values.TFGLO_unit}</InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="TFGLO_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.TFGLO_current && errors.TFGLO_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          {...getFieldProps('TFGLO_previous')}
                                                                                          endAdornment={<InputAdornment position="start">{values.TFGLO_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          disabled
                                                                                          className='textField'
                                                                                          {...getFieldProps('TFGLO_past')}
                                                                                          endAdornment={<InputAdornment position="start">{values.TFGLO_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Alkaline Phosphatase</Typography>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('TFALP_current')}
                                                                                          endAdornment={<InputAdornment position="start">{values.TFALP_unit}</InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="TFALP_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.TFALP_current && errors.TFALP_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          {...getFieldProps('TFALP_previous')}
                                                                                          endAdornment={<InputAdornment position="start">{values.TFALP_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          disabled
                                                                                          className='textField'
                                                                                          {...getFieldProps('TFALP_past')}
                                                                                          endAdornment={<InputAdornment position="start">{values.TFALP_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">sGOT (AST)</Typography>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('TFsGOT_current')}
                                                                                          endAdornment={<InputAdornment position="start">{values.TFsGOT_unit}</InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="TFsGOT_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.TFsGOT_current && errors.TFsGOT_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          {...getFieldProps('TFsGOT_previous')}
                                                                                          endAdornment={<InputAdornment position="start">{values.TFsGOT_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          disabled
                                                                                          className='textField'
                                                                                          {...getFieldProps('TFsGOT_past')}
                                                                                          endAdornment={<InputAdornment position="start">{values.TFsGOT_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">sGPT (ALT)</Typography>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('TFsGPT_current')}
                                                                                          endAdornment={<InputAdornment position="start">{values.TFsGPT_unit}</InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="TFsGPT_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.TFsGPT_current && errors.TFsGPT_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          {...getFieldProps('TFsGPT_previous')}
                                                                                          endAdornment={<InputAdornment position="start">{values.TFsGPT_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          disabled
                                                                                          className='textField'
                                                                                          {...getFieldProps('TFsGPT_past')}
                                                                                          endAdornment={<InputAdornment position="start">{values.TFsGPT_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">r-GT (GGT)</Typography>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('TFYGT_current')}
                                                                                          endAdornment={<InputAdornment position="start">{values.TFYGT_unit}</InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="TFYGT_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.TFYGT_current && errors.TFYGT_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          {...getFieldProps('TFYGT_previous')}
                                                                                          endAdornment={<InputAdornment position="start">{values.TFYGT_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          disabled
                                                                                          className='textField'
                                                                                          {...getFieldProps('TFYGT_past')}
                                                                                          endAdornment={<InputAdornment position="start">{values.TFYGT_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>


                                                                        <TableRow>
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label_group">Renal Function</Typography>
                                                                              </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                        </TableRow>

                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">BUN(Urea)</Typography>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('UFBUN_current')}
                                                                                          endAdornment={<InputAdornment position="start">{values.UFBUN_unit}</InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="CRP_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.CRP_current && errors.CRP_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          {...getFieldProps('UFBUN_previous')}
                                                                                          endAdornment={<InputAdornment position="start">{values.UFBUN_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          disabled
                                                                                          className='textField'
                                                                                          {...getFieldProps('UFBUN_past')}
                                                                                          endAdornment={<InputAdornment position="start">{values.UFBUN_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Creatinine</Typography>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('UFCRE_current')}
                                                                                          endAdornment={<InputAdornment position="start">{values.UFCRE_unit}</InputAdornment>}
                                                                                    />
                                                                                    <FormHelperText error id="UFCRE_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.UFCRE_current && errors.UFCRE_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          {...getFieldProps('UFCRE_previous')}
                                                                                          endAdornment={<InputAdornment position="start">{values.UFCRE_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          disabled
                                                                                          className='textField'
                                                                                          {...getFieldProps('UFBUN_past')}
                                                                                          endAdornment={<InputAdornment position="start">{values.UFBUN_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label_group">Uric Acid Tests</Typography>
                                                                              </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Uric Acid</Typography>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('UFUA_current')}
                                                                                          endAdornment={<InputAdornment position="start">{values.UFUA_unit}</InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="UFUA_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.UFUA_current && errors.UFUA_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          {...getFieldProps('UFUA_previous')}
                                                                                          endAdornment={<InputAdornment position="start">{values.UFUA_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          disabled
                                                                                          className='textField'
                                                                                          {...getFieldProps('UFUA_past')}
                                                                                          endAdornment={<InputAdornment position="start">{values.UFUA_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>

                                                                        <TableRow>
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label_group">Blood Lipid Tests</Typography>
                                                                              </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Triglyceride</Typography>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('BGTG_current')}
                                                                                          endAdornment={<InputAdornment position="start">{values.BGTG_unit}</InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="BGTG_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.BGTG_current && errors.BGTG_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          {...getFieldProps('BGTG_previous')}
                                                                                          endAdornment={<InputAdornment position="start">{values.BGTG_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          disabled
                                                                                          className='textField'
                                                                                          {...getFieldProps('BGTG_past')}
                                                                                          endAdornment={<InputAdornment position="start">{values.BGTG_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Cholesterol</Typography>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('BGCHOL_current')}
                                                                                          endAdornment={<InputAdornment position="start">{values.BGCHOL_unit}</InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="BGCHOL_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.BGCHOL_current && errors.BGCHOL_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          {...getFieldProps('BGCHOL_previous')}
                                                                                          endAdornment={<InputAdornment position="start">{values.BGCHOL_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          disabled
                                                                                          className='textField'
                                                                                          {...getFieldProps('BGCHOL_past')}
                                                                                          endAdornment={<InputAdornment position="start">{values.BGCHOL_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">HDL-Cholesterol</Typography>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('BGHDLC_current')}
                                                                                          endAdornment={<InputAdornment position="start">{values.BGHDLC_unit}</InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="BGHDLC_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.BGHDLC_current && errors.BGHDLC_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          {...getFieldProps('BGHDLC_previous')}
                                                                                          endAdornment={<InputAdornment position="start">{values.BGHDLC_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          disabled
                                                                                          className='textField'
                                                                                          {...getFieldProps('BGHDLC_past')}
                                                                                          endAdornment={<InputAdornment position="start">{values.BGHDLC_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">LDL-Cholesterol</Typography>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('BGLDLC_current')}
                                                                                          endAdornment={<InputAdornment position="start">{values.BGLDLC_unit}</InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="BGLDLC_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.BGLDLC_current && errors.BGLDLC_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          {...getFieldProps('BGLDLC_previous')}
                                                                                          endAdornment={<InputAdornment position="start">{values.BGLDLC_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          disabled
                                                                                          className='textField'
                                                                                          {...getFieldProps('BGLDLC_past')}
                                                                                          endAdornment={<InputAdornment position="start">{values.BGLDLC_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">CHOL/HDL-C</Typography>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('BGCH_current')}
                                                                                          endAdornment={<InputAdornment position="start">{values.BGCH_unit}</InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="BGCH_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.BGCH_current && errors.BGCH_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          {...getFieldProps('BGCH_previous')}
                                                                                          endAdornment={<InputAdornment position="start">{values.BGCH_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          disabled
                                                                                          className='textField'
                                                                                          {...getFieldProps('BGCH_past')}
                                                                                          endAdornment={<InputAdornment position="start">{values.BGCH_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>


                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label_group">Ca.P.Fe Tests</Typography>
                                                                              </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                        </TableRow>

                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Ca</Typography>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('EFCA_current')}
                                                                                          endAdornment={<InputAdornment position="start">{values.EFCA_unit}</InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="EFCA_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.CRP_current && errors.CRP_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          {...getFieldProps('EFCA_previous')}
                                                                                          endAdornment={<InputAdornment position="start">{values.EFCA_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          disabled
                                                                                          className='textField'
                                                                                          {...getFieldProps('EFCA_past')}
                                                                                          endAdornment={<InputAdornment position="start">{values.EFCA_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">P</Typography>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('EFP_current')}
                                                                                          endAdornment={<InputAdornment position="start">{values.EFP_unit}</InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="EFP_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.EFP_current && errors.EFP_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          {...getFieldProps('EFP_previous')}
                                                                                          endAdornment={<InputAdornment position="start">{values.EFP_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          disabled
                                                                                          className='textField'
                                                                                          {...getFieldProps('EFP_past')}
                                                                                          endAdornment={<InputAdornment position="start">{values.EFP_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label_group">Tissue Inflammation Screening</Typography>
                                                                              </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                        </TableRow>

                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">CRP</Typography>
                                                                              </TableCell>
                                                                              <TableCell sx={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('CRP_current')}
                                                                                          endAdornment={<InputAdornment position="start">{values.CRP_unit}</InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="CRP_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.CRP_current && errors.CRP_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          {...getFieldProps('CRP_previous')}
                                                                                          endAdornment={<InputAdornment position="start">{values.CRP_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          disabled
                                                                                          className='textField'
                                                                                          {...getFieldProps('CRP_past')}
                                                                                          endAdornment={<InputAdornment position="start">{values.CRP_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                  </TableBody>
                                                            </Table>
                                                            <Button
                                                                  size="large"
                                                                  type="submit"
                                                                  variant="contained"
                                                                  onClick={() => {
                                                                        setSubmitAction("biochemistry");
                                                                        handleSubmit();
                                                                  }}
                                                            >
                                                                  Confirm
                                                            </Button>
                                                      </TableContainer>
                                                </Container>
                                          </TabPanel>
                                          <TabPanel value="3">
                                                <Container sx={{ backgroundColor: "#FFFFFF", height: "100%" }}>
                                                      <TableContainer
                                                            component={Paper}
                                                            sx={{
                                                                  height: "100%",
                                                                  paddingTop: 2,
                                                                  paddingBottom: 2,
                                                                  marginLeft: 0,
                                                                  '&:last-child td, &:last-child th': { border: 0 },
                                                                  '& td:nth-of-type(2),& th:nth-of-type(2)': { backgroundColor: "#DDDDDD" },
                                                                  '& td:nth-of-type(3),& th:nth-of-type(3)': { backgroundColor: "#F9F9F9" },
                                                                  '& td:nth-of-type(4),& th:nth-of-type(4)': { backgroundColor: "#F9F9F9" },
                                                                  '& td:nth-of-type(1)': { paddingLeft: 0, paddingTop: 0, paddingBottom: 0, marginBottom: 0 },
                                                                  '& td:nth-of-type(2),& td:nth-of-type(3),& td:nth-of-type(4)': { paddingTop: 0, paddingBottom: 1, marginTop: 0, marginBottom: 1 }
                                                            }}>
                                                            <Table sx={{ width: "100%", minWidth: 650, height: "100%", tableLayout: "fixed" }} >
                                                                  <TableHead >
                                                                        <TableRow >
                                                                              <TableCell > </TableCell>
                                                                              <TableCell align="center" sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>Current</TableCell>
                                                                              <TableCell align="center" sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>Previous Check</TableCell>
                                                                              <TableCell align="center" sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>Past Check</TableCell>
                                                                        </TableRow>
                                                                  </TableHead>
                                                                  <TableBody>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label_group">Urine Routine</Typography>
                                                                              </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label_group">Urine Sediments</Typography>
                                                                              </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label_group">FOBT</Typography>
                                                                              </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Value</Typography>
                                                                              </TableCell>
                                                                              <TableCell sx={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('TFALP_current')}
                                                                                          endAdornment={<InputAdornment position="start">{values.TFALP_unit}</InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="TFALP_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.TFALP_current && errors.TFALP_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          {...getFieldProps('TFALP_previous')}
                                                                                          endAdornment={<InputAdornment position="start">{values.TFALP_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          disabled
                                                                                          className='textField'
                                                                                          {...getFieldProps('TFALP_past')}
                                                                                          endAdornment={<InputAdornment position="start">{values.TFALP_unit}</InputAdornment>}

                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                  </TableBody>
                                                            </Table>
                                                            <Button
                                                                  size="large"
                                                                  variant="contained"
                                                                  onClick={() => {
                                                                        setSubmitAction("urine");
                                                                        handleSubmit();
                                                                  }}>

                                                                  Confirm
                                                            </Button>
                                                      </TableContainer>
                                                </Container>
                                          </TabPanel>
                                          <TabPanel value="4">
                                                <Container sx={{ backgroundColor: "#FFFFFF", height: "100%" }}>
                                                      <TableContainer
                                                            component={Paper}
                                                            sx={{
                                                                  height: "100%",
                                                                  paddingTop: 2,
                                                                  paddingBottom: 2,
                                                                  marginLeft: 0,
                                                                  '&:last-child td, &:last-child th': { border: 0 },
                                                                  '& td:nth-of-type(2),& th:nth-of-type(2)': { backgroundColor: "#DDDDDD" },
                                                                  '& td:nth-of-type(3),& th:nth-of-type(3)': { backgroundColor: "#F9F9F9" },
                                                                  '& td:nth-of-type(4),& th:nth-of-type(4)': { backgroundColor: "#F9F9F9" },
                                                                  '& td:nth-of-type(1)': { paddingLeft: 0, paddingTop: 0, paddingBottom: 0, marginBottom: 0 },
                                                                  '& td:nth-of-type(2),& td:nth-of-type(3),& td:nth-of-type(4)': { paddingTop: 0, paddingBottom: 1, marginTop: 0, marginBottom: 1 }
                                                            }}>
                                                            <Table sx={{ width: "100%", minWidth: 650, height: "100%", tableLayout: "fixed" }} >
                                                                  <TableHead >
                                                                        <TableRow >
                                                                              <TableCell > </TableCell>
                                                                              <TableCell align="center" sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>Current</TableCell>
                                                                              <TableCell align="center" sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>Previous Check</TableCell>
                                                                              <TableCell align="center" sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>Past Check</TableCell>
                                                                        </TableRow>
                                                                  </TableHead>
                                                                  <TableBody>
                                                                        <TableRow >
                                                                              <TableCell align="right">
                                                                                    <Typography variant="label">WBC</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('BloodWBC_current')}
                                                                                          error={Boolean(touched.BloodWBC_current && errors.BloodWBC_current)}
                                                                                          endAdornment={<InputAdornment position="start">{values.BloodWBC_unit}</InputAdornment>}
                                                                                    />
                                                                                    <FormHelperText error id="BloodWBC_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.BloodWBC_current && errors.BloodWBC_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          endAdornment={<InputAdornment position="start">{values.BloodWBC_unit}</InputAdornment>}
                                                                                          {...getFieldProps('BloodWBC_previous')}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          endAdornment={<InputAdornment position="start">{values.BloodWBC_unit}</InputAdornment>}
                                                                                          {...getFieldProps('BloodWBC_past')}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                              <TableCell align="right">
                                                                                    <Typography variant="label" >RBC</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('BloodRBC_current')}
                                                                                          endAdornment={<InputAdornment position="start">{values.BloodRBC_unit}</InputAdornment>}
                                                                                          error={Boolean(touched.BloodRBC_current && errors.BloodRBC_current)}
                                                                                    />
                                                                                    <FormHelperText error id="BloodRBC_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.BloodRBC_current && errors.BloodHB_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          endAdornment={<InputAdornment position="start">{values.BloodRBC_unit}</InputAdornment>}
                                                                                          {...getFieldProps('BloodRBC_previous')}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          endAdornment={<InputAdornment position="start">{values.BloodRBC_unit}</InputAdornment>}
                                                                                          {...getFieldProps('BloodRBC_past')}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                              <TableCell align="right">
                                                                                    <Typography variant="label">Hb</Typography>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('BloodHB_current')}
                                                                                          endAdornment={<InputAdornment position="start">{values.BloodHB_unit}</InputAdornment>}
                                                                                          error={Boolean(touched.BloodHB_current && errors.BloodHB_current)}
                                                                                    />
                                                                                    <FormHelperText error id="BloodHB_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.BloodHB_current && errors.BlBloodHB_currentoodHB_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          endAdornment={<InputAdornment position="start">{values.BloodHB_unit}</InputAdornment>}
                                                                                          {...getFieldProps('BloodHB_previous')}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          endAdornment={<InputAdornment position="start">{values.BloodHB_unit}</InputAdornment>}
                                                                                          {...getFieldProps('BloodHB_past')}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                              <TableCell align="right">
                                                                                    <Typography variant="label">Hematocrit</Typography>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('BloodHCT_current')}
                                                                                          endAdornment={<InputAdornment position="start">{values.BloodHCT_unit}</InputAdornment>}
                                                                                          error={Boolean(touched.BloodHCT_current && errors.BloodHCT_current)}
                                                                                    />
                                                                                    <FormHelperText error id="BloodHCT_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.BloodHCT_current && errors.BloodHCT_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          endAdornment={<InputAdornment position="start">{values.BloodHCT_unit}</InputAdornment>}
                                                                                          {...getFieldProps('BloodHCT_previous')}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          endAdornment={<InputAdornment position="start">{values.BloodHCT_unit}</InputAdornment>}
                                                                                          {...getFieldProps('BloodHCT_past')}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                              <TableCell align="right">
                                                                                    <Typography variant="label">MCV</Typography>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('BloodMCV_current')}
                                                                                          endAdornment={<InputAdornment position="start">{values.BloodMCV_unit}</InputAdornment>}
                                                                                          error={Boolean(touched.BloodMCV_current && errors.BloodMCV_current)}
                                                                                    />
                                                                                    <FormHelperText error id="BloodMCV_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.BloodMCV_current && errors.BloodMCV_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          endAdornment={<InputAdornment position="start">{values.BloodMCV_unit}</InputAdornment>}
                                                                                          {...getFieldProps('BloodMCV_previous')}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          endAdornment={<InputAdornment position="start">{values.BloodMCV_unit}</InputAdornment>}
                                                                                          {...getFieldProps('BloodMCV_past')}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                              <TableCell align="right">
                                                                                    <Typography variant="label">MCH</Typography>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('BloodMCH_current')}
                                                                                          endAdornment={<InputAdornment position="start">{values.BloodMCH_unit}</InputAdornment>}
                                                                                          error={Boolean(touched.BloodMCH_current && errors.BloodMCH_current)}
                                                                                    />
                                                                                    <FormHelperText error id="BloodMCH_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.BloodMCH_current && errors.BloodMCH_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          endAdornment={<InputAdornment position="start">{values.BloodMCH_unit}</InputAdornment>}
                                                                                          {...getFieldProps('BloodMCH_previous')}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          endAdornment={<InputAdornment position="start">{values.BloodMCH_unit}</InputAdornment>}
                                                                                          {...getFieldProps('BloodMCH_past')}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                              <TableCell align="right">
                                                                                    <Typography variant="label">MCHC</Typography>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('BloodMCHC_current')}
                                                                                          endAdornment={<InputAdornment position="start">{values.BloodMCHC_unit}</InputAdornment>}
                                                                                          error={Boolean(touched.BloodMCHC_current && errors.BloodMCHC_current)}
                                                                                    />
                                                                                    <FormHelperText error id="BloodMCHC_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.BloodMCHC_current && errors.BloodMCHC_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          endAdornment={<InputAdornment position="start">{values.BloodMCHC_unit}</InputAdornment>}
                                                                                          {...getFieldProps('BloodMCHC_previous')}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          endAdornment={<InputAdornment position="start">{values.BloodMCHC_unit}</InputAdornment>}
                                                                                          {...getFieldProps('BloodMCHC_past')}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                              <TableCell align="right">
                                                                                    <Typography variant="label">PLT</Typography>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('BloodPLT_current')}
                                                                                          endAdornment={<InputAdornment position="start">{values.BloodPLT_unit}</InputAdornment>}
                                                                                          error={Boolean(touched.BloodPLT_current && errors.BloodPLT_current)}
                                                                                    />
                                                                                    <FormHelperText error id="BloodPLT_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.BloodPLT_current && errors.BloodPLT_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          endAdornment={<InputAdornment position="start">{values.BloodPLT_unit}</InputAdornment>}
                                                                                          {...getFieldProps('BloodPLT_previous')}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          endAdornment={<InputAdornment position="start">{values.BloodPLT_unit}</InputAdornment>}
                                                                                          {...getFieldProps('BloodPLT_past')}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                              <TableCell align="right">
                                                                                    <Typography variant="label_group">WBC Differential Count</Typography>
                                                                              </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                              <TableCell align="right">
                                                                                    <Typography variant="label">Neutrophils</Typography>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('BloodW1_current')}
                                                                                          endAdornment={<InputAdornment position="start">{values.BloodW1_unit}</InputAdornment>}
                                                                                          error={Boolean(touched.BloodW1_current && errors.BloodW1_current)}
                                                                                    />
                                                                                    <FormHelperText error id="BloodW1_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.BloodW1_current && errors.BloodW1_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          endAdornment={<InputAdornment position="start">{values.BloodW1_unit}</InputAdornment>}
                                                                                          {...getFieldProps('BloodW1_previous')}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          endAdornment={<InputAdornment position="start">{values.BloodW1_unit}</InputAdornment>}
                                                                                          {...getFieldProps('BloodW1_past')}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                              <TableCell align="right">
                                                                                    <Typography variant="label">Lymphocytes</Typography>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('BloodW2_current')}
                                                                                          endAdornment={<InputAdornment position="start">{values.BloodW2_unit}</InputAdornment>}
                                                                                          error={Boolean(touched.BloodW2_current && errors.BloodW2_current)}
                                                                                    />
                                                                                    <FormHelperText error id="BloodW2_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.BloodW2_current && errors.BloodW2_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          endAdornment={<InputAdornment position="start">{values.BloodW2_unit}</InputAdornment>}
                                                                                          {...getFieldProps('BloodW2_previous')}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          endAdornment={<InputAdornment position="start">{values.BloodW2_unit}</InputAdornment>}
                                                                                          {...getFieldProps('BloodW2_past')}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                              <TableCell align="right">
                                                                                    <Typography variant="label">Monocytes</Typography>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('BloodW3_current')}
                                                                                          endAdornment={<InputAdornment position="start">{values.BloodW3_unit}</InputAdornment>}
                                                                                          error={Boolean(touched.BloodW3_current && errors.BloodW3_current)}
                                                                                    />
                                                                                    <FormHelperText error id="BloodW3_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.BloodW3_current && errors.BloodW3_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          endAdornment={<InputAdornment position="start">{values.BloodW3_unit}</InputAdornment>}
                                                                                          {...getFieldProps('BloodW3_previous')}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          endAdornment={<InputAdornment position="start">{values.BloodW3_unit}</InputAdornment>}
                                                                                          {...getFieldProps('BloodW3_past')}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                              <TableCell align="right">
                                                                                    <Typography variant="label">Eosinophils</Typography>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('BloodW4_current')}
                                                                                          endAdornment={<InputAdornment position="start">{values.BloodW4_unit}</InputAdornment>}
                                                                                          error={Boolean(touched.BloodW4_current && errors.BloodW4_current)}
                                                                                    />
                                                                                    <FormHelperText error id="BloodW4_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.BloodW4_current && errors.BloodW4_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          endAdornment={<InputAdornment position="start">{values.BloodW4_unit}</InputAdornment>}
                                                                                          {...getFieldProps('BloodW4_previous')}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          endAdornment={<InputAdornment position="start">{values.BloodW4_unit}</InputAdornment>}
                                                                                          {...getFieldProps('BloodW4_past')}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                              <TableCell align="right">
                                                                                    <Typography variant="label">Basophilis</Typography>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('BloodW5_current')}
                                                                                          endAdornment={<InputAdornment position="start">{values.BloodW5_unit}</InputAdornment>}
                                                                                          error={Boolean(touched.BloodW5_current && errors.BloodW5_current)}
                                                                                    />
                                                                                    <FormHelperText error id="BloodW5_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.BloodW5_current && errors.BloodW5_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          endAdornment={<InputAdornment position="start">{values.BloodW5_unit}</InputAdornment>}
                                                                                          {...getFieldProps('BloodW5_previous')}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          endAdornment={<InputAdornment position="start">{values.BloodW5_unit}</InputAdornment>}
                                                                                          {...getFieldProps('BloodW5_past')}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                              <TableCell align="right">
                                                                                    <Typography variant="label_group">ABO Blood Type</Typography>
                                                                              </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                              <TableCell align="right">
                                                                                    <Typography variant="label">ABO Blood type</Typography>
                                                                              </TableCell>
                                                                              <TableCell sx={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          {...getFieldProps('BloodType_current')}
                                                                                          endAdornment={<InputAdornment position="start">{values.BloodType_unit}</InputAdornment>}
                                                                                          error={Boolean(touched.BloodType_current && errors.BloodType_current)}
                                                                                    />
                                                                                    <FormHelperText error id="BloodType_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.BloodType_current && errors.BloodType_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          endAdornment={<InputAdornment position="start">{values.BloodType_unit}</InputAdornment>}
                                                                                          {...getFieldProps('BloodType_previous')}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          className='textField'
                                                                                          disabled
                                                                                          endAdornment={<InputAdornment position="start">{values.BloodType_unit}</InputAdornment>}
                                                                                          {...getFieldProps('BloodType_past')}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                  </TableBody>
                                                            </Table>
                                                            <Button
                                                                  size="large"
                                                                  variant="contained"
                                                                  onClick={() => {
                                                                        setSubmitAction("blood_test");
                                                                        handleSubmit();
                                                                  }}>

                                                                  Confirm
                                                            </Button>
                                                      </TableContainer>
                                                </Container>
                                          </TabPanel>

                                    </Form>
                              </FormikProvider>
                        </TabContext>
                  </Container >
            </Page >
      )
}