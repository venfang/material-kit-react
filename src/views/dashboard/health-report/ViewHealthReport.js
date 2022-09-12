/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
/* eslint-disable prefer-template */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-const */
/* eslint-disable object-shorthand */
/* eslint-disable no-useless-concat */
/* eslint-disable prefer-const */
/* eslint-disable no-const-assign */
/* eslint-disable arrow-body-style */
// eslint-disable-next-line prefer-template
import { useEffect, useContext, useState, Suspense } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
// @mui
import { base64StringToBlob } from 'blob-util';

import {
  Container,
  Typography,
  Box,
  IconButton,
  Button,
  Tooltip,
} from '@mui/material';
// components
import { AlertBox } from '../../../components/alert/SweetAlert';
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import PageTitleBar from '../../../components/PageTitleBar';
import Loader from '../../../components/loader/Loader';
import { getReportPDF } from '../../../data/report/report';
import PageNavBar from '../../../layouts/dashboard/PageNavBar';
import { getReport, verifyFinalReport } from '../../../data/lab/lab';

// sections

// ----------------------------------------------------------------------

export default function ViewHealthReport() {
  const [loading, setLoading] = useState(true);

  const [PDFData, setPDFData] = useState();

  let { report_id } = useParams();
  let [order_id, setOrderID] = useState();

  const handleShareWhatsapp = () => {
    let number = '60123899292';
    let message = 'Hello Tham';

    let url = `https://api.whatsapp.com/send?phone=${number}`;
    let url2 = `https://wa.me/${number}?text=${message}`;

    // Appending the message to the URL by encoding it
    url += `&text=${encodeURI(message)}`;

    // Open our newly created URL in a new tab to send the message
    window.open(url2, '_blank');
  };

  useEffect(() => {
    try {
      setLoading(true);
      getReport(report_id).then((data) => {
        setOrderID(data.order_id);
      });
      getReportPDF(report_id)
        .then((data) => {
          var blob = base64StringToBlob(data.base64);
          var file = new Blob([blob], { type: 'application/pdf' });
          var fileURL = URL.createObjectURL(file);

          setPDFData(fileURL);
          setLoading(false);
        })
        .catch((error) => {
          setPDFData('');
          setLoading(false);
          console.log(error);
        });

      // const pdfData = await createPdf();
      // setPDFData(pdfData);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, []);

  function verifyReport() {
    setLoading(true);
    const formValues = {
      order_id: order_id,
      verify_report_by: Cookies.get('user_name'),
    };
    verifyFinalReport(formValues)
      .then((response) => {
        setLoading(false);
        AlertBox(
          'success',
          'Verify Successfully',
          "Report has been verified.",
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
        setLoading(false);
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
  const title_name = "View Health Report";
  const to = "/dashboard/app";
  const topValue = 64;
  return (
    <Page title="View Health Report">
      <PageNavBar topValue={topValue} title_name={title_name} to={to} />
      <Loader spinner={loading} />
      <Container maxWidth="lg" sx={{ mt: 12 }}>
        <Box display="flex" justifyContent="flex-end" alignItems="center" sx={{ p: 2 }}>
          <Button
            size="large"
            type="button"
            variant="contained"
            onClick={() => {
              verifyReport();
            }}
          >
            Verified Report
          </Button>
        </Box>
        <Box sx={{ p: 2 }}>
          <iframe
            title="PDF"
            id="pdf"
            src={PDFData}
            type="application/pdf"
            style={{ width: '100%', height: '100vh' }}
          />
        </Box>
      </Container>
    </Page>
  );
}
