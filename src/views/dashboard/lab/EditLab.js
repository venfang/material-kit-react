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
import { useFormik, Form, FormikProvider, validateYupSchema } from 'formik';
import Cookies from 'js-cookie';
// @mui
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { useTheme, alpha, styled } from '@mui/material/styles';
import { Grid, Container, Typography, AppBar, FormHelperText, MenuItem, Select, Radio, FormControl, FormControlLabel, RadioGroup, Box, Stack, Button, Tabs, InputAdornment, Tab, Paper, InputBase, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from '@mui/material';
import Loader from '../../../components/loader/Loader';
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import { AlertBox, TimerAlertBox } from '../../../components/alert/SweetAlert';
import SequenceBar from '../../../layouts/dashboard/SequenceBar';

import { getReport, confirmBloodTest, confirmImmunology, confirmBiochemistry, confirmUrine, releaseBloodTest, releaseImmunology, releaseBiochemistry, releaseUrine } from '../../../data/lab/lab';
import { getComment } from '../../../data/comment/comment';

const Item = styled(Paper)(({ theme }) => ({
      backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
}));

const URLook_Option = [{ value: "-1", label: "" }, { value: "1", label: "Clear" }, { value: "2", label: "Turbid", color: "#FFFFFF" }];
const FourPlus_Option = [{ value: "", label: "" }, { value: "-1", label: "[NATD]" }, { value: "neg2", label: "Negative" }, { value: "+/-", label: "+-" }, { value: "1+", label: "+" }, { value: "2+", label: "++" }, { value: "3+", label: "+++" }, { value: "4+", label: "++++" }];
const ThreePlusMinus_Option = [{ value: "", label: "" }, { value: "-1", label: "[NATD]" }, { value: "neg", label: "Negative" }, { value: "+/-", label: "+-" }, { value: "1+", label: "+" }, { value: "2+", label: "++" }, { value: "3+", label: "+++" }];
const ThreePlus_Option = [{ value: "", label: "" }, { value: "-1", label: "[NATD]" }, { value: "neg", label: "Negative" }, { value: "1+", label: "+" }, { value: "2+", label: "++" }, { value: "3+", label: "+++" }];
const PosNeg_Option = [{ value: "", label: "" }, { value: "-1", label: "[NATD]" }, { value: "1", label: "Positive" }, { value: "2", label: "Negative" }];
const NonReactive_Option = [{ value: "", label: "" }, { value: "-1", label: "[NATD]" }, { value: "1", label: "Reactive" }, { value: "2", label: "Non Reactive" }];
const AntiHBs_Status_Option = [{ value: "", label: "" }, { value: "-1", label: "[NATD]" }, { value: "1", label: "Non Immune" }, { value: "2", label: "Low Level Immune" }, { value: "3", label: "Immune" }]
const BloodType_Option = [{ value: "", label: "" }, { value: "-1", label: "[NATD]" }, { value: "1", label: "Type A" }, { value: "2", label: "Type B" }, { value: "3", label: "Type O" }, { value: "4", label: "Type AB" }];

export default function Lab() {
      const [value, setTabValue] = useState("1");
      const { report_id } = useParams();
      const navigate = useNavigate();
      const topValue = 64;
      const handleTabChange = (event, newValue) => {
            setTabValue(newValue);
      }
      const [submitAction, setSubmitAction] = useState("");
      const [UBOther_Comment, setUBOther_Comment] = useState([]);

      useEffect(() => {
            formik.setSubmitting(true);
            getReport(report_id).then((data) => {
                  formik.setValues(data);
                  formik.setSubmitting(false);
            }).catch(() => {
                  TimerAlertBox('error', 'Database Connection Error', '', 1500, 'center');
                  formik.setSubmitting(false);
            });
            getComment("Urine").then((data) => {
                  setUBOther_Comment(data);
            }).catch(() => {
                  TimerAlertBox('error', 'Database Connection Error', '', 1500, 'center');
                  formik.setSubmitting(false);
            })

      }, []);

      const LabSchema = Yup.object().shape({

      });
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


                  hs_CRP_current: '',
                  hs_CRP_previous: '',
                  hs_CRP_past: '',
                  hs_CRP_unit: '',

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
            validationSchema: LabSchema,
            onSubmit: () => {
                  formik.setSubmitting(true);
                  if (submitAction === "immunologyConfirm") {
                        immunologyConfirm();
                  } else if (submitAction === "bloodTestConfirm") {
                        bloodTestConfirm();
                  }
                  else if (submitAction === "urineConfirm") {
                        urineConfirm();
                  } else if (submitAction === "biochemistryConfirm") {
                        biochemistryConfirm();
                  }
                  else if (submitAction === "immunologyRelease") {
                        immunologyRelease();
                  } else if (submitAction === "bloodTestRelease") {
                        bloodTestRelease();
                  }
                  else if (submitAction === "urineRelease") {
                        urineRelease();
                  } else if (submitAction === "biochemistryRelease") {
                        biochemistryRelease();
                  }

            },
      });
      const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

      function bloodTestConfirm() {
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
                  BloodRH: values.BloodRH_current,
                  blood_confirm_staff: Cookies.get('name'),
            };
            confirmBloodTest(formValues)
                  .then((response) => {
                        formik.setSubmitting(false);
                        AlertBox(
                              'success',
                              'Update Successfully',
                              "Blood Test has been confirm.",
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
      function immunologyConfirm() {
            formik.setSubmitting(true);
            const formValues = {
                  report_id: report_id,
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
                  immunology_confirm_staff: Cookies.get('name'),
            };
            console.log(formValues);
            confirmImmunology(formValues)
                  .then((response) => {
                        formik.setSubmitting(false);
                        AlertBox(
                              'success',
                              'Update Successfully',
                              "Immunology has been confirm.",
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
      function urineConfirm() {
            formik.setSubmitting(true);
            const formValues = {
                  report_id: report_id,
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
                  urine_confirm_staff: Cookies.get('name'),
            };
            console.log(formValues);
            confirmUrine(formValues)
                  .then((response) => {
                        formik.setSubmitting(false);
                        AlertBox(
                              'success',
                              'Update Successfully',
                              "Urine has been confirm.",
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
      function biochemistryConfirm() {
            formik.setSubmitting(true);
            const formValues = {
                  report_id: report_id,
                  hs_CRP: values.hs_CRP_current,
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
                  biochemistry_confirm_staff: Cookies.get('name'),
            };
            confirmBiochemistry(formValues)
                  .then((response) => {
                        formik.setSubmitting(false);
                        AlertBox(
                              'success',
                              'Update Successfully',
                              "Biochemistry has been confirm.",
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


      function bloodTestRelease() {
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
                  BloodRH: values.BloodRH_current,
                  blood_release_staff: Cookies.get('name'),
            };
            releaseBloodTest(formValues)
                  .then((response) => {
                        formik.setSubmitting(false);
                        AlertBox(
                              'success',
                              'Update Successfully',
                              "Blood Test has been release.",
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
                              'Release Failed',
                              error.response.data.message,
                              false,
                              '',
                              true,
                              'OK').then(() => {

                              });
                  }
                  );

      }
      function immunologyRelease() {
            formik.setSubmitting(true);
            const formValues = {
                  report_id: report_id,
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
                  immunology_release_staff: Cookies.get('name'),
            };
            console.log(formValues);
            releaseImmunology(formValues)
                  .then((response) => {
                        formik.setSubmitting(false);
                        AlertBox(
                              'success',
                              'Update Successfully',
                              "Immunology has been release.",
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
      function urineRelease() {
            formik.setSubmitting(true);
            const formValues = {
                  report_id: report_id,
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
                  urine_release_staff: Cookies.get('name'),
            };
            releaseUrine(formValues)
                  .then((response) => {
                        formik.setSubmitting(false);
                        AlertBox(
                              'success',
                              'Update Successfully',
                              "Urine has been release.",
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
                              'Release Failed',
                              error.response.data.message,
                              false,
                              '',
                              true,
                              'OK').then(() => {

                              });
                  }
                  );

      }
      function biochemistryRelease() {
            formik.setSubmitting(true);
            const formValues = {
                  report_id: report_id,
                  hs_CRP: values.hs_CRP_current,
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
                  biochemistry_release_staff: Cookies.get('name'),
            };
            releaseBiochemistry(formValues)
                  .then((response) => {
                        formik.setSubmitting(false);
                        AlertBox(
                              'success',
                              'Update Successfully',
                              "Biochemistry has been release.",
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
                              'Release Failed',
                              error.response.data.message,
                              false,
                              '',
                              true,
                              'OK')

                  }
                  );
      }
      const handleChange = (e) => {
            // let tempValue = formik.values.UBOther_current;
            // formik.setFieldValue("UBOther_current",
            //       e.target.value === 'string' ? tempValue.split(',') : tempValue,
            // );
            formik.values.UBOther_current(
                  // On autofill we get a stringified value.
                  typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value,
            );
      };
      useEffect(() => {
            console.log(formik.values.UBOther_current);
      }, [formik.values.UBOther_current]);

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
                                    <Box sx={{ backgroundColor: "#FFFFFF", color: "#211D4E", height: 60, paddingLeft: 10, paddingRight: 10 }}>
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
                                                                                                placeholder="[NATD]"
                                                                                                className={values.HBsag_Value_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                                {...getFieldProps('HBsag_Value_current')}

                                                                                                error={Boolean(touched.HBsag_Value_current && errors.HBsag_Value_current)}
                                                                                          />
                                                                                          <FormHelperText error id="HBsag_Value_current-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.HBsag_Value_current && errors.HBsag_Value_current}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                className={values.HBsag_Status_current_redstar === null ? null : 'red'}
                                                                                                error={Boolean(touched.HBsag_Status_current && errors.HBsag_Status_current)}
                                                                                                {...getFieldProps('HBsag_Status_current')}
                                                                                                style={{ textAlign: 'left' }}
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
                                                                              </TableCell>
                                                                              <TableCell sx={{ backgroundColor: "#F9F9F9" }}>
                                                                                    <FormControl fullWidth>
                                                                                          <InputBase
                                                                                                placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                                className={values.HBsag_Value_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                                {...getFieldProps('HBsag_Value_previous')}
                                                                                                disabled
                                                                                                error={Boolean(touched.HBsag_Value_previous && errors.HBsag_Value_previous)}
                                                                                          />
                                                                                          <FormHelperText error id="HBsag_Value_previous-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.HBsag_Value_previous && errors.HBsag_Value_previous}
                                                                                          </FormHelperText> </FormControl>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                disabled
                                                                                                className={values.HBsag_Status_previous_redstar === null ? null : 'red'}
                                                                                                error={Boolean(touched.HBsag_Status_previous && errors.HBsag_Status_previous)}
                                                                                                {...getFieldProps('HBsag_Status_previous')}
                                                                                                style={{ textAlign: 'left' }}
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
                                                                              </TableCell>
                                                                              <TableCell sx={{ backgroundColor: "#F9F9F9" }}>
                                                                                    <FormControl fullWidth>
                                                                                          <InputBase
                                                                                                placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                                className={values.HBsag_Value_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                                {...getFieldProps('HBsag_Value_past')}
                                                                                                disabled
                                                                                                error={Boolean(touched.HBsag_Value_past && errors.HBsag_Value_past)}
                                                                                          />
                                                                                          <FormHelperText error id="HBsag_Value_past-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.HBsag_Value_past && errors.HBsag_Value_past}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                disabled
                                                                                                className={values.HBsag_Status_current_redstar === null ? null : 'red'}
                                                                                                error={Boolean(touched.HBsag_Status_past && errors.HBsag_Status_past)}
                                                                                                {...getFieldProps('HBsag_Status_past')}
                                                                                                style={{ textAlign: 'left' }}
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
                                                                              </TableCell>
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">TSH</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                          className={values.RFTSH_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('RFTSH_current')}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.RFTSH_unit}</Typography></InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="RFTSH_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.RFTSH_current && errors.RFTSH_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                          className={values.RFTSH_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          {...getFieldProps('RFTSH_previous')}
                                                                                          endAdornment={values.test_date_previous != null ? <InputAdornment position="start"><Typography variant="endorment">{values.RFTSH_unit}</Typography></InputAdornment> : null}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                          disabled
                                                                                          className={values.RFTSH_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('RFTSH_past')}
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
                                                                                                placeholder="[NATD]"
                                                                                                className={values.AntiHBs_Value_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                                {...getFieldProps('AntiHBs_Value_current')}

                                                                                                error={Boolean(touched.AntiHBs_Value_current && errors.AntiHBs_Value_current)}
                                                                                          />
                                                                                          <FormHelperText error id="AntiHBs_Value_current-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.AntiHBs_Value_current && errors.AntiHBs_Value_current}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                className={values.AntiHBs_Status_current_redstar === null ? null : 'red'}
                                                                                                error={Boolean(touched.AntiHBs_Status_current && errors.AntiHBs_Status_current)}
                                                                                                {...getFieldProps('AntiHBs_Status_current')}
                                                                                                style={{ textAlign: 'left' }}
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
                                                                              </TableCell>
                                                                              <TableCell sx={{ backgroundColor: "#F9F9F9" }}>
                                                                                    <FormControl fullWidth>
                                                                                          <InputBase
                                                                                                placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                                className={values.AntiHBs_Value_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                                {...getFieldProps('AntiHBs_Value_previous')}
                                                                                                disabled
                                                                                                error={Boolean(touched.AntiHBs_Value_previous && errors.AntiHBs_Value_previous)}
                                                                                          />
                                                                                          <FormHelperText error id="AntiHBs_Value_previous-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.AntiHBs_Value_previous && errors.AntiHBs_Value_previous}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                disabled
                                                                                                className={values.AntiHBs_Status_previous_redstar === null ? null : 'red'}
                                                                                                error={Boolean(touched.AntiHBs_Status_previous && errors.AntiHBs_Status_previous)}
                                                                                                {...getFieldProps('AntiHBs_Status_previous')}
                                                                                                style={{ textAlign: 'left' }}
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
                                                                              </TableCell>
                                                                              <TableCell sx={{ backgroundColor: "#F9F9F9" }}>
                                                                                    <FormControl fullWidth>
                                                                                          <InputBase
                                                                                                placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                                className={values.AntiHBs_Value_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                                {...getFieldProps('AntiHBs_Value_past')}
                                                                                                disabled
                                                                                                error={Boolean(touched.AntiHBs_Value_past && errors.AntiHBs_Value_past)}
                                                                                          />
                                                                                          <FormHelperText error id="AntiHBs_Value_past-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.AntiHBs_Value_past && errors.AntiHBs_Value_past}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                className={values.AntiHBs_Status_past_redstar === null ? null : 'red'}
                                                                                                error={Boolean(touched.AntiHBs_Status_past && errors.AntiHBs_Status_past)}
                                                                                                {...getFieldProps('AntiHBs_Status_past')}
                                                                                                style={{ textAlign: 'left' }}
                                                                                                disabled
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
                                                                              </TableCell>
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">F-T3</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          placeholder="[NATD]"
                                                                                          className={values.FT3_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('FT3_current')}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.FT3_unit}</Typography></InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="FT3_current-FT3_current" sx={{ fontWeight: 600 }}>
                                                                                          {touched.FT3_current && errors.FT3_current}
                                                                                    </FormHelperText>

                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                          className={values.FT3_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          {...getFieldProps('FT3_previous')}
                                                                                          endAdornment={values.test_date_previous != null ? <InputAdornment position="start"><Typography variant="endorment">{values.FT3_unit}</Typography></InputAdornment> : null}

                                                                                    />

                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                          disabled
                                                                                          className={values.FT3_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('FT3_past')}
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
                                                                                                placeholder="[NATD]"
                                                                                                className={values.HavIgG_Value_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                                {...getFieldProps('HavIgG_Value_current')}

                                                                                                error={Boolean(touched.HavIgG_Value_current && errors.HavIgG_Value_current)}
                                                                                          />
                                                                                          <FormHelperText error id="HavIgG_Value_current-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.HavIgG_Value_current && errors.HavIgG_Value_current}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                className={values.HavIgG_Status_current_redstar === null ? null : 'red'}
                                                                                                error={Boolean(touched.HavIgG_Status_current && errors.HavIgG_Status_current)}
                                                                                                {...getFieldProps('HavIgG_Status_current')}
                                                                                                style={{ textAlign: 'left' }}
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
                                                                              </TableCell>
                                                                              <TableCell sx={{ backgroundColor: "#F9F9F9" }}>
                                                                                    <FormControl fullWidth>
                                                                                          <InputBase
                                                                                                placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                                className={values.HavIgG_Value_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                                {...getFieldProps('HavIgG_Value_previous')}
                                                                                                disabled
                                                                                                error={Boolean(touched.HavIgG_Value_previous && errors.HavIgG_Value_previous)}
                                                                                          />
                                                                                          <FormHelperText error id="HavIgG_Value_previous-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.HavIgG_Value_previous && errors.HavIgG_Value_previous}
                                                                                          </FormHelperText>
                                                                                    </FormControl> <FormControl fullWidth><Select
                                                                                          disabled
                                                                                          className={values.HavIgG_Status_previous_redstar === null ? null : 'red'}
                                                                                          error={Boolean(touched.HavIgG_Status_previous && errors.HavIgG_Status_previous)}
                                                                                          {...getFieldProps('HavIgG_Status_previous')}
                                                                                          style={{ textAlign: 'left' }}
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
                                                                              </TableCell>
                                                                              <TableCell sx={{ backgroundColor: "#F9F9F9" }}>
                                                                                    <FormControl fullWidth>
                                                                                          <InputBase
                                                                                                placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                                className={values.HavIgG_Value_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                                {...getFieldProps('HavIgG_Value_past')}
                                                                                                disabled
                                                                                                error={Boolean(touched.HavIgG_Value_past && errors.HavIgG_Value_past)}
                                                                                          />
                                                                                          <FormHelperText error id="HavIgG_Value_past-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.HavIgG_Value_past && errors.HavIgG_Value_past}
                                                                                          </FormHelperText>
                                                                                    </FormControl> <FormControl fullWidth><Select
                                                                                          disabled
                                                                                          className={values.HavIgG_Status_past_redstar === null ? null : 'red'}
                                                                                          error={Boolean(touched.HavIgG_Status_past && errors.HavIgG_Status_past)}
                                                                                          {...getFieldProps('HavIgG_Status_past')}
                                                                                          style={{ textAlign: 'left' }}
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
                                                                              </TableCell>
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">F-T4</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          placeholder="[NATD]"
                                                                                          className={values.RFFT4_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('RFFT4_current')}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.RFFT4_unit}</Typography></InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="RFFT4_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.RFFT4_current && errors.RFFT4_current}
                                                                                    </FormHelperText>

                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                          className={values.RFFT4_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          {...getFieldProps('RFFT4_previous')}
                                                                                          endAdornment={values.test_date_previous != null ? <InputAdornment position="start"><Typography variant="endorment">{values.RFFT4_unit}</Typography></InputAdornment> : null}

                                                                                    />

                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                          disabled
                                                                                          className={values.RFFT4_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('RFFT4_past')}
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
                                                                                                placeholder="[NATD]"
                                                                                                className={values.EBV_Value_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                                {...getFieldProps('EBV_Value_current')}
                                                                                                error={Boolean(touched.EBV_Value_current && errors.EBV_Value_current)}
                                                                                          />
                                                                                          <FormHelperText error id="EBV_Value_current-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.EBV_Value_current && errors.EBV_Value_current}
                                                                                          </FormHelperText>
                                                                                    </FormControl> <FormControl fullWidth>
                                                                                          <Select
                                                                                                className={values.EBV_Status_current_redstar === null ? null : 'red'}
                                                                                                error={Boolean(touched.EBV_Status_current && errors.EBV_Status_current)}
                                                                                                {...getFieldProps('EBV_Status_current')}
                                                                                                style={{ textAlign: 'left' }}
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
                                                                              </TableCell>
                                                                              <TableCell sx={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8, background: "#F9F9F9" }}>
                                                                                    <FormControl fullWidth>
                                                                                          <InputBase
                                                                                                placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                                disabled
                                                                                                className={values.EBV_Value_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                                {...getFieldProps('EBV_Value_previous')}

                                                                                                error={Boolean(touched.EBV_Value_previous && errors.EBV_Value_previous)}
                                                                                          />
                                                                                          <FormHelperText error id="EBV_Value_previous-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.EBV_Value_previous && errors.EBV_Value_previous}
                                                                                          </FormHelperText>
                                                                                    </FormControl> <FormControl fullWidth>
                                                                                          <Select
                                                                                                disabled
                                                                                                className={values.EBV_Status_previous_redstar === null ? null : 'red'}
                                                                                                error={Boolean(touched.EBV_Status_previous && errors.EBV_Status_previous)}
                                                                                                {...getFieldProps('EBV_Status_previous')}
                                                                                                style={{ textAlign: 'left' }}
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
                                                                              </TableCell>
                                                                              <TableCell sx={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8, background: "#F9F9F9" }}>
                                                                                    <FormControl fullWidth>
                                                                                          <InputBase
                                                                                                placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                                disabled
                                                                                                className={values.EBV_Value_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                                {...getFieldProps('EBV_Value_past')}

                                                                                                error={Boolean(touched.EBV_Value_past && errors.EBV_Value_past)}
                                                                                          />
                                                                                          <FormHelperText error id="EBV_Value_past-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.EBV_Value_past && errors.EBV_Value_past}
                                                                                          </FormHelperText>
                                                                                    </FormControl> <FormControl fullWidth>
                                                                                          <Select
                                                                                                disabled
                                                                                                className={values.EBV_Status_past_redstar === null ? null : 'red'}
                                                                                                error={Boolean(touched.EBV_Status_past && errors.EBV_Status_past)}
                                                                                                {...getFieldProps('EBV_Status_past')}
                                                                                                style={{ textAlign: 'left' }}
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
                                                                              </TableCell>
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">a-FP</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          placeholder="[NATD]"
                                                                                          className={values.YFPLevel_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('YFPLevel_current')}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.YFPLevel_unit}</Typography></InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="YFPLevel_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.YFPLevel_current && errors.YFPLevel_current}
                                                                                    </FormHelperText>

                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                          className={values.YFPLevel_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          {...getFieldProps('YFPLevel_previous')}
                                                                                          endAdornment={values.test_date_previous != null ? <InputAdornment position="start"><Typography variant="endorment">{values.YFPLevel_unit}</Typography></InputAdornment> : null}

                                                                                    />

                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                          disabled
                                                                                          className={values.YFPLevel_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('YFPLevel_past')}
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
                                                                                          setSubmitAction("immunologyConfirm");
                                                                                          handleSubmit();
                                                                                    }}
                                                                              >
                                                                                    Confirm
                                                                              </Button></TableCell>
                                                                              <TableCell sx={{ background: "#FFFFFF !important" }}>
                                                                                    {values.immunology_release_staff !== null && values.immunology_confirm_staff === null && <Button
                                                                                          size="large"
                                                                                          type="button"
                                                                                          variant="contained"
                                                                                          onClick={() => {
                                                                                                setSubmitAction("immunologyRelease");
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
                                                                                          placeholder="[NATD]"
                                                                                          className={values.CEALevel_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('CEALevel_current')}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.CEALevel_unit}</Typography></InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="CEALevel_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.CEALevel_current && errors.CEALevel_current}
                                                                                    </FormHelperText>

                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                          className={values.CEALevel_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          {...getFieldProps('CEALevel_previous')}
                                                                                          endAdornment={values.test_date_previous != null ? <InputAdornment position="start"><Typography variant="endorment">{values.CEALevel_unit}</Typography></InputAdornment> : null}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                          disabled
                                                                                          className={values.CEALevel_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('CEALevel_past')}
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
                                                                              <TableCell >
                                                                                    <FormControl fullWidth>
                                                                                          <InputBase
                                                                                                placeholder="[NATD]"
                                                                                                className={values.RANormal_Value_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                                {...getFieldProps('RANormal_Value_current')}

                                                                                                error={Boolean(touched.RANormal_Value_current && errors.RANormal_Value_current)}
                                                                                          />
                                                                                          <FormHelperText error id="RANormal_Value_current-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.RANormal_Value_current && errors.RANormal_Value_current}
                                                                                          </FormHelperText>
                                                                                    </FormControl> <FormControl fullWidth><Select
                                                                                          className={values.RANormal_Status_current_redstar === null ? null : 'red'}
                                                                                          error={Boolean(touched.RANormal_Status_current && errors.RANormal_Status_current)}
                                                                                          {...getFieldProps('RANormal_Status_current')}
                                                                                          style={{ textAlign: 'left' }}
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
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <FormControl fullWidth>
                                                                                          <InputBase
                                                                                                placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                                className={values.RANormal_Value_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                                {...getFieldProps('RANormal_Value_previous')}
                                                                                                disabled
                                                                                                error={Boolean(touched.RANormal_Value_previous && errors.RANormal_Value_previous)}
                                                                                          />
                                                                                          <FormHelperText error id="RANormal_Value_previous-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.RANormal_Value_previous && errors.RANormal_Value_previous}
                                                                                          </FormHelperText>
                                                                                    </FormControl> <FormControl fullWidth><Select
                                                                                          disabled
                                                                                          className={values.RANormal_Status_previous_redstar === null ? null : 'red'}
                                                                                          error={Boolean(touched.RANormal_Status_previous && errors.RANormal_Status_previous)}
                                                                                          {...getFieldProps('RANormal_Status_previous')}
                                                                                          style={{ textAlign: 'left' }}
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
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <FormControl fullWidth>
                                                                                          <InputBase
                                                                                                placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                                className={values.RANormal_Value_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                                {...getFieldProps('RANormal_Value_past')}
                                                                                                disabled
                                                                                                error={Boolean(touched.RANormal_Value_past && errors.RANormal_Value_past)}
                                                                                          />
                                                                                          <FormHelperText error id="RANormal_Value_past-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.RANormal_Value_past && errors.RANormal_Value_past}
                                                                                          </FormHelperText>
                                                                                    </FormControl> <FormControl fullWidth><Select
                                                                                          disabled
                                                                                          className={values.RANormal_Status_past_redstar === null ? null : 'red'}
                                                                                          error={Boolean(touched.RANormal_Status_past && errors.RANormal_Status_past)}
                                                                                          {...getFieldProps('RANormal_Status_past')}
                                                                                          style={{ textAlign: 'left' }}
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
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                className={values.VDRLNormal_current_redstar === null ? null : 'red'}
                                                                                                error={Boolean(touched.VDRLNormal_current && errors.VDRLNormal_current)}
                                                                                                {...getFieldProps('VDRLNormal_current')}
                                                                                                style={{ textAlign: 'left' }}
                                                                                          >
                                                                                                {PosNeg_Option.map((VDRLNormal) => (
                                                                                                      <MenuItem
                                                                                                            value={VDRLNormal.value}
                                                                                                            key={VDRLNormal.value}
                                                                                                      >{VDRLNormal.label}</MenuItem>
                                                                                                )
                                                                                                )}
                                                                                          </Select>
                                                                                    </FormControl>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                disabled
                                                                                                className={values.VDRLNormal_previous_redstar === null ? null : 'red'}
                                                                                                error={Boolean(touched.VDRLNormal_previous && errors.VDRLNormal_previous)}
                                                                                                {...getFieldProps('VDRLNormal_previous')}
                                                                                                style={{ textAlign: 'left' }}
                                                                                          >
                                                                                                {PosNeg_Option.map((VDRLNormal) => (
                                                                                                      <MenuItem
                                                                                                            value={VDRLNormal.value}
                                                                                                            key={VDRLNormal.value}
                                                                                                      >{VDRLNormal.label}</MenuItem>
                                                                                                )
                                                                                                )}
                                                                                          </Select>
                                                                                    </FormControl>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                disabled
                                                                                                className={values.VDRLNormal_past_redstar === null ? null : 'red'}
                                                                                                error={Boolean(touched.VDRLNormal_past && errors.VDRLNormal_past)}
                                                                                                {...getFieldProps('VDRLNormal_past')}
                                                                                                style={{ textAlign: 'left' }}
                                                                                          >
                                                                                                {PosNeg_Option.map((VDRLNormal) => (
                                                                                                      <MenuItem
                                                                                                            value={VDRLNormal.value}
                                                                                                            key={VDRLNormal.value}
                                                                                                      >{VDRLNormal.label}</MenuItem>
                                                                                                )
                                                                                                )}
                                                                                          </Select>
                                                                                    </FormControl>
                                                                              </TableCell>
                                                                        </TableRow><TableRow>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Anti-HCV</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                className={values.CVirus_current_redstar === null ? null : 'red'}
                                                                                                error={Boolean(touched.CVirus_current && errors.CVirus_current)}
                                                                                                {...getFieldProps('CVirus_current')}
                                                                                                style={{ textAlign: 'left' }}
                                                                                          >
                                                                                                {NonReactive_Option.map((CVirus) => (
                                                                                                      <MenuItem
                                                                                                            value={CVirus.value}
                                                                                                            key={CVirus.value}
                                                                                                      >{CVirus.label}</MenuItem>
                                                                                                )
                                                                                                )}
                                                                                          </Select>
                                                                                    </FormControl>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                disabled
                                                                                                className={values.CVirus_previous_redstar === null ? null : 'red'}
                                                                                                error={Boolean(touched.CVirus_previous && errors.CVirus_current)}
                                                                                                {...getFieldProps('CVirus_current')}
                                                                                                style={{ textAlign: 'left' }}
                                                                                          >
                                                                                                {NonReactive_Option.map((CVirus) => (
                                                                                                      <MenuItem
                                                                                                            value={CVirus.value}
                                                                                                            key={CVirus.value}
                                                                                                      >{CVirus.label}</MenuItem>
                                                                                                )
                                                                                                )}
                                                                                          </Select>
                                                                                    </FormControl>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                disabled
                                                                                                className={values.CVirus_past_redstar === null ? null : 'red'}
                                                                                                error={Boolean(touched.CVirus_past && errors.CVirus_past)}
                                                                                                {...getFieldProps('CVirus_past')}
                                                                                                style={{ textAlign: 'left' }}
                                                                                          >
                                                                                                {NonReactive_Option.map((CVirus) => (
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
                                                                        <TableRow>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell> </TableCell>
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">AIDS</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <FormControl fullWidth>
                                                                                          <InputBase
                                                                                                placeholder="[NATD]"
                                                                                                className={values.HIVNormal_Value_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                                {...getFieldProps('HIVNormal_Value_current')}

                                                                                                error={Boolean(touched.HIVNormal_Value_current && errors.HIVNormal_Value_current)}
                                                                                          />
                                                                                          <FormHelperText error id="HIVNormal_Value_current-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.HIVNormal_Value_current && errors.HIVNormal_Value_current}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                className={values.HIVNormal_Status_current_redstar === null ? null : 'red'}
                                                                                                error={Boolean(touched.HIVNormal_Status_current && errors.HIVNormal_Status_current)}
                                                                                                {...getFieldProps('HIVNormal_Status_current')}
                                                                                                style={{ textAlign: 'left' }}
                                                                                          >
                                                                                                {NonReactive_Option.map((HIVNormal) => (
                                                                                                      <MenuItem
                                                                                                            value={HIVNormal.value}
                                                                                                            key={HIVNormal.value}
                                                                                                      >{HIVNormal.label}</MenuItem>
                                                                                                )
                                                                                                )}
                                                                                          </Select>
                                                                                    </FormControl>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <FormControl fullWidth>
                                                                                          <InputBase
                                                                                                placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                                className={values.HIVNormal_Value_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                                {...getFieldProps('HIVNormal_Value_previous')}
                                                                                                disabled
                                                                                                error={Boolean(touched.HIVNormal_Value_previous && errors.HIVNormal_Value_previous)}
                                                                                          />
                                                                                          <FormHelperText error id="HIVNormal_Value_previous-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.HIVNormal_Value_previous && errors.HIVNormal_Value_previous}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                disabled
                                                                                                className={values.HIVNormal_Status_previous_redstar === null ? null : 'red'}
                                                                                                error={Boolean(touched.HIVNormal_Status_previous && errors.HIVNormal_Status_previous)}
                                                                                                {...getFieldProps('HIVNormal_Status_previous')}
                                                                                                style={{ textAlign: 'left' }}
                                                                                          >
                                                                                                {NonReactive_Option.map((HIVNormal) => (
                                                                                                      <MenuItem
                                                                                                            value={HIVNormal.value}
                                                                                                            key={HIVNormal.value}
                                                                                                      >{HIVNormal.label}</MenuItem>
                                                                                                )
                                                                                                )}
                                                                                          </Select>
                                                                                    </FormControl>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <FormControl fullWidth>
                                                                                          <InputBase
                                                                                                placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                                className={values.HIVNormal_Value_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                                {...getFieldProps('HIVNormal_Value_past')}
                                                                                                disabled
                                                                                                error={Boolean(touched.HIVNormal_Value_past && errors.HIVNormal_Value_past)}
                                                                                          />
                                                                                          <FormHelperText error id="HIVNormal_Value_past-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.HIVNormal_Value_past && errors.HIVNormal_Value_past}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                disabled
                                                                                                className={values.HIVNormal_Status_past_redstar === null ? null : 'red'}
                                                                                                error={Boolean(touched.HIVNormal_Status_past && errors.HIVNormal_Status_past)}
                                                                                                {...getFieldProps('HIVNormal_Status_past')}
                                                                                                style={{ textAlign: 'left' }}
                                                                                          >
                                                                                                {NonReactive_Option.map((HIVNormal) => (
                                                                                                      <MenuItem
                                                                                                            value={HIVNormal.value}
                                                                                                            key={HIVNormal.value}
                                                                                                      >{HIVNormal.label}</MenuItem>
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
                                                                                    <Typography variant="label">PSA</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          placeholder="[NATD]"
                                                                                          className='textField'
                                                                                          {...getFieldProps('PSA_current')}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.PSA_unit}</Typography></InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="PSA_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.PSA_current && errors.PSA_current}
                                                                                    </FormHelperText>

                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                          className='textField'
                                                                                          disabled
                                                                                          {...getFieldProps('PSA_previous')}
                                                                                          endAdornment={values.test_date_previous != null ? <InputAdornment position="start"><Typography variant="endorment">{values.PSA_unit}</Typography></InputAdornment> : null}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                          disabled
                                                                                          className='textField'
                                                                                          {...getFieldProps('PSA_past')}
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
                                                                                          placeholder="[NATD]"
                                                                                          className='textField'
                                                                                          {...getFieldProps('CA15_3_current')}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.CA15_3_unit}</Typography></InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="CA15_3_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.CA15_3_current && errors.CA15_3_current}
                                                                                    </FormHelperText>

                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                          className='textField'
                                                                                          disabled
                                                                                          {...getFieldProps('CA15_3_previous')}
                                                                                          endAdornment={values.test_date_previous != null ? <InputAdornment position="start"><Typography variant="endorment">{values.CA15_3_unit}</Typography></InputAdornment> : null}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                          disabled
                                                                                          className='textField'
                                                                                          {...getFieldProps('CA15_3_past')}
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
                                                                                          placeholder="[NATD]"
                                                                                          className='textField'
                                                                                          {...getFieldProps('CA125_current')}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.CA125_unit}</Typography></InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="CA125_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.CA125_current && errors.CA125_current}
                                                                                    </FormHelperText>

                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                          className='textField'
                                                                                          disabled
                                                                                          {...getFieldProps('CA125_previous')}
                                                                                          endAdornment={values.test_date_previous != null ? <InputAdornment position="start"><Typography variant="endorment">{values.CA125_unit}</Typography></InputAdornment> : null}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                          disabled
                                                                                          className='textField'
                                                                                          {...getFieldProps('CA125_past')}
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
                                                                                          placeholder="[NATD]"
                                                                                          className='textField'
                                                                                          {...getFieldProps('CA19_9_current')}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.CA19_9_unit}</Typography></InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="CA19_9_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.CA19_9_current && errors.CA19_9_current}
                                                                                    </FormHelperText>

                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                          className='textField'
                                                                                          disabled
                                                                                          {...getFieldProps('CA19_9_previous')}
                                                                                          endAdornment={values.test_date_previous != null ? <InputAdornment position="start"><Typography variant="endorment">{values.CA19_9_unit}</Typography></InputAdornment> : null}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                          disabled
                                                                                          className='textField'
                                                                                          {...getFieldProps('CA19_9_past')}
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
                                                                                    <InputBase
                                                                                          placeholder="[NATD]"
                                                                                          className={values.Hpyloriab_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('Hpyloriab_current')}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.Hpyloriab_unit}</Typography></InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="Hpyloriab_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.Hpyloriab_current && errors.Hpyloriab_current}
                                                                                    </FormHelperText>

                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                          className={values.Hpyloriab_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          {...getFieldProps('Hpyloriab_previous')}
                                                                                          endAdornment={values.test_date_previous != null ? <InputAdornment position="start"><Typography variant="endorment">{values.Hpyloriab_unit}</Typography></InputAdornment> : null}

                                                                                    />

                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                          disabled
                                                                                          className={values.Hpyloriab_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('Hpyloriab_past')}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.Hpyloriab_unit}</Typography></InputAdornment> : null}

                                                                                    />

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
                                                                              <TableCell sx={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                                                                                    <InputBase
                                                                                          placeholder="[NATD]"
                                                                                          className={values.Homocy_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('Homocy_current')}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.Homocy_unit}</Typography></InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="Homocy_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.Homocy_current && errors.Homocy_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell sx={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                          className={values.Homocy_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          {...getFieldProps('Homocy_previous')}
                                                                                          endAdornment={values.test_date_previous != null ? <InputAdornment position="start"><Typography variant="endorment">{values.Homocy_unit}</Typography></InputAdornment> : null}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell sx={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                          disabled
                                                                                          className={values.Homocy_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('Homocy_past')}
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
                                                                                          placeholder="[NATD]"
                                                                                          className={values.Glucose_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('Glucose_current')}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.Glucose_unit}</Typography></InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="Glucose_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.Glucose_current && errors.Glucose_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                          className={values.Glucose_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          {...getFieldProps('Glucose_previous')}
                                                                                          endAdornment={values.test_date_previous != null ? <InputAdornment position="start"><Typography variant="endorment">{values.Glucose_unit}</Typography></InputAdornment> : null}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                          disabled
                                                                                          className={values.Glucose_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('Glucose_past')}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.Glucose_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Uric Acid</Typography>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder="[NATD]"
                                                                                          className={values.UFUA_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('UFUA_current')}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.UFUA_unit}</Typography></InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="UFUA_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.UFUA_current && errors.UFUA_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                          className={values.UFUA_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          {...getFieldProps('UFUA_previous')}
                                                                                          endAdornment={values.test_date_previous != null ? <InputAdornment position="start"><Typography variant="endorment">{values.UFUA_unit}</Typography></InputAdornment> : null}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                          disabled
                                                                                          className={values.UFUA_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('UFUA_past')}
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
                                                                                          placeholder="[NATD]"
                                                                                          className={values.HbA1c_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('HbA1c_current')}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.HbA1c_unit}</Typography></InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="HbA1c_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.HbA1c_current && errors.HbA1c_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                          className={values.HbA1c_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          {...getFieldProps('HbA1c_previous')}
                                                                                          endAdornment={values.test_date_previous != null ? <InputAdornment position="start"><Typography variant="endorment">{values.HbA1c_unit}</Typography></InputAdornment> : null}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                          disabled
                                                                                          className={values.HbA1c_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('HbA1c_past')}
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
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder="[NATD]"
                                                                                          className={values.BGTG_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('BGTG_current')}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.BGTG_unit}</Typography></InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="BGTG_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.BGTG_current && errors.BGTG_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                          className={values.BGTG_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          {...getFieldProps('BGTG_previous')}
                                                                                          endAdornment={values.test_date_previous != null ? <InputAdornment position="start"><Typography variant="endorment">{values.BGTG_unit}</Typography></InputAdornment> : null}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                          disabled
                                                                                          className={values.BGTG_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('BGTG_past')}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.BGTG_unit}</Typography></InputAdornment> : null}

                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Total Bilirubin</Typography>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder="[NATD]"
                                                                                          className={values.TFTBIL_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('TFTBIL_current')}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.TFTBIL_unit}</Typography></InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="TFTBIL_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.TFTBIL_current && errors.TFTBIL_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                          className={values.TFTBIL_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          {...getFieldProps('TFTBIL_previous')}
                                                                                          endAdornment={values.test_date_previous != null ? <InputAdornment position="start"><Typography variant="endorment">{values.TFTBIL_unit}</Typography></InputAdornment> : null}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                          disabled
                                                                                          className={values.TFTBIL_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('TFTBIL_past')}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.TFTBIL_unit}</Typography></InputAdornment> : null}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Cholesterol</Typography>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder="[NATD]"
                                                                                          className={values.BGCHOL_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('BGCHOL_current')}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.BGCHOL_unit}</Typography></InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="BGCHOL_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.BGCHOL_current && errors.BGCHOL_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                          className={values.BGCHOL_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          {...getFieldProps('BGCHOL_previous')}
                                                                                          endAdornment={values.test_date_previous != null ? <InputAdornment position="start"><Typography variant="endorment">{values.BGCHOL_unit}</Typography></InputAdornment> : null}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                          disabled
                                                                                          className={values.BGCHOL_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('BGCHOL_past')}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.BGCHOL_unit}</Typography></InputAdornment> : null}

                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Total Protein</Typography>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder="[NATD]"
                                                                                          className={values.TFTP_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('TFTP_current')}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.TFTP_unit}</Typography></InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="TFTP_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.TFTP_current && errors.TFTP_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                          className={values.TFTP_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          {...getFieldProps('TFTP_previous')}
                                                                                          endAdornment={values.test_date_previous != null ? <InputAdornment position="start"><Typography variant="endorment">{values.TFTP_unit}</Typography></InputAdornment> : null}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                          disabled
                                                                                          className={values.TFTP_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('TFTP_past')}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.TFTP_unit}</Typography></InputAdornment> : null}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">HDL-Cholesterol</Typography>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder="[NATD]"
                                                                                          className={values.BGHDLC_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('BGHDLC_current')}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.BGHDLC_unit}</Typography></InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="BGHDLC_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.BGHDLC_current && errors.BGHDLC_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                          className={values.BGHDLC_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          {...getFieldProps('BGHDLC_previous')}
                                                                                          endAdornment={values.test_date_previous != null ? <InputAdornment position="start"><Typography variant="endorment">{values.BGHDLC_unit}</Typography></InputAdornment> : null}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                          disabled
                                                                                          className={values.BGHDLC_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('BGHDLC_past')}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.BGHDLC_unit}</Typography></InputAdornment> : null}

                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Albumin</Typography>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder="[NATD]"
                                                                                          className={values.TFALB_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('TFALB_current')}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.TFALB_unit}</Typography></InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="TFALB_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.TFALB_current && errors.TFALB_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                          className={values.TFALB_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          {...getFieldProps('TFALB_previous')}
                                                                                          endAdornment={values.test_date_previous != null ? <InputAdornment position="start"><Typography variant="endorment">{values.TFALB_unit}</Typography></InputAdornment> : null}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                          disabled
                                                                                          className={values.TFALB_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('TFALB_past')}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.TFALB_unit}</Typography></InputAdornment> : null}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">LDL-Cholesterol</Typography>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder="[NATD]"
                                                                                          className={values.BGLDLC_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('BGLDLC_current')}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.BGLDLC_unit}</Typography></InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="BGLDLC_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.BGLDLC_current && errors.BGLDLC_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                          className={values.BGLDLC_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          {...getFieldProps('BGLDLC_previous')}
                                                                                          endAdornment={values.test_date_previous != null ? <InputAdornment position="start"><Typography variant="endorment">{values.BGLDLC_unit}</Typography></InputAdornment> : null}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                          disabled
                                                                                          className={values.BGLDLC_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('BGLDLC_past')}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.BGLDLC_unit}</Typography></InputAdornment> : null}

                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Globulin</Typography>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder="[NATD]"
                                                                                          className={values.TFGLO_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('TFGLO_current')}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.TFGLO_unit}</Typography></InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="TFGLO_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.TFGLO_current && errors.TFGLO_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                          className={values.TFGLO_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          {...getFieldProps('TFGLO_previous')}
                                                                                          endAdornment={values.test_date_previous != null ? <InputAdornment position="start"><Typography variant="endorment">{values.TFGLO_unit}</Typography></InputAdornment> : null}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                          disabled
                                                                                          className={values.TFGLO_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('TFGLO_past')}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.TFGLO_unit}</Typography></InputAdornment> : null}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">CHOL/HDL-C</Typography>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder="[NATD]"
                                                                                          className={values.BGCH_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('BGCH_current')}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.BGCH_unit}</Typography></InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="BGCH_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.BGCH_current && errors.BGCH_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                          className={values.BGCH_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          {...getFieldProps('BGCH_previous')}
                                                                                          endAdornment={values.test_date_previous != null ? <InputAdornment position="start"><Typography variant="endorment">{values.BGCH_unit}</Typography></InputAdornment> : null}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                          disabled
                                                                                          className={values.BGCH_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('BGCH_past')}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.BGCH_unit}</Typography></InputAdornment> : null}

                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Alkaline Phosphatase</Typography>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder="[NATD]"
                                                                                          className={values.TFALP_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('TFALP_current')}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.TFALP_unit}</Typography></InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="TFALP_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.TFALP_current && errors.TFALP_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                          className={values.TFALP_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          {...getFieldProps('TFALP_previous')}
                                                                                          endAdornment={values.test_date_previous != null ? <InputAdornment position="start"><Typography variant="endorment">{values.TFALP_unit}</Typography></InputAdornment> : null}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                          disabled
                                                                                          className={values.TFALP_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('TFALP_past')}
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
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder="[NATD]"
                                                                                          className={values.TFsGOT_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('TFsGOT_current')}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.TFsGOT_unit}</Typography></InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="TFsGOT_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.TFsGOT_current && errors.TFsGOT_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                          className={values.TFsGOT_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          {...getFieldProps('TFsGOT_previous')}
                                                                                          endAdornment={values.test_date_previous != null ? <InputAdornment position="start"><Typography variant="endorment">{values.TFsGOT_unit}</Typography></InputAdornment> : null}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                          disabled
                                                                                          className={values.TFsGOT_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('TFsGOT_past')}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.TFsGOT_unit}</Typography></InputAdornment> : null}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Ca</Typography>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder="[NATD]"
                                                                                          className={values.EFCA_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('EFCA_current')}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.EFCA_unit}</Typography></InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="EFCA_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.EFCA_current && errors.EFCA_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                          className={values.EFCA_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          {...getFieldProps('EFCA_previous')}
                                                                                          endAdornment={values.test_date_previous != null ? <InputAdornment position="start"><Typography variant="endorment">{values.EFCA_unit}</Typography></InputAdornment> : null}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                          disabled
                                                                                          className={values.EFCA_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('EFCA_past')}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.EFCA_unit}</Typography></InputAdornment> : null}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">sGPT (ALT)</Typography>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder="[NATD]"
                                                                                          className={values.TFsGPT_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('TFsGPT_current')}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.TFsGPT_unit}</Typography></InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="TFsGPT_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.TFsGPT_current && errors.TFsGPT_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                          className={values.TFsGPT_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          {...getFieldProps('TFsGPT_previous')}
                                                                                          endAdornment={values.test_date_previous != null ? <InputAdornment position="start"><Typography variant="endorment">{values.TFsGPT_unit}</Typography></InputAdornment> : null}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                          disabled
                                                                                          className={values.TFsGPT_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('TFsGPT_past')}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.TFsGPT_unit}</Typography></InputAdornment> : null}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">P</Typography>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder="[NATD]"
                                                                                          className={values.EFP_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('EFP_current')}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.EFP_unit}</Typography></InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="EFP_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.EFP_current && errors.EFP_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                          className={values.EFP_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          {...getFieldProps('EFP_previous')}
                                                                                          endAdornment={values.test_date_previous != null ? <InputAdornment position="start"><Typography variant="endorment">{values.EFP_unit}</Typography></InputAdornment> : null}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                          disabled
                                                                                          className={values.EFP_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('EFP_past')}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.EFP_unit}</Typography></InputAdornment> : null}

                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">r-GT (GGT)</Typography>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder="[NATD]"
                                                                                          className={values.TFYGT_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('TFYGT_current')}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.TFYGT_unit}</Typography></InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="TFYGT_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.TFYGT_current && errors.TFYGT_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                          className={values.TFYGT_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          {...getFieldProps('TFYGT_previous')}
                                                                                          endAdornment={values.test_date_previous != null ? <InputAdornment position="start"><Typography variant="endorment">{values.TFYGT_unit}</Typography></InputAdornment> : null}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                          disabled
                                                                                          className={values.TFYGT_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('TFYGT_past')}
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
                                                                                    <Typography variant="label">HS_CRP</Typography>
                                                                              </TableCell>
                                                                              <TableCell sx={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                                                                                    <InputBase
                                                                                          placeholder="[NATD]"
                                                                                          className={values.hs_CRP_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('hs_CRP_current')}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.hs_CRP_unit}</Typography></InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="hs_CRP_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.hs_CRP_current && errors.hs_CRP_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                          className={values.hs_CRP_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          {...getFieldProps('hs_CRP_previous')}
                                                                                          endAdornment={values.test_date_previous != null ? <InputAdornment position="start"><Typography variant="endorment">{values.hs_CRP_unit}</Typography></InputAdornment> : null}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                          disabled
                                                                                          className={values.hs_CRP_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('hs_CRP_past')}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.hs_CRP_unit}</Typography></InputAdornment> : null}

                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>

                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">BUN(Urea)</Typography>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder="[NATD]"
                                                                                          className={values.UFBUN_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('UFBUN_current')}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.UFBUN_unit}</Typography></InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="UFBUN_current_redstar-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.UFBUN_current_redstar && errors.UFBUN_current_redstar}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                          className={values.UFBUN_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          {...getFieldProps('UFBUN_previous')}
                                                                                          endAdornment={values.test_date_previous != null ? <InputAdornment position="start"><Typography variant="endorment">{values.UFBUN_unit}</Typography></InputAdornment> : null}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                          disabled
                                                                                          className={values.UFBUN_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('UFBUN_past')}
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
                                                                                          placeholder="[NATD]"
                                                                                          className={values.UFCRE_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('UFCRE_current')}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.UFCRE_unit}</Typography></InputAdornment>}
                                                                                    />
                                                                                    <FormHelperText error id="UFCRE_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.UFCRE_current && errors.UFCRE_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                          className={values.UFCRE_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          {...getFieldProps('UFCRE_previous')}
                                                                                          endAdornment={values.test_date_previous != null ? <InputAdornment position="start"><Typography variant="endorment">{values.UFCRE_unit}</Typography></InputAdornment> : null}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                          disabled
                                                                                          className={values.UFCRE_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('UFBUN_past')}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.UFBUN_unit}</Typography></InputAdornment> : null}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell sx={{ background: "#FFFFFF !important" }}> </TableCell>
                                                                              <TableCell sx={{ background: "#FFFFFF !important" }}> <Button
                                                                                    size="large"
                                                                                    type="button"
                                                                                    variant="contained"
                                                                                    onClick={() => {
                                                                                          setSubmitAction("biochemistryConfirm");
                                                                                          handleSubmit();
                                                                                    }}
                                                                              >
                                                                                    Confirm
                                                                              </Button></TableCell>
                                                                              <TableCell sx={{ background: "#FFFFFF !important" }}>
                                                                                    {values.biochemistry_release_staff !== null && values.biochemistry_confirm_staff === null && <Button
                                                                                          size="large"
                                                                                          type="button"
                                                                                          variant="contained"
                                                                                          onClick={() => {
                                                                                                setSubmitAction("biochemistryRelease");
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
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder="[NATD]"
                                                                                          className={values.Sodium_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('Sodium_current')}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.Sodium_unit}</Typography></InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="Sodium_current_redstar-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.Sodium_current_redstar && errors.Sodium_current_redstar}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                          className={values.Sodium_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          {...getFieldProps('Sodium_previous')}
                                                                                          endAdornment={values.test_date_previous != null ? <InputAdornment position="start"><Typography variant="endorment">{values.Sodium_unit}</Typography></InputAdornment> : null}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                          disabled
                                                                                          className={values.Sodium_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('Sodium_past')}
                                                                                          endAdornment={values.test_date_past !== null ? <InputAdornment position="start"><Typography variant="endorment">{values.Sodium_unit}</Typography></InputAdornment> : null}

                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Potassium</Typography>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder="[NATD]"
                                                                                          className={values.Potassium_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('Potassium_current')}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.Potassium_unit}</Typography></InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="Potassium_current_redstar-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.Potassium_current_redstar && errors.Potassium_current_redstar}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                          className={values.Potassium_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          {...getFieldProps('Potassium_previous')}
                                                                                          endAdornment={values.test_date_previous != null ? <InputAdornment position="start"><Typography variant="endorment">{values.Potassium_unit}</Typography></InputAdornment> : null}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                          disabled
                                                                                          className={values.Potassium_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('Potassium_past')}
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
                                                                                          placeholder="[NATD]"
                                                                                          className={values.Chloride_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('Chloride_current')}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.Chloride_unit}</Typography></InputAdornment>}

                                                                                    />
                                                                                    <FormHelperText error id="Chloride_current_redstar-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.Chloride_current_redstar && errors.Chloride_current_redstar}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell sx={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                          className={values.Chloride_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          {...getFieldProps('Chloride_previous')}
                                                                                          endAdornment={values.test_date_previous != null ? <InputAdornment position="start"><Typography variant="endorment">{values.Chloride_unit}</Typography></InputAdornment> : null}

                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell sx={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                          disabled
                                                                                          className={values.Chloride_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('Chloride_past')}
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
                                                      {values.urine_confirm_staff !== null && <Typography sx={{ fontSize: 12 }}>{values.urine_confirm_staff} updated at {values.urine_confirm_date}</Typography>}
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
                                                                              <TableCell>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                className={values.URLook_current_redstar === null ? null : 'red'}
                                                                                                error={Boolean(touched.URLook_current && errors.URLook_current)}
                                                                                                {...getFieldProps('URLook_current')}
                                                                                                style={{ textAlign: 'left' }}
                                                                                          >
                                                                                                {URLook_Option.map((URLook) => (
                                                                                                      <MenuItem
                                                                                                            value={URLook.value}
                                                                                                            key={URLook.value}
                                                                                                            color={URLook.color}
                                                                                                      >{URLook.label}</MenuItem>
                                                                                                )
                                                                                                )}
                                                                                          </Select>
                                                                                          <FormHelperText error id="URLook_current-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.URLook_current && errors.URLook_current}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                disabled
                                                                                                className={values.URLook_previous_redstar === null ? null : 'red'}
                                                                                                error={Boolean(touched.URLook_previous && errors.URLook_previous)}
                                                                                                {...getFieldProps('URLook_previous')}
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
                                                                                          <FormHelperText error id="URLook_previous-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.URLook_previous && errors.URLook_previous}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                disabled
                                                                                                className={values.URLook_past_redstar === null ? null : 'red'}
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
                                                                                          <FormHelperText error id="URLook_past-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.URLook_past && errors.URLook_past}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                              </TableCell>
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">RBC</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          sx={{ width: "50%" }}
                                                                                          className='textField'
                                                                                          {...getFieldProps('UBRBC1_current')}
                                                                                          placeholder="[NIL]"
                                                                                    />
                                                                                    <InputBase
                                                                                          sx={{ width: "50%" }}
                                                                                          className='textField'
                                                                                          {...getFieldProps('UBRBC2_current')}
                                                                                          placeholder="[NIL]"
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          disabled
                                                                                          sx={{ width: "50%" }}
                                                                                          className='textField'
                                                                                          {...getFieldProps('UBRBC1_previous')}
                                                                                          placeholder="[NIL]"
                                                                                    />
                                                                                    <InputBase
                                                                                          disabled
                                                                                          sx={{ width: "50%" }}
                                                                                          className='textField'
                                                                                          {...getFieldProps('UBRBC2_previous')}
                                                                                          placeholder="[NIL]"
                                                                                    />
                                                                              </TableCell>

                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          disabled
                                                                                          sx={{ width: "50%" }}
                                                                                          className='textField'
                                                                                          {...getFieldProps('UBRBC1_past')}
                                                                                          placeholder="[NIL]"
                                                                                    />
                                                                                    <InputBase
                                                                                          disabled
                                                                                          sx={{ width: "50%" }}
                                                                                          className='textField'
                                                                                          {...getFieldProps('UBRBC2_past')}
                                                                                          placeholder="[NIL]"
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Protein</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                className={values.UREW_current_redstar === null ? null : 'red'}
                                                                                                error={Boolean(touched.UREW_current && errors.UREW_current)}
                                                                                                {...getFieldProps('UREW_current')}
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
                                                                                          <FormHelperText error id="UREW_current-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.UREW_current && errors.UREW_current}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                disabled
                                                                                                className={values.UREW_previous_redstar === null ? null : 'red'}
                                                                                                error={Boolean(touched.UREW_previous && errors.UREW_previous)}
                                                                                                {...getFieldProps('UREW_previous')}
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
                                                                                          <FormHelperText error id="UREW_previous-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.UREW_previous && errors.UREW_previous}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                disabled
                                                                                                className={values.UREW_past_redstar === null ? null : 'red'}
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
                                                                                          <FormHelperText error id="UREW_past-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.UREW_past && errors.UREW_past}
                                                                                          </FormHelperText>
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
                                                                                          placeholder="[NIL]"
                                                                                    />
                                                                                    <InputBase
                                                                                          sx={{ width: "50%" }}
                                                                                          className={values.UBWBC2_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('UBWBC2_current')}
                                                                                          placeholder="[NIL]"
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          disabled
                                                                                          sx={{ width: "50%" }}
                                                                                          className={values.UBWBC1_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('UBWBC1_previous')}
                                                                                          placeholder="[NIL]"
                                                                                    />
                                                                                    <InputBase
                                                                                          disabled
                                                                                          sx={{ width: "50%" }}
                                                                                          className={values.UBWBC2_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('UBWBC2_previous')}
                                                                                          placeholder="[NIL]"
                                                                                    />
                                                                              </TableCell>

                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          disabled
                                                                                          sx={{ width: "50%" }}
                                                                                          className={values.UBWBC1_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('UBWBC1_past')}
                                                                                          placeholder="[NIL]"
                                                                                    />
                                                                                    <InputBase
                                                                                          disabled
                                                                                          sx={{ width: "50%" }}
                                                                                          className={values.UBWBC2_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('UBWBC2_past')}
                                                                                          placeholder="[NIL]"
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Glucose</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                className={values.URS_current_redstar === null ? null : 'red'}
                                                                                                error={Boolean(touched.URS_current && errors.URS_current)}
                                                                                                {...getFieldProps('URS_current')}
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
                                                                                          <FormHelperText error id="URS_current-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.URS_current && errors.URS_current}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                disabled
                                                                                                className={values.URS_previous_redstar === null ? null : 'red'}
                                                                                                error={Boolean(touched.URS_previous && errors.URS_previous)}
                                                                                                {...getFieldProps('URS_previous')}
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
                                                                                          <FormHelperText error id="URS_previous-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.URS_previous && errors.URS_previous}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                disabled
                                                                                                className={values.URS_past_redstar === null ? null : 'red'}
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
                                                                                          <FormHelperText error id="URS_past-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.URS_past && errors.URS_past}
                                                                                          </FormHelperText>
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
                                                                                          placeholder="[NIL]"
                                                                                    />
                                                                                    <InputBase
                                                                                          sx={{ width: "50%" }}
                                                                                          className={values.UBEPlit2_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('UBEPlit2_current')}
                                                                                          placeholder="[NIL]"
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          disabled
                                                                                          sx={{ width: "50%" }}
                                                                                          className={values.UBEPlit1_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('UBEPlit1_previous')}
                                                                                          placeholder="[NIL]"
                                                                                    />
                                                                                    <InputBase
                                                                                          disabled
                                                                                          sx={{ width: "50%" }}
                                                                                          className={values.UBEPlit2_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('UBEPlit2_previous')}
                                                                                          placeholder="[NIL]"
                                                                                    />
                                                                              </TableCell>

                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          disabled
                                                                                          sx={{ width: "50%" }}
                                                                                          className={values.UBEPlit1_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('UBEPlit1_past')}
                                                                                          placeholder="[NIL]"
                                                                                    />
                                                                                    <InputBase
                                                                                          disabled
                                                                                          sx={{ width: "50%" }}
                                                                                          className={values.UBEPlit2_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('UBEPlit2_past')}
                                                                                          placeholder="[NIL]"
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Bilirubin</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                className={values.URBR_current_redstar === null ? null : 'red'}
                                                                                                error={Boolean(touched.URBR_current && errors.URBR_current)}
                                                                                                {...getFieldProps('URBR_current')}
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
                                                                                          <FormHelperText error id="URBR_current-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.URBR_current && errors.URBR_current}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                disabled
                                                                                                className={values.URBR_previous_redstar === null ? null : 'red'}
                                                                                                error={Boolean(touched.URBR_previous && errors.URBR_previous)}
                                                                                                {...getFieldProps('URBR_previous')}
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
                                                                                          <FormHelperText error id="URBR_previous-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.URBR_previous && errors.URBR_previous}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                disabled
                                                                                                className={values.URBR_past_redstar === null ? null : 'red'}
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
                                                                                          <FormHelperText error id="URBR_past-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.URBR_past && errors.URBR_past}
                                                                                          </FormHelperText>
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
                                                                                          placeholder="[NIL]"
                                                                                    />
                                                                                    <InputBase
                                                                                          sx={{ width: "50%" }}
                                                                                          className={values.Cast2_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('Cast2_current')}
                                                                                          placeholder="[NIL]"
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          disabled
                                                                                          sx={{ width: "50%" }}
                                                                                          className={values.Cast1_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('Cast1_previous')}
                                                                                          placeholder="[NIL]"
                                                                                    />
                                                                                    <InputBase
                                                                                          disabled
                                                                                          sx={{ width: "50%" }}
                                                                                          className={values.Cast2_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('Cast2_previous')}
                                                                                          placeholder="[NIL]"
                                                                                    />
                                                                              </TableCell>

                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          disabled
                                                                                          sx={{ width: "50%" }}
                                                                                          className={values.Cast1_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('Cast1_past')}
                                                                                          placeholder="[NIL]"
                                                                                    />
                                                                                    <InputBase
                                                                                          disabled
                                                                                          sx={{ width: "50%" }}
                                                                                          className={values.Cast2_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('Cast2_past')}
                                                                                          placeholder="[NIL]"
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Urobilinogen</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                className={values.URUBR_current_redstar === null ? null : 'red'}
                                                                                                error={Boolean(touched.URUBR_current && errors.URUBR_current)}
                                                                                                {...getFieldProps('URUBR_current')}
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
                                                                                          <FormHelperText error id="URUBR_current-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.URUBR_current && errors.URUBR_current}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                disabled
                                                                                                className={values.URUBR_previous_redstar === null ? null : 'red'}
                                                                                                error={Boolean(touched.URUBR_previous && errors.URUBR_previous)}
                                                                                                {...getFieldProps('URUBR_previous')}
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
                                                                                          <FormHelperText error id="URUBR_previous-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.URUBR_previous && errors.URUBR_previous}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                disabled
                                                                                                className={values.URUBR_past_redstar === null ? null : 'red'}
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
                                                                                          <FormHelperText error id="URUBR_past-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.URUBR_past && errors.URUBR_past}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                              </TableCell>
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Bacteria</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                className={values.Bacter_current_redstar === null ? null : 'red'}
                                                                                                error={Boolean(touched.Bacter_current && errors.Bacter_current)}
                                                                                                {...getFieldProps('Bacter_current')}
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
                                                                                          <FormHelperText error id="Bacter_current-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.Bacter_current && errors.Bacter_current}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                disabled
                                                                                                className={values.Bacter_previous_redstar === null ? null : 'red'}
                                                                                                error={Boolean(touched.Bacter_previous && errors.Bacter_previous)}
                                                                                                {...getFieldProps('Bacter_previous')}
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
                                                                                          <FormHelperText error id="Bacter_previous-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.Bacter_previous && errors.Bacter_previous}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                disabled
                                                                                                className={values.Bacter_past_redstar === null ? null : 'red'}
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
                                                                                          <FormHelperText error id="Bacter_past-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.Bacter_past && errors.Bacter_past}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Occult Blood</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                className={values.UBBH_current_redstar === null ? null : 'red'}
                                                                                                error={Boolean(touched.UBBH_current && errors.UBBH_current)}
                                                                                                {...getFieldProps('UBBH_current')}
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
                                                                                          <FormHelperText error id="UBBH_current-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.UBBH_current && errors.UBBH_current}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                disabled
                                                                                                className={values.UBBH_previous_redstar === null ? null : 'red'}
                                                                                                error={Boolean(touched.UBBH_previous && errors.UBBH_previous)}
                                                                                                {...getFieldProps('UBBH_previous')}
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
                                                                                          <FormHelperText error id="UBBH_previous-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.UBBH_previous && errors.UBBH_previous}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                disabled
                                                                                                className={values.UBBH_past_redstar === null ? null : 'red'}
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
                                                                                          <FormHelperText error id="UBBH_past-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.UBBH_past && errors.UBBH_past}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                              </TableCell>
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Other</Typography>
                                                                              </TableCell>
                                                                              <TableCell sx={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                multiple
                                                                                                className={values.UBOther_current_redstar === null ? null : 'red'}
                                                                                                error={Boolean(touched.UBOther_current && errors.UBOther_current)}
                                                                                                //  {...getFieldProps('UBOther_current')}
                                                                                                value={formik.values.UBOther_current}
                                                                                                onChange={handleChange}
                                                                                                style={{ textAlign: 'left' }}
                                                                                          >
                                                                                                {UBOther_Comment.map((UBOther) => (
                                                                                                      <MenuItem
                                                                                                            value={UBOther.comment_no}
                                                                                                            key={UBOther.comment_no}
                                                                                                      >{UBOther.eng}</MenuItem>
                                                                                                )
                                                                                                )}
                                                                                          </Select>
                                                                                          <FormHelperText error id="UBOther_current-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.UBOther_current && errors.UBOther_current}
                                                                                          </FormHelperText>
                                                                                    </FormControl>

                                                                              </TableCell>
                                                                              <TableCell sx={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                                                                                    <InputBase
                                                                                          placeholder="[NATD]"
                                                                                          disabled
                                                                                          className='textField'
                                                                                          {...getFieldProps('UBOther_previous')}
                                                                                    />

                                                                              </TableCell>
                                                                              <TableCell sx={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                          disabled
                                                                                          className='textField'
                                                                                          {...getFieldProps('UBOther_past')}
                                                                                    />

                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Ketone</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                className={values.UBKU_current_redstar === null ? null : 'red'}
                                                                                                error={Boolean(touched.UBKU_current && errors.UBKU_current)}
                                                                                                {...getFieldProps('UBKU_current')}
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
                                                                                          <FormHelperText error id="UBKU_current-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.UBKU_current && errors.UBKU_current}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                disabled
                                                                                                className={values.UBKU_previous_redstar === null ? null : 'red'}
                                                                                                error={Boolean(touched.UBKU_previous && errors.UBKU_previous)}
                                                                                                {...getFieldProps('UBKU_previous')}
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
                                                                                          <FormHelperText error id="UBKU_previous-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.UBKU_previous && errors.UBKU_previous}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                disabled
                                                                                                className={values.UBKU_current_redstar === null ? null : 'red'}
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
                                                                                          <FormHelperText error id="UBKU_past-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.UBKU_past && errors.UBKU_past}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                              </TableCell>
                                                                        </TableRow>

                                                                        <TableRow >
                                                                              <TableCell align="right" >
                                                                                    <Typography variant="label">Nitrite</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                className={values.UBSNO_current_redstar === null ? null : 'red'}
                                                                                                error={Boolean(touched.UBSNO_current && errors.UBSNO_current)}
                                                                                                {...getFieldProps('UBSNO_current')}
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
                                                                                          <FormHelperText error id="UBSNO_current-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.UBSNO_current && errors.UBSNO_current}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                disabled
                                                                                                className={values.UBSNO_previous_redstar === null ? null : 'red'}
                                                                                                error={Boolean(touched.UBSNO_previous && errors.UBSNO_previous)}
                                                                                                {...getFieldProps('UBSNO_previous')}
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
                                                                                          <FormHelperText error id="UBSNO_previous-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.UBSNO_previous && errors.UBSNO_previous}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                disabled
                                                                                                className={values.UBSNO_past_redstar === null ? null : 'red'}
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
                                                                                          <FormHelperText error id="UBSNO_past-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.UBSNO_past && errors.UBSNO_past}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                              </TableCell>
                                                                              <TableCell sx={{ background: "#FFFFFF !important" }}> </TableCell>
                                                                              <TableCell sx={{ background: "#FFFFFF !important" }}> <Button
                                                                                    size="large"
                                                                                    type="button"
                                                                                    variant="contained"
                                                                                    onClick={() => {
                                                                                          setSubmitAction("urineConfirm");
                                                                                          handleSubmit();
                                                                                    }}
                                                                              >
                                                                                    Confirm
                                                                              </Button></TableCell>
                                                                              <TableCell sx={{ background: "#FFFFFF !important" }}>
                                                                                    {values.urine_release_staff !== null && values.urine_confirm_staff === null && <Button
                                                                                          size="large"
                                                                                          type="button"
                                                                                          variant="contained"
                                                                                          onClick={() => {
                                                                                                setSubmitAction("urineRelease");
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
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                className={values.URLEU_current_redstar === null ? null : 'red'}
                                                                                                error={Boolean(touched.URLEU_current && errors.URLEU_current)}
                                                                                                {...getFieldProps('URLEU_current')}
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
                                                                                          <FormHelperText error id="URLEU_current-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.URLEU_current && errors.URLEU_current}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                disabled
                                                                                                className={values.URLEU_previous_redstar === null ? null : 'red'}
                                                                                                error={Boolean(touched.URLEU_previous && errors.URLEU_previous)}
                                                                                                {...getFieldProps('URLEU_previous')}
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
                                                                                          <FormHelperText error id="URLEU_previous-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.URLEU_previous && errors.URLEU_previous}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                disabled
                                                                                                className={values.URLEU_past_redstar === null ? null : 'red'}
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
                                                                                          <FormHelperText error id="URLEU_past-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.URLEU_past && errors.URLEU_past}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right">
                                                                                    <Typography variant="label">Specific Gravity</Typography>
                                                                              </TableCell>
                                                                              <TableCell >
                                                                                    <InputBase
                                                                                          placeholder="[NATD]"
                                                                                          className={values.URDENS_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('URDENS_current')}
                                                                                          error={Boolean(touched.URDENS_current && errors.URDENS_current)}

                                                                                    />
                                                                                    <FormHelperText error id="URDENS_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.URDENS_current && errors.URDENS_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                          className={values.URDENS_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled

                                                                                          {...getFieldProps('URDENS_previous')}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                          className={values.URDENS_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled

                                                                                          {...getFieldProps('URDENS_past')}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow >
                                                                              <TableCell align="right">
                                                                                    <Typography variant="label">PH</Typography>
                                                                              </TableCell>
                                                                              <TableCell sx={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                                                                                    <InputBase
                                                                                          placeholder="[NATD]"
                                                                                          className={values.URTest_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('URTest_current')}
                                                                                          error={Boolean(touched.URTest_current && errors.URTest_current)}

                                                                                    />
                                                                                    <FormHelperText error id="URTest_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.URTest_current && errors.URTest_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell sx={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                          className={values.URTest_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled

                                                                                          {...getFieldProps('URTest_previous')}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell sx={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                          className={values.URTest_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled

                                                                                          {...getFieldProps('URTest_past')}
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
                                                                                          placeholder="[NATD]"
                                                                                          className={values.BloodWBC_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('BloodWBC_current')}
                                                                                          error={Boolean(touched.BloodWBC_current && errors.BloodWBC_current)}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment"><Typography variant="text_adorment">{values.BloodWBC_unit}</Typography></Typography></InputAdornment>}
                                                                                    />
                                                                                    <FormHelperText error id="BloodWBC_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.BloodWBC_current && errors.BloodWBC_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                          className={values.BloodWBC_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          endAdornment={values.test_date_previous != null ? <InputAdornment position="start"><Typography variant="endorment">{values.BloodWBC_unit}</Typography></InputAdornment> : null}
                                                                                          {...getFieldProps('BloodWBC_previous')}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                          className={values.BloodWBC_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          endAdornment={values.test_date_past != null ? <InputAdornment position="start"><Typography variant="endorment">{values.BloodWBC_unit}</Typography></InputAdornment> : null}
                                                                                          {...getFieldProps('BloodWBC_past')}
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
                                                                                          laceholder="[NATD]"
                                                                                          className={values.BloodRBC_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('BloodRBC_current')}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.BloodRBC_unit}</Typography></InputAdornment>}
                                                                                          error={Boolean(touched.BloodRBC_current && errors.BloodRBC_current)}
                                                                                    />
                                                                                    <FormHelperText error id="BloodRBC_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.BloodRBC_current && errors.BloodHB_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                          className={values.BloodRBC_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          endAdornment={values.test_date_previous != null ? <InputAdornment position="start"><Typography variant="endorment">{values.BloodRBC_unit}</Typography></InputAdornment> : null}
                                                                                          {...getFieldProps('BloodRBC_previous')}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                          className={values.BloodRBC_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          endAdornment={values.test_date_past != null ? <InputAdornment position="start"><Typography variant="endorment">{values.BloodRBC_unit}</Typography></InputAdornment> : null}
                                                                                          {...getFieldProps('BloodRBC_past')}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell align="right">
                                                                                    <Typography variant="label">Neutrophils</Typography>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                          className={values.BloodW1_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('BloodW1_current')}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.BloodW1_unit}</Typography></InputAdornment>}
                                                                                          error={Boolean(touched.BloodW1_current && errors.BloodW1_current)}
                                                                                    />
                                                                                    <FormHelperText error id="BloodW1_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.BloodW1_current && errors.BloodW1_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                          className={values.BloodW1_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          endAdornment={values.test_date_previous != null ? <InputAdornment position="start"><Typography variant="endorment">{values.BloodW1_unit}</Typography></InputAdornment> : null}
                                                                                          {...getFieldProps('BloodW1_previous')}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                          className={values.BloodW1_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          endAdornment={values.test_date_past != null ? <InputAdornment position="start"><Typography variant="endorment">{values.BloodW1_unit}</Typography></InputAdornment> : null}
                                                                                          {...getFieldProps('BloodW1_past')}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                              <TableCell align="right">
                                                                                    <Typography variant="label">Hb</Typography>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          laceholder="[NATD]"
                                                                                          className={values.BloodHB_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('BloodHB_current')}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.BloodHB_unit}</Typography></InputAdornment>}
                                                                                          error={Boolean(touched.BloodHB_current && errors.BloodHB_current)}
                                                                                    />
                                                                                    <FormHelperText error id="BloodHB_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.BloodHB_current && errors.BlBloodHB_currentoodHB_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                          className={values.BloodHB_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          endAdornment={values.test_date_previous != null ? <InputAdornment position="start"><Typography variant="endorment">{values.BloodHB_unit}</Typography></InputAdornment> : null}
                                                                                          {...getFieldProps('BloodHB_previous')}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                          className={values.BloodHB_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          endAdornment={values.test_date_past != null ? <InputAdornment position="start"><Typography variant="endorment">{values.BloodHB_unit}</Typography></InputAdornment> : null}
                                                                                          {...getFieldProps('BloodHB_past')}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell align="right">
                                                                                    <Typography variant="label">Lymphocytes</Typography>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          laceholder="[NATD]"
                                                                                          className={values.BloodW2_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('BloodW2_current')}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.BloodW2_unit}</Typography></InputAdornment>}
                                                                                          error={Boolean(touched.BloodW2_current && errors.BloodW2_current)}
                                                                                    />
                                                                                    <FormHelperText error id="BloodW2_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.BloodW2_current && errors.BloodW2_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                          className={values.BloodW2_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          endAdornment={values.test_date_previous != null ? <InputAdornment position="start"><Typography variant="endorment">{values.BloodW2_unit}</Typography></InputAdornment> : null}
                                                                                          {...getFieldProps('BloodW2_previous')}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                          className={values.BloodW2_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          endAdornment={values.test_date_past != null ? <InputAdornment position="start"><Typography variant="endorment">{values.BloodW2_unit}</Typography></InputAdornment> : null}
                                                                                          {...getFieldProps('BloodW2_past')}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                              <TableCell align="right">
                                                                                    <Typography variant="label">Hematocrit</Typography>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder="[NATD]"
                                                                                          className={values.BloodHCT_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('BloodHCT_current')}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.BloodHCT_unit}</Typography></InputAdornment>}
                                                                                          error={Boolean(touched.BloodHCT_current && errors.BloodHCT_current)}
                                                                                    />
                                                                                    <FormHelperText error id="BloodHCT_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.BloodHCT_current && errors.BloodHCT_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                          className={values.BloodHCT_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          endAdornment={values.test_date_previous != null ? <InputAdornment position="start"><Typography variant="endorment">{values.BloodHCT_unit}</Typography></InputAdornment> : null}
                                                                                          {...getFieldProps('BloodHCT_previous')}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                          className={values.BloodHCT_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          endAdornment={values.test_date_past != null ? <InputAdornment position="start"><Typography variant="endorment">{values.BloodHCT_unit}</Typography></InputAdornment> : null}
                                                                                          {...getFieldProps('BloodHCT_past')}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell align="right">
                                                                                    <Typography variant="label">Monocytes</Typography>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder="[NATD]"
                                                                                          className={values.BloodW3_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('BloodW3_current')}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.BloodW3_unit}</Typography></InputAdornment>}
                                                                                          error={Boolean(touched.BloodW3_current && errors.BloodW3_current)}
                                                                                    />
                                                                                    <FormHelperText error id="BloodW3_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.BloodW3_current && errors.BloodW3_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                          className={values.BloodW3_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          endAdornment={values.test_date_previous != null ? <InputAdornment position="start"><Typography variant="endorment">{values.BloodW3_unit}</Typography></InputAdornment> : null}
                                                                                          {...getFieldProps('BloodW3_previous')}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                          className={values.BloodW3_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          endAdornment={values.test_date_past != null ? <InputAdornment position="start"><Typography variant="endorment">{values.BloodW3_unit}</Typography></InputAdornment> : null}
                                                                                          {...getFieldProps('BloodW3_past')}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                              <TableCell align="right">
                                                                                    <Typography variant="label">MCV</Typography>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder="[NATD]"
                                                                                          className={values.BloodMCV_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('BloodMCV_current')}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.BloodMCV_unit}</Typography></InputAdornment>}
                                                                                          error={Boolean(touched.BloodMCV_current && errors.BloodMCV_current)}
                                                                                    />
                                                                                    <FormHelperText error id="BloodMCV_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.BloodMCV_current && errors.BloodMCV_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                          className={values.BloodMCV_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          endAdornment={values.test_date_previous != null ? <InputAdornment position="start"><Typography variant="endorment">{values.BloodMCV_unit}</Typography></InputAdornment> : null}
                                                                                          {...getFieldProps('BloodMCV_previous')}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                          className={values.BloodMCV_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          endAdornment={values.test_date_past != null ? <InputAdornment position="start"><Typography variant="endorment">{values.BloodMCV_unit}</Typography></InputAdornment> : null}
                                                                                          {...getFieldProps('BloodMCV_past')}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell align="right">
                                                                                    <Typography variant="label">Eosinophils</Typography>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder="[NATD]"
                                                                                          className={values.BloodW4_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('BloodW4_current')}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.BloodW4_unit}</Typography></InputAdornment>}
                                                                                          error={Boolean(touched.BloodW4_current && errors.BloodW4_current)}
                                                                                    />
                                                                                    <FormHelperText error id="BloodW4_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.BloodW4_current && errors.BloodW4_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                          className={values.BloodW4_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          endAdornment={values.test_date_previous != null ? <InputAdornment position="start"><Typography variant="endorment">{values.BloodW4_unit}</Typography></InputAdornment> : null}
                                                                                          {...getFieldProps('BloodW4_previous')}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                          className={values.BloodW4_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          endAdornment={values.test_date_past != null ? <InputAdornment position="start"><Typography variant="endorment">{values.BloodW4_unit}</Typography></InputAdornment> : null}
                                                                                          {...getFieldProps('BloodW4_past')}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                              <TableCell align="right">
                                                                                    <Typography variant="label">MCH</Typography>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder='[NATD]'
                                                                                          className={values.BloodMCH_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('BloodMCH_current')}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.BloodMCH_unit}</Typography></InputAdornment>}
                                                                                          error={Boolean(touched.BloodMCH_current && errors.BloodMCH_current)}
                                                                                    />
                                                                                    <FormHelperText error id="BloodMCH_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.BloodMCH_current && errors.BloodMCH_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                          className={values.BloodMCH_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          endAdornment={values.test_date_previous != null ? <InputAdornment position="start"><Typography variant="endorment">{values.BloodMCH_unit}</Typography></InputAdornment> : null}
                                                                                          {...getFieldProps('BloodMCH_previous')}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                          className={values.BloodMCH_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          endAdornment={values.test_date_past != null ? <InputAdornment position="start"><Typography variant="endorment">{values.BloodMCH_unit}</Typography></InputAdornment> : null}
                                                                                          {...getFieldProps('BloodMCH_past')}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell align="right">
                                                                                    <Typography variant="label">Basophilis</Typography>
                                                                              </TableCell>
                                                                              <TableCell sx={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                                                                                    <InputBase
                                                                                          placeholder="[NATD]"
                                                                                          className={values.BloodW5_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('BloodW5_current')}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.BloodW5_unit}</Typography></InputAdornment>}
                                                                                          error={Boolean(touched.BloodW5_current && errors.BloodW5_current)}
                                                                                    />
                                                                                    <FormHelperText error id="BloodW5_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.BloodW5_current && errors.BloodW5_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                          className={values.BloodW5_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          endAdornment={values.test_date_previous != null ? <InputAdornment position="start"><Typography variant="endorment">{values.BloodW5_unit}</Typography></InputAdornment> : null}
                                                                                          {...getFieldProps('BloodW5_previous')}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                          className={values.BloodW5_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          endAdornment={values.test_date_past != null ? <InputAdornment position="start"><Typography variant="endorment">{values.BloodW5_unit}</Typography></InputAdornment> : null}
                                                                                          {...getFieldProps('BloodW5_past')}
                                                                                    />
                                                                              </TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                              <TableCell align="right">
                                                                                    <Typography variant="label">MCHC</Typography>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          palceholder="[NATD]"
                                                                                          className={values.BloodMCHC_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('BloodMCHC_current')}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.BloodMCHC_unit}</Typography></InputAdornment>}
                                                                                          error={Boolean(touched.BloodMCHC_current && errors.BloodMCHC_current)}
                                                                                    />
                                                                                    <FormHelperText error id="BloodMCHC_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.BloodMCHC_current && errors.BloodMCHC_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                          className={values.BloodMCHC_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          endAdornment={values.test_date_previous != null ? <InputAdornment position="start"><Typography variant="endorment">{values.BloodMCHC_unit}</Typography></InputAdornment> : null}
                                                                                          {...getFieldProps('BloodMCHC_previous')}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                          className={values.BloodMCHC_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          endAdornment={values.test_date_past != null ? <InputAdornment position="start"><Typography variant="endorment">{values.BloodMCHC_unit}</Typography></InputAdornment> : null}
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
                                                                                          placeholder="[NATD]"
                                                                                          className={values.BloodPLT_current_redstar === null ? 'textField' : 'textField_red'}
                                                                                          {...getFieldProps('BloodPLT_current')}
                                                                                          endAdornment={<InputAdornment position="start"><Typography variant="endorment">{values.BloodPLT_unit}</Typography></InputAdornment>}
                                                                                          error={Boolean(touched.BloodPLT_current && errors.BloodPLT_current)}
                                                                                    />
                                                                                    <FormHelperText error id="BloodPLT_current-error" sx={{ fontWeight: 600 }}>
                                                                                          {touched.BloodPLT_current && errors.BloodPLT_current}
                                                                                    </FormHelperText>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_previous !== null ? `[NATD]` : null}
                                                                                          className={values.BloodPLT_previous_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          endAdornment={values.test_date_previous != null ? <InputAdornment position="start"><Typography variant="endorment">{values.BloodPLT_unit}</Typography></InputAdornment> : null}
                                                                                          {...getFieldProps('BloodPLT_previous')}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <InputBase
                                                                                          placeholder={values.test_date_past !== null ? `[NATD]` : null}
                                                                                          className={values.BloodPLT_past_redstar === null ? 'textField' : 'textField_red'}
                                                                                          disabled
                                                                                          endAdornment={values.test_date_past != null ? <InputAdornment position="start"><Typography variant="endorment">{values.BloodPLT_unit}</Typography></InputAdornment> : null}
                                                                                          {...getFieldProps('BloodPLT_past')}
                                                                                    />
                                                                              </TableCell>
                                                                              <TableCell sx={{ background: "#FFFFFF !important" }}> </TableCell>
                                                                              <TableCell sx={{ background: "#FFFFFF !important" }}> <Button
                                                                                    size="large"
                                                                                    type="button"
                                                                                    variant="contained"
                                                                                    onClick={() => {
                                                                                          setSubmitAction("bloodTestConfirm");
                                                                                          handleSubmit();
                                                                                    }}
                                                                              >
                                                                                    Confirm
                                                                              </Button></TableCell>
                                                                              <TableCell sx={{ background: "#FFFFFF !important" }}>
                                                                                    {values.blood_release_staff !== null && values.blood_confirm_staff === null && <Button
                                                                                          size="large"
                                                                                          type="button"
                                                                                          variant="contained"
                                                                                          onClick={() => {
                                                                                                setSubmitAction("bloodTestRelease");
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
                                                                              <TableCell>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                className={values.BloodType_current_redstar === null ? null : 'red'}
                                                                                                error={Boolean(touched.BloodType_current && errors.BloodType_current)}
                                                                                                {...getFieldProps('BloodType_current')}
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
                                                                                          <FormHelperText error id="BloodType_current-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.BloodType_current && errors.BloodType_current}
                                                                                          </FormHelperText>
                                                                                    </FormControl>

                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                className={values.BloodType_cprevious_redstar === null ? null : 'red'}
                                                                                                error={Boolean(touched.BloodType_previous && errors.BloodType_previous)}
                                                                                                {...getFieldProps('BloodType_previous')}
                                                                                                style={{ textAlign: 'left' }}
                                                                                                disabled
                                                                                          >
                                                                                                {BloodType_Option.map((BloodType) => (
                                                                                                      <MenuItem
                                                                                                            value={BloodType.value}
                                                                                                            key={BloodType.value}
                                                                                                      >{BloodType.label}</MenuItem>
                                                                                                )
                                                                                                )}
                                                                                          </Select>
                                                                                          <FormHelperText error id="BloodType_previous-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.BloodType_previous && errors.BloodType_previous}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                className={values.BloodType_past_redstar === null ? null : 'red'}
                                                                                                error={Boolean(touched.BloodType_past && errors.BloodType_past)}
                                                                                                {...getFieldProps('BloodType_past')}
                                                                                                style={{ textAlign: 'left' }}
                                                                                                disabled
                                                                                          >
                                                                                                {BloodType_Option.map((BloodType) => (
                                                                                                      <MenuItem
                                                                                                            value={BloodType.value}
                                                                                                            key={BloodType.value}
                                                                                                      >{BloodType.label}</MenuItem>
                                                                                                )
                                                                                                )}
                                                                                          </Select>
                                                                                          <FormHelperText error id="BloodType_past-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.BloodType_past && errors.BloodType_past}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                              </TableCell>


                                                                        </TableRow>
                                                                        <TableRow>
                                                                              <TableCell align="right">
                                                                                    <Typography variant="label">Rhesus Typing</Typography>
                                                                              </TableCell>
                                                                              <TableCell sx={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                className={values.BloodRH_current_redstar === null ? null : 'red'}
                                                                                                error={Boolean(touched.BloodRH_current && errors.BloodRH_current)}
                                                                                                {...getFieldProps('BloodRH_current')}
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
                                                                                          <FormHelperText error id="BloodRH_current-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.BloodRH_current && errors.BloodRH_current}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                className={values.BloodRH_previous_redstar === null ? null : 'red'}
                                                                                                error={Boolean(touched.BloodRH_previous && errors.BloodRH_previous)}
                                                                                                {...getFieldProps('BloodRH_previous')}
                                                                                                style={{ textAlign: 'left' }}
                                                                                                disabled
                                                                                          >
                                                                                                {PosNeg_Option.map((BloodRH) => (
                                                                                                      <MenuItem
                                                                                                            value={BloodRH.value}
                                                                                                            key={BloodRH.value}
                                                                                                      >{BloodRH.label}</MenuItem>
                                                                                                )
                                                                                                )}
                                                                                          </Select>
                                                                                          <FormHelperText error id="BloodRH_previous-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.BloodRH_previous && errors.BloodRH_previous}
                                                                                          </FormHelperText>
                                                                                    </FormControl>
                                                                              </TableCell>
                                                                              <TableCell>
                                                                                    <FormControl fullWidth>
                                                                                          <Select
                                                                                                className={values.BloodRH_past_redstar === null ? null : 'red'}
                                                                                                error={Boolean(touched.BloodRH_past && errors.BloodRH_past)}
                                                                                                {...getFieldProps('BloodRH_past')}
                                                                                                style={{ textAlign: 'left' }}
                                                                                                disabled
                                                                                          >
                                                                                                {PosNeg_Option.map((BloodRH) => (
                                                                                                      <MenuItem
                                                                                                            value={BloodRH.value}
                                                                                                            key={BloodRH.value}
                                                                                                      >{BloodRH.label}</MenuItem>
                                                                                                )
                                                                                                )}
                                                                                          </Select>
                                                                                          <FormHelperText error id="BloodRH_past-error" sx={{ fontWeight: 600 }}>
                                                                                                {touched.BloodRH_past && errors.BloodRH_past}
                                                                                          </FormHelperText>
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
            </Page >
      )
}