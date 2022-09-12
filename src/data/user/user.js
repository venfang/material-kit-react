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

export const createUser = (values) => axios.post(process.env.REACT_APP_API + `User/createUser`, values);
export const getUserDetail = (user_name) => fetch(`${process.env.REACT_APP_API}User/getUserDetail?user_name=${user_name}`).then((data) => data.json());

export const updateUserDetail = (values) => axios.put(`${process.env.REACT_APP_API}User/updateUserDetail`, values);

// export const confirmBloodTest = (values) => axios.put(`${process.env.REACT_APP_API}Report/confirmBloodTest`, values);
// export const confirmImmunology = (values) => axios.put(`${process.env.REACT_APP_API}Report/confirmImmunology`, values);
// export const confirmBiochemistry = (values) => axios.put(`${process.env.REACT_APP_API}Report/confirmBiochemistry`, values);
// export const confirmUrine = (values) => axios.put(`${process.env.REACT_APP_API}Report/confirmUrine`, values);


// export const releaseBloodTest = (values) => axios.put(`${process.env.REACT_APP_API}Report/releaseBloodTest`, values);
// export const releaseImmunology = (values) => axios.put(`${process.env.REACT_APP_API}Report/releaseImmunology`, values);
// export const releaseBiochemistry = (values) => axios.put(`${process.env.REACT_APP_API}Report/releaseBiochemistry`, values);
// export const releaseUrine = (values) => axios.put(`${process.env.REACT_APP_API}Report/releaseUrine`, values);


