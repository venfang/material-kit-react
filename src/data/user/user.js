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

export const getAllUser = (values) => fetch(`${process.env.REACT_APP_API}User/getAllUser`, { method: 'POST', headers: { 'Content-Type': 'application/json', }, body: JSON.stringify(values), }).then((data) => data.json());

export const createUser = (values) => axios.post(process.env.REACT_APP_API + `User/createUser`, values);
export const getUserDetail = (user_name) => fetch(`${process.env.REACT_APP_API}User/getUserDetail?user_name=${user_name}`).then((data) => data.json());

export const updateUserDetail = (values) => axios.put(`${process.env.REACT_APP_API}User/updateUserDetail`, values);
export const updateUserProfile = (values) => axios.put(`${process.env.REACT_APP_API}User/updateUserProfile`, values);


export const verifyProfileOldPassword = (values) => axios.post(process.env.REACT_APP_API + `User/verifyProfileOldPassword`, values);

export const ChangePassword = (values) => axios.post(process.env.REACT_APP_API + `User/changePassword`, values);

