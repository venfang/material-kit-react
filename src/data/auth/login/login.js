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

axios.defaults.withCredentials = true;

export const loginUser = (formValues) => axios.post(`${process.env.REACT_APP_API}Login/loginUser`, formValues, { withCredentials: true });

export const verifyLoginUser = () => axios.get(`${process.env.REACT_APP_API}Login/verifyLoginUser`, { withCredentials: true });

export const logoutUser = () => axios.post(process.env.REACT_APP_API + `Login/logoutUser`, "", { withCredentials: true });