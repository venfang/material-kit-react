import { useEffect, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { faker } from '@faker-js/faker';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useTheme, alpha } from '@mui/material/styles';
import { Grid, Container, Typography, Box, Card, CardContent, Button, CardMedia } from '@mui/material';
// components
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import BusinessIcon from '@mui/icons-material/Business';
import ArticleIcon from '@mui/icons-material/Article';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import ScienceIcon from '@mui/icons-material/Science';
import GroupIcon from '@mui/icons-material/Group';
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';

// sections

import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../../../views_sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const theme = useTheme();

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }
  return (
    <Page title="Dashboard" >
      <Container maxWidth="xl" >
        <Box sx={{ p: 2 }}>
          {/* <Box sx={{ mb: 4 }}>
            <Box display="flex" justifyContent="left" alignItems="center" sx={{ mb: 1.5 }}>
              <ContactSupportIcon sx={{ height: '30px', width: '30px' }} />
              <Typography variant="h5" sx={{ mx: 1 }}>
                General
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                <Card
                  sx={{
                    position: 'relative',
                    margin: '0 auto',
                    p: 1,
                    textAlign: 'center',
                    height: 200,
                    background: 'linear-gradient(to top right, #eeeeee -50%, #ffffff 100%)',
                  }}
                >
                  <Grid
                    container
                    direction={'column'}
                    justifyContent="center"
                    alignItems="center"
                    sx={{ height: '100%' }}
                  >
                    <Grid item sx={{ height: '80%' }}>
                      <LocationCityIcon sx={{ height: '100%', width: '100%', color: '#1e88e5' }} />
                    </Grid>
                    <Grid item sx={{ height: '20%' }}>
                      <Typography variant="label">{'Company / Clinic'}</Typography>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
                <Card
                  sx={{
                    position: 'relative',
                    margin: '0 auto',
                    p: 1,
                    textAlign: 'center',
                    height: 200,
                    background: 'linear-gradient(to top right, #eeeeee -50%, #ffffff 100%)',
                  }}
                >
                  <Grid
                    container
                    direction={'column'}
                    justifyContent="center"
                    alignItems="center"
                    sx={{ height: '100%' }}
                  >
                    <Grid item sx={{ height: '80%' }}>
                      <GroupIcon sx={{ height: '100%', width: '100%', color: '#1e88e5' }} />
                    </Grid>
                    <Grid item sx={{ height: '20%' }}>
                      <Typography variant="label">{'User'}</Typography>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ mb: 4 }}>
            <Box display="flex" justifyContent="left" alignItems="center" sx={{ mb: 1.5 }}>
              <SupportAgentIcon sx={{ height: '30px', width: '30px' }} />
              <Typography variant="h5" sx={{ mx: 1 }}>
                Services
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                <Card
                  sx={{
                    position: 'relative',
                    margin: '0 auto',
                    p: 1,
                    textAlign: 'center',
                    height: 200,
                    background: 'linear-gradient(to top right, #eeeeee -50%, #ffffff 100%)',
                  }}
                >
                  <Grid
                    container
                    direction={'column'}
                    justifyContent="center"
                    alignItems="center"
                    sx={{ height: '100%' }}
                  >
                    <Grid item sx={{ height: '80%' }}>
                      <ArticleIcon sx={{ height: '100%', width: '100%', color: '#1e88e5' }} />
                    </Grid>
                    <Grid item sx={{ height: '20%' }}>
                      <Typography variant="label">{'Health Report'}</Typography>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </Box> */}
          <Box sx={{ mb: 4 }}>
            <Box display="flex" justifyContent="left" alignItems="center" sx={{ mb: 1.5 }}>
              <MedicalInformationIcon sx={{ height: '30px', width: '30px' }} />
              <Typography variant="h5" sx={{ mx: 1 }}>
                Health & Screening
              </Typography>
            </Box>
            <Grid container spacing={3}  >
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} component={RouterLink} to="/dashboard/lab">
                <Card
                  sx={{
                    position: 'relative',
                    margin: '0 auto',
                    p: 1,
                    textAlign: 'center',
                    height: 200,
                    background: 'linear-gradient(to top right, #eeeeee -50%, #ffffff 100%)',
                  }}
                >
                  <Grid
                    container
                    direction={'column'}
                    justifyContent="center"
                    alignItems="center"
                    sx={{ height: '100%' }}
                  >
                    <Grid item sx={{ height: '80%' }}>
                      <ScienceIcon sx={{ height: '100%', width: '100%', color: '#1e88e5' }} />
                    </Grid>
                    <Grid item sx={{ height: '20%' }}>
                      <Typography variant="label">{'Lab Test'}</Typography>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container >
    </Page >
  );
}
