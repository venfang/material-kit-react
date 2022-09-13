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
import * as Yup from 'yup';
import * as React from 'react';
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import Cookies from 'js-cookie';
// @mui
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { styled } from '@mui/material/styles';
import { Container, Autocomplete, Dialog, InputLabel, TextField, OutlinedInput, DialogTitle, DialogContent, DialogActions, Typography, Checkbox, AppBar, FormHelperText, MenuItem, Select, FormControl, Box, Stack, Button, Tabs, InputAdornment, Tab, Paper, InputBase, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from '@mui/material';
import Loader from '../../../components/loader/Loader';
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import { AlertBox, TimerAlertBox } from '../../../components/alert/SweetAlert';
import SequenceBar from '../../../layouts/dashboard/SequenceBar';

import { getReport, updateBloodTest, updateImmunology, updateBiochemistry, updateUrine } from '../../../data/lab/lab';
import { getComment, getCommentDetails } from '../../../data/comment/comment';

const Item = styled(Paper)(({ theme }) => ({
      backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
}));

const URLook_Option = [{ value: "1", label: "Clear" }, { value: "2", label: "Turbid" }];
const FourPlus_Option = [{ value: "neg", label: "Negative" }, { value: "+/-", label: "+-" }, { value: "1+", label: "+" }, { value: "2+", label: "++" }, { value: "3+", label: "+++" }, { value: "4+", label: "++++" }];
const ThreePlusMinus_Option = [{ value: "neg", label: "Negative" }, { value: "+/-", label: "+-" }, { value: "1+", label: "+" }, { value: "2+", label: "++" }, { value: "3+", label: "+++" }];
const ThreePlus_Option = [{ value: "neg", label: "Negative" }, { value: "1+", label: "+" }, { value: "2+", label: "++" }, { value: "3+", label: "+++" }];
const PosNeg_Option = [{ value: "1", label: "Positive" }, { value: "2", label: "Negative" }];
const NonReactive_Option = [{ value: "1", label: "Reactive" }, { value: "2", label: "Non Reactive" }];
const AntiHBs_Status_Option = [{ value: "1", label: "Non Immune" }, { value: "2", label: "Low Level Immune" }, { value: "3", label: "Immune" }]
const BloodType_Option = [{ value: "1", label: "Type A" }, { value: "2", label: "Type B" }, { value: "3", label: "Type O" }, { value: "4", label: "Type AB" }];

export default function Lab() {
      const [value, setTabValue] = useState("1");
      const { report_id } = useParams();
      const topValue = 64;
      const handleTabChange = (event, newValue) => {
            setTabValue(newValue);
      }
      const [submitAction, setSubmitAction] = useState("");
      const [submitCategory, setSubmitCategory] = useState("");
      const [UBOther_Comment, setUBOther_Comment] = useState([]);

      const [tempUBOther_current, setUBOther_current] = useState([]);
      const [tempUBOther_previous, setUBOther_previous] = useState([]);
      const [tempUBOther_past, setUBOther_past] = useState([]);
      useEffect(() => {
            formik.setSubmitting(true);
            getReport(report_id).then((data) => {
                  formik.setValues(data);
                  // let tempUBOther = data.UBOther_current.split(",");
                  // console.log(tempUBOther);
                  // setUBOther_current(tempUBOther);
                  if (data.UBOther_current !== "") {
                        getCommentDetails(data.UBOther_current).then((result) => {
                              setUBOther_current(result);
                        }).catch((err) => {
                              console.log(err);
                              TimerAlertBox('error', 'Database Connection Error', '', 1500, 'center');
                        });
                  }
                  if (data.UBOther_previous !== "") {
                        getCommentDetails(data.UBOther_previous).then((result) => {
                              setUBOther_previous(result);
                        }).catch((err) => {
                              console.log(err);
                              TimerAlertBox('error', 'Database Connection Error', '', 1500, 'center');
                        });
                  }
                  if (data.UBOther_past !== "") {
                        getCommentDetails(data.UBOther_past).then((result) => {
                              setUBOther_past(result);
                        }).catch((err) => {
                              console.log(err);
                              TimerAlertBox('error', 'Database Connection Error', '', 1500, 'center');
                        });
                  }
                  formik.setSubmitting(false);
            }).catch((err) => {
                  console.log(err);
                  TimerAlertBox('error', 'Database Connection Error', '', 1500, 'center');
                  formik.setSubmitting(false);
            });
            formik.setSubmitting(true);
            getComment("Urine").then((data) => {
                  setUBOther_Comment(data);
                  formik.setSubmitting(false);
            }).catch(() => {
                  TimerAlertBox('error', 'Database Connection Error', '', 1500, 'center');
                  formik.setSubmitting(false);
            })
      }, []);
      const formik = useFormik({
            initialValues: {
                  BloodHB_current: '',
                  BloodHB_past: '',
                  BloodHB_previous: '',
                  BloodHB_unit: 'g/dl',

                  BloodRBC_current: '',
                  BloodRBC_past: '',
                  BloodRBC_previous: '',
                  BloodRBC_unit: 'x 10^6/uL',
                  BloodWBC_current: '',
                  BloodWBC_past: '',
                  BloodWBC_previous: '',
                  BloodWBC_unit: 'x 10^3/uL',
                  BloodW1_current: '',
                  BloodW1_past: '',
                  BloodW1_previous: '',
                  BloodW1_unit: '%',
                  BloodW2_current: '',
                  BloodW2_past: '',
                  BloodW2_previous: '',
                  BloodW2_unit: '%',
                  BloodW3_current: '',
                  BloodW3_past: '',
                  BloodW3_previous: '',
                  BloodW3_unit: '%',
                  BloodW4_current: '',
                  BloodW4_past: '',
                  BloodW4_previous: '',
                  BloodW4_unit: '%',
                  BloodW5_current: '',
                  BloodW5_past: '',
                  BloodW5_previous: '',
                  BloodW5_unit: '%',
                  BloodPLT_current: '',
                  BloodPLT_past: '',
                  BloodPLT_previous: '',
                  BloodPLT_unit: 'x 10^3/uL',
                  BloodHCT_current: '',
                  BloodHCT_past: '',
                  BloodHCT_previous: '',
                  BloodHCT_unit: '%',
                  BloodMCH_current: '',
                  BloodMCH_past: '',
                  BloodMCH_previous: '',
                  BloodMCH_unit: 'pg',
                  BloodMCV_current: '',
                  BloodMCV_past: '',
                  BloodMCV_previous: '',
                  BloodMCV_unit: 'fL',
                  BloodMCHC_current: '',
                  BloodMCHC_past: '',
                  BloodMCHC_previous: '',
                  BloodMCHC_unit: 'g/dl',
                  BloodType_current: '',
                  BloodType_previous: '',
                  BloodType_past: '',

                  HBsag_Status_current: '2',
                  HBsag_Status_previous: '2',
                  HBsag_Status_past: '2',
                  HBsag_Value_current: '',
                  HBsag_Value_previous: '',
                  HBsag_Value_past: '',
                  HBsag_unit: 'Negative',

                  AntiHBs_Status_current: '2',
                  AntiHBs_Status_previous: '2',
                  AntiHBs_Status_past: '2',
                  AntiHBs_Value_current: '',
                  AntiHBs_Value_previous: '',
                  AntiHBs_Value_past: '',
                  AntiHBs_unit: 'Negative',

                  RANormal_Status_current: '2',
                  RANormal_Status_previous: '2',
                  RANormal_Status_past: '2',
                  RANormal_Value_current: '',
                  RANormal_Value_previous: '',
                  RANormal_Value_past: '',
                  RANormal_unit: 'Negative',

                  HavIgG_Status_current: '2',
                  HavIgG_Status_previous: '2',
                  HavIgG_Status_past: '2',
                  HavIgG_Value_current: '',
                  HavIgG_Value_previous: '',
                  HavIgG_Value_past: '',
                  HavIgG_unit: 'Negative',

                  HIVNormal_Value_current: '',
                  HIVNormal_Value_previous: '',
                  HIVNormal_Value_past: '',
                  HIVNormal_Status_current: '2',
                  HIVNormal_Status_previous: '2',
                  HIVNormal_Status_past: '2',
                  HIVNormal_unit: 'Negative',

                  VDRLNormal_current: '',
                  VDRLNormal_previous: '',
                  VDRLNormal_past: '',
                  VDRLNormal_unit: 'Non Reactive',

                  RFFT4_current: '',
                  RFFT4_previous: '',
                  RFFT4_past: '',
                  RFFT4_unit: 'pmol/L',

                  FT3_current: '',
                  FT3_previous: '',
                  FT3_past: '',
                  FT3_unit: '',

                  Hpyloriab_current: '',
                  Hpyloriab_previous: '',
                  Hpyloriab_past: '',
                  Hpyloriab_unit: 'Negative',

                  YFPLevel_current: '',
                  YFPLevel_previous: '',
                  YFPLevel_past: '',
                  YFPLevel_unit: 'ng/ml',

                  CVirus_current: '',
                  CVirus_previous: '',
                  CVirus_past: '',
                  CVirus_unit: '',

                  ESR_current: '',
                  ESR_previous: '',
                  ESR_past: '',
                  ESR_unit: '',

                  BFC_current: '',
                  BFC_previous: '',
                  BFC_past: '',
                  BFC_unit: '',

                  CEALevel_current: '',
                  CEALevel_previous: '',
                  CEALevel_past: '',
                  CEALevel_unit: 'ng/ml',

                  CA15_3_current: '',
                  CA15_3_previous: '',
                  CA15_3_past: '',
                  CA15_3_unit: 'U/ml',
                  CA125_current: '',
                  CA125_previous: '',
                  CA125_past: '',
                  CA125_unit: 'U/ml',
                  CA19_9_current: '',
                  CA19_9_previous: '',
                  CA19_9_past: '',
                  CA19_9_unit: 'U/ml',

                  EBV_Value_current: '',
                  EBV_Value_previous: '',
                  EBV_Value_past: '',
                  EBV_Status_current: '',
                  EBV_Status_previous: '',
                  EBV_Status_past: '',
                  EBV_unit: '',

                  PSA_current: '',
                  PSA_previous: '',
                  PSA_past: '',
                  PSA_unit: 'ng/ml',

                  RFTSH_current: '',
                  RFTSH_previous: '',
                  RFTSH_past: '',
                  RFTSH_unit: 'm IU/L',

                  Homocy_current: '',
                  Homocy_previous: '',
                  Homocy_past: '',
                  Homocy_unit: '',


                  CRP_current: '',
                  CRP_previous: '',
                  CRP_past: '',
                  CRP_unit: '',

                  HbA1c_current: '',
                  HbA1c_previous: '',
                  HbA1c_past: '',
                  HbA1c_unit: '%',

                  UFBUN_current: '',
                  UFBUN_previous: '',
                  UFBUN_past: '',
                  UFBUN_unit: 'mmol/L',

                  UFCRE_current: '',
                  UFCRE_previous: '',
                  UFCRE_past: '',
                  UFCRE_unit: 'umol/L',

                  EFCA_current: '',
                  EFCA_previous: '',
                  EFCA_past: '',
                  EFCA_unit: 'mmol/L',

                  EFP_current: '',
                  EFP_previous: '',
                  EFP_past: '',
                  EFP_unit: 'mmol/L',

                  UFUA_current: '',
                  UFUA_previous: '',
                  UFUA_past: '',
                  UFUA_unit: 'mmol/L',

                  TFTP_current: '',
                  TFTP_previous: '',
                  TFTP_past: '',
                  TFTP_unit: 'g/L',

                  TFALB_current: '',
                  TFALB_previous: '',
                  TFALB_past: '',
                  TFALB_unit: 'g/L',

                  TFGLO_current: '',
                  TFGLO_previous: '',
                  TFGLO_past: '',
                  TFGLO_unit: 'g/L',

                  TFTBIL_current: '',
                  TFTBIL_previous: '',
                  TFTBIL_past: '',
                  TFTBIL_unit: 'g/L',

                  TFALP_current: '',
                  TFALP_previous: '',
                  TFALP_past: '',
                  TFALP_unit: 'U/L',

                  TFsGOT_current: '',
                  TFsGOT_previous: '',
                  TFsGOT_past: '',
                  TFsGOT_unit: 'U/L',

                  TFsGPT_current: '',
                  TFsGPT_previous: '',
                  TFsGPT_past: '',
                  TFsGPT_unit: 'U/L',

                  TFYGT_current: '',
                  TFYGT_previous: '',
                  TFYGT_past: '',
                  TFYGT_unit: 'U/L',

                  Glucose_current: '',
                  Glucose_previous: '',
                  Glucose_past: '',
                  Glucose_unit: 'mmol/L',

                  BGTG_current: '',
                  BGTG_previous: '',
                  BGTG_past: '',
                  BGTG_unit: 'mmol/L',

                  BGCHOL_current: '',
                  BGCHOL_previous: '',
                  BGCHOL_past: '',
                  BGCHOL_unit: 'mmol/L',

                  BGHDLC_current: '',
                  BGHDLC_previous: '',
                  BGHDLC_past: '',
                  BGHDLC_unit: 'mmol/L',

                  BGLDLC_current: '',
                  BGLDLC_previous: '',
                  BGLDLC_past: '',
                  BGLDLC_unit: 'mmol/L',

                  BGCH_current: '',
                  BGCH_previous: '',
                  BGCH_past: '',
                  BGCH_unit: 'mmol/L',


                  URLook_current: '',
                  URLook_previous: '',
                  URLook_past: '',

                  UREW_current: '',
                  UREW_previous: '',
                  UREW_past: '',

                  URS_current: '',
                  URS_previous: '',
                  URS_past: '',

                  URBR_current: '',
                  URBR_previous: '',
                  URBR_past: '',

                  URUBR_current: '',
                  URUBR_previous: '',
                  URUBR_past: '',

                  UBBH_current: '',
                  UBBH_previous: '',
                  UBBH_past: '',

                  UBKU_current: '',
                  UBKU_previous: '',
                  UBKU_past: '',

                  UBSNO_current: '',
                  UBSNO_previous: '',
                  UBSNO_past: '',

                  URLEU_current: '',
                  URLEU_previous: '',
                  URLEU_past: '',

                  URDENS_current: '',
                  URDENS_previous: '',
                  URDENS_past: '',

                  URTest_current: '',
                  URTest_previous: '',
                  URTest_past: '',

                  UBRBC1_current: '',
                  UBRBC1_previous: '',
                  UBRBC1_past: '',
                  UBRBC2_current: '',
                  UBRBC2_previous: '',
                  UBRBC2_past: '',

                  UBWBC1_current: '',
                  UBWBC1_previous: '',
                  UBWBC1_past: '',
                  UBWBC2_current: '',
                  UBWBC2_previous: '',
                  UBWBC2_past: '',

                  UBEPlit1_current: '',
                  UBEPlit1_previous: '',
                  UBEPlit1_past: '',
                  UBEPlit2_current: '',
                  UBEPlit2_previous: '',
                  UBEPlit2_past: '',

                  Cast1_current: '',
                  Cast1_previous: '',
                  Cast1_past: '',
                  Cast2_current: '',
                  Cast2_previous: '',
                  Cast2_past: '',

                  test_date_previous: 'Previous',
                  test_date_past: "Past",
            },
            enableReinitialize: true,
            onSubmit: () => {
                  formik.setSubmitting(true);
                  if (submitCategory === "Immunology") {
                        const formValues = {
                              report_id: report_id,
                              gender: values.gender,
                              age: values.age,
                              order_id: values.order_id,
                              HBsag_Value: values.HBsag_Value_current,
                              HBsag_Status: values.HBsag_Status_current,
                              AntiHBs_Value: values.AntiHBs_Value_current,
                              AntiHBs_Status: values.AntiHBs_Status_current,
                              RANormal_Value: values.RANormal_Value_current,
                              RANormal_Status: values.RANormal_Status_current,
                              HavIgG_Value: values.HavIgG_Value_current,
                              HavIgG_Status: values.HavIgG_Status_current,
                              HIVNormal_Value: values.HIVNormal_Value_current,
                              HIVNormal_Status: values.HIVNormal_Status_current,
                              VDRLNormal: values.VDRLNormal_current,
                              FT3: values.FT3_current,
                              RFFT4: values.RFFT4_current,
                              Hpyloriab: values.Hpyloriab_current,
                              YFPLevel: values.YFPLevel_current,
                              CEALevel: values.CEALevel_current,
                              CA15_3: values.CA15_3_current,
                              CA125: values.CA125_current,
                              CA19_9: values.CA19_9_current,
                              EBV_Value: values.EBV_Value_current,
                              EBV_Status: values.EBV_Status_current,
                              PSA: values.PSA_current,
                              RFTSH: values.RFTSH_current,
                              Homocy: values.Homocy_current,
                              CVirus: values.CVirus_current,
                              immunology_confirm_staff: submitAction === "confirm" ? Cookies.get('user_name') : null,
                              immunology_release_staff: submitAction === "release" ? Cookies.get('user_name') : null,
                        };
                        updateImmunology(formValues)
                              .then((response) => {
                                    formik.setSubmitting(false);
                                    AlertBox(
                                          'success',
                                          'Update Successfully',
                                          `Immunology has been ${submitAction}.`,
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
                                    formik.setSubmitting(false);
                                    AlertBox(
                                          'error',
                                          'Update Failed',
                                          error.response.data.message,
                                          false,
                                          '',
                                          true,
                                          'OK')
                              }
                              );
                  }
                  else if (submitCategory === "Blood Test") {
                        const formValues = {
                              report_id: report_id,
                              gender: values.gender,
                              age: values.age,
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
                              BloodRH: values.BloodRH_current,
                              ESR: values.ESR_current,
                              BFC: values.BFC_current,
                              blood_confirm_staff: submitAction === "confirm" ? Cookies.get('user_name') : null,
                              blood_release_staff: submitAction === "release" ? Cookies.get('user_name') : null,
                        };
                        updateBloodTest(formValues)
                              .then((response) => {
                                    formik.setSubmitting(false);
                                    AlertBox(
                                          'success',
                                          'Update Successfully',
                                          `Blood Test has been ${submitAction}.`,
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
                                    console.log(error);
                                    formik.setSubmitting(false);
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
                  else if (submitCategory === "Urine") {
                        const formValues = {
                              report_id: report_id,
                              gender: values.gender,
                              age: values.age,
                              order_id: values.order_id,
                              URLook: values.URLook_current,
                              UREW: values.UREW_current,
                              URS: values.URS_current,
                              URBR: values.URBR_current,
                              URUBR: values.URUBR_current,
                              UBBH: values.UBBH_current,
                              UBKU: values.UBKU_current,
                              UBSNO: values.UBSNO_current,
                              URLEU: values.URLEU_current,
                              URDENS: values.URDENS_current,
                              URTest: values.URTest_current,
                              UBRBC1: values.UBRBC1_current,
                              UBRBC2: values.UBRBC2_current,
                              UBWBC1: values.UBWBC1_current,
                              UBWBC2: values.UBWBC2_current,
                              UBEPlit1: values.UBEPlit1_current,
                              UBEPlit2: values.UBEPlit2_current,
                              Cast1: values.Cast1_current,
                              Cast2: values.Cast2_current,
                              Bacter: values.Bacter_current,
                              UBOther: values.UBOther_current,
                              urine_confirm_staff: submitAction === "confirm" ? Cookies.get('user_name') : null,
                              urine_release_staff: submitAction === "release" ? Cookies.get('user_name') : null,
                        };
                        updateUrine(formValues)
                              .then((response) => {
                                    formik.setSubmitting(false);
                                    AlertBox(
                                          'success',
                                          'Update Successfully',
                                          `Urine has been ${submitAction}`,
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
                                    formik.setSubmitting(false);
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
                  else if (submitCategory === "Biochemistry") {
                        const formValues = {
                              report_id: report_id,
                              gender: values.gender,
                              age: values.age,
                              order_id: values.order_id,
                              CRP: values.CRP_current,
                              HbA1c: values.HbA1c_current,
                              UFBUN: values.UFBUN_current,
                              UFCRE: values.UFCRE_current,
                              EFCA: values.EFCA_current,
                              EFP: values.EFP_current,
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
                              Sodium: values.Sodium_current,
                              Potassium: values.Potassium_current,
                              Chloride: values.Chloride_current,
                              biochemistry_confirm_staff: submitAction === "confirm" ? Cookies.get('user_name') : null,
                              biochemistry_release_staff: submitAction === "release" ? Cookies.get('user_name') : null,
                        };
                        updateBiochemistry(formValues)
                              .then((response) => {
                                    formik.setSubmitting(false);
                                    AlertBox(
                                          'success',
                                          'Update Successfully',
                                          `Biochemistry has been ${submitAction}`,
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
                                    formik.setSubmitting(false);
                                    AlertBox(
                                          'error',
                                          'Update Failed',
                                          error.response.data.message,
                                          false,
                                          '',
                                          true,
                                          'OK')

                              }
                              );
                  }
            },
      });
      const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

      const [UBOther_modal, setUBOther_modal] = useState(false);
      const openUBOther_modal = () => {
            setUBOther_modal(true);
      };

      const closeUBOther_modal = () => {
            setUBOther_modal(false);
      };

      const [BFC_modal, setBFC_modal] = useState(false);
      const openBFC_modal = () => {
            setBFC_modal(true);
      };

      const closeBFC_modal = () => {
            setBFC_modal(false);
      };

      function definePlaceholder(value) {
            if (value === "-9995") {
                  return "[NI]";
            }
            return null;
      }
      function defineDisabled(value) {
            if (value === "-9995") {
                  return true;
            }
            return false;
      }
      function defineValue(value) {
            if (value === "-9995") {
                  return "[NI]";
            }
            return value;
      }

      const handleUBOtherChange = (e, value) => {
            setUBOther_current(value);
            let tempUBOther = "";
            tempUBOther += value.map((item) =>
            (
                  item.comment_no
            ));
            formik.setFieldValue("UBOther_current", tempUBOther);
            // setUBOther_current(
            //       typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value,
            // );
            // let tempUBOther = "";
            // tempUBOther += e.target.value.map((item) =>
            // (
            //       item
            // ));
            // formik.setFieldValue("UBOther_current", tempUBOther);
      };
      return (
            <Page Page title="Edit"  >
                  <Loader spinner={isSubmitting} />
                  <SequenceBar topValue={topValue} report={{ report_id: formik.values.report_id, last_name: formik.values.last_name, first_name: formik.values.first_name, age: formik.values.age, package_id: formik.values.package_id, package_name: formik.values.package_name, gender: formik.values.gender, barcode: formik.values.barcode }} />
                  <Container sx={{ marginTop: 11, width: "100%", height: "100%" }} disableGutters={true} >
                        <TabContext value={value} sx={{
                              margin: 0,
                              padding: 0,
                        }}>
                              <AppBar position="fixed" color="primary" sx={{ top: topValue + 40, zIndex: 900, }}>
                                    <Box sx={{ backgroundColor: "#FFFFFF", color: "#211D4E", height: 60, paddingLeft: 5, paddingRight: 5 }}>
                                          <Stack
                                                display="flex"
                                                flexDirection="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                height="100%"
                                                width="100%"
                                          >
                                                <Box>
                                                      <Button variant="return" component={RouterLink} to="/dashboard/lab" startIcon={<Iconify icon="ant-design:left-outlined" />} >
                                                            Back
                                                      </Button>
                                                </Box>
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
                                          </Stack>
                                    </Box>

                              </AppBar>
                              <FormikProvider value={formik}>
                                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                                          <TabPanel value="1">
                                                <Container sx={{ backgroundColor: "#FFFFFF", height: "100%", paddingTop: 1 }}>
                                                      {values.immunology_confirm_staff !== null && <Typography sx={{ fontSize: 12 }}>{values.immunology_confirm_staff} confirmed at {values.immunology_confirm_date}</Typography>}
                                                      {values.immunology_release_staff !== null && values.immunology_confirm_staff === null && <Typography sx={{ fontSize: 12 }}>{values.immunology_release_staff} released at {values.immunology_release_date}</Typography>}
                                                      <TableContainer
                                                            component={Paper}
                                                            sx={{
                                                                  height: "100%",
                                                                  paddingTop: 2,
                                                                  paddingBottom: 2,
                                                                  marginLeft: 0,
                                                                  marginRight: 0,
                                                                  '&:last-child td, &:last-child th': { border: 0 },
                                                                  '& td:nth-of-type(6),& th:nth-of-type(6)': { backgroundColor: "#DDDDDD" },
                                                                  '& td:nth-of-type(7),& th:nth-of-type(7)': { backgroundColor: "#F9F9F9" },
                                                                  '& td:nth-of-type(8),& th:nth-of-type(8)': { backgroundColor: "#F9F9F9" },
                                                                  '& td:nth-of-type(1)': { paddingLeft: 0, paddingTop: 0, paddingBottom: 0, marginBottom: 0 },
                                                                  '& td:nth-of-type(2),& td:nth-of-type(3),& td:nth-of-type(4),& td:nth-of-type(6),& td:nth-of-type(7),& td:nth-of-type(8)': { paddingTop: 0, paddingBottom: 1, marginTop: 0, marginBottom: 1 },
                                                            }}>
                                                            <Table sx={{ width: "100%", minWidth: 650, height: "100%", tableLayout: "fixed" }} size="small">
                                                                  <TableHead >
                                                                        <TableRow >
                                                                              <TableCell> </TableCell>
                                                                              <TableCell align="center" sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8, backgroundColor: "#DDDDDD" }}>Current</TableCell>
                                                                              <TableCell align="center" sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8, backgroundColor: "#F9F9F9" }}>{values.test_date_previous !== null ? `${values.test_date_previous}` : 'Previous'}</TableCell>
                                                                              <TableCell align="center" sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8, backgroundColor: "#F9F9F9" }}>{values.test_date_past !== null ? `${values.test_date_past}` : 'Past'}</TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell align="center" sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>Current</TableCell>
                                                                              <TableCell align="center" sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>{values.test_date_previous !== null ? `${values.test_date_previous}` : 'Previous'}</TableCell>
                                                                              <TableCell align="center" sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>{values.test_date_past !== null ? `${values.test_date_past}` : 'Past'}</TableCell>
                                                                        </TableRow>
                                                                  </TableHead>
                                                                  <TableBody>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">HBsAg</Typography>
                                                                              </TableCell>
                                                                              <TableCell sx={{ backgroundColor: "#DDDDDD" }}>
                                                                                    <FormControl fullWidth>
                                                                                          <InputBase
                                                                                                placeholder={definePlaceholder(values.HBsag_Value_current)}
                                                                                                disabled={defineDisabled(values.HBsag_Value_current)}
                                                                                                value={defineValue(values.HBsag_Value_current)}
                                                                                                onChange={
                                                                                                      (e) => {
                                                                                                            formik.setFieldValue("HBsag_Value_current", e.target.value);
                                                                                                            if (e.target.value >= 1) {
                                                                                                                  formik.setFieldValue("HBsag_Status_current", "1");
                                                                                                            }
                                                                                                            else {
                                                                                                                  formik.setFieldValue("HBsag_Status_current", "2");
                                                                                                            }
                                                                                                      }
                                                                                                }
                                                                                                className={values.HBsag_Value_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                                error={Boolean(touched.HBsag_Value_current && errors.HBsag_Value_current)}
                                                                                          />
                                                                                          <FormHelperText error id="HBsag_Value_current-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.HBsag_Value_current && errors.HBsag_Value_current}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                                    {values.HBsag_Value_current === "-9995" ?
                                                                                          <FormControl fullWidth>
                                                                                                <InputBase
                                                                                                      placeholder="[NI]"
                                                                                                      disabled
                                                                                                      value="[NI]"
                                                                                                      className='textField'
                                                                                                />
                                                                                          </FormControl>
                                                                                          :
                                                                                          <FormControl fullWidth>
                                                                                                <Select
                                                                                                      disabled
                                                                                                      className={values.HBsag_Status_current === "2" ? 'default' : 'red'}
                                                                                                      error={Boolean(touched.HBsag_Status_current && errors.HBsag_Status_current)}
                                                                                                      {...getFieldProps('HBsag_Status_current')}
                                                                                                      style={{ textAlign: 'left' }}
                                                                                                      displayEmpty
                                                                                                >
                                                                                                      {PosNeg_Option.map((HBsag) => (
                                                                                                            <MenuItem
                                                                                                                  value={HBsag.value}
                                                                                                                  key={HBsag.value}
                                                                                                            >{HBsag.label}</MenuItem>
                                                                                                      )
                                                                                                      )}
                                                                                                </Select>
                                                                                          </FormControl>
                                                                                    }

                                                                              </TableCell>
                                                                              <TableCell sx={{ backgroundColor: "#F9F9F9" }}>
                                                                                    <FormControl fullWidth>
                                                                                          <InputBase
                                                                                                placeholder={definePlaceholder(values.HBsag_Value_previous)}
                                                                                                disabled
                                                                                                value={defineValue(values.HBsag_Value_previous)}
                                                                                                className={values.HBsag_Value_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                                error={Boolean(touched.HBsag_Value_previous && errors.HBsag_Value_previous)}
                                                                                          />
                                                                                          <FormHelperText error id="HBsag_Value_previous-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.HBsag_Value_previous && errors.HBsag_Value_previous}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                                    {values.HBsag_Value_previous === "-9995" ?
                                                                                          <FormControl fullWidth>
                                                                                                <InputBase
                                                                                                      placeholder="[NI]"
                                                                                                      disabled
                                                                                                      value="[NI]"
                                                                                                      className='textField'
                                                                                                />
                                                                                          </FormControl>
                                                                                          :
                                                                                          <FormControl fullWidth>
                                                                                                <Select
                                                                                                      disabled
                                                                                                      className={values.HBsag_Status_previous === "2" ? 'default' : 'red'}
                                                                                                      error={Boolean(touched.HBsag_Status_previous && errors.HBsag_Status_previous)}
                                                                                                      {...getFieldProps('HBsag_Status_previous')}
                                                                                                      style={{ textAlign: 'left' }}
                                                                                                      displayEmpty
                                                                                                >
                                                                                                      {PosNeg_Option.map((HBsag) => (
                                                                                                            <MenuItem
                                                                                                                  value={HBsag.value}
                                                                                                                  key={HBsag.value}
                                                                                                            >{HBsag.label}</MenuItem>
                                                                                                      )
                                                                                                      )}
                                                                                                </Select>
                                                                                          </FormControl>
                                                                                    }
                                                                              </TableCell>
                                                                              <TableCell sx={{ backgroundColor: "#F9F9F9" }}>
                                                                                    <FormControl fullWidth>
                                                                                          <InputBase
                                                                                                placeholder={definePlaceholder(values.HBsag_Value_past)}
                                                                                                disabled
                                                                                                value={defineValue(values.HBsag_Value_past)}
                                                                                                className={values.HBsag_Value_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                                error={Boolean(touched.HBsag_Value_past && errors.HBsag_Value_past)}
                                                                                          />
                                                                                          <FormHelperText error id="HBsag_Value_past-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.HBsag_Value_past && errors.HBsag_Value_past}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                                    {values.HBsag_Value_past === "-9995" ?
                                                                                          <FormControl fullWidth>
                                                                                                <InputBase
                                                                                                      placeholder="[NI]"
                                                                                                      disabled
                                                                                                      value="[NI]"
                                                                                                      className='textField'
                                                                                                />
                                                                                          </FormControl>
                                                                                          :
                                                                                          <FormControl fullWidth>
                                                                                                <Select
                                                                                                      disabled
                                                                                                      className={values.HBsag_Status_past === "2" ? 'default' : 'red'}
                                                                                                      error={Boolean(touched.HBsag_Status_past && errors.HBsag_Status_past)}
                                                                                                      {...getFieldProps('HBsag_Status_past')}
                                                                                                      style={{ textAlign: 'left' }}
                                                                                                      displayEmpty
                                                                                                >
                                                                                                      {PosNeg_Option.map((HBsag) => (
                                                                                                            <MenuItem
                                                                                                                  value={HBsag.value}
                                                                                                                  key={HBsag.value}
                                                                                                            >{HBsag.label}</MenuItem>
                                                                                                      )
                                                                                                      )}
                                                                                                </Select>
                                                                                          </FormControl>
                                                                                    }
                                                                              </TableCell>
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">TSH</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.RFTSH_current)}
                                                                                          disabled={defineDisabled(values.RFTSH_current)}
                                                                                          value={defineValue(values.RFTSH_current)}
                                                                                          onChange={(e) => formik.setFieldValue("RFTSH_current", e.target.value)}
                                                                                          className={values.RFTSH_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.RFTSH_unit}</Typography></InputAdornment>}
                                                                                    />
                                                                                    <FormHelperText error id="RFTSH_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.RFTSH_current && errors.RFTSH_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.RFTSH_previous)}
                                                                                          disabled
                                                                                          value={defineValue(values.RFTSH_previous)}
                                                                                          className={values.RFTSH_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_previous !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.RFTSH_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.RFTSH_past)}
                                                                                          disabled
                                                                                          value={defineValue(values.RFTSH_past)}
                                                                                          className={values.RFTSH_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.RFTSH_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Anti-HBs</Typography>
                                                                              </TableCell>
                                                                              <TableCell sx={{ backgroundColor: "#DDDDDD" }}>
                                                                                    <FormControl fullWidth>
                                                                                          <InputBase
                                                                                                placeholder={definePlaceholder(values.AntiHBs_Value_current)}
                                                                                                disabled={defineDisabled(values.AntiHBs_Value_current)}
                                                                                                value={defineValue(values.AntiHBs_Value_current)}
                                                                                                onChange={
                                                                                                      (e) => {
                                                                                                            formik.setFieldValue("AntiHBs_Value_current", e.target.value);
                                                                                                            if (e.target.value < 10) {
                                                                                                                  formik.setFieldValue("AntiHBs_Status_current", "1");
                                                                                                            }
                                                                                                            else if (e.target.value >= 10 && e.target.value <= 50) {
                                                                                                                  formik.setFieldValue("AntiHBs_Status_current", "2");
                                                                                                            }
                                                                                                            else {
                                                                                                                  formik.setFieldValue("AntiHBs_Status_current", "3");
                                                                                                            }
                                                                                                      }
                                                                                                }
                                                                                                className={values.AntiHBs_Value_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                                error={Boolean(touched.AntiHBs_Value_current && errors.AntiHBs_Value_current)}
                                                                                          />
                                                                                          <FormHelperText error id="AntiHBs_Value_current-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.AntiHBs_Value_current && errors.AntiHBs_Value_current}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                                    {values.AntiHBs_Value_current === "-9995" ?
                                                                                          <FormControl fullWidth>
                                                                                                <InputBase
                                                                                                      placeholder="[NI]"
                                                                                                      disabled
                                                                                                      value="[NI]"
                                                                                                      className='textField'
                                                                                                />
                                                                                          </FormControl>
                                                                                          :
                                                                                          <FormControl fullWidth>
                                                                                                <Select
                                                                                                      disabled
                                                                                                      className={values.AntiHBs_Status_current_redstar === null ? 'default' : 'red'}
                                                                                                      error={Boolean(touched.AntiHBs_Status_current && errors.AntiHBs_Status_current)}
                                                                                                      {...getFieldProps('AntiHBs_Status_current')}
                                                                                                      style={{ textAlign: 'left' }}
                                                                                                      displayEmpty
                                                                                                >
                                                                                                      {AntiHBs_Status_Option.map((AntiHBs) => (
                                                                                                            <MenuItem
                                                                                                                  value={AntiHBs.value}
                                                                                                                  key={AntiHBs.value}
                                                                                                            >{AntiHBs.label}</MenuItem>
                                                                                                      )
                                                                                                      )}
                                                                                                </Select>
                                                                                          </FormControl>
                                                                                    }

                                                                              </TableCell>
                                                                              <TableCell sx={{ backgroundColor: "#F9F9F9" }}>
                                                                                    <FormControl fullWidth>
                                                                                          <InputBase
                                                                                                placeholder={definePlaceholder(values.AntiHBs_Value_previous)}
                                                                                                disabled
                                                                                                value={defineValue(values.AntiHBs_Value_previous)}
                                                                                                className={values.AntiHBs_Value_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                                error={Boolean(touched.AntiHBs_Value_previous && errors.AntiHBs_Value_previous)}
                                                                                          />
                                                                                          <FormHelperText error id="AntiHBs_Value_previous-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.AntiHBs_Value_previous && errors.AntiHBs_Value_previous}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                                    {values.AntiHBs_Value_previous === "-9995" ?
                                                                                          <FormControl fullWidth>
                                                                                                <InputBase
                                                                                                      placeholder="[NI]"
                                                                                                      disabled
                                                                                                      value="[NI]"
                                                                                                      className='textField'
                                                                                                />
                                                                                          </FormControl>
                                                                                          :
                                                                                          <FormControl fullWidth>
                                                                                                <Select
                                                                                                      disabled
                                                                                                      className={values.AntiHBs_Status_previous_redstar === null ? 'default' : 'red'}
                                                                                                      error={Boolean(touched.AntiHBs_Status_previous && errors.AntiHBs_Status_previous)}
                                                                                                      {...getFieldProps('AntiHBs_Status_previous')}
                                                                                                      style={{ textAlign: 'left' }}
                                                                                                      displayEmpty
                                                                                                >
                                                                                                      {AntiHBs_Status_Option.map((AntiHBs) => (
                                                                                                            <MenuItem
                                                                                                                  value={AntiHBs.value}
                                                                                                                  key={AntiHBs.value}
                                                                                                            >{AntiHBs.label}</MenuItem>
                                                                                                      )
                                                                                                      )}
                                                                                                </Select>
                                                                                          </FormControl>
                                                                                    }
                                                                              </TableCell>
                                                                              <TableCell sx={{ backgroundColor: "#F9F9F9" }}>
                                                                                    <FormControl fullWidth>
                                                                                          <InputBase
                                                                                                placeholder={definePlaceholder(values.AntiHBs_Value_past)}
                                                                                                disabled
                                                                                                value={defineValue(values.AntiHBs_Value_past)}
                                                                                                className={values.AntiHBs_Value_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                                error={Boolean(touched.AntiHBs_Value_past && errors.AntiHBs_Value_past)}
                                                                                          />
                                                                                          <FormHelperText error id="AntiHBs_Value_past-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.AntiHBs_Value_past && errors.AntiHBs_Value_past}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                                    {values.AntiHBs_Value_past === "-9995" ?
                                                                                          <FormControl fullWidth>
                                                                                                <InputBase
                                                                                                      placeholder="[NI]"
                                                                                                      disabled
                                                                                                      value="[NI]"
                                                                                                      className='textField'
                                                                                                />
                                                                                          </FormControl>
                                                                                          :
                                                                                          <FormControl fullWidth>
                                                                                                <Select
                                                                                                      disabled
                                                                                                      className={values.AntiHBs_Status_past_redstar === null ? 'default' : 'red'}
                                                                                                      error={Boolean(touched.AntiHBs_Status_past && errors.AntiHBs_Status_past)}
                                                                                                      {...getFieldProps('AntiHBs_Status_past')}
                                                                                                      style={{ textAlign: 'left' }}
                                                                                                      displayEmpty
                                                                                                >
                                                                                                      {AntiHBs_Status_Option.map((AntiHBs) => (
                                                                                                            <MenuItem
                                                                                                                  value={AntiHBs.value}
                                                                                                                  key={AntiHBs.value}
                                                                                                            >{AntiHBs.label}</MenuItem>
                                                                                                      )
                                                                                                      )}
                                                                                                </Select>
                                                                                          </FormControl>
                                                                                    }
                                                                              </TableCell>
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">F-T3</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.FT3_current)}
                                                                                          disabled={defineDisabled(values.FT3_current)}
                                                                                          value={defineValue(values.FT3_current)}
                                                                                          onChange={(e) => formik.setFieldValue("FT3_current", e.target.value)}
                                                                                          className={values.FT3_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.FT3_unit}</Typography></InputAdornment>}
                                                                                    />
                                                                                    <FormHelperText error id="FT3_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.FT3_current && errors.FT3_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.FT3_previous)}
                                                                                          disabled
                                                                                          value={defineValue(values.FT3_previous)}
                                                                                          className={values.FT3_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_previous !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.FT3_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.FT3_past)}
                                                                                          disabled
                                                                                          value={defineValue(values.FT3_past)}
                                                                                          className={values.FT3_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.FT3_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Total Anti-HAV</Typography>
                                                                              </TableCell>
                                                                              <TableCell sx={{ backgroundColor: "#DDDDDD" }}>
                                                                                    <FormControl fullWidth>
                                                                                          <InputBase
                                                                                                placeholder={definePlaceholder(values.HavIgG_Value_current)}
                                                                                                disabled={defineDisabled(values.HavIgG_Value_current)}
                                                                                                value={defineValue(values.HavIgG_Value_current)}
                                                                                                onChange={
                                                                                                      (e) => {
                                                                                                            formik.setFieldValue("HavIgG_Value_current", e.target.value);
                                                                                                            if (e.target.value > 1) {
                                                                                                                  formik.setFieldValue("HavIgG_Status_current", "2");
                                                                                                            }
                                                                                                            else {
                                                                                                                  formik.setFieldValue("HavIgG_Status_current", "1");
                                                                                                            }
                                                                                                      }
                                                                                                }
                                                                                                className={values.HavIgG_Value_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                                error={Boolean(touched.HavIgG_Value_current && errors.HavIgG_Value_current)}
                                                                                          />
                                                                                          <FormHelperText error id="HavIgG_Value_current-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.HavIgG_Value_current && errors.HavIgG_Value_current}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                                    {values.HavIgG_Value_current === "-9995" ?
                                                                                          <FormControl fullWidth>
                                                                                                <InputBase
                                                                                                      placeholder="[NI]"
                                                                                                      disabled
                                                                                                      value="[NI]"
                                                                                                      className='textField'
                                                                                                />
                                                                                          </FormControl>
                                                                                          :
                                                                                          <FormControl fullWidth>
                                                                                                <Select
                                                                                                      disabled
                                                                                                      className={values.HavIgG_Status_current_redstar === null ? 'default' : 'red'}
                                                                                                      error={Boolean(touched.HavIgG_Status_current && errors.HavIgG_Status_current)}
                                                                                                      {...getFieldProps('HavIgG_Status_current')}
                                                                                                      style={{ textAlign: 'left' }}
                                                                                                      displayEmpty
                                                                                                >
                                                                                                      {PosNeg_Option.map((HavIgG) => (
                                                                                                            <MenuItem
                                                                                                                  value={HavIgG.value}
                                                                                                                  key={HavIgG.value}
                                                                                                            >{HavIgG.label}</MenuItem>
                                                                                                      )
                                                                                                      )}
                                                                                                </Select>
                                                                                          </FormControl>
                                                                                    }

                                                                              </TableCell>
                                                                              <TableCell sx={{ backgroundColor: "#F9F9F9" }}>
                                                                                    <FormControl fullWidth>
                                                                                          <InputBase
                                                                                                placeholder={definePlaceholder(values.HavIgG_Value_previous)}
                                                                                                disabled
                                                                                                value={defineValue(values.HavIgG_Value_previous)}
                                                                                                className={values.HavIgG_Value_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                                error={Boolean(touched.HavIgG_Value_previous && errors.HavIgG_Value_previous)}
                                                                                          />
                                                                                          <FormHelperText error id="HavIgG_Value_previous-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.HavIgG_Value_previous && errors.HavIgG_Value_previous}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                                    {values.HavIgG_Value_previous === "-9995" ?
                                                                                          <FormControl fullWidth>
                                                                                                <InputBase
                                                                                                      placeholder="[NI]"
                                                                                                      disabled
                                                                                                      value="[NI]"
                                                                                                      className='textField'
                                                                                                />
                                                                                          </FormControl>
                                                                                          :
                                                                                          <FormControl fullWidth>
                                                                                                <Select
                                                                                                      disabled
                                                                                                      className={values.HavIgG_Status_previous_redstar === null ? 'default' : 'red'}
                                                                                                      error={Boolean(touched.HavIgG_Status_previous && errors.HavIgG_Status_previous)}
                                                                                                      {...getFieldProps('HavIgG_Status_previous')}
                                                                                                      style={{ textAlign: 'left' }}
                                                                                                      displayEmpty
                                                                                                >
                                                                                                      {PosNeg_Option.map((HavIgG) => (
                                                                                                            <MenuItem
                                                                                                                  value={HavIgG.value}
                                                                                                                  key={HavIgG.value}
                                                                                                            >{HavIgG.label}</MenuItem>
                                                                                                      )
                                                                                                      )}
                                                                                                </Select>
                                                                                          </FormControl>
                                                                                    }
                                                                              </TableCell>
                                                                              <TableCell sx={{ backgroundColor: "#F9F9F9" }}>
                                                                                    <FormControl fullWidth>
                                                                                          <InputBase
                                                                                                placeholder={definePlaceholder(values.HavIgG_Value_past)}
                                                                                                disabled
                                                                                                value={defineValue(values.HavIgG_Value_past)}
                                                                                                className={values.HavIgG_Value_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                                error={Boolean(touched.HavIgG_Value_past && errors.HavIgG_Value_past)}
                                                                                          />
                                                                                          <FormHelperText error id="HavIgG_Value_past-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.HavIgG_Value_past && errors.HavIgG_Value_past}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                                    {values.HavIgG_Value_past === "-9995" ?
                                                                                          <FormControl fullWidth>
                                                                                                <InputBase
                                                                                                      placeholder="[NI]"
                                                                                                      disabled
                                                                                                      value="[NI]"
                                                                                                      className='textField'
                                                                                                />
                                                                                          </FormControl>
                                                                                          :
                                                                                          <FormControl fullWidth>
                                                                                                <Select
                                                                                                      disabled
                                                                                                      className={values.HavIgG_Status_past_redstar === null ? 'default' : 'red'}
                                                                                                      error={Boolean(touched.HavIgG_Status_past && errors.HavIgG_Status_past)}
                                                                                                      {...getFieldProps('HavIgG_Status_past')}
                                                                                                      style={{ textAlign: 'left' }}
                                                                                                      displayEmpty
                                                                                                >
                                                                                                      {PosNeg_Option.map((HavIgG) => (
                                                                                                            <MenuItem
                                                                                                                  value={HavIgG.value}
                                                                                                                  key={HavIgG.value}
                                                                                                            >{HavIgG.label}</MenuItem>
                                                                                                      )
                                                                                                      )}
                                                                                                </Select>
                                                                                          </FormControl>
                                                                                    }
                                                                              </TableCell>
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">F-T4</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.RFFT4_current)}
                                                                                          disabled={defineDisabled(values.RFFT4_current)}
                                                                                          value={defineValue(values.RFFT4_current)}
                                                                                          onChange={(e) => formik.setFieldValue("RFFT4_current", e.target.value)}
                                                                                          className={values.RFFT4_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.RFFT4_unit}</Typography></InputAdornment>}
                                                                                    />
                                                                                    <FormHelperText error id="RFFT4_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.RFFT4_current && errors.RFFT4_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.RFFT4_previous)}
                                                                                          disabled
                                                                                          value={defineValue(values.RFFT4_previous)}
                                                                                          className={values.RFFT4_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_previous !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.RFFT4_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.RFFT4_past)}
                                                                                          disabled
                                                                                          value={defineValue(values.RFFT4_past)}
                                                                                          className={values.RFFT4_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.RFFT4_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">EBV anti-body</Typography>
                                                                              </TableCell>
                                                                              <TableCell sx={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8, backgroundColor: "#DDDDDD" }}>
                                                                                    <FormControl fullWidth>
                                                                                          <InputBase
                                                                                                placeholder={definePlaceholder(values.EBV_Value_current)}
                                                                                                disabled={defineDisabled(values.EBV_Value_current)}
                                                                                                value={defineValue(values.EBV_Value_current)}
                                                                                                onChange={
                                                                                                      (e) => {
                                                                                                            formik.setFieldValue("EBV_Value_current", e.target.value);
                                                                                                            if (e.target.value < 4) {
                                                                                                                  formik.setFieldValue("EBV_Status_current", "2");
                                                                                                            }
                                                                                                            else {
                                                                                                                  formik.setFieldValue("EBV_Status_current", "1");
                                                                                                            }
                                                                                                      }
                                                                                                }
                                                                                                className={values.EBV_Value_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                                error={Boolean(touched.EBV_Value_current && errors.EBV_Value_current)}
                                                                                          />
                                                                                          <FormHelperText error id="EBV_Value_current-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.EBV_Value_current && errors.EBV_Value_current}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                                    {values.EBV_Value_current === "-9995" ?
                                                                                          <FormControl fullWidth>
                                                                                                <InputBase
                                                                                                      placeholder="[NI]"
                                                                                                      disabled
                                                                                                      value="[NI]"
                                                                                                      className='textField'
                                                                                                />
                                                                                          </FormControl>
                                                                                          :
                                                                                          <FormControl fullWidth>
                                                                                                <Select
                                                                                                      disabled
                                                                                                      className={values.EBV_Status_current === "2" ? 'default' : 'red'}
                                                                                                      error={Boolean(touched.EBV_Status_current && errors.EBV_Status_current)}
                                                                                                      {...getFieldProps('EBV_Status_current')}
                                                                                                      style={{ textAlign: 'left' }}
                                                                                                      displayEmpty
                                                                                                >
                                                                                                      {PosNeg_Option.map((EBV) => (
                                                                                                            <MenuItem
                                                                                                                  value={EBV.value}
                                                                                                                  key={EBV.value}
                                                                                                            >{EBV.label}</MenuItem>
                                                                                                      )
                                                                                                      )}
                                                                                                </Select>
                                                                                          </FormControl>
                                                                                    }

                                                                              </TableCell>
                                                                              <TableCell sx={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8, backgroundColor: "#F9F9F9F9" }}>
                                                                                    <FormControl fullWidth>
                                                                                          <InputBase
                                                                                                placeholder={definePlaceholder(values.EBV_Value_previous)}
                                                                                                disabled
                                                                                                value={defineValue(values.EBV_Value_previous)}
                                                                                                className={values.EBV_Value_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                                error={Boolean(touched.EBV_Value_previous && errors.EBV_Value_previous)}
                                                                                          />
                                                                                          <FormHelperText error id="EBV_Value_previous-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.EBV_Value_previous && errors.EBV_Value_previous}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                                    {values.EBV_Value_previous === "-9995" ?
                                                                                          <FormControl fullWidth>
                                                                                                <InputBase
                                                                                                      placeholder="[NI]"
                                                                                                      disabled
                                                                                                      value="[NI]"
                                                                                                      className='textField'
                                                                                                />
                                                                                          </FormControl>
                                                                                          :
                                                                                          <FormControl fullWidth>
                                                                                                <Select
                                                                                                      disabled
                                                                                                      className={values.EBV_Status_previous === "2" ? 'default' : 'red'}
                                                                                                      error={Boolean(touched.EBV_Status_previous && errors.EBV_Status_previous)}
                                                                                                      {...getFieldProps('EBV_Status_previous')}
                                                                                                      style={{ textAlign: 'left' }}
                                                                                                      displayEmpty
                                                                                                >
                                                                                                      {PosNeg_Option.map((EBV) => (
                                                                                                            <MenuItem
                                                                                                                  value={EBV.value}
                                                                                                                  key={EBV.value}
                                                                                                            >{EBV.label}</MenuItem>
                                                                                                      )
                                                                                                      )}
                                                                                                </Select>
                                                                                          </FormControl>
                                                                                    }
                                                                              </TableCell>
                                                                              <TableCell sx={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8, backgroundColor: "#F9F9F9F9" }}>
                                                                                    <FormControl fullWidth>
                                                                                          <InputBase
                                                                                                placeholder={definePlaceholder(values.EBV_Value_past)}
                                                                                                disabled
                                                                                                value={defineValue(values.EBV_Value_past)}
                                                                                                className={values.EBV_Value_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                                error={Boolean(touched.EBV_Value_past && errors.EBV_Value_past)}
                                                                                          />
                                                                                          <FormHelperText error id="EBV_Value_past-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.EBV_Value_past && errors.EBV_Value_past}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                                    {values.EBV_Value_past === "-9995" ?
                                                                                          <FormControl fullWidth>
                                                                                                <InputBase
                                                                                                      placeholder="[NI]"
                                                                                                      disabled
                                                                                                      value="[NI]"
                                                                                                      className='textField'
                                                                                                />
                                                                                          </FormControl>
                                                                                          :
                                                                                          <FormControl fullWidth>
                                                                                                <Select
                                                                                                      disabled
                                                                                                      className={values.EBV_Status_past === "2" ? 'default' : 'red'}
                                                                                                      error={Boolean(touched.EBV_Status_past && errors.EBV_Status_past)}
                                                                                                      {...getFieldProps('EBV_Status_past')}
                                                                                                      style={{ textAlign: 'left' }}
                                                                                                      displayEmpty
                                                                                                >
                                                                                                      {PosNeg_Option.map((EBV) => (
                                                                                                            <MenuItem
                                                                                                                  value={EBV.value}
                                                                                                                  key={EBV.value}
                                                                                                            >{EBV.label}</MenuItem>
                                                                                                      )
                                                                                                      )}
                                                                                                </Select>
                                                                                          </FormControl>
                                                                                    }
                                                                              </TableCell>
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">a-FP</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.YFPLevel_current)}
                                                                                          disabled={defineDisabled(values.YFPLevel_current)}
                                                                                          value={defineValue(values.YFPLevel_current)}
                                                                                          onChange={(e) => formik.setFieldValue("YFPLevel_current", e.target.value)}
                                                                                          className={values.YFPLevel_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.YFPLevel_unit}</Typography></InputAdornment>}
                                                                                    />
                                                                                    <FormHelperText error id="YFPLevel_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.YFPLevel_current && errors.YFPLevel_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.YFPLevel_previous)}
                                                                                          disabled
                                                                                          value={defineValue(values.YFPLevel_previous)}
                                                                                          className={values.YFPLevel_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_previous !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.YFPLevel_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.YFPLevel_past)}
                                                                                          disabled
                                                                                          value={defineValue(values.YFPLevel_past)}
                                                                                          className={values.YFPLevel_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.YFPLevel_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                              <TableCell sx={{ background: "#FFFFFF !important" }}> </TableCell>
                                                                              <TableCell sx={{ background: "#FFFFFF !important" }}> <Button
                                                                                    size="large"
                                                                                    type="button"
                                                                                    variant="contained"
                                                                                    onClick={() => {
                                                                                          setSubmitAction("confirm");
                                                                                          setSubmitCategory("Immunology");
                                                                                          handleSubmit();
                                                                                    }}
                                                                              >
                                                                                    Confirm
                                                                              </Button></TableCell>
                                                                              <TableCell sx={{ background: "#FFFFFF !important" }}>
                                                                                    {values.immunology_confirm_staff === null && values.immunology_confirm_date === null && <Button
                                                                                          size="large"
                                                                                          type="button"
                                                                                          variant="contained"
                                                                                          onClick={() => {
                                                                                                setSubmitAction("release");
                                                                                                setSubmitCategory("Immunology");
                                                                                                handleSubmit();
                                                                                          }}
                                                                                    >
                                                                                          Release
                                                                                    </Button>}
                                                                              </TableCell>
                                                                              <TableCell sx={{ background: "#FFFFFF !important" }}> </TableCell>
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">CEA (General/Smoker)</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.CEALevel_current)}
                                                                                          disabled={defineDisabled(values.CEALevel_current)}
                                                                                          value={defineValue(values.CEALevel_current)}
                                                                                          onChange={(e) => formik.setFieldValue("CEALevel_current", e.target.value)}
                                                                                          className={values.CEALevel_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.CEALevel_unit}</Typography></InputAdornment>}
                                                                                    />
                                                                                    <FormHelperText error id="CEALevel_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.CEALevel_current && errors.CEALevel_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.CEALevel_previous)}
                                                                                          disabled
                                                                                          value={defineValue(values.CEALevel_previous)}
                                                                                          className={values.CEALevel_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_previous !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.CEALevel_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.CEALevel_past)}
                                                                                          disabled
                                                                                          value={defineValue(values.CEALevel_past)}
                                                                                          className={values.CEALevel_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.CEALevel_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">RA Factor(RF)</Typography>
                                                                              </TableCell>
                                                                              <TableCell sx={{ backgroundColor: "#DDDDDD" }}>
                                                                                    <FormControl fullWidth>
                                                                                          <InputBase
                                                                                                placeholder={definePlaceholder(values.RANormal_Value_current)}
                                                                                                disabled={defineDisabled(values.RANormal_Value_current)}
                                                                                                value={defineValue(values.RANormal_Value_current)}
                                                                                                onChange={
                                                                                                      (e) => {
                                                                                                            formik.setFieldValue("RANormal_Value_current", e.target.value);
                                                                                                            if (e.target.value < 20) {
                                                                                                                  formik.setFieldValue("RANormal_Status_current", "2");
                                                                                                            }
                                                                                                            else {
                                                                                                                  formik.setFieldValue("RANormal_Status_current", "1");
                                                                                                            }
                                                                                                      }
                                                                                                }
                                                                                                className={values.RANormal_Value_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                                error={Boolean(touched.RANormal_Value_current && errors.RANormal_Value_current)}
                                                                                          />
                                                                                          <FormHelperText error id="RANormal_Value_current-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.RANormal_Value_current && errors.RANormal_Value_current}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                                    {values.RANormal_Value_current === "-9995" ?
                                                                                          <FormControl fullWidth>
                                                                                                <InputBase
                                                                                                      placeholder="[NI]"
                                                                                                      disabled
                                                                                                      value="[NI]"
                                                                                                      className='textField'
                                                                                                />
                                                                                          </FormControl>
                                                                                          :
                                                                                          <FormControl fullWidth>
                                                                                                <Select
                                                                                                      disabled
                                                                                                      className={values.RANormal_Status_current === "2" ? 'default' : 'red'}
                                                                                                      error={Boolean(touched.RANormal_Status_current && errors.RANormal_Status_current)}
                                                                                                      {...getFieldProps('RANormal_Status_current')}
                                                                                                      style={{ textAlign: 'left' }}
                                                                                                      displayEmpty
                                                                                                >
                                                                                                      {PosNeg_Option.map((RANormal) => (
                                                                                                            <MenuItem
                                                                                                                  value={RANormal.value}
                                                                                                                  key={RANormal.value}
                                                                                                            >{RANormal.label}</MenuItem>
                                                                                                      )
                                                                                                      )}
                                                                                                </Select>
                                                                                          </FormControl>
                                                                                    }

                                                                              </TableCell>
                                                                              <TableCell sx={{ backgroundColor: "#F9F9F9" }}>
                                                                                    <FormControl fullWidth>
                                                                                          <InputBase
                                                                                                placeholder={definePlaceholder(values.RANormal_Value_previous)}
                                                                                                disabled
                                                                                                value={defineValue(values.RANormal_Value_previous)}
                                                                                                className={values.RANormal_Value_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                                error={Boolean(touched.RANormal_Value_previous && errors.RANormal_Value_previous)}
                                                                                          />
                                                                                          <FormHelperText error id="RANormal_Value_previous-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.RANormal_Value_previous && errors.RANormal_Value_previous}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                                    {values.RANormal_Value_previous === "-9995" ?
                                                                                          <FormControl fullWidth>
                                                                                                <InputBase
                                                                                                      placeholder="[NI]"
                                                                                                      disabled
                                                                                                      value="[NI]"
                                                                                                      className='textField'
                                                                                                />
                                                                                          </FormControl>
                                                                                          :
                                                                                          <FormControl fullWidth>
                                                                                                <Select
                                                                                                      disabled
                                                                                                      className={values.RANormal_Status_previous === "2" ? 'default' : 'red'}
                                                                                                      error={Boolean(touched.RANormal_Status_previous && errors.RANormal_Status_previous)}
                                                                                                      {...getFieldProps('RANormal_Status_previous')}
                                                                                                      style={{ textAlign: 'left' }}
                                                                                                      displayEmpty
                                                                                                >
                                                                                                      {PosNeg_Option.map((RANormal) => (
                                                                                                            <MenuItem
                                                                                                                  value={RANormal.value}
                                                                                                                  key={RANormal.value}
                                                                                                            >{RANormal.label}</MenuItem>
                                                                                                      )
                                                                                                      )}
                                                                                                </Select>
                                                                                          </FormControl>
                                                                                    }
                                                                              </TableCell>
                                                                              <TableCell sx={{ backgroundColor: "#F9F9F9" }}>
                                                                                    <FormControl fullWidth>
                                                                                          <InputBase
                                                                                                placeholder={definePlaceholder(values.RANormal_Value_past)}
                                                                                                disabled
                                                                                                value={defineValue(values.RANormal_Value_past)}
                                                                                                className={values.RANormal_Value_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                                error={Boolean(touched.RANormal_Value_past && errors.RANormal_Value_past)}
                                                                                          />
                                                                                          <FormHelperText error id="RANormal_Value_past-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.RANormal_Value_past && errors.RANormal_Value_past}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                                    {values.RANormal_Value_past === "-9995" ?
                                                                                          <FormControl fullWidth>
                                                                                                <InputBase
                                                                                                      placeholder="[NI]"
                                                                                                      disabled
                                                                                                      value="[NI]"
                                                                                                      className='textField'
                                                                                                />
                                                                                          </FormControl>
                                                                                          :
                                                                                          <FormControl fullWidth>
                                                                                                <Select
                                                                                                      disabled
                                                                                                      className={values.RANormal_Status_past === "2" ? 'default' : 'red'}
                                                                                                      error={Boolean(touched.RANormal_Status_past && errors.RANormal_Status_past)}
                                                                                                      {...getFieldProps('RANormal_Status_past')}
                                                                                                      style={{ textAlign: 'left' }}
                                                                                                      displayEmpty
                                                                                                >
                                                                                                      {PosNeg_Option.map((RANormal) => (
                                                                                                            <MenuItem
                                                                                                                  value={RANormal.value}
                                                                                                                  key={RANormal.value}
                                                                                                            >{RANormal.label}</MenuItem>
                                                                                                      )
                                                                                                      )}
                                                                                                </Select>
                                                                                          </FormControl>
                                                                                    }
                                                                              </TableCell>
                                                                        </TableRow><TableRow>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">RPR</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    {values.VDRLNormal_current === "-9995" ?
                                                                                          <FormControl fullWidth>
                                                                                                <InputBase
                                                                                                      placeholder="[NI]"
                                                                                                      disabled
                                                                                                      value="[NI]"
                                                                                                      className='textField'
                                                                                                />
                                                                                          </FormControl>
                                                                                          :
                                                                                          <FormControl fullWidth>
                                                                                                <Select
                                                                                                      className={values.VDRLNormal_current === "2" ? 'default' : 'red'}
                                                                                                      error={Boolean(touched.VDRLNormal_current && errors.VDRLNormal_current)}
                                                                                                      {...getFieldProps('VDRLNormal_current')}
                                                                                                      style={{ textAlign: 'left' }}
                                                                                                      displayEmpty
                                                                                                >
                                                                                                      {NonReactive_Option.map((VDRLNormal) => (
                                                                                                            <MenuItem
                                                                                                                  value={VDRLNormal.value}
                                                                                                                  key={VDRLNormal.value}
                                                                                                            >{VDRLNormal.label}</MenuItem>
                                                                                                      )
                                                                                                      )}
                                                                                                </Select>
                                                                                          </FormControl>
                                                                                    }
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    {values.VDRLNormal_previous === "-9995" ?
                                                                                          <FormControl fullWidth>
                                                                                                <InputBase
                                                                                                      placeholder="[NI]"
                                                                                                      disabled
                                                                                                      value="[NI]"
                                                                                                      className='textField'
                                                                                                />
                                                                                          </FormControl>
                                                                                          :
                                                                                          <FormControl fullWidth>
                                                                                                <Select
                                                                                                      disabled
                                                                                                      className={values.VDRLNormal_previous === "2" ? 'default' : 'red'}
                                                                                                      error={Boolean(touched.VDRLNormal_previous && errors.VDRLNormal_previous)}
                                                                                                      {...getFieldProps('VDRLNormal_previous')}
                                                                                                      style={{ textAlign: 'left' }}
                                                                                                      displayEmpty
                                                                                                >
                                                                                                      {NonReactive_Option.map((VDRLNormal) => (
                                                                                                            <MenuItem
                                                                                                                  value={VDRLNormal.value}
                                                                                                                  key={VDRLNormal.value}
                                                                                                            >{VDRLNormal.label}</MenuItem>
                                                                                                      )
                                                                                                      )}
                                                                                                </Select>
                                                                                          </FormControl>
                                                                                    }
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                disabled
                                                                                                className={values.VDRLNormal_past === "2" ? 'default' : 'red'}
                                                                                                error={Boolean(touched.VDRLNormal_past && errors.VDRLNormal_past)}
                                                                                                {...getFieldProps('VDRLNormal_past')}
                                                                                                style={{ textAlign: 'left' }}
                                                                                          >
                                                                                                {NonReactive_Option.map((VDRLNormal) => (
                                                                                                      <MenuItem
                                                                                                            value={VDRLNormal.value}
                                                                                                            key={VDRLNormal.value}
                                                                                                      >{VDRLNormal.label}</MenuItem>
                                                                                                )
                                                                                                )}
                                                                                          </Select>
                                                                                    </FormControl>
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Anti-HCV</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    {values.CVirus_current === "-9995" ?
                                                                                          <FormControl fullWidth>
                                                                                                <InputBase
                                                                                                      placeholder="[NI]"
                                                                                                      disabled
                                                                                                      value="[NI]"
                                                                                                      className='textField'
                                                                                                />
                                                                                          </FormControl>
                                                                                          :
                                                                                          <FormControl fullWidth>
                                                                                                <Select
                                                                                                      className={values.CVirus_current === "2" ? 'default' : 'red'}
                                                                                                      error={Boolean(touched.CVirus_current && errors.CVirus_current)}
                                                                                                      {...getFieldProps('CVirus_current')}
                                                                                                      style={{ textAlign: 'left' }}
                                                                                                      displayEmpty
                                                                                                >
                                                                                                      {PosNeg_Option.map((CVirus) => (
                                                                                                            <MenuItem
                                                                                                                  value={CVirus.value}
                                                                                                                  key={CVirus.value}
                                                                                                            >{CVirus.label}</MenuItem>
                                                                                                      )
                                                                                                      )}
                                                                                                </Select>
                                                                                          </FormControl>
                                                                                    }
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    {values.CVirus_previous === "-9995" ?
                                                                                          <FormControl fullWidth>
                                                                                                <InputBase
                                                                                                      placeholder="[NI]"
                                                                                                      disabled
                                                                                                      value="[NI]"
                                                                                                      className='textField'
                                                                                                />
                                                                                          </FormControl>
                                                                                          :
                                                                                          <FormControl fullWidth>
                                                                                                <Select
                                                                                                      disabled
                                                                                                      className={values.CVirus_previous === "2" ? 'default' : 'red'}
                                                                                                      error={Boolean(touched.CVirus_previous && errors.CVirus_previous)}
                                                                                                      {...getFieldProps('CVirus_previous')}
                                                                                                      style={{ textAlign: 'left' }}
                                                                                                      displayEmpty
                                                                                                >
                                                                                                      {PosNeg_Option.map((CVirus) => (
                                                                                                            <MenuItem
                                                                                                                  value={CVirus.value}
                                                                                                                  key={CVirus.value}
                                                                                                            >{CVirus.label}</MenuItem>
                                                                                                      )
                                                                                                      )}
                                                                                                </Select>
                                                                                          </FormControl>
                                                                                    }
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                disabled
                                                                                                className={values.CVirus_past === "2" ? 'default' : 'red'}
                                                                                                error={Boolean(touched.CVirus_past && errors.CVirus_past)}
                                                                                                {...getFieldProps('CVirus_past')}
                                                                                                style={{ textAlign: 'left' }}
                                                                                          >
                                                                                                {PosNeg_Option.map((CVirus) => (
                                                                                                      <MenuItem
                                                                                                            value={CVirus.value}
                                                                                                            key={CVirus.value}
                                                                                                      >{CVirus.label}</MenuItem>
                                                                                                )
                                                                                                )}
                                                                                          </Select>
                                                                                    </FormControl>
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        {/* <TableRow>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">AIDS</Typography>
                                                                              </TableCell>
                                                                              <TableCell sx={{ backgroundColor: "#DDDDDD" }}>
                                                                                    <FormControl fullWidth>
                                                                                          <InputBase
                                                                                                placeholder={definePlaceholder(values.HIVNormal_Value_current)}
                                                                                                disabled={defineDisabled(values.HIVNormal_Value_current)}
                                                                                                value={defineValue(values.HIVNormal_Value_current)}
                                                                                                onChange={(e) => formik.setFieldValue("HIVNormal_Value_current", e.target.value)}
                                                                                                className={values.HIVNormal_Value_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                                error={Boolean(touched.HIVNormal_Value_current && errors.HIVNormal_Value_current)}
                                                                                          />
                                                                                          <FormHelperText error id="HIVNormal_Value_current-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.HIVNormal_Value_current && errors.HIVNormal_Value_current}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                                    {values.HIVNormal_Value_current === "-9995" ?
                                                                                          <FormControl fullWidth>
                                                                                                <InputBase
                                                                                                      placeholder="[NI]"
                                                                                                      disabled
                                                                                                      value="[NI]"
                                                                                                      className='textField'
                                                                                                />
                                                                                          </FormControl>
                                                                                          :
                                                                                          <FormControl fullWidth>
                                                                                                <Select
                                                                                                      disabled
                                                                                                      className={values.HIVNormal_Status_current_redstar === null ? null : 'red-current'}
                                                                                                      error={Boolean(touched.HIVNormal_Status_current && errors.HIVNormal_Status_current)}
                                                                                                      {...getFieldProps('HIVNormal_Status_current')}
                                                                                                      style={{ textAlign: 'left' }}
                                                                                                      displayEmpty
                                                                                                >
                                                                                                      {PosNeg_Option.map((HIVNormal) => (
                                                                                                            <MenuItem
                                                                                                                  value={HIVNormal.value}
                                                                                                                  key={HIVNormal.value}
                                                                                                            >{HIVNormal.label}</MenuItem>
                                                                                                      )
                                                                                                      )}
                                                                                                </Select>
                                                                                          </FormControl>
                                                                                    }

                                                                              </TableCell>
                                                                              <TableCell sx={{ backgroundColor: "#F9F9F9" }}>
                                                                                    <FormControl fullWidth>
                                                                                          <InputBase
                                                                                                placeholder={definePlaceholder(values.HIVNormal_Value_previous)}
                                                                                                disabled
                                                                                                value={defineValue(values.HIVNormal_Value_previous)}
                                                                                                className={values.HIVNormal_Value_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                                error={Boolean(touched.HIVNormal_Value_previous && errors.HIVNormal_Value_previous)}
                                                                                          />
                                                                                          <FormHelperText error id="HIVNormal_Value_previous-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.HIVNormal_Value_previous && errors.HIVNormal_Value_previous}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                                    {values.HIVNormal_Value_previous === "-9995" ?
                                                                                          <FormControl fullWidth>
                                                                                                <InputBase
                                                                                                      placeholder="[NI]"
                                                                                                      disabled
                                                                                                      value="[NI]"
                                                                                                      className='textField'
                                                                                                />
                                                                                          </FormControl>
                                                                                          :
                                                                                          <FormControl fullWidth>
                                                                                                <Select
                                                                                                      disabled
                                                                                                      className={values.HIVNormal_Status_previous_redstar === null ? null : 'red-previous'}
                                                                                                      error={Boolean(touched.HIVNormal_Status_previous && errors.HIVNormal_Status_previous)}
                                                                                                      {...getFieldProps('HIVNormal_Status_previous')}
                                                                                                      style={{ textAlign: 'left' }}
                                                                                                      displayEmpty
                                                                                                >
                                                                                                      {PosNeg_Option.map((HIVNormal) => (
                                                                                                            <MenuItem
                                                                                                                  value={HIVNormal.value}
                                                                                                                  key={HIVNormal.value}
                                                                                                            >{HIVNormal.label}</MenuItem>
                                                                                                      )
                                                                                                      )}
                                                                                                </Select>
                                                                                          </FormControl>
                                                                                    }
                                                                              </TableCell>
                                                                              <TableCell sx={{ backgroundColor: "#F9F9F9" }}>
                                                                                    <FormControl fullWidth>
                                                                                          <InputBase
                                                                                                placeholder={definePlaceholder(values.HIVNormal_Value_past)}
                                                                                                disabled
                                                                                                value={defineValue(values.HIVNormal_Value_past)}
                                                                                                className={values.HIVNormal_Value_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                                error={Boolean(touched.HIVNormal_Value_past && errors.HIVNormal_Value_past)}
                                                                                          />
                                                                                          <FormHelperText error id="HIVNormal_Value_past-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.HIVNormal_Value_past && errors.HIVNormal_Value_past}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                                    {values.HIVNormal_Value_past === "-9995" ?
                                                                                          <FormControl fullWidth>
                                                                                                <InputBase
                                                                                                      placeholder="[NI]"
                                                                                                      disabled
                                                                                                      value="[NI]"
                                                                                                      className='textField'
                                                                                                />
                                                                                          </FormControl>
                                                                                          :
                                                                                          <FormControl fullWidth>
                                                                                                <Select
                                                                                                      disabled
                                                                                                      className={values.HIVNormal_Status_past_redstar === null ? null : 'red-past'}
                                                                                                      error={Boolean(touched.HIVNormal_Status_past && errors.HIVNormal_Status_past)}
                                                                                                      {...getFieldProps('HIVNormal_Status_past')}
                                                                                                      style={{ textAlign: 'left' }}
                                                                                                      displayEmpty
                                                                                                >
                                                                                                      {PosNeg_Option.map((HIVNormal) => (
                                                                                                            <MenuItem
                                                                                                                  value={HIVNormal.value}
                                                                                                                  key={HIVNormal.value}
                                                                                                            >{HIVNormal.label}</MenuItem>
                                                                                                      )
                                                                                                      )}
                                                                                                </Select>
                                                                                          </FormControl>
                                                                                    }
                                                                              </TableCell>
                                                                        </TableRow> */}
                                                                        <TableRow>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">PSA</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.PSA_current)}
                                                                                          disabled={defineDisabled(values.PSA_current)}
                                                                                          value={defineValue(values.PSA_current)}
                                                                                          onChange={(e) => formik.setFieldValue("PSA_current", e.target.value)}
                                                                                          className={values.PSA_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.PSA_unit}</Typography></InputAdornment>}
                                                                                    />
                                                                                    <FormHelperText error id="PSA_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.PSA_current && errors.PSA_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.PSA_previous)}
                                                                                          disabled
                                                                                          value={defineValue(values.PSA_previous)}
                                                                                          className={values.PSA_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_previous !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.PSA_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.PSA_past)}
                                                                                          disabled
                                                                                          value={defineValue(values.PSA_past)}
                                                                                          className={values.PSA_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.PSA_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">CA15-3</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.CA15_3_current)}
                                                                                          disabled={defineDisabled(values.CA15_3_current)}
                                                                                          value={defineValue(values.CA15_3_current)}
                                                                                          onChange={(e) => formik.setFieldValue("CA15_3_current", e.target.value)}
                                                                                          className={values.CA15_3_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.CA15_3_unit}</Typography></InputAdornment>}
                                                                                    />
                                                                                    <FormHelperText error id="CA15_3_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.CA15_3_current && errors.CA15_3_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.CA15_3_previous)}
                                                                                          disabled
                                                                                          value={defineValue(values.CA15_3_previous)}
                                                                                          className={values.CA15_3_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_previous !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.CA15_3_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.CA15_3_past)}
                                                                                          disabled
                                                                                          value={defineValue(values.CA15_3_past)}
                                                                                          className={values.CA15_3_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.CA15_3_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">CA125</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.CA125_current)}
                                                                                          disabled={defineDisabled(values.CA125_current)}
                                                                                          value={defineValue(values.CA125_current)}
                                                                                          onChange={(e) => formik.setFieldValue("CA125_current", e.target.value)}
                                                                                          className={values.CA125_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.CA125_unit}</Typography></InputAdornment>}
                                                                                    />
                                                                                    <FormHelperText error id="CA125_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.CA125_current && errors.CA125_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.CA125_previous)}
                                                                                          disabled
                                                                                          value={defineValue(values.CA125_previous)}
                                                                                          className={values.CA125_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_previous !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.CA125_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.CA125_past)}
                                                                                          disabled
                                                                                          value={defineValue(values.CA125_past)}
                                                                                          className={values.CA125_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.CA125_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">CA19-9</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.CA19_9_current)}
                                                                                          disabled={defineDisabled(values.CA19_9_current)}
                                                                                          value={defineValue(values.CA19_9_current)}
                                                                                          onChange={(e) => formik.setFieldValue("CA19_9_current", e.target.value)}
                                                                                          className={values.CA19_9_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.CA19_9_unit}</Typography></InputAdornment>}
                                                                                    />
                                                                                    <FormHelperText error id="CA19_9_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.CA19_9_current && errors.CA19_9_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.CA19_9_previous)}
                                                                                          disabled
                                                                                          value={defineValue(values.CA19_9_previous)}
                                                                                          className={values.CA19_9_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_previous !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.CA19_9_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.CA19_9_past)}
                                                                                          disabled
                                                                                          value={defineValue(values.CA19_9_past)}
                                                                                          className={values.CA19_9_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.CA19_9_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">H.pylori Ab</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    {values.Hpyloriab_current === "-9995" ?
                                                                                          <FormControl fullWidth>
                                                                                                <InputBase
                                                                                                      placeholder="[NI]"
                                                                                                      disabled
                                                                                                      value="[NI]"
                                                                                                      className='textField'
                                                                                                />
                                                                                          </FormControl>
                                                                                          :
                                                                                          <FormControl fullWidth>
                                                                                                <Select
                                                                                                      className={values.Hpyloriab_current === "2" ? 'default' : 'red'}
                                                                                                      error={Boolean(touched.Hpyloriab_current && errors.Hpyloriab_current)}
                                                                                                      {...getFieldProps('Hpyloriab_current')}
                                                                                                      style={{ textAlign: 'left' }}
                                                                                                      displayEmpty
                                                                                                >
                                                                                                      {PosNeg_Option.map((Hpyloriab) => (
                                                                                                            <MenuItem
                                                                                                                  value={Hpyloriab.value}
                                                                                                                  key={Hpyloriab.value}
                                                                                                            >{Hpyloriab.label}</MenuItem>
                                                                                                      )
                                                                                                      )}
                                                                                                </Select>
                                                                                          </FormControl>
                                                                                    }
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    {values.Hpyloriab_previous === "-9995" ?
                                                                                          <FormControl fullWidth>
                                                                                                <InputBase
                                                                                                      placeholder="[NI]"
                                                                                                      disabled
                                                                                                      value="[NI]"
                                                                                                      className='textField'
                                                                                                />
                                                                                          </FormControl>
                                                                                          :
                                                                                          <FormControl fullWidth>
                                                                                                <Select
                                                                                                      disabled
                                                                                                      className={values.Hpyloriab_previous === "2" ? 'default' : 'red'}
                                                                                                      error={Boolean(touched.Hpyloriab_previous && errors.Hpyloriab_previous)}
                                                                                                      {...getFieldProps('Hpyloriab_previous')}
                                                                                                      style={{ textAlign: 'left' }}
                                                                                                      displayEmpty
                                                                                                >
                                                                                                      {PosNeg_Option.map((Hpyloriab) => (
                                                                                                            <MenuItem
                                                                                                                  value={Hpyloriab.value}
                                                                                                                  key={Hpyloriab.value}
                                                                                                            >{Hpyloriab.label}</MenuItem>
                                                                                                      )
                                                                                                      )}
                                                                                                </Select>
                                                                                          </FormControl>
                                                                                    }
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                disabled
                                                                                                className={values.Hpyloriab_past === "2" ? 'default' : 'red'}
                                                                                                error={Boolean(touched.Hpyloriab_past && errors.Hpyloriab_past)}
                                                                                                {...getFieldProps('Hpyloriab_past')}
                                                                                                style={{ textAlign: 'left' }}
                                                                                          >
                                                                                                {PosNeg_Option.map((Hpyloriab) => (
                                                                                                      <MenuItem
                                                                                                            value={Hpyloriab.value}
                                                                                                            key={Hpyloriab.value}
                                                                                                      >{Hpyloriab.label}</MenuItem>
                                                                                                )
                                                                                                )}
                                                                                          </Select>
                                                                                    </FormControl>
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Homocysteine</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.Homocy_current)}
                                                                                          disabled={defineDisabled(values.Homocy_current)}
                                                                                          value={defineValue(values.Homocy_current)}
                                                                                          onChange={(e) => formik.setFieldValue("Homocy_current", e.target.value)}
                                                                                          className={values.Homocy_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.Homocy_unit}</Typography></InputAdornment>}
                                                                                    />
                                                                                    <FormHelperText error id="Homocy_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.Homocy_current && errors.Homocy_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.Homocy_previous)}
                                                                                          disabled
                                                                                          value={defineValue(values.Homocy_previous)}
                                                                                          className={values.Homocy_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_previous !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.Homocy_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.Homocy_past)}
                                                                                          disabled
                                                                                          value={defineValue(values.Homocy_past)}
                                                                                          className={values.Homocy_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.Homocy_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                  </TableBody>
                                                            </Table>
                                                      </TableContainer>
                                                </Container>
                                          </TabPanel>
                                          <TabPanel value="2">
                                                <Container sx={{ backgroundColor: "#FFFFFF", height: "100%", paddingTop: 1 }}>
                                                      {values.biochemistry_confirm_staff !== null && <Typography sx={{ fontSize: 12 }}>{values.biochemistry_confirm_staff} confirmed at {values.biochemistry_confirm_date}</Typography>}
                                                      {values.biochemistry_release_staff !== null && values.biochemistry_confirm_staff === null && <Typography sx={{ fontSize: 12 }}>{values.biochemistry_release_staff} released at {values.biochemistry_release_date}</Typography>}
                                                      <TableContainer
                                                            component={Paper}
                                                            sx={{
                                                                  height: "100%",
                                                                  paddingTop: 2,
                                                                  paddingBottom: 2,
                                                                  marginLeft: 0,
                                                                  marginBottom: 0,
                                                                  '&:last-child td, &:last-child th': { border: 0 },
                                                                  '& td:nth-of-type(2),& th:nth-of-type(2),& td:nth-of-type(6),& th:nth-of-type(6)': { backgroundColor: "#DDDDDD" },
                                                                  '& td:nth-of-type(3),& th:nth-of-type(3),& td:nth-of-type(7),& th:nth-of-type(7)': { backgroundColor: "#F9F9F9" },
                                                                  '& td:nth-of-type(4),& th:nth-of-type(4),& td:nth-of-type(8),& th:nth-of-type(8)': { backgroundColor: "#F9F9F9" },
                                                                  '& td:nth-of-type(1)': { paddingLeft: 0, paddingTop: 0, paddingBottom: 0, marginBottom: 0 },
                                                                  '& td:nth-of-type(2),& td:nth-of-type(3),& td:nth-of-type(4),& td:nth-of-type(6),& td:nth-of-type(7),& td:nth-of-type(8)': { paddingTop: 0, paddingBottom: 1, marginTop: 0, marginBottom: 1 },
                                                            }}>
                                                            <Table sx={{ width: "100%", minWidth: 650, height: "100%", tableLayout: "fixed" }} size="small">
                                                                  <TableHead >
                                                                        <TableRow >
                                                                              <TableCell > </TableCell>
                                                                              <TableCell align="center" sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>Current</TableCell>
                                                                              <TableCell align="center" sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>{values.test_date_previous !== null ? `${values.test_date_previous}` : 'Previous'}</TableCell>
                                                                              <TableCell align="center" sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>{values.test_date_past !== null ? `${values.test_date_past}` : 'Past'}</TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell align="center" sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>Current</TableCell>
                                                                              <TableCell align="center" sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>{values.test_date_previous !== null ? `${values.test_date_previous}` : 'Previous'}</TableCell>
                                                                              <TableCell align="center" sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>{values.test_date_past !== null ? `${values.test_date_past}` : 'Past'}</TableCell>
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
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label_group">Uric Acid Tests</Typography>
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
                                                                                          placeholder={definePlaceholder(values.Glucose_current)}
                                                                                          disabled={defineDisabled(values.Glucose_current)}
                                                                                          value={defineValue(values.Glucose_current)}
                                                                                          onChange={(e) => formik.setFieldValue("Glucose_current", e.target.value)}
                                                                                          className={values.Glucose_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.Glucose_unit}</Typography></InputAdornment>}
                                                                                    />
                                                                                    <FormHelperText error id="Glucose_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.Glucose_current && errors.Glucose_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.Glucose_previous)}
                                                                                          disabled
                                                                                          value={defineValue(values.Glucose_previous)}
                                                                                          className={values.Glucose_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_previous !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.Glucose_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.Glucose_past)}
                                                                                          disabled
                                                                                          value={defineValue(values.Glucose_past)}
                                                                                          className={values.Glucose_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.Glucose_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Uric Acid</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.UFUA_current)}
                                                                                          disabled={defineDisabled(values.UFUA_current)}
                                                                                          value={defineValue(values.UFUA_current)}
                                                                                          onChange={(e) => formik.setFieldValue("UFUA_current", e.target.value)}
                                                                                          className={values.UFUA_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.UFUA_unit}</Typography></InputAdornment>}
                                                                                    />
                                                                                    <FormHelperText error id="UFUA_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.UFUA_current && errors.UFUA_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.UFUA_previous)}
                                                                                          disabled
                                                                                          value={defineValue(values.UFUA_previous)}
                                                                                          className={values.UFUA_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_previous !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.UFUA_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.UFUA_past)}
                                                                                          disabled
                                                                                          value={defineValue(values.UFUA_past)}
                                                                                          className={values.UFUA_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.UFUA_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">HbA1c</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.HbA1c_current)}
                                                                                          disabled={defineDisabled(values.HbA1c_current)}
                                                                                          value={defineValue(values.HbA1c_current)}
                                                                                          onChange={(e) => formik.setFieldValue("HbA1c_current", e.target.value)}
                                                                                          className={values.HbA1c_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.HbA1c_unit}</Typography></InputAdornment>}
                                                                                    />
                                                                                    <FormHelperText error id="HbA1c_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.HbA1c_current && errors.HbA1c_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.HbA1c_previous)}
                                                                                          disabled
                                                                                          value={defineValue(values.HbA1c_previous)}
                                                                                          className={values.HbA1c_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_previous !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.HbA1c_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.HbA1c_past)}
                                                                                          disabled
                                                                                          value={defineValue(values.HbA1c_past)}
                                                                                          className={values.HbA1c_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.HbA1c_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label_group">Blood Lipid Tests</Typography>
                                                                              </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                              <TableCell align="right">
                                                                                    <Typography variant="label_group">Liver Function Tests</Typography>
                                                                              </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Triglyceride</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.BGTG_current)}
                                                                                          disabled={defineDisabled(values.BGTG_current)}
                                                                                          value={defineValue(values.BGTG_current)}
                                                                                          onChange={(e) => formik.setFieldValue("BGTG_current", e.target.value)}
                                                                                          className={values.BGTG_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.BGTG_unit}</Typography></InputAdornment>}
                                                                                    />
                                                                                    <FormHelperText error id="BGTG_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.BGTG_current && errors.BGTG_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.BGTG_previous)}
                                                                                          disabled
                                                                                          value={defineValue(values.BGTG_previous)}
                                                                                          className={values.BGTG_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_previous !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.BGTG_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.BGTG_past)}
                                                                                          disabled
                                                                                          value={defineValue(values.BGTG_past)}
                                                                                          className={values.BGTG_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.BGTG_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Total Bilirubin</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.TFTBIL_current)}
                                                                                          disabled={defineDisabled(values.TFTBIL_current)}
                                                                                          value={defineValue(values.TFTBIL_current)}
                                                                                          onChange={(e) => formik.setFieldValue("TFTBIL_current", e.target.value)}
                                                                                          className={values.TFTBIL_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.TFTBIL_unit}</Typography></InputAdornment>}
                                                                                    />
                                                                                    <FormHelperText error id="TFTBIL_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.TFTBIL_current && errors.TFTBIL_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.TFTBIL_previous)}
                                                                                          disabled
                                                                                          value={defineValue(values.TFTBIL_previous)}
                                                                                          className={values.TFTBIL_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_previous !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.TFTBIL_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.TFTBIL_past)}
                                                                                          disabled
                                                                                          value={defineValue(values.TFTBIL_past)}
                                                                                          className={values.TFTBIL_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.TFTBIL_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Cholesterol</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.BGCHOL_current)}
                                                                                          disabled={defineDisabled(values.BGCHOL_current)}
                                                                                          value={defineValue(values.BGCHOL_current)}
                                                                                          onChange={(e) => formik.setFieldValue("BGCHOL_current", e.target.value)}
                                                                                          className={values.BGCHOL_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.BGCHOL_unit}</Typography></InputAdornment>}
                                                                                    />
                                                                                    <FormHelperText error id="BGCHOL_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.BGCHOL_current && errors.BGCHOL_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.BGCHOL_previous)}
                                                                                          disabled
                                                                                          value={defineValue(values.BGCHOL_previous)}
                                                                                          className={values.BGCHOL_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_previous !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.BGCHOL_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.BGCHOL_past)}
                                                                                          disabled
                                                                                          value={defineValue(values.BGCHOL_past)}
                                                                                          className={values.BGCHOL_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.BGCHOL_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Total Protein</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.TFTP_current)}
                                                                                          disabled={defineDisabled(values.TFTP_current)}
                                                                                          value={defineValue(values.TFTP_current)}
                                                                                          onChange={(e) => formik.setFieldValue("TFTP_current", e.target.value)}
                                                                                          className={values.TFTP_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.TFTP_unit}</Typography></InputAdornment>}
                                                                                    />
                                                                                    <FormHelperText error id="TFTP_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.TFTP_current && errors.TFTP_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.TFTP_previous)}
                                                                                          disabled
                                                                                          value={defineValue(values.TFTP_previous)}
                                                                                          className={values.TFTP_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_previous !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.TFTP_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.TFTP_past)}
                                                                                          disabled
                                                                                          value={defineValue(values.TFTP_past)}
                                                                                          className={values.TFTP_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.TFTP_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">HDL-Cholesterol</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.BGHDLC_current)}
                                                                                          disabled={defineDisabled(values.BGHDLC_current)}
                                                                                          value={defineValue(values.BGHDLC_current)}
                                                                                          onChange={(e) => formik.setFieldValue("BGHDLC_current", e.target.value)}
                                                                                          className={values.BGHDLC_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.BGHDLC_unit}</Typography></InputAdornment>}
                                                                                    />
                                                                                    <FormHelperText error id="BGHDLC_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.BGHDLC_current && errors.BGHDLC_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.BGHDLC_previous)}
                                                                                          disabled
                                                                                          value={defineValue(values.BGHDLC_previous)}
                                                                                          className={values.BGHDLC_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_previous !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.BGHDLC_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.BGHDLC_past)}
                                                                                          disabled
                                                                                          value={defineValue(values.BGHDLC_past)}
                                                                                          className={values.BGHDLC_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.BGHDLC_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Albumin</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.TFALB_current)}
                                                                                          disabled={defineDisabled(values.TFALB_current)}
                                                                                          value={defineValue(values.TFALB_current)}
                                                                                          onChange={(e) => formik.setFieldValue("TFALB_current", e.target.value)}
                                                                                          className={values.TFALB_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.TFALB_unit}</Typography></InputAdornment>}
                                                                                    />
                                                                                    <FormHelperText error id="TFALB_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.TFALB_current && errors.TFALB_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.TFALB_previous)}
                                                                                          disabled
                                                                                          value={defineValue(values.TFALB_previous)}
                                                                                          className={values.TFALB_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_previous !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.TFALB_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.TFALB_past)}
                                                                                          disabled
                                                                                          value={defineValue(values.TFALB_past)}
                                                                                          className={values.TFALB_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.TFALB_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">LDL-Cholesterol</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.BGLDLC_current)}
                                                                                          disabled={defineDisabled(values.BGLDLC_current)}
                                                                                          value={defineValue(values.BGLDLC_current)}
                                                                                          onChange={(e) => formik.setFieldValue("BGLDLC_current", e.target.value)}
                                                                                          className={values.BGLDLC_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.BGLDLC_unit}</Typography></InputAdornment>}
                                                                                    />
                                                                                    <FormHelperText error id="BGLDLC_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.BGLDLC_current && errors.BGLDLC_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.BGLDLC_previous)}
                                                                                          disabled
                                                                                          value={defineValue(values.BGLDLC_previous)}
                                                                                          className={values.BGLDLC_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_previous !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.BGLDLC_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.BGLDLC_past)}
                                                                                          disabled
                                                                                          value={defineValue(values.BGLDLC_past)}
                                                                                          className={values.BGLDLC_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.BGLDLC_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Globulin</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.TFGLO_current)}
                                                                                          disabled={defineDisabled(values.TFGLO_current)}
                                                                                          value={defineValue(values.TFGLO_current)}
                                                                                          onChange={(e) => formik.setFieldValue("TFGLO_current", e.target.value)}
                                                                                          className={values.TFGLO_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.TFGLO_unit}</Typography></InputAdornment>}
                                                                                    />
                                                                                    <FormHelperText error id="TFGLO_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.TFGLO_current && errors.TFGLO_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.TFGLO_previous)}
                                                                                          disabled
                                                                                          value={defineValue(values.TFGLO_previous)}
                                                                                          className={values.TFGLO_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_previous !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.TFGLO_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.TFGLO_past)}
                                                                                          disabled
                                                                                          value={defineValue(values.TFGLO_past)}
                                                                                          className={values.TFGLO_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.TFGLO_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">CHOL/HDL-C</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.BGCH_current)}
                                                                                          disabled={defineDisabled(values.BGCH_current)}
                                                                                          value={defineValue(values.BGCH_current)}
                                                                                          onChange={(e) => formik.setFieldValue("BGCH_current", e.target.value)}
                                                                                          className={values.BGCH_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.BGCH_unit}</Typography></InputAdornment>}
                                                                                    />
                                                                                    <FormHelperText error id="BGCH_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.BGCH_current && errors.BGCH_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.BGCH_previous)}
                                                                                          disabled
                                                                                          value={defineValue(values.BGCH_previous)}
                                                                                          className={values.BGCH_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_previous !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.BGCH_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.BGCH_past)}
                                                                                          disabled
                                                                                          value={defineValue(values.BGCH_past)}
                                                                                          className={values.BGCH_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.BGCH_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Alkaline Phosphatase</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.TFALP_current)}
                                                                                          disabled={defineDisabled(values.TFALP_current)}
                                                                                          value={defineValue(values.TFALP_current)}
                                                                                          onChange={(e) => formik.setFieldValue("TFALP_current", e.target.value)}
                                                                                          className={values.TFALP_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.TFALP_unit}</Typography></InputAdornment>}
                                                                                    />
                                                                                    <FormHelperText error id="TFALP_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.TFALP_current && errors.TFALP_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.TFALP_previous)}
                                                                                          disabled
                                                                                          value={defineValue(values.TFALP_previous)}
                                                                                          className={values.TFALP_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_previous !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.TFALP_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.TFALP_past)}
                                                                                          disabled
                                                                                          value={defineValue(values.TFALP_past)}
                                                                                          className={values.TFALP_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.TFALP_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label_group">Ca.P.Fe Tests</Typography>
                                                                              </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">sGOT (AST)</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.TFsGOT_current)}
                                                                                          disabled={defineDisabled(values.TFsGOT_current)}
                                                                                          value={defineValue(values.TFsGOT_current)}
                                                                                          onChange={(e) => formik.setFieldValue("TFsGOT_current", e.target.value)}
                                                                                          className={values.TFsGOT_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.TFsGOT_unit}</Typography></InputAdornment>}
                                                                                    />
                                                                                    <FormHelperText error id="TFsGOT_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.TFsGOT_current && errors.TFsGOT_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.TFsGOT_previous)}
                                                                                          disabled
                                                                                          value={defineValue(values.TFsGOT_previous)}
                                                                                          className={values.TFsGOT_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_previous !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.TFsGOT_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.TFsGOT_past)}
                                                                                          disabled
                                                                                          value={defineValue(values.TFsGOT_past)}
                                                                                          className={values.TFsGOT_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.TFsGOT_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Ca</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.EFCA_current)}
                                                                                          disabled={defineDisabled(values.EFCA_current)}
                                                                                          value={defineValue(values.EFCA_current)}
                                                                                          onChange={(e) => formik.setFieldValue("EFCA_current", e.target.value)}
                                                                                          className={values.EFCA_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.EFCA_unit}</Typography></InputAdornment>}
                                                                                    />
                                                                                    <FormHelperText error id="EFCA_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.EFCA_current && errors.EFCA_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.EFCA_previous)}
                                                                                          disabled
                                                                                          value={defineValue(values.EFCA_previous)}
                                                                                          className={values.EFCA_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_previous !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.EFCA_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.EFCA_past)}
                                                                                          disabled
                                                                                          value={defineValue(values.EFCA_past)}
                                                                                          className={values.EFCA_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.EFCA_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">sGPT (ALT)</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.TFsGPT_current)}
                                                                                          disabled={defineDisabled(values.TFsGPT_current)}
                                                                                          value={defineValue(values.TFsGPT_current)}
                                                                                          onChange={(e) => formik.setFieldValue("TFsGPT_current", e.target.value)}
                                                                                          className={values.TFsGPT_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.TFsGPT_unit}</Typography></InputAdornment>}
                                                                                    />
                                                                                    <FormHelperText error id="TFsGPT_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.TFsGPT_current && errors.TFsGPT_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.TFsGPT_previous)}
                                                                                          disabled
                                                                                          value={defineValue(values.TFsGPT_previous)}
                                                                                          className={values.TFsGPT_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_previous !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.TFsGPT_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.TFsGPT_past)}
                                                                                          disabled
                                                                                          value={defineValue(values.TFsGPT_past)}
                                                                                          className={values.TFsGPT_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.TFsGPT_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">P</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.EFP_current)}
                                                                                          disabled={defineDisabled(values.EFP_current)}
                                                                                          value={defineValue(values.EFP_current)}
                                                                                          onChange={(e) => formik.setFieldValue("EFP_current", e.target.value)}
                                                                                          className={values.EFP_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.EFP_unit}</Typography></InputAdornment>}
                                                                                    />
                                                                                    <FormHelperText error id="EFP_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.EFP_current && errors.EFP_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.EFP_previous)}
                                                                                          disabled
                                                                                          value={defineValue(values.EFP_previous)}
                                                                                          className={values.EFP_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_previous !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.EFP_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.EFP_past)}
                                                                                          disabled
                                                                                          value={defineValue(values.EFP_past)}
                                                                                          className={values.EFP_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.EFP_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">r-GT (GGT)</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.TFYGT_current)}
                                                                                          disabled={defineDisabled(values.TFYGT_current)}
                                                                                          value={defineValue(values.TFYGT_current)}
                                                                                          onChange={(e) => formik.setFieldValue("TFYGT_current", e.target.value)}
                                                                                          className={values.TFYGT_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.TFYGT_unit}</Typography></InputAdornment>}
                                                                                    />
                                                                                    <FormHelperText error id="TFYGT_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.TFYGT_current && errors.TFYGT_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.TFYGT_previous)}
                                                                                          disabled
                                                                                          value={defineValue(values.TFYGT_previous)}
                                                                                          className={values.TFYGT_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_previous !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.TFYGT_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.TFYGT_past)}
                                                                                          disabled
                                                                                          value={defineValue(values.TFYGT_past)}
                                                                                          className={values.TFYGT_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.TFYGT_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label_group">Tissue Inflammation Screening</Typography>
                                                                              </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label_group">Renal Function</Typography>
                                                                              </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">CRP</Typography>
                                                                              </TableCell>
                                                                              <TableCell sx={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.CRP_current)}
                                                                                          disabled={defineDisabled(values.CRP_current)}
                                                                                          value={defineValue(values.CRP_current)}
                                                                                          onChange={(e) => formik.setFieldValue("CRP_current", e.target.value)}
                                                                                          className={values.CRP_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.CRP_unit}</Typography></InputAdornment>}
                                                                                    />
                                                                                    <FormHelperText error id="CRP_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.CRP_current && errors.CRP_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell sx={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.CRP_previous)}
                                                                                          disabled
                                                                                          value={defineValue(values.CRP_previous)}
                                                                                          className={values.CRP_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_previous !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.CRP_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell sx={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.CRP_past)}
                                                                                          disabled
                                                                                          value={defineValue(values.CRP_past)}
                                                                                          className={values.CRP_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.CRP_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>

                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">BUN(Urea)</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.UFBUN_current)}
                                                                                          disabled={defineDisabled(values.UFBUN_current)}
                                                                                          value={defineValue(values.UFBUN_current)}
                                                                                          onChange={(e) => formik.setFieldValue("UFBUN_current", e.target.value)}
                                                                                          className={values.UFBUN_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.UFBUN_unit}</Typography></InputAdornment>}
                                                                                    />
                                                                                    <FormHelperText error id="UFBUN_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.UFBUN_current && errors.UFBUN_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.UFBUN_previous)}
                                                                                          disabled
                                                                                          value={defineValue(values.UFBUN_previous)}
                                                                                          className={values.UFBUN_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_previous !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.UFBUN_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.UFBUN_past)}
                                                                                          disabled
                                                                                          value={defineValue(values.UFBUN_past)}
                                                                                          className={values.UFBUN_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.UFBUN_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Creatinine</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.UFCRE_current)}
                                                                                          disabled={defineDisabled(values.UFCRE_current)}
                                                                                          value={defineValue(values.UFCRE_current)}
                                                                                          onChange={(e) => formik.setFieldValue("UFCRE_current", e.target.value)}
                                                                                          className={values.UFCRE_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.UFCRE_unit}</Typography></InputAdornment>}
                                                                                    />
                                                                                    <FormHelperText error id="UFCRE_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.UFCRE_current && errors.UFCRE_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.UFCRE_previous)}
                                                                                          disabled
                                                                                          value={defineValue(values.UFCRE_previous)}
                                                                                          className={values.UFCRE_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_previous !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.UFCRE_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.UFCRE_past)}
                                                                                          disabled
                                                                                          value={defineValue(values.UFCRE_past)}
                                                                                          className={values.UFCRE_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.UFCRE_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell sx={{ background: "#FFFFFF !important" }}> </TableCell>
                                                                              <TableCell sx={{ background: "#FFFFFF !important" }}> <Button
                                                                                    size="large"
                                                                                    type="button"
                                                                                    variant="contained"
                                                                                    onClick={() => {
                                                                                          setSubmitAction("confirm");
                                                                                          setSubmitCategory("Biochemistry");
                                                                                          handleSubmit();
                                                                                    }}
                                                                              >
                                                                                    Confirm
                                                                              </Button></TableCell>
                                                                              <TableCell sx={{ background: "#FFFFFF !important" }}>
                                                                                    {values.biochemistry_confirm_staff === null && values.biochemistry_confirm_date === null && <Button
                                                                                          size="large"
                                                                                          type="button"
                                                                                          variant="contained"
                                                                                          onClick={() => {
                                                                                                setSubmitAction("release");
                                                                                                setSubmitCategory("Biochemistry");
                                                                                                handleSubmit();
                                                                                          }}
                                                                                    >
                                                                                          Release
                                                                                    </Button>
                                                                                    }
                                                                              </TableCell>
                                                                              <TableCell sx={{ background: "#FFFFFF !important" }}> </TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label_group">Electrolytes</Typography>
                                                                              </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Sodium</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.Sodium_current)}
                                                                                          disabled={defineDisabled(values.Sodium_current)}
                                                                                          value={defineValue(values.Sodium_current)}
                                                                                          onChange={(e) => formik.setFieldValue("Sodium_current", e.target.value)}
                                                                                          className={values.Sodium_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.Sodium_unit}</Typography></InputAdornment>}
                                                                                    />
                                                                                    <FormHelperText error id="Sodium_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.Sodium_current && errors.Sodium_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.Sodium_previous)}
                                                                                          disabled
                                                                                          value={defineValue(values.Sodium_previous)}
                                                                                          className={values.Sodium_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_previous !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.Sodium_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.Sodium_past)}
                                                                                          disabled
                                                                                          value={defineValue(values.Sodium_past)}
                                                                                          className={values.Sodium_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.Sodium_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Potassium</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.Potassium_current)}
                                                                                          disabled={defineDisabled(values.Potassium_current)}
                                                                                          value={defineValue(values.Potassium_current)}
                                                                                          onChange={(e) => formik.setFieldValue("Potassium_current", e.target.value)}
                                                                                          className={values.Potassium_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.Potassium_unit}</Typography></InputAdornment>}
                                                                                    />
                                                                                    <FormHelperText error id="Potassium_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.Potassium_current && errors.Potassium_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.Potassium_previous)}
                                                                                          disabled
                                                                                          value={defineValue(values.Potassium_previous)}
                                                                                          className={values.Potassium_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_previous !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.Potassium_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.Potassium_past)}
                                                                                          disabled
                                                                                          value={defineValue(values.Potassium_past)}
                                                                                          className={values.Potassium_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.Potassium_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Chloride</Typography>
                                                                              </TableCell>
                                                                              <TableCell sx={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.Chloride_current)}
                                                                                          disabled={defineDisabled(values.Chloride_current)}
                                                                                          value={defineValue(values.Chloride_current)}
                                                                                          onChange={(e) => formik.setFieldValue("Chloride_current", e.target.value)}
                                                                                          className={values.Chloride_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.Chloride_unit}</Typography></InputAdornment>}
                                                                                    />
                                                                                    <FormHelperText error id="Chloride_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.Chloride_current && errors.Chloride_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell sx={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.Chloride_previous)}
                                                                                          disabled
                                                                                          value={defineValue(values.Chloride_previous)}
                                                                                          className={values.Chloride_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_previous !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.Chloride_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell sx={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.Chloride_past)}
                                                                                          disabled
                                                                                          value={defineValue(values.Chloride_past)}
                                                                                          className={values.Chloride_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.Chloride_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                  </TableBody>
                                                            </Table>
                                                      </TableContainer>
                                                </Container>
                                          </TabPanel>
                                          <TabPanel value="3">
                                                <Container sx={{ backgroundColor: "#FFFFFF", height: "100%", paddingTop: 1 }}>
                                                      {values.urine_confirm_staff !== null && <Typography sx={{ fontSize: 12 }}>{values.urine_confirm_staff} confirmed at {values.urine_confirm_date}</Typography>}
                                                      {values.urine_release_staff !== null && values.urine_confirm_staff === null && <Typography sx={{ fontSize: 12 }}>{values.urine_release_staff} released at {values.urine_release_date}</Typography>}
                                                      <TableContainer
                                                            component={Paper}
                                                            sx={{
                                                                  height: "100%",
                                                                  paddingTop: 2,
                                                                  paddingBottom: 2,
                                                                  marginLeft: 0,
                                                                  '&:last-child td, &:last-child th': { border: 0 },
                                                                  '& td:nth-of-type(2),& th:nth-of-type(2),& td:nth-of-type(6),& th:nth-of-type(6)': { backgroundColor: "#DDDDDD" },
                                                                  '& td:nth-of-type(3),& th:nth-of-type(3),& td:nth-of-type(7),& th:nth-of-type(7)': { backgroundColor: "#F9F9F9" },
                                                                  '& td:nth-of-type(4),& th:nth-of-type(4),& td:nth-of-type(8),& th:nth-of-type(8)': { backgroundColor: "#F9F9F9" },
                                                                  '& td:nth-of-type(1)': { paddingLeft: 0, paddingTop: 0, paddingBottom: 0, marginBottom: 0 },
                                                                  '& td:nth-of-type(2),& td:nth-of-type(3),& td:nth-of-type(4),& td:nth-of-type(6),& td:nth-of-type(7),& td:nth-of-type(8)': { paddingTop: 0, paddingBottom: 1, marginTop: 0, marginBottom: 1 },
                                                            }}>
                                                            <Table sx={{ width: "100%", minWidth: 650, height: "100%", tableLayout: "fixed" }} size="small">
                                                                  <TableHead >
                                                                        <TableRow >
                                                                              <TableCell> </TableCell>
                                                                              <TableCell align="center" sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>Current</TableCell>
                                                                              <TableCell align="center" sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>{values.test_date_previous !== null ? `${values.test_date_previous}` : 'Previous'}</TableCell>
                                                                              <TableCell align="center" sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>{values.test_date_past !== null ? `${values.test_date_past}` : 'Past'}</TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell align="center" sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>Current</TableCell>
                                                                              <TableCell align="center" sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>{values.test_date_previous !== null ? `${values.test_date_previous}` : 'Previous'}</TableCell>
                                                                              <TableCell align="center" sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>{values.test_date_past !== null ? `${values.test_date_past}` : 'Past'}</TableCell>
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
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label_group">Urine Sediments</Typography>
                                                                              </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>

                                                                        </TableRow>

                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Appearance</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    {values.URLook_current === "-9995" ?
                                                                                          <FormControl fullWidth>
                                                                                                <InputBase
                                                                                                      placeholder="[NI]"
                                                                                                      disabled
                                                                                                      value="[NI]"
                                                                                                      className='textField'
                                                                                                />
                                                                                          </FormControl>
                                                                                          :
                                                                                          <FormControl fullWidth>
                                                                                                <Select
                                                                                                      className={values.URLook_current_redstar === null ? 'default' : 'red'}
                                                                                                      error={Boolean(touched.URLook_current && errors.URLook_current)}
                                                                                                      {...getFieldProps('URLook_current')}
                                                                                                      style={{ textAlign: 'left' }}
                                                                                                      displayEmpty
                                                                                                >
                                                                                                      {URLook_Option.map((URLook) => (
                                                                                                            <MenuItem
                                                                                                                  value={URLook.value}
                                                                                                                  key={URLook.value}
                                                                                                            >{URLook.label}</MenuItem>
                                                                                                      )
                                                                                                      )}
                                                                                                </Select>
                                                                                          </FormControl>
                                                                                    }
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    {values.URLook_previous === "-9995" ?
                                                                                          <FormControl fullWidth>
                                                                                                <InputBase
                                                                                                      placeholder="[NI]"
                                                                                                      disabled
                                                                                                      value="[NI]"
                                                                                                      className='textField'
                                                                                                />
                                                                                          </FormControl>
                                                                                          :
                                                                                          <FormControl fullWidth>
                                                                                                <Select
                                                                                                      disabled
                                                                                                      className={values.URLook_previous_redstar === null ? 'default' : 'red'}
                                                                                                      error={Boolean(touched.URLook_previous && errors.URLook_previous)}
                                                                                                      {...getFieldProps('URLook_previous')}
                                                                                                      style={{ textAlign: 'left' }}
                                                                                                      displayEmpty
                                                                                                >
                                                                                                      {URLook_Option.map((URLook) => (
                                                                                                            <MenuItem
                                                                                                                  value={URLook.value}
                                                                                                                  key={URLook.value}
                                                                                                            >{URLook.label}</MenuItem>
                                                                                                      )
                                                                                                      )}
                                                                                                </Select>
                                                                                          </FormControl>
                                                                                    }
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                disabled
                                                                                                className={values.URLook_past_redstar === null ? 'default' : 'red'}
                                                                                                error={Boolean(touched.URLook_past && errors.URLook_past)}
                                                                                                {...getFieldProps('URLook_past')}
                                                                                                style={{ textAlign: 'left' }}
                                                                                          >
                                                                                                {URLook_Option.map((URLook) => (
                                                                                                      <MenuItem
                                                                                                            value={URLook.value}
                                                                                                            key={URLook.value}
                                                                                                      >{URLook.label}</MenuItem>
                                                                                                )
                                                                                                )}
                                                                                          </Select>
                                                                                    </FormControl>
                                                                              </TableCell>
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">RBC</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          sx={{ width: "50%" }}
                                                                                          className={values.UBRBC1_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('UBRBC1_current')}
                                                                                          disabled={defineDisabled(values.UBRBC1_current)}
                                                                                          placeholder={values.UBRBC1_current !== "-9995" ? "[NIL]" : "[NI]"}
                                                                                          value={defineValue(values.UBRBC1_current)}
                                                                                    />
                                                                                    <InputBase
                                                                                          sx={{ width: "50%" }}
                                                                                          className={values.UBRBC2_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('UBRBC2_current')}
                                                                                          disabled={defineDisabled(values.UBRBC2_current)}
                                                                                          placeholder={values.UBRBC2_current !== "-9995" ? "[NIL]" : "[NI]"}
                                                                                          value={defineValue(values.UBRBC2current)}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          sx={{ width: "50%" }}
                                                                                          className={values.UBRBC1_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('UBRBC1_previous')}
                                                                                          disabled
                                                                                          placeholder={values.UBRBC1_previous !== "-9995" ? "[NIL]" : "[NI]"}
                                                                                          value={defineValue(values.UBRBC1_previous)}
                                                                                    />
                                                                                    <InputBase
                                                                                          sx={{ width: "50%" }}
                                                                                          className={values.UBRBC2_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('UBRBC2_previous')}
                                                                                          disabled
                                                                                          placeholder={values.UBRBC2_previous !== "-9995" ? "[NIL]" : "[NI]"}
                                                                                          value={defineValue(values.UBRBC2_previous)}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          sx={{ width: "50%" }}
                                                                                          className={values.UBRBC1_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('UBRBC1_past')}
                                                                                          disabled
                                                                                          placeholder={values.UBRBC1_past !== "-9995" ? "[NIL]" : "[NI]"}
                                                                                          value={defineValue(values.UBRBC1_past)}
                                                                                    />
                                                                                    <InputBase
                                                                                          sx={{ width: "50%" }}
                                                                                          className={values.UBRBC2_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('UBRBC2_past')}
                                                                                          disabled
                                                                                          placeholder={values.UBRBC2_past !== "-9995" ? "[NIL]" : "[NI]"}
                                                                                          value={defineValue(values.UBRBC2_past)}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Protein</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    {values.UREW_current === "-9995" ?
                                                                                          <FormControl fullWidth>
                                                                                                <InputBase
                                                                                                      placeholder="[NI]"
                                                                                                      disabled
                                                                                                      value="[NI]"
                                                                                                      className='textField'
                                                                                                />
                                                                                          </FormControl>
                                                                                          :
                                                                                          <FormControl fullWidth>
                                                                                                <Select
                                                                                                      className={values.UREW_current === "neg" ? 'default' : 'red'}
                                                                                                      error={Boolean(touched.UREW_current && errors.UREW_current)}
                                                                                                      {...getFieldProps('UREW_current')}
                                                                                                      style={{ textAlign: 'left' }}
                                                                                                      displayEmpty
                                                                                                >
                                                                                                      {ThreePlusMinus_Option.map((UREW) => (
                                                                                                            <MenuItem
                                                                                                                  value={UREW.value}
                                                                                                                  key={UREW.value}
                                                                                                            >{UREW.label}</MenuItem>
                                                                                                      )
                                                                                                      )}
                                                                                                </Select>
                                                                                          </FormControl>
                                                                                    }
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    {values.UREW_previous === "-9995" ?
                                                                                          <FormControl fullWidth>
                                                                                                <InputBase
                                                                                                      placeholder="[NI]"
                                                                                                      disabled
                                                                                                      value="[NI]"
                                                                                                      className='textField'
                                                                                                />
                                                                                          </FormControl>
                                                                                          :
                                                                                          <FormControl fullWidth>
                                                                                                <Select
                                                                                                      disabled
                                                                                                      className={values.UREW_previous === "neg" ? 'default' : 'red'}
                                                                                                      error={Boolean(touched.UREW_previous && errors.UREW_previous)}
                                                                                                      {...getFieldProps('UREW_previous')}
                                                                                                      style={{ textAlign: 'left' }}
                                                                                                      displayEmpty
                                                                                                >
                                                                                                      {ThreePlusMinus_Option.map((UREW) => (
                                                                                                            <MenuItem
                                                                                                                  value={UREW.value}
                                                                                                                  key={UREW.value}
                                                                                                            >{UREW.label}</MenuItem>
                                                                                                      )
                                                                                                      )}
                                                                                                </Select>
                                                                                          </FormControl>
                                                                                    }
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                disabled
                                                                                                className={values.UREW_past === "neg" ? 'default' : 'red'}
                                                                                                error={Boolean(touched.UREW_past && errors.UREW_past)}
                                                                                                {...getFieldProps('UREW_past')}
                                                                                                style={{ textAlign: 'left' }}
                                                                                          >
                                                                                                {ThreePlusMinus_Option.map((UREW) => (
                                                                                                      <MenuItem
                                                                                                            value={UREW.value}
                                                                                                            key={UREW.value}
                                                                                                      >{UREW.label}</MenuItem>
                                                                                                )
                                                                                                )}
                                                                                          </Select>
                                                                                    </FormControl>
                                                                              </TableCell>
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">WBC</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          sx={{ width: "50%" }}
                                                                                          className={values.UBWBC1_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('UBWBC1_current')}
                                                                                          disabled={defineDisabled(values.UBWBC1_current)}
                                                                                          placeholder={values.UBWBC1_current !== "-9995" ? "[NIL]" : "[NI]"}
                                                                                          value={defineValue(values.UBWBC1_current)}
                                                                                    />
                                                                                    <InputBase
                                                                                          sx={{ width: "50%" }}
                                                                                          className={values.UBWBC2_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('UBWBC2_current')}
                                                                                          disabled={defineDisabled(values.UBWBC2_current)}
                                                                                          placeholder={values.UBWBC2_current !== "-9995" ? "[NIL]" : "[NI]"}
                                                                                          value={defineValue(values.UBWBC2current)}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          sx={{ width: "50%" }}
                                                                                          className={values.UBWBC1_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('UBWBC1_previous')}
                                                                                          disabled
                                                                                          placeholder={values.UBWBC1_previous !== "-9995" ? "[NIL]" : "[NI]"}
                                                                                          value={defineValue(values.UBWBC1_previous)}
                                                                                    />
                                                                                    <InputBase
                                                                                          sx={{ width: "50%" }}
                                                                                          className={values.UBWBC2_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('UBWBC2_previous')}
                                                                                          disabled
                                                                                          placeholder={values.UBWBC2_previous !== "-9995" ? "[NIL]" : "[NI]"}
                                                                                          value={defineValue(values.UBWBC2_previous)}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          sx={{ width: "50%" }}
                                                                                          className={values.UBWBC1_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('UBWBC1_past')}
                                                                                          disabled
                                                                                          placeholder={values.UBWBC1_past !== "-9995" ? "[NIL]" : "[NI]"}
                                                                                          value={defineValue(values.UBWBC1_past)}
                                                                                    />
                                                                                    <InputBase
                                                                                          sx={{ width: "50%" }}
                                                                                          className={values.UBWBC2_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('UBWBC2_past')}
                                                                                          disabled
                                                                                          placeholder={values.UBWBC2_past !== "-9995" ? "[NIL]" : "[NI]"}
                                                                                          value={defineValue(values.UBWBC2_past)}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Glucose</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    {values.URS_current === "-9995" ?
                                                                                          <FormControl fullWidth>
                                                                                                <InputBase
                                                                                                      placeholder="[NI]"
                                                                                                      disabled
                                                                                                      value="[NI]"
                                                                                                      className='textField'
                                                                                                />
                                                                                          </FormControl>
                                                                                          :
                                                                                          <FormControl fullWidth>
                                                                                                <Select
                                                                                                      className={values.URS_current === "neg" ? 'default' : 'red'}
                                                                                                      error={Boolean(touched.URS_current && errors.URS_current)}
                                                                                                      {...getFieldProps('URS_current')}
                                                                                                      style={{ textAlign: 'left' }}
                                                                                                      displayEmpty
                                                                                                >
                                                                                                      {ThreePlusMinus_Option.map((URS) => (
                                                                                                            <MenuItem
                                                                                                                  value={URS.value}
                                                                                                                  key={URS.value}
                                                                                                            >{URS.label}</MenuItem>
                                                                                                      )
                                                                                                      )}
                                                                                                </Select>
                                                                                          </FormControl>
                                                                                    }
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    {values.URS_previous === "-9995" ?
                                                                                          <FormControl fullWidth>
                                                                                                <InputBase
                                                                                                      placeholder="[NI]"
                                                                                                      disabled
                                                                                                      value="[NI]"
                                                                                                      className='textField'
                                                                                                />
                                                                                          </FormControl>
                                                                                          :
                                                                                          <FormControl fullWidth>
                                                                                                <Select
                                                                                                      disabled
                                                                                                      className={values.URS_previous === "neg" ? 'default' : 'red'}
                                                                                                      error={Boolean(touched.URS_previous && errors.URS_previous)}
                                                                                                      {...getFieldProps('URS_previous')}
                                                                                                      style={{ textAlign: 'left' }}
                                                                                                      displayEmpty
                                                                                                >
                                                                                                      {ThreePlusMinus_Option.map((URS) => (
                                                                                                            <MenuItem
                                                                                                                  value={URS.value}
                                                                                                                  key={URS.value}
                                                                                                            >{URS.label}</MenuItem>
                                                                                                      )
                                                                                                      )}
                                                                                                </Select>
                                                                                          </FormControl>
                                                                                    }
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                disabled
                                                                                                className={values.URS_past === "neg" ? 'default' : 'red'}
                                                                                                error={Boolean(touched.URS_past && errors.URS_past)}
                                                                                                {...getFieldProps('URS_past')}
                                                                                                style={{ textAlign: 'left' }}
                                                                                          >
                                                                                                {ThreePlusMinus_Option.map((URS) => (
                                                                                                      <MenuItem
                                                                                                            value={URS.value}
                                                                                                            key={URS.value}
                                                                                                      >{URS.label}</MenuItem>
                                                                                                )
                                                                                                )}
                                                                                          </Select>
                                                                                    </FormControl>
                                                                              </TableCell>
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Epithelial Cells</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          sx={{ width: "50%" }}
                                                                                          className={values.UBEPlit1_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('UBEPlit1_current')}
                                                                                          disabled={defineDisabled(values.UBEPlit1_current)}
                                                                                          placeholder={values.UBEPlit1_current !== "-9995" ? "[NIL]" : "[NI]"}
                                                                                          value={defineValue(values.UBEPlit1_current)}
                                                                                    />
                                                                                    <InputBase
                                                                                          sx={{ width: "50%" }}
                                                                                          className={values.UBEPlit2_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('UBEPlit2_current')}
                                                                                          disabled={defineDisabled(values.UBEPlit2_current)}
                                                                                          placeholder={values.UBEPlit2_current !== "-9995" ? "[NIL]" : "[NI]"}
                                                                                          value={defineValue(values.UBEPlit2current)}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          sx={{ width: "50%" }}
                                                                                          className={values.UBEPlit1_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('UBEPlit1_previous')}
                                                                                          disabled
                                                                                          placeholder={values.UBEPlit1_previous !== "-9995" ? "[NIL]" : "[NI]"}
                                                                                          value={defineValue(values.UBEPlit1_previous)}
                                                                                    />
                                                                                    <InputBase
                                                                                          sx={{ width: "50%" }}
                                                                                          className={values.UBEPlit2_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('UBEPlit2_previous')}
                                                                                          disabled
                                                                                          placeholder={values.UBEPlit2_previous !== "-9995" ? "[NIL]" : "[NI]"}
                                                                                          value={defineValue(values.UBEPlit2_previous)}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          sx={{ width: "50%" }}
                                                                                          className={values.UBEPlit1_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('UBEPlit1_past')}
                                                                                          disabled
                                                                                          placeholder={values.UBEPlit1_past !== "-9995" ? "[NIL]" : "[NI]"}
                                                                                          value={defineValue(values.UBEPlit1_past)}
                                                                                    />
                                                                                    <InputBase
                                                                                          sx={{ width: "50%" }}
                                                                                          className={values.UBEPlit2_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('UBEPlit2_past')}
                                                                                          disabled
                                                                                          placeholder={values.UBEPlit2_past !== "-9995" ? "[NIL]" : "[NI]"}
                                                                                          value={defineValue(values.UBEPlit2_past)}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Bilirubin</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    {values.URBR_current === "-9995" ?
                                                                                          <FormControl fullWidth>
                                                                                                <InputBase
                                                                                                      placeholder="[NI]"
                                                                                                      disabled
                                                                                                      value="[NI]"
                                                                                                      className='textField'
                                                                                                />
                                                                                          </FormControl>
                                                                                          :
                                                                                          <FormControl fullWidth>
                                                                                                <Select
                                                                                                      className={values.URBR_current === "neg" ? 'default' : 'red'}
                                                                                                      error={Boolean(touched.URBR_current && errors.URBR_current)}
                                                                                                      {...getFieldProps('URBR_current')}
                                                                                                      style={{ textAlign: 'left' }}
                                                                                                      displayEmpty
                                                                                                >
                                                                                                      {ThreePlusMinus_Option.map((URBR) => (
                                                                                                            <MenuItem
                                                                                                                  value={URBR.value}
                                                                                                                  key={URBR.value}
                                                                                                            >{URBR.label}</MenuItem>
                                                                                                      )
                                                                                                      )}
                                                                                                </Select>
                                                                                          </FormControl>
                                                                                    }
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    {values.URBR_previous === "-9995" ?
                                                                                          <FormControl fullWidth>
                                                                                                <InputBase
                                                                                                      placeholder="[NI]"
                                                                                                      disabled
                                                                                                      value="[NI]"
                                                                                                      className='textField'
                                                                                                />
                                                                                          </FormControl>
                                                                                          :
                                                                                          <FormControl fullWidth>
                                                                                                <Select
                                                                                                      disabled
                                                                                                      className={values.URBR_previous === "neg" ? 'default' : 'red'}
                                                                                                      error={Boolean(touched.URBR_previous && errors.URBR_previous)}
                                                                                                      {...getFieldProps('URBR_previous')}
                                                                                                      style={{ textAlign: 'left' }}
                                                                                                      displayEmpty
                                                                                                >
                                                                                                      {ThreePlus_Option.map((URBR) => (
                                                                                                            <MenuItem
                                                                                                                  value={URBR.value}
                                                                                                                  key={URBR.value}
                                                                                                            >{URBR.label}</MenuItem>
                                                                                                      )
                                                                                                      )}
                                                                                                </Select>
                                                                                          </FormControl>
                                                                                    }
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                disabled
                                                                                                className={values.URBR_past === "neg" ? 'default' : 'red'}
                                                                                                error={Boolean(touched.URBR_past && errors.URBR_past)}
                                                                                                {...getFieldProps('URBR_past')}
                                                                                                style={{ textAlign: 'left' }}
                                                                                          >
                                                                                                {ThreePlus_Option.map((URBR) => (
                                                                                                      <MenuItem
                                                                                                            value={URBR.value}
                                                                                                            key={URBR.value}
                                                                                                      >{URBR.label}</MenuItem>
                                                                                                )
                                                                                                )}
                                                                                          </Select>
                                                                                    </FormControl>
                                                                              </TableCell>
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Cast</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          sx={{ width: "50%" }}
                                                                                          className={values.Cast1_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('Cast1_current')}
                                                                                          disabled={defineDisabled(values.Cast1_current)}
                                                                                          placeholder={values.Cast1_current !== "-9995" ? "[NIL]" : "[NI]"}
                                                                                          value={defineValue(values.Cast1_current)}
                                                                                    />
                                                                                    <InputBase
                                                                                          sx={{ width: "50%" }}
                                                                                          className={values.Cast2_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('Cast2_current')}
                                                                                          disabled={defineDisabled(values.Cast2_current)}
                                                                                          placeholder={values.Cast2_current !== "-9995" ? "[NIL]" : "[NI]"}
                                                                                          value={defineValue(values.Cast2current)}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          sx={{ width: "50%" }}
                                                                                          className={values.Cast1_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('Cast1_previous')}
                                                                                          disabled
                                                                                          placeholder={values.Cast1_previous !== "-9995" ? "[NIL]" : "[NI]"}
                                                                                          value={defineValue(values.Cast1_previous)}
                                                                                    />
                                                                                    <InputBase
                                                                                          sx={{ width: "50%" }}
                                                                                          className={values.Cast2_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('Cast2_previous')}
                                                                                          disabled
                                                                                          placeholder={values.Cast2_previous !== "-9995" ? "[NIL]" : "[NI]"}
                                                                                          value={defineValue(values.Cast2_previous)}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          sx={{ width: "50%" }}
                                                                                          className={values.Cast1_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('Cast1_past')}
                                                                                          disabled
                                                                                          placeholder={values.Cast1_past !== "-9995" ? "[NIL]" : "[NI]"}
                                                                                          value={defineValue(values.Cast1_past)}
                                                                                    />
                                                                                    <InputBase
                                                                                          sx={{ width: "50%" }}
                                                                                          className={values.Cast2_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('Cast2_past')}
                                                                                          disabled
                                                                                          placeholder={values.Cast2_past !== "-9995" ? "[NIL]" : "[NI]"}
                                                                                          value={defineValue(values.Cast2_past)}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Urobilinogen</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    {values.URUBR_current === "-9995" ?
                                                                                          <FormControl fullWidth>
                                                                                                <InputBase
                                                                                                      placeholder="[NI]"
                                                                                                      disabled
                                                                                                      value="[NI]"
                                                                                                      className='textField'
                                                                                                />
                                                                                          </FormControl>
                                                                                          :
                                                                                          <FormControl fullWidth>
                                                                                                <Select
                                                                                                      className={values.URUBR_current === "neg" ? 'default' : 'red'}
                                                                                                      error={Boolean(touched.URUBR_current && errors.URUBR_current)}
                                                                                                      {...getFieldProps('URUBR_current')}
                                                                                                      style={{ textAlign: 'left' }}
                                                                                                      displayEmpty
                                                                                                >
                                                                                                      {ThreePlus_Option.map((URUBR) => (
                                                                                                            <MenuItem
                                                                                                                  value={URUBR.value}
                                                                                                                  key={URUBR.value}
                                                                                                            >{URUBR.label}</MenuItem>
                                                                                                      )
                                                                                                      )}
                                                                                                </Select>
                                                                                          </FormControl>
                                                                                    }
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    {values.URUBR_previous === "-9995" ?
                                                                                          <FormControl fullWidth>
                                                                                                <InputBase
                                                                                                      placeholder="[NI]"
                                                                                                      disabled
                                                                                                      value="[NI]"
                                                                                                      className='textField'
                                                                                                />
                                                                                          </FormControl>
                                                                                          :
                                                                                          <FormControl fullWidth>
                                                                                                <Select
                                                                                                      disabled
                                                                                                      className={values.URUBR_previous === "neg" ? 'default' : 'red'}
                                                                                                      error={Boolean(touched.URUBR_previous && errors.URUBR_previous)}
                                                                                                      {...getFieldProps('URUBR_previous')}
                                                                                                      style={{ textAlign: 'left' }}
                                                                                                      displayEmpty
                                                                                                >
                                                                                                      {ThreePlus_Option.map((URUBR) => (
                                                                                                            <MenuItem
                                                                                                                  value={URUBR.value}
                                                                                                                  key={URUBR.value}
                                                                                                            >{URUBR.label}</MenuItem>
                                                                                                      )
                                                                                                      )}
                                                                                                </Select>
                                                                                          </FormControl>
                                                                                    }
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                disabled
                                                                                                className={values.URUBR_past === "neg" ? 'default' : 'red'}
                                                                                                error={Boolean(touched.URUBR_past && errors.URUBR_past)}
                                                                                                {...getFieldProps('URUBR_past')}
                                                                                                style={{ textAlign: 'left' }}
                                                                                          >
                                                                                                {ThreePlus_Option.map((URUBR) => (
                                                                                                      <MenuItem
                                                                                                            value={URUBR.value}
                                                                                                            key={URUBR.value}
                                                                                                      >{URUBR.label}</MenuItem>
                                                                                                )
                                                                                                )}
                                                                                          </Select>
                                                                                    </FormControl>
                                                                              </TableCell>
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Bacteria</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    {values.Bacter_current === "-9995" ?
                                                                                          <FormControl fullWidth>
                                                                                                <InputBase
                                                                                                      placeholder="[NI]"
                                                                                                      disabled
                                                                                                      value="[NI]"
                                                                                                      className='textField'
                                                                                                />
                                                                                          </FormControl>
                                                                                          :
                                                                                          <FormControl fullWidth>
                                                                                                <Select
                                                                                                      className={values.Bacter_current === "neg" ? 'default' : 'red'}
                                                                                                      error={Boolean(touched.Bacter_current && errors.Bacter_current)}
                                                                                                      {...getFieldProps('Bacter_current')}
                                                                                                      style={{ textAlign: 'left' }}
                                                                                                      displayEmpty
                                                                                                >
                                                                                                      {ThreePlus_Option.map((Bacter) => (
                                                                                                            <MenuItem
                                                                                                                  value={Bacter.value}
                                                                                                                  key={Bacter.value}
                                                                                                            >{Bacter.label}</MenuItem>
                                                                                                      )
                                                                                                      )}
                                                                                                </Select>
                                                                                          </FormControl>
                                                                                    }
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    {values.Bacter_previous === "-9995" ?
                                                                                          <FormControl fullWidth>
                                                                                                <InputBase
                                                                                                      placeholder="[NI]"
                                                                                                      disabled
                                                                                                      value="[NI]"
                                                                                                      className='textField'
                                                                                                />
                                                                                          </FormControl>
                                                                                          :
                                                                                          <FormControl fullWidth>
                                                                                                <Select
                                                                                                      disabled
                                                                                                      className={values.Bacter_previous === "neg" ? 'default' : 'red'}
                                                                                                      error={Boolean(touched.Bacter_previous && errors.Bacter_previous)}
                                                                                                      {...getFieldProps('Bacter_previous')}
                                                                                                      style={{ textAlign: 'left' }}
                                                                                                      displayEmpty
                                                                                                >
                                                                                                      {ThreePlus_Option.map((Bacter) => (
                                                                                                            <MenuItem
                                                                                                                  value={Bacter.value}
                                                                                                                  key={Bacter.value}
                                                                                                            >{Bacter.label}</MenuItem>
                                                                                                      )
                                                                                                      )}
                                                                                                </Select>
                                                                                          </FormControl>
                                                                                    }
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                disabled
                                                                                                className={values.Bacter_past === "neg" ? 'default' : 'red'}
                                                                                                error={Boolean(touched.Bacter_past && errors.Bacter_past)}
                                                                                                {...getFieldProps('Bacter_past')}
                                                                                                style={{ textAlign: 'left' }}
                                                                                          >
                                                                                                {ThreePlus_Option.map((Bacter) => (
                                                                                                      <MenuItem
                                                                                                            value={Bacter.value}
                                                                                                            key={Bacter.value}
                                                                                                      >{Bacter.label}</MenuItem>
                                                                                                )
                                                                                                )}
                                                                                          </Select>
                                                                                    </FormControl>
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Occult Blood</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    {values.UBBH_current === "-9995" ?
                                                                                          <FormControl fullWidth>
                                                                                                <InputBase
                                                                                                      placeholder="[NI]"
                                                                                                      disabled
                                                                                                      value="[NI]"
                                                                                                      className='textField'
                                                                                                />
                                                                                          </FormControl>
                                                                                          :
                                                                                          <FormControl fullWidth>
                                                                                                <Select
                                                                                                      className={values.UBBH_current === "neg" ? 'default' : 'red'}
                                                                                                      error={Boolean(touched.UBBH_current && errors.UBBH_current)}
                                                                                                      {...getFieldProps('UBBH_current')}
                                                                                                      style={{ textAlign: 'left' }}
                                                                                                      displayEmpty
                                                                                                >
                                                                                                      {FourPlus_Option.map((UBBH) => (
                                                                                                            <MenuItem
                                                                                                                  value={UBBH.value}
                                                                                                                  key={UBBH.value}
                                                                                                            >{UBBH.label}</MenuItem>
                                                                                                      )
                                                                                                      )}
                                                                                                </Select>
                                                                                          </FormControl>
                                                                                    }
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    {values.UBBH_previous === "-9995" ?
                                                                                          <FormControl fullWidth>
                                                                                                <InputBase
                                                                                                      placeholder="[NI]"
                                                                                                      disabled
                                                                                                      value="[NI]"
                                                                                                      className='textField'
                                                                                                />
                                                                                          </FormControl>
                                                                                          :
                                                                                          <FormControl fullWidth>
                                                                                                <Select
                                                                                                      disabled
                                                                                                      className={values.UBBH_previous === "neg" ? 'default' : 'red'}
                                                                                                      error={Boolean(touched.UBBH_previous && errors.UBBH_previous)}
                                                                                                      {...getFieldProps('UBBH_previous')}
                                                                                                      style={{ textAlign: 'left' }}
                                                                                                      displayEmpty
                                                                                                >
                                                                                                      {FourPlus_Option.map((UBBH) => (
                                                                                                            <MenuItem
                                                                                                                  value={UBBH.value}
                                                                                                                  key={UBBH.value}
                                                                                                            >{UBBH.label}</MenuItem>
                                                                                                      )
                                                                                                      )}
                                                                                                </Select>
                                                                                          </FormControl>
                                                                                    }
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                disabled
                                                                                                className={values.UBBH_past === "neg" ? 'default' : 'red'}
                                                                                                error={Boolean(touched.UBBH_past && errors.UBBH_past)}
                                                                                                {...getFieldProps('UBBH_past')}
                                                                                                style={{ textAlign: 'left' }}
                                                                                          >
                                                                                                {FourPlus_Option.map((UBBH) => (
                                                                                                      <MenuItem
                                                                                                            value={UBBH.value}
                                                                                                            key={UBBH.value}
                                                                                                      >{UBBH.label}</MenuItem>
                                                                                                )
                                                                                                )}
                                                                                          </Select>
                                                                                    </FormControl>
                                                                              </TableCell>
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Other</Typography>
                                                                              </TableCell>
                                                                              <TableCell sx={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                                                                                    <Button
                                                                                          variant={values.UBOther_current === "" ? "cancel" : "comment_value"}
                                                                                          sx={{ fontSize: "10px !important" }}
                                                                                          onClick={openUBOther_modal} >
                                                                                          {values.UBOther_current === "" ? "Add Comment" : "Update Comment"}
                                                                                    </Button>
                                                                                    {/* <Autocomplete
                                                                                          multiple
                                                                                          id="checkboxes-tags-demo"
                                                                                          options={UBOther_Comment}
                                                                                          disableCloseOnSelect
                                                                                          getOptionLabel={(option) => option.eng}
                                                                                          renderOption={(props, option, { selected }) => (
                                                                                                <li {...props}>
                                                                                                      <Checkbox
                                                                                                            style={{ marginRight: 8 }}
                                                                                                            checked={selected}
                                                                                                      />
                                                                                                      {option.eng}
                                                                                                </li>
                                                                                          )}
                                                                                          style={{ width: 500 }}
                                                                                          renderInput={(params) => (
                                                                                                <TextField {...params} label="Checkboxes" placeholder="Favorites" />
                                                                                          )}
                                                                                    /> */}


                                                                              </TableCell>
                                                                              <TableCell sx={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                                                                                    <Button
                                                                                          variant={values.UBOther_previous === "" ? "cancel" : "comment_value"}
                                                                                          sx={{ fontSize: "10px !important" }}
                                                                                          disabled={values.UBOther_previous === "" ?? true}
                                                                                          onClick={openUBOther_modal} >
                                                                                          {values.UBOther_previous === "" ? "No Comment" : "View Comment"}
                                                                                    </Button>
                                                                              </TableCell>
                                                                              <TableCell sx={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                                                                                    <Button
                                                                                          variant={values.UBOther_past === "" ? "cancel" : "comment_value"}
                                                                                          sx={{ fontSize: "10px !important" }}
                                                                                          disabled={values.UBOther_past === "" ?? true}
                                                                                          onClick={openUBOther_modal} >
                                                                                          {values.UBOther_past === "" ? "No Comment" : "View Comment"}
                                                                                    </Button>
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Ketone</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    {values.UBKU_current === "-9995" ?
                                                                                          <FormControl fullWidth>
                                                                                                <InputBase
                                                                                                      placeholder="[NI]"
                                                                                                      disabled
                                                                                                      value="[NI]"
                                                                                                      className='textField'
                                                                                                />
                                                                                          </FormControl>
                                                                                          :
                                                                                          <FormControl fullWidth>
                                                                                                <Select
                                                                                                      className={values.UBKU_current === "neg" ? 'default' : 'red'}
                                                                                                      error={Boolean(touched.UBKU_current && errors.UBKU_current)}
                                                                                                      {...getFieldProps('UBKU_current')}
                                                                                                      style={{ textAlign: 'left' }}
                                                                                                      displayEmpty
                                                                                                >
                                                                                                      {ThreePlusMinus_Option.map((UBKU) => (
                                                                                                            <MenuItem
                                                                                                                  value={UBKU.value}
                                                                                                                  key={UBKU.value}
                                                                                                            >{UBKU.label}</MenuItem>
                                                                                                      )
                                                                                                      )}
                                                                                                </Select>
                                                                                          </FormControl>
                                                                                    }
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    {values.UBKU_previous === "-9995" ?
                                                                                          <FormControl fullWidth>
                                                                                                <InputBase
                                                                                                      placeholder="[NI]"
                                                                                                      disabled
                                                                                                      value="[NI]"
                                                                                                      className='textField'
                                                                                                />
                                                                                          </FormControl>
                                                                                          :
                                                                                          <FormControl fullWidth>
                                                                                                <Select
                                                                                                      disabled
                                                                                                      className={values.UBKU_previous === "neg" ? 'default' : 'red'}
                                                                                                      error={Boolean(touched.UBKU_previous && errors.UBKU_previous)}
                                                                                                      {...getFieldProps('UBKU_previous')}
                                                                                                      style={{ textAlign: 'left' }}
                                                                                                      displayEmpty
                                                                                                >
                                                                                                      {ThreePlusMinus_Option.map((UBKU) => (
                                                                                                            <MenuItem
                                                                                                                  value={UBKU.value}
                                                                                                                  key={UBKU.value}
                                                                                                            >{UBKU.label}</MenuItem>
                                                                                                      )
                                                                                                      )}
                                                                                                </Select>
                                                                                          </FormControl>
                                                                                    }
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                disabled
                                                                                                className={values.UBKU_past === "neg" ? 'default' : 'red'}
                                                                                                error={Boolean(touched.UBKU_past && errors.UBKU_past)}
                                                                                                {...getFieldProps('UBKU_past')}
                                                                                                style={{ textAlign: 'left' }}
                                                                                          >
                                                                                                {ThreePlusMinus_Option.map((UBKU) => (
                                                                                                      <MenuItem
                                                                                                            value={UBKU.value}
                                                                                                            key={UBKU.value}
                                                                                                      >{UBKU.label}</MenuItem>
                                                                                                )
                                                                                                )}
                                                                                          </Select>
                                                                                    </FormControl>
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Nitrite</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    {values.UBSNO_current === "-9995" ?
                                                                                          <FormControl fullWidth>
                                                                                                <InputBase
                                                                                                      placeholder="[NI]"
                                                                                                      disabled
                                                                                                      value="[NI]"
                                                                                                      className='textField'
                                                                                                />
                                                                                          </FormControl>
                                                                                          :
                                                                                          <FormControl fullWidth>
                                                                                                <Select
                                                                                                      className={values.UBSNO_current === "2" ? 'default' : 'red'}
                                                                                                      error={Boolean(touched.UBSNO_current && errors.UBSNO_current)}
                                                                                                      {...getFieldProps('UBSNO_current')}
                                                                                                      style={{ textAlign: 'left' }}
                                                                                                      displayEmpty
                                                                                                >
                                                                                                      {PosNeg_Option.map((UBSNO) => (
                                                                                                            <MenuItem
                                                                                                                  value={UBSNO.value}
                                                                                                                  key={UBSNO.value}
                                                                                                            >{UBSNO.label}</MenuItem>
                                                                                                      )
                                                                                                      )}
                                                                                                </Select>
                                                                                          </FormControl>
                                                                                    }
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    {values.UBSNO_previous === "-9995" ?
                                                                                          <FormControl fullWidth>
                                                                                                <InputBase
                                                                                                      placeholder="[NI]"
                                                                                                      disabled
                                                                                                      value="[NI]"
                                                                                                      className='textField'
                                                                                                />
                                                                                          </FormControl>
                                                                                          :
                                                                                          <FormControl fullWidth>
                                                                                                <Select
                                                                                                      disabled
                                                                                                      className={values.UBSNO_previous === "2" ? 'default' : 'red'}
                                                                                                      error={Boolean(touched.UBSNO_previous && errors.UBSNO_previous)}
                                                                                                      {...getFieldProps('UBSNO_previous')}
                                                                                                      style={{ textAlign: 'left' }}
                                                                                                      displayEmpty
                                                                                                >
                                                                                                      {PosNeg_Option.map((UBSNO) => (
                                                                                                            <MenuItem
                                                                                                                  value={UBSNO.value}
                                                                                                                  key={UBSNO.value}
                                                                                                            >{UBSNO.label}</MenuItem>
                                                                                                      )
                                                                                                      )}
                                                                                                </Select>
                                                                                          </FormControl>
                                                                                    }
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                disabled
                                                                                                className={values.UBSNO_past === "2" ? 'default' : 'red'}
                                                                                                error={Boolean(touched.UBSNO_past && errors.UBSNO_past)}
                                                                                                {...getFieldProps('UBSNO_past')}
                                                                                                style={{ textAlign: 'left' }}
                                                                                          >
                                                                                                {PosNeg_Option.map((UBSNO) => (
                                                                                                      <MenuItem
                                                                                                            value={UBSNO.value}
                                                                                                            key={UBSNO.value}
                                                                                                      >{UBSNO.label}</MenuItem>
                                                                                                )
                                                                                                )}
                                                                                          </Select>
                                                                                    </FormControl>
                                                                              </TableCell>
                                                                              <TableCell sx={{ background: "#FFFFFF !important" }}> </TableCell>
                                                                              <TableCell sx={{ background: "#FFFFFF !important" }}> <Button
                                                                                    size="large"
                                                                                    type="button"
                                                                                    variant="contained"
                                                                                    onClick={() => {
                                                                                          setSubmitAction("confirm");
                                                                                          setSubmitCategory("Urine");
                                                                                          handleSubmit();
                                                                                    }}
                                                                              >
                                                                                    Confirm
                                                                              </Button></TableCell>
                                                                              <TableCell sx={{ background: "#FFFFFF !important" }}>
                                                                                    {values.urine_confirm_staff === null && values.urine_confirm_date === null && <Button
                                                                                          size="large"
                                                                                          type="button"
                                                                                          variant="contained"
                                                                                          onClick={() => {
                                                                                                setSubmitAction("release");
                                                                                                setSubmitCategory("Urine");
                                                                                                handleSubmit();
                                                                                          }}
                                                                                    >
                                                                                          Release
                                                                                    </Button>}
                                                                              </TableCell>
                                                                              <TableCell sx={{ background: "#FFFFFF !important" }}> </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Leukocytes</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    {values.URLEU_current === "-9995" ?
                                                                                          <FormControl fullWidth>
                                                                                                <InputBase
                                                                                                      placeholder="[NI]"
                                                                                                      disabled
                                                                                                      value="[NI]"
                                                                                                      className='textField'
                                                                                                />
                                                                                          </FormControl>
                                                                                          :
                                                                                          <FormControl fullWidth>
                                                                                                <Select
                                                                                                      className={values.URLEU_current === "neg" ? 'default' : 'red'}
                                                                                                      error={Boolean(touched.URLEU_current && errors.URLEU_current)}
                                                                                                      {...getFieldProps('URLEU_current')}
                                                                                                      style={{ textAlign: 'left' }}
                                                                                                      displayEmpty
                                                                                                >
                                                                                                      {ThreePlus_Option.map((URLEU) => (
                                                                                                            <MenuItem
                                                                                                                  value={URLEU.value}
                                                                                                                  key={URLEU.value}
                                                                                                            >{URLEU.label}</MenuItem>
                                                                                                      )
                                                                                                      )}
                                                                                                </Select>
                                                                                          </FormControl>
                                                                                    }
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    {values.URLEU_previous === "-9995" ?
                                                                                          <FormControl fullWidth>
                                                                                                <InputBase
                                                                                                      placeholder="[NI]"
                                                                                                      disabled
                                                                                                      value="[NI]"
                                                                                                      className='textField'
                                                                                                />
                                                                                          </FormControl>
                                                                                          :
                                                                                          <FormControl fullWidth>
                                                                                                <Select
                                                                                                      disabled
                                                                                                      className={values.URLEU_previous === "neg" ? 'default' : 'red'}
                                                                                                      error={Boolean(touched.URLEU_previous && errors.URLEU_previous)}
                                                                                                      {...getFieldProps('URLEU_previous')}
                                                                                                      style={{ textAlign: 'left' }}
                                                                                                      displayEmpty
                                                                                                >
                                                                                                      {ThreePlus_Option.map((URLEU) => (
                                                                                                            <MenuItem
                                                                                                                  value={URLEU.value}
                                                                                                                  key={URLEU.value}
                                                                                                            >{URLEU.label}</MenuItem>
                                                                                                      )
                                                                                                      )}
                                                                                                </Select>
                                                                                          </FormControl>
                                                                                    }
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                disabled
                                                                                                className={values.URLEU_previous === "neg" ? 'default' : 'red'}
                                                                                                error={Boolean(touched.URLEU_past && errors.URLEU_past)}
                                                                                                {...getFieldProps('URLEU_past')}
                                                                                                style={{ textAlign: 'left' }}
                                                                                          >
                                                                                                {ThreePlus_Option.map((URLEU) => (
                                                                                                      <MenuItem
                                                                                                            value={URLEU.value}
                                                                                                            key={URLEU.value}
                                                                                                      >{URLEU.label}</MenuItem>
                                                                                                )
                                                                                                )}
                                                                                          </Select>
                                                                                    </FormControl>
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right">
                                                                                    <Typography variant="label">Specific Gravity</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.URDENS_current)}
                                                                                          disabled={defineDisabled(values.URDENS_current)}
                                                                                          value={defineValue(values.URDENS_current)}
                                                                                          onChange={(e) => formik.setFieldValue("URDENS_current", e.target.value)}
                                                                                          className={values.URDENS_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.URDENS_unit}</Typography></InputAdornment>}
                                                                                    />
                                                                                    <FormHelperText error id="URDENS_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.URDENS_current && errors.URDENS_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.URDENS_previous)}
                                                                                          disabled
                                                                                          value={defineValue(values.URDENS_previous)}
                                                                                          className={values.URDENS_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_previous !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.URDENS_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.URDENS_past)}
                                                                                          disabled
                                                                                          value={defineValue(values.URDENS_past)}
                                                                                          className={values.URDENS_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.URDENS_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right">
                                                                                    <Typography variant="label">PH</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.URTest_current)}
                                                                                          disabled={defineDisabled(values.URTest_current)}
                                                                                          value={defineValue(values.URTest_current)}
                                                                                          onChange={(e) => formik.setFieldValue("URTest_current", e.target.value)}
                                                                                          className={values.URTest_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.URTest_unit}</Typography></InputAdornment>}
                                                                                    />
                                                                                    <FormHelperText error id="URTest_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.URTest_current && errors.URTest_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.URTest_previous)}
                                                                                          disabled
                                                                                          value={defineValue(values.URTest_previous)}
                                                                                          className={values.URTest_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_previous !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.URTest_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.URTest_past)}
                                                                                          disabled
                                                                                          value={defineValue(values.URTest_past)}
                                                                                          className={values.URTest_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.URTest_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                  </TableBody>
                                                            </Table>
                                                      </TableContainer>
                                                </Container>
                                          </TabPanel>
                                          <TabPanel value="4">
                                                <Container sx={{ backgroundColor: "#FFFFFF", height: "100%", paddingTop: 1 }}>
                                                      {values.blood_confirm_staff !== null && <Typography sx={{ fontSize: 12 }}>{values.blood_confirm_staff} confirmed at {values.blood_confirm_date}</Typography>}
                                                      {values.blood_release_staff !== null && values.blood_confirm_staff === null && <Typography sx={{ fontSize: 12 }}>{values.blood_release_staff} released at {values.blood_release_date}</Typography>}
                                                      <TableContainer
                                                            component={Paper}
                                                            sx={{
                                                                  height: "100%",
                                                                  paddingTop: 2,
                                                                  paddingBottom: 2,
                                                                  marginLeft: 0,
                                                                  '&:last-child td, &:last-child th': { border: 0 },
                                                                  '& td:nth-of-type(2),& th:nth-of-type(2),& td:nth-of-type(6),& th:nth-of-type(6)': { backgroundColor: "#DDDDDD" },
                                                                  '& td:nth-of-type(3),& th:nth-of-type(3),& td:nth-of-type(7),& th:nth-of-type(7)': { backgroundColor: "#F9F9F9" },
                                                                  '& td:nth-of-type(4),& th:nth-of-type(4),& td:nth-of-type(8),& th:nth-of-type(8)': { backgroundColor: "#F9F9F9" },
                                                                  '& td:nth-of-type(1)': { paddingLeft: 0, paddingTop: 0, paddingBottom: 0, marginBottom: 0 },
                                                                  '& td:nth-of-type(2),& td:nth-of-type(3),& td:nth-of-type(4),& td:nth-of-type(6),& td:nth-of-type(7),& td:nth-of-type(8)': { paddingTop: 0, paddingBottom: 1, marginTop: 0, marginBottom: 1 },
                                                            }}>
                                                            <Table sx={{ width: "100%", minWidth: 650, height: "100%", tableLayout: "fixed" }} size="small">
                                                                  <TableHead >
                                                                        <TableRow >
                                                                              <TableCell> </TableCell>
                                                                              <TableCell align="center" sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>Current</TableCell>
                                                                              <TableCell align="center" sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>{values.test_date_previous !== null ? `${values.test_date_previous}` : 'Previous'}</TableCell>
                                                                              <TableCell align="center" sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>{values.test_date_past !== null ? `${values.test_date_past}` : 'Past'}</TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell align="center" sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>Current</TableCell>
                                                                              <TableCell align="center" sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>{values.test_date_previous !== null ? `${values.test_date_previous}` : 'Previous'}</TableCell>
                                                                              <TableCell align="center" sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>{values.test_date_past !== null ? `${values.test_date_past}` : 'Past'}</TableCell>

                                                                        </TableRow>
                                                                  </TableHead>
                                                                  <TableBody>
                                                                        <TableRow >
                                                                              <TableCell align="right">
                                                                                    <Typography variant="label">WBC</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.BloodWBC_current)}
                                                                                          disabled={defineDisabled(values.BloodWBC_current)}
                                                                                          value={defineValue(values.BloodWBC_current)}
                                                                                          onChange={(e) => formik.setFieldValue("BloodWBC_current", e.target.value)}
                                                                                          className={values.BloodWBC_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.BloodWBC_unit}</Typography></InputAdornment>}
                                                                                    />
                                                                                    <FormHelperText error id="BloodWBC_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.BloodWBC_current && errors.BloodWBC_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.BloodWBC_previous)}
                                                                                          disabled
                                                                                          value={defineValue(values.BloodWBC_previous)}
                                                                                          className={values.BloodWBC_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_previous !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.BloodWBC_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.BloodWBC_past)}
                                                                                          disabled
                                                                                          value={defineValue(values.BloodWBC_past)}
                                                                                          className={values.BloodWBC_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.BloodWBC_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell align="right">
                                                                                    <Typography variant="label_group">WBC Differential Count</Typography>
                                                                              </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                              <TableCell align="right">
                                                                                    <Typography variant="label" >RBC</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.BloodRBC_current)}
                                                                                          disabled={defineDisabled(values.BloodRBC_current)}
                                                                                          value={defineValue(values.BloodRBC_current)}
                                                                                          onChange={(e) => formik.setFieldValue("BloodRBC_current", e.target.value)}
                                                                                          className={values.BloodRBC_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.BloodRBC_unit}</Typography></InputAdornment>}
                                                                                    />
                                                                                    <FormHelperText error id="BloodRBC_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.BloodRBC_current && errors.BloodRBC_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.BloodRBC_previous)}
                                                                                          disabled
                                                                                          value={defineValue(values.BloodRBC_previous)}
                                                                                          className={values.BloodRBC_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_previous !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.BloodRBC_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.BloodRBC_past)}
                                                                                          disabled
                                                                                          value={defineValue(values.BloodRBC_past)}
                                                                                          className={values.BloodRBC_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.BloodRBC_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell align="right">
                                                                                    <Typography variant="label">Neutrophils</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.BloodW1_current)}
                                                                                          disabled={defineDisabled(values.BloodW1_current)}
                                                                                          value={defineValue(values.BloodW1_current)}
                                                                                          onChange={(e) => formik.setFieldValue("BloodW1_current", e.target.value)}
                                                                                          className={values.BloodW1_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.BloodW1_unit}</Typography></InputAdornment>}
                                                                                    />
                                                                                    <FormHelperText error id="BloodW1_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.BloodW1_current && errors.BloodW1_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.BloodW1_previous)}
                                                                                          disabled
                                                                                          value={defineValue(values.BloodW1_previous)}
                                                                                          className={values.BloodW1_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_previous !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.BloodW1_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.BloodW1_past)}
                                                                                          disabled
                                                                                          value={defineValue(values.BloodW1_past)}
                                                                                          className={values.BloodW1_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.BloodW1_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                              <TableCell align="right">
                                                                                    <Typography variant="label">Hb</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.BloodHB_current)}
                                                                                          disabled={defineDisabled(values.BloodHB_current)}
                                                                                          value={defineValue(values.BloodHB_current)}
                                                                                          onChange={(e) => formik.setFieldValue("BloodHB_current", e.target.value)}
                                                                                          className={values.BloodHB_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.BloodHB_unit}</Typography></InputAdornment>}
                                                                                    />
                                                                                    <FormHelperText error id="BloodHB_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.BloodHB_current && errors.BloodHB_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.BloodHB_previous)}
                                                                                          disabled
                                                                                          value={defineValue(values.BloodHB_previous)}
                                                                                          className={values.BloodHB_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_previous !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.BloodHB_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.BloodHB_past)}
                                                                                          disabled
                                                                                          value={defineValue(values.BloodHB_past)}
                                                                                          className={values.BloodHB_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.BloodHB_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell align="right">
                                                                                    <Typography variant="label">Lymphocytes</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.BloodW2_current)}
                                                                                          disabled={defineDisabled(values.BloodW2_current)}
                                                                                          value={defineValue(values.BloodW2_current)}
                                                                                          onChange={(e) => formik.setFieldValue("BloodW2_current", e.target.value)}
                                                                                          className={values.BloodW2_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.BloodW2_unit}</Typography></InputAdornment>}
                                                                                    />
                                                                                    <FormHelperText error id="BloodW2_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.BloodW2_current && errors.BloodW2_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.BloodW2_previous)}
                                                                                          disabled
                                                                                          value={defineValue(values.BloodW2_previous)}
                                                                                          className={values.BloodW2_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_previous !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.BloodW2_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.BloodW2_past)}
                                                                                          disabled
                                                                                          value={defineValue(values.BloodW2_past)}
                                                                                          className={values.BloodW2_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.BloodW2_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                              <TableCell align="right">
                                                                                    <Typography variant="label">Hematocrit</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.BloodHCT_current)}
                                                                                          disabled={defineDisabled(values.BloodHCT_current)}
                                                                                          value={defineValue(values.BloodHCT_current)}
                                                                                          onChange={(e) => formik.setFieldValue("BloodHCT_current", e.target.value)}
                                                                                          className={values.BloodHCT_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.BloodHCT_unit}</Typography></InputAdornment>}
                                                                                    />
                                                                                    <FormHelperText error id="BloodHCT_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.BloodHCT_current && errors.BloodHCT_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.BloodHCT_previous)}
                                                                                          disabled
                                                                                          value={defineValue(values.BloodHCT_previous)}
                                                                                          className={values.BloodHCT_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_previous !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.BloodHCT_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.BloodHCT_past)}
                                                                                          disabled
                                                                                          value={defineValue(values.BloodHCT_past)}
                                                                                          className={values.BloodHCT_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.BloodHCT_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell align="right">
                                                                                    <Typography variant="label">Monocytes</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.BloodW3_current)}
                                                                                          disabled={defineDisabled(values.BloodW3_current)}
                                                                                          value={defineValue(values.BloodW3_current)}
                                                                                          onChange={(e) => formik.setFieldValue("BloodW3_current", e.target.value)}
                                                                                          className={values.BloodW3_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.BloodW3_unit}</Typography></InputAdornment>}
                                                                                    />
                                                                                    <FormHelperText error id="BloodW3_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.BloodW3_current && errors.BloodW3_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.BloodW3_previous)}
                                                                                          disabled
                                                                                          value={defineValue(values.BloodW3_previous)}
                                                                                          className={values.BloodW3_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_previous !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.BloodW3_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.BloodW3_past)}
                                                                                          disabled
                                                                                          value={defineValue(values.BloodW3_past)}
                                                                                          className={values.BloodW3_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.BloodW3_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                              <TableCell align="right">
                                                                                    <Typography variant="label">MCV</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.BloodMCV_current)}
                                                                                          disabled={defineDisabled(values.BloodMCV_current)}
                                                                                          value={defineValue(values.BloodMCV_current)}
                                                                                          onChange={(e) => formik.setFieldValue("BloodMCV_current", e.target.value)}
                                                                                          className={values.BloodMCV_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.BloodMCV_unit}</Typography></InputAdornment>}
                                                                                    />
                                                                                    <FormHelperText error id="BloodMCV_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.BloodMCV_current && errors.BloodMCV_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.BloodMCV_previous)}
                                                                                          disabled
                                                                                          value={defineValue(values.BloodMCV_previous)}
                                                                                          className={values.BloodMCV_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_previous !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.BloodMCV_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.BloodMCV_past)}
                                                                                          disabled
                                                                                          value={defineValue(values.BloodMCV_past)}
                                                                                          className={values.BloodMCV_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.BloodMCV_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell align="right">
                                                                                    <Typography variant="label">Eosinophils</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.BloodW4_current)}
                                                                                          disabled={defineDisabled(values.BloodW4_current)}
                                                                                          value={defineValue(values.BloodW4_current)}
                                                                                          onChange={(e) => formik.setFieldValue("BloodW4_current", e.target.value)}
                                                                                          className={values.BloodW4_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.BloodW4_unit}</Typography></InputAdornment>}
                                                                                    />
                                                                                    <FormHelperText error id="BloodW4_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.BloodW4_current && errors.BloodW4_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.BloodW4_previous)}
                                                                                          disabled
                                                                                          value={defineValue(values.BloodW4_previous)}
                                                                                          className={values.BloodW4_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_previous !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.BloodW4_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.BloodW4_past)}
                                                                                          disabled
                                                                                          value={defineValue(values.BloodW4_past)}
                                                                                          className={values.BloodW4_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.BloodW4_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                              <TableCell align="right">
                                                                                    <Typography variant="label">MCH</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.BloodMCH_current)}
                                                                                          disabled={defineDisabled(values.BloodMCH_current)}
                                                                                          value={defineValue(values.BloodMCH_current)}
                                                                                          onChange={(e) => formik.setFieldValue("BloodMCH_current", e.target.value)}
                                                                                          className={values.BloodMCH_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.BloodMCH_unit}</Typography></InputAdornment>}
                                                                                    />
                                                                                    <FormHelperText error id="BloodMCH_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.BloodMCH_current && errors.BloodMCH_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.BloodMCH_previous)}
                                                                                          disabled
                                                                                          value={defineValue(values.BloodMCH_previous)}
                                                                                          className={values.BloodMCH_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_previous !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.BloodMCH_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.BloodMCH_past)}
                                                                                          disabled
                                                                                          value={defineValue(values.BloodMCH_past)}
                                                                                          className={values.BloodMCH_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.BloodMCH_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell align="right">
                                                                                    <Typography variant="label">Basophilis</Typography>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.BloodW5_current)}
                                                                                          disabled={defineDisabled(values.BloodW5_current)}
                                                                                          value={defineValue(values.BloodW5_current)}
                                                                                          onChange={(e) => formik.setFieldValue("BloodW5_current", e.target.value)}
                                                                                          className={values.BloodW5_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.BloodW5_unit}</Typography></InputAdornment>}
                                                                                    />
                                                                                    <FormHelperText error id="BloodW5_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.BloodW5_current && errors.BloodW5_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.BloodW5_previous)}
                                                                                          disabled
                                                                                          value={defineValue(values.BloodW5_previous)}
                                                                                          className={values.BloodW5_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_previous !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.BloodW5_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.BloodW5_past)}
                                                                                          disabled
                                                                                          value={defineValue(values.BloodW5_past)}
                                                                                          className={values.BloodW5_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.BloodW5_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                              <TableCell align="right">
                                                                                    <Typography variant="label">MCHC</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.BloodMCHC_current)}
                                                                                          disabled={defineDisabled(values.BloodMCHC_current)}
                                                                                          value={defineValue(values.BloodMCHC_current)}
                                                                                          onChange={(e) => formik.setFieldValue("BloodMCHC_current", e.target.value)}
                                                                                          className={values.BloodMCHC_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.BloodMCHC_unit}</Typography></InputAdornment>}
                                                                                    />
                                                                                    <FormHelperText error id="BloodMCHC_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.BloodMCHC_current && errors.BloodMCHC_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.BloodMCHC_previous)}
                                                                                          disabled
                                                                                          value={defineValue(values.BloodMCHC_previous)}
                                                                                          className={values.BloodMCHC_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_previous !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.BloodMCHC_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.BloodMCHC_past)}
                                                                                          disabled
                                                                                          value={defineValue(values.BloodMCHC_past)}
                                                                                          className={values.BloodMCHC_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.BloodMCHC_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell align="right">
                                                                                    <Typography variant="label">ESR</Typography>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.ESR_current)}
                                                                                          disabled={defineDisabled(values.ESR_current)}
                                                                                          value={defineValue(values.ESR_current)}
                                                                                          onChange={(e) => formik.setFieldValue("ESR_current", e.target.value)}
                                                                                          className={values.ESR_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.ESR_unit}</Typography></InputAdornment>}
                                                                                    />
                                                                                    <FormHelperText error id="ESR_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.ESR_current && errors.ESR_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.ESR_previous)}
                                                                                          disabled
                                                                                          value={defineValue(values.ESR_previous)}
                                                                                          className={values.ESR_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_previous !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.ESR_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.ESR_past)}
                                                                                          disabled
                                                                                          value={defineValue(values.ESR_past)}
                                                                                          className={values.ESR_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.ESR_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                              <TableCell align="right">
                                                                                    <Typography variant="label">PLT</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.BloodPLT_current)}
                                                                                          disabled={defineDisabled(values.BloodPLT_current)}
                                                                                          value={defineValue(values.BloodPLT_current)}
                                                                                          onChange={(e) => formik.setFieldValue("BloodPLT_current", e.target.value)}
                                                                                          className={values.BloodPLT_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.BloodPLT_unit}</Typography></InputAdornment>}
                                                                                    />
                                                                                    <FormHelperText error id="BloodPLT_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.BloodPLT_current && errors.BloodPLT_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.BloodPLT_previous)}
                                                                                          disabled
                                                                                          value={defineValue(values.BloodPLT_previous)}
                                                                                          className={values.BloodPLT_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_previous !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.BloodPLT_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={definePlaceholder(values.BloodPLT_past)}
                                                                                          disabled
                                                                                          value={defineValue(values.BloodPLT_past)}
                                                                                          className={values.BloodPLT_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.BloodPLT_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell align="right" sx={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                                                                                    <Typography variant="label">Blood Film Comment</Typography>
                                                                              </TableCell>
                                                                              <TableCell sx={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                                                                                    <Button
                                                                                          variant={values.BFC_current === "" ? "cancel" : "comment_value"}
                                                                                          sx={{ fontSize: "10px !important" }}
                                                                                          onClick={openBFC_modal} >
                                                                                          {values.BFC_current === "" ? "Add Comment" : "Update Comment"}
                                                                                    </Button>
                                                                              </TableCell>
                                                                              <TableCell sx={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                                                                                    <Button
                                                                                          variant={values.BFC_previous === "" ? "cancel" : "comment_value"}
                                                                                          sx={{ fontSize: "10px !important" }}
                                                                                          onClick={openBFC_modal}
                                                                                          disabled={values.BFC_previous === "" ?? true}
                                                                                    >
                                                                                          {values.BFC_previous === "" ? "No Comment" : "View Comment"}
                                                                                    </Button>
                                                                              </TableCell>
                                                                              <TableCell sx={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                                                                                    <Button
                                                                                          variant={values.BFC_past === "" ? "cancel" : "comment_value"}
                                                                                          sx={{ fontSize: "10px !important" }}
                                                                                          onClick={openBFC_modal}
                                                                                          disabled={values.BFC_past === "" ?? true}
                                                                                    >
                                                                                          {values.BFC_past === "" ? "No Comment" : "View Comment"}
                                                                                    </Button>
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
                                                                              <TableCell >
                                                                                    {values.BloodType_current === "-9995" ?
                                                                                          <FormControl fullWidth>
                                                                                                <InputBase
                                                                                                      placeholder="[NI]"
                                                                                                      disabled
                                                                                                      value="[NI]"
                                                                                                      className='textField'
                                                                                                />
                                                                                          </FormControl>
                                                                                          :
                                                                                          <FormControl fullWidth>
                                                                                                <Select
                                                                                                      className={values.BloodType_current_redstar === null ? 'default' : 'red'}
                                                                                                      error={Boolean(touched.BloodType_current && errors.BloodType_current)}
                                                                                                      {...getFieldProps('BloodType_current')}
                                                                                                      style={{ textAlign: 'left' }}
                                                                                                      displayEmpty
                                                                                                >
                                                                                                      {BloodType_Option.map((BloodType) => (
                                                                                                            <MenuItem
                                                                                                                  value={BloodType.value}
                                                                                                                  key={BloodType.value}
                                                                                                            >{BloodType.label}</MenuItem>
                                                                                                      )
                                                                                                      )}
                                                                                                </Select>
                                                                                          </FormControl>
                                                                                    }
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    {values.BloodType_previous === "-9995" ?
                                                                                          <FormControl fullWidth>
                                                                                                <InputBase
                                                                                                      placeholder="[NI]"
                                                                                                      disabled
                                                                                                      value="[NI]"
                                                                                                      className='textField'
                                                                                                />
                                                                                          </FormControl>
                                                                                          :
                                                                                          <FormControl fullWidth>
                                                                                                <Select
                                                                                                      disabled
                                                                                                      className={values.BloodType_previous_redstar === null ? 'default' : 'red'}
                                                                                                      error={Boolean(touched.BloodType_previous && errors.BloodType_previous)}
                                                                                                      {...getFieldProps('BloodType_previous')}
                                                                                                      style={{ textAlign: 'left' }}
                                                                                                      displayEmpty
                                                                                                >
                                                                                                      {BloodType_Option.map((BloodType) => (
                                                                                                            <MenuItem
                                                                                                                  value={BloodType.value}
                                                                                                                  key={BloodType.value}
                                                                                                            >{BloodType.label}</MenuItem>
                                                                                                      )
                                                                                                      )}
                                                                                                </Select>
                                                                                          </FormControl>
                                                                                    }
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                disabled
                                                                                                className={values.BloodType_past_redstar === null ? 'default' : 'red'}
                                                                                                error={Boolean(touched.BloodType_past && errors.BloodType_past)}
                                                                                                {...getFieldProps('BloodType_past')}
                                                                                                style={{ textAlign: 'left' }}
                                                                                          >
                                                                                                {BloodType_Option.map((BloodType) => (
                                                                                                      <MenuItem
                                                                                                            value={BloodType.value}
                                                                                                            key={BloodType.value}
                                                                                                      >{BloodType.label}</MenuItem>
                                                                                                )
                                                                                                )}
                                                                                          </Select>
                                                                                    </FormControl>
                                                                              </TableCell>
                                                                              <TableCell sx={{ background: "#FFFFFF !important" }}> </TableCell>
                                                                              <TableCell sx={{ background: "#FFFFFF !important" }}>
                                                                                    <Button
                                                                                          size="large"
                                                                                          type="button"
                                                                                          variant="contained"
                                                                                          onClick={() => {
                                                                                                setSubmitAction("confirm");
                                                                                                setSubmitCategory("Blood Test");
                                                                                                handleSubmit();
                                                                                          }}
                                                                                    >
                                                                                          Confirm
                                                                                    </Button></TableCell>
                                                                              <TableCell sx={{ background: "#FFFFFF !important" }}>
                                                                                    {values.blood_confirm_staff === null && values.blood_confirm_date === null && <Button
                                                                                          size="large"
                                                                                          type="button"
                                                                                          variant="contained"
                                                                                          onClick={() => {
                                                                                                setSubmitAction("release");
                                                                                                setSubmitCategory("Blood Test");
                                                                                                handleSubmit();
                                                                                          }}
                                                                                    >
                                                                                          Release
                                                                                    </Button>}
                                                                              </TableCell>
                                                                              <TableCell sx={{ background: "#FFFFFF !important" }}> </TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                              <TableCell align="right">
                                                                                    <Typography variant="label">Rhesus Typing</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    {values.BloodRH_current === "-9995" ?
                                                                                          <FormControl fullWidth>
                                                                                                <InputBase
                                                                                                      placeholder="[NI]"
                                                                                                      disabled
                                                                                                      value="[NI]"
                                                                                                      className='textField'
                                                                                                />
                                                                                          </FormControl>
                                                                                          :
                                                                                          <FormControl fullWidth>
                                                                                                <Select
                                                                                                      className={values.BloodRH_current_redstar === null ? 'default' : 'red'}
                                                                                                      error={Boolean(touched.BloodRH_current && errors.BloodRH_current)}
                                                                                                      {...getFieldProps('BloodRH_current')}
                                                                                                      style={{ textAlign: 'left' }}
                                                                                                      displayEmpty
                                                                                                >
                                                                                                      {PosNeg_Option.map((BloodRH) => (
                                                                                                            <MenuItem
                                                                                                                  value={BloodRH.value}
                                                                                                                  key={BloodRH.value}
                                                                                                            >{BloodRH.label}</MenuItem>
                                                                                                      )
                                                                                                      )}
                                                                                                </Select>
                                                                                          </FormControl>
                                                                                    }
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    {values.BloodRH_previous === "-9995" ?
                                                                                          <FormControl fullWidth>
                                                                                                <InputBase
                                                                                                      placeholder="[NI]"
                                                                                                      disabled
                                                                                                      value="[NI]"
                                                                                                      className='textField'
                                                                                                />
                                                                                          </FormControl>
                                                                                          :
                                                                                          <FormControl fullWidth>
                                                                                                <Select
                                                                                                      disabled
                                                                                                      className={values.BloodRH_previous_redstar === null ? 'default' : 'red'}
                                                                                                      error={Boolean(touched.BloodRH_previous && errors.BloodRH_previous)}
                                                                                                      {...getFieldProps('BloodRH_previous')}
                                                                                                      style={{ textAlign: 'left' }}
                                                                                                      displayEmpty
                                                                                                >
                                                                                                      {PosNeg_Option.map((BloodRH) => (
                                                                                                            <MenuItem
                                                                                                                  value={BloodRH.value}
                                                                                                                  key={BloodRH.value}
                                                                                                            >{BloodRH.label}</MenuItem>
                                                                                                      )
                                                                                                      )}
                                                                                                </Select>
                                                                                          </FormControl>
                                                                                    }
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                disabled
                                                                                                className={values.BloodRH_past_redstar === null ? 'default' : 'red'}
                                                                                                error={Boolean(touched.BloodRH_past && errors.BloodRH_past)}
                                                                                                {...getFieldProps('BloodRH_past')}
                                                                                                style={{ textAlign: 'left' }}
                                                                                          >
                                                                                                {PosNeg_Option.map((BloodRH) => (
                                                                                                      <MenuItem
                                                                                                            value={BloodRH.value}
                                                                                                            key={BloodRH.value}
                                                                                                      >{BloodRH.label}</MenuItem>
                                                                                                )
                                                                                                )}
                                                                                          </Select>
                                                                                    </FormControl>
                                                                              </TableCell>
                                                                        </TableRow>
                                                                  </TableBody>
                                                            </Table>
                                                      </TableContainer>
                                                </Container>
                                          </TabPanel>

                                    </Form>
                              </FormikProvider>
                        </TabContext>
                  </Container >
                  <Dialog open={UBOther_modal} onClose={closeUBOther_modal} fullWidth={true} maxWidth={"md"} >
                        <DialogTitle>Other Item</DialogTitle>
                        <DialogContent>
                              <Box>
                                    {/* <Item>
                                          <DialogContentText textAlign={"left"}>
                                                Select...
                                          </DialogContentText>
                                    </Item> */}
                                    <Item>
                                          <FormControl fullWidth>
                                                <Autocomplete
                                                      multiple
                                                      options={UBOther_Comment}
                                                      disableCloseOnSelect
                                                      autoHighlight
                                                      onChange={handleUBOtherChange}
                                                      value={tempUBOther_current}
                                                      getOptionLabel={(option) => option.comment_no + "-" + option.eng}
                                                      renderOption={(props, option, { selected }) => (
                                                            <li {...props}>
                                                                  <Checkbox
                                                                        style={{ marginRight: 8 }}
                                                                        checked={selected}
                                                                  />
                                                                  {option.comment_no} - {option.eng}
                                                            </li>
                                                      )}
                                                      renderInput={(params) => (
                                                            <TextField {...params} label="Current" />
                                                      )}
                                                />

                                          </FormControl>
                                    </Item>
                                    <Item>
                                          <FormControl fullWidth>
                                                <Autocomplete
                                                      multiple
                                                      options={UBOther_Comment}
                                                      disabled
                                                      value={tempUBOther_previous}
                                                      getOptionLabel={(option) => option.comment_no + "-" + option.eng}
                                                      renderOption={(props, option, { selected }) => (
                                                            <li {...props}>
                                                                  <Checkbox
                                                                        style={{ marginRight: 8 }}
                                                                        checked={selected}
                                                                  />
                                                                  {option.comment_no} - {option.eng}
                                                            </li>
                                                      )}
                                                      renderInput={(params) => (
                                                            <TextField {...params} label={values.test_date_previous !== null ? `${values.test_date_previous}` : 'Previous'} />
                                                      )}
                                                />

                                          </FormControl>
                                    </Item>
                                    <Item>
                                          <FormControl fullWidth>
                                                <Autocomplete
                                                      multiple
                                                      options={UBOther_Comment}
                                                      disabled
                                                      value={tempUBOther_past}
                                                      getOptionLabel={(option) => option.comment_no + "-" + option.eng}
                                                      renderOption={(props, option, { selected }) => (
                                                            <li {...props}>
                                                                  <Checkbox
                                                                        style={{ marginRight: 8 }}
                                                                        checked={selected}
                                                                  />
                                                                  {option.comment_no} - {option.eng}
                                                            </li>
                                                      )}
                                                      renderInput={(params) => (
                                                            <TextField {...params} label={values.test_date_past !== null ? `${values.test_date_past}` : 'Past'} />
                                                      )}
                                                />

                                          </FormControl>
                                    </Item>
                              </Box>
                        </DialogContent>
                        <DialogActions>
                              <Button onClick={closeUBOther_modal}>Close</Button>
                        </DialogActions>
                  </Dialog>
                  <Dialog open={BFC_modal} onClose={closeBFC_modal} fullWidth={true} maxWidth={"md"} >
                        <DialogTitle>Blood Film Comment</DialogTitle>
                        <DialogContent>
                              <Box>
                                    {/* <Item>
                                          <DialogContentText textAlign={"left"}>
                                                Select...
                                          </DialogContentText>
                                    </Item> */}
                                    <Item>
                                          <FormControl fullWidth>
                                                <InputLabel>Current</InputLabel>
                                                <OutlinedInput
                                                      multiline
                                                      maxRows={5}
                                                      rows={5}
                                                      type="text"
                                                      {...getFieldProps('BFC_current')}
                                                      label="Current"
                                                />
                                          </FormControl>
                                    </Item>
                                    <Item>
                                          <FormControl fullWidth>
                                                <InputLabel>{values.test_date_previous !== null ? `${values.test_date_previous}` : 'Previous'}</InputLabel>
                                                <OutlinedInput
                                                      disabled
                                                      sx={{ backgroundColor: "#DFDFDFDF", color: "#5A567B" }}
                                                      multiline
                                                      maxRows={5}
                                                      rows={5}
                                                      type="text"
                                                      {...getFieldProps('BFC_previous')}
                                                      label={values.test_date_previous !== null ? `${values.test_date_previous}` : 'Previous'}
                                                />
                                          </FormControl>
                                    </Item>
                                    <Item>
                                          <FormControl fullWidth>
                                                <InputLabel>{values.test_date_past !== null ? `${values.test_date_past}` : 'Past'}</InputLabel>
                                                <OutlinedInput
                                                      disabled
                                                      sx={{ backgroundColor: "#DFDFDFDF", color: "#5A567B" }}
                                                      multiline
                                                      maxRows={5}
                                                      rows={5}
                                                      type="text"
                                                      {...getFieldProps('BFC_past')}
                                                      label={values.test_date_past !== null ? `${values.test_date_past}` : 'Past'}
                                                />
                                          </FormControl>
                                    </Item>
                              </Box>
                        </DialogContent>
                        <DialogActions>
                              <Button onClick={closeBFC_modal}>Close</Button>
                        </DialogActions>
                  </Dialog>
            </Page >
      )
}