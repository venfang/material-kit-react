/* eslint-disable camelcase */
import axios from 'axios';

export const getAllReports = (filter) =>
  fetch(`${process.env.REACT_APP_API}Report/getAllReport`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(filter),
  }).then((data) => data.json());

export const getReportPDF = (report_id) =>
  fetch(`${process.env.REACT_APP_API}Report/getReportPDF?report_id=${report_id}`).then((data) => data.json());
