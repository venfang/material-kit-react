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

export const getAllFacility = () => fetch(`${process.env.REACT_APP_API}Facility/getAllFacility`).then((data) => data.json());