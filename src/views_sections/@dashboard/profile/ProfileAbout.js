/* eslint-disable react/jsx-boolean-value */
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { alpha, styled } from '@mui/material/styles';
import {
  Box,
  Link,
  Card,
  Grid,
  Avatar,
  Typography,
  CardContent,
  Paper,
  Button,
  Select,
  InputBase,
  FormControl,
  MenuItem,
} from '@mui/material';
// utils
import { useEffect, useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
//
import SvgIconStyle from '../../../components/SvgIconStyle';
import Iconify from '../../../components/Iconify';
import POSTS from '../../../_mock/blog';

import ScrollToTop from '../../../components/ScrollToTop';

import { MotionAppearConfig } from '../../../components/Motion';
// ----------------------------------------------------------------------

export default function ProfileGallery() {
  // const test = () => {
  //   window.scrollTo({ top: 150, left: 0, behavior: 'smooth' });
  // };

  const [test, setTest] = useState(true);
  const [value, setValue] = useState(true);

  const handleTest = () => {
    setTest(false);
  };
  const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Grid container spacing={3} sx={{ mt: 0.5 }}>
      <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
        <Grid container spacing={3}>
          <AnimatePresence>
            {test && (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <motion.div variants={MotionAppearConfig} initial="initial" animate="animate" exit="exit">
                  <Card sx={{ position: 'relative', minHeight: '400px' }}>
                    <CardContent>
                      <Typography variant="h5">General Information</Typography>
                      <Button variant="outlined" sx={{ mt: 2 }} onClick={handleTest}>
                        Remove this
                      </Button>
                      <Typography variant="subtitle1">{value}</Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            )}
          </AnimatePresence>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <motion.div variants={MotionAppearConfig} initial="initial" animate="animate">
              <Card sx={{ position: 'relative', minHeight: '300px' }}>
                <CardContent>
                  <Typography variant="h5">Work</Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Card sx={{ position: 'relative', minHeight: '300px' }}>
              <CardContent>
                <Typography variant="h5">Contact</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <motion.div variants={MotionAppearConfig} initial="initial" animate="animate">
              <Card sx={{ position: 'relative', minHeight: '250px' }}>
                <CardContent>
                  <Typography variant="h5">Followers</Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <motion.div variants={MotionAppearConfig} initial="initial" animate="animate">
              <Card sx={{ position: 'relative', minHeight: '250px' }}>
                <CardContent>
                  <Typography variant="h5">Following</Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
