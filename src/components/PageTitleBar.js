/* eslint-disable react/jsx-boolean-value */
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { AppBar, Stack, Box, IconButton, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import { forwardRef } from 'react';

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  zIndex: 900,
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: '#fff',
  padding: 5,
  boxShadow: '0px 2px 5px 2px rgba(0, 0, 0, 0.05)',
  top: APPBAR_MOBILE,
  left: 0,
  [theme.breakpoints.up('lg')]: {
    top: APPBAR_DESKTOP,
    left: 0,
  },
}));

PageTitleBar.propTypes = {
  title: PropTypes.string,
  backVisibility: PropTypes.string,
  backURL: PropTypes.string,
  nextVisibility: PropTypes.string,
  nextURL: PropTypes.string,
};

export default function PageTitleBar({
  title = '',
  backVisibility = '',
  backURL = '',
  nextVisibility = '',
  nextURL = '',
}) {
  return (
    <RootStyle>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box
          component={RouterLink}
          to={backURL}
          display="flex"
          justifyContent="left"
          alignItems="center"
          sx={{
            cursor: 'pointer',
            textDecoration: 'none',
            '&:focus, &:hover, &:visited, &:link, &:active': {
              color: '#211D4E',
            },
            visibility: backVisibility,
          }}
        >
          <IconButton aria-label="next button" color="primary" disableRipple={true}>
            <KeyboardArrowLeftIcon fontSize="large" />
          </IconButton>
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ margin: 0, display: { xs: 'none', sm: 'block', md: 'block', lg: 'block', xl: 'block' } }}
          >
            Back
          </Typography>
        </Box>

        <Typography align="center" variant="title" gutterBottom sx={{ margin: 0 }} color="primary">
          {title}
        </Typography>

        <Box
          component={RouterLink}
          to={nextURL}
          display="flex"
          justifyContent="left"
          alignItems="center"
          sx={{
            cursor: 'pointer',
            textDecoration: 'none',
            '&:focus, &:hover, &:visited, &:link, &:active': {
              color: '#211D4E',
            },
            visibility: nextVisibility,
          }}
        >
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ margin: 0, display: { xs: 'none', sm: 'block', md: 'block', lg: 'block', xl: 'block' } }}
          >
            Next
          </Typography>
          <IconButton aria-label="next button" color="primary" disableRipple={true}>
            <KeyboardArrowRightIcon fontSize="large" />
          </IconButton>
        </Box>
      </Stack>
    </RootStyle>
  );
}
