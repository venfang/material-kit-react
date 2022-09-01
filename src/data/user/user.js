/* eslint-disable object-shorthand */
/* eslint-disable no-useless-concat */
/* eslint-disable prefer-const */
/* eslint-disable no-const-assign */
/* eslint-disable no-var */
/* eslint-disable arrow-body-style */
/* eslint-disable prefer-template */
/* eslint-disable camelcase */
// eslint-disable-next-line prefer-template
import axios from 'axios';

export const getAllUser = () => fetch(`${process.env.REACT_APP_API}User/getAllUser`).then((data) => data.json());

// export const getReport = (report_id) => fetch(`${process.env.REACT_APP_API}Report/getReport?report_id=${report_id}`).then((data) => data.json());

// export const confirmBloodTest = (values) => axios.put(`${process.env.REACT_APP_API}Report/confirmBloodTest`, values);
// export const confirmImmunology = (values) => axios.put(`${process.env.REACT_APP_API}Report/confirmImmunology`, values);
// export const confirmBiochemistry = (values) => axios.put(`${process.env.REACT_APP_API}Report/confirmBiochemistry`, values);
// export const confirmUrine = (values) => axios.put(`${process.env.REACT_APP_API}Report/confirmUrine`, values);


// export const releaseBloodTest = (values) => axios.put(`${process.env.REACT_APP_API}Report/releaseBloodTest`, values);
// export const releaseImmunology = (values) => axios.put(`${process.env.REACT_APP_API}Report/releaseImmunology`, values);
// export const releaseBiochemistry = (values) => axios.put(`${process.env.REACT_APP_API}Report/releaseBiochemistry`, values);
// export const releaseUrine = (values) => axios.put(`${process.env.REACT_APP_API}Report/releaseUrine`, values);


