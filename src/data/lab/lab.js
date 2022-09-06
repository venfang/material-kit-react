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

// export const getAllReport = () => fetch(`${process.env.REACT_APP_API}Report/getAllReport`).then((data) => data.json());
export const getAllReport = (values) => fetch(`${process.env.REACT_APP_API}Report/getAllReport`, { method: 'POST', headers: { 'Content-Type': 'application/json', }, body: JSON.stringify(values), }).then((data) => data.json());
export const getReport = (report_id) => fetch(`${process.env.REACT_APP_API}Report/getReport?report_id=${report_id}`).then((data) => data.json());

export const updateBloodTest = (values) => axios.put(`${process.env.REACT_APP_API}Report/updateBloodTest`, values);
export const updateImmunology = (values) => axios.put(`${process.env.REACT_APP_API}Report/updateImmunology`, values);
export const updateBiochemistry = (values) => axios.put(`${process.env.REACT_APP_API}Report/updateBiochemistry`, values);
export const updateUrine = (values) => axios.put(`${process.env.REACT_APP_API}Report/updateUrine`, values);
