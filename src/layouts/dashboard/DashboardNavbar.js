/* eslint-disable object-shorthand */
/* eslint-disable no-useless-concat */
/* eslint-disable prefer-const */
/* eslint-disable no-const-assign */
/* eslint-disable no-var */
/* eslint-disable arrow-body-style */
/* eslint-disable prefer-template */
/* eslint-disable camelcase */
// eslint-disable-next-line prefer-template
/* eslint-disable react/jsx-boolean-value */

import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
// material
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom';
import { alpha, styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import {
  Box,
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  TextField,
  InputAdornment,
  Paper,
  InputBase,
  Divider,
  Typography,
  Grid,
  Button,
} from '@mui/material';
// components
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

import Iconify from '../../components/Iconify';
//

import NotificationsPopover from './NotificationsPopover';

import Searchbar from './Searchbar';
import Logo from '../../components/Logo';

import { AlertBox, TimerAlertBox } from '../../components/alert/SweetAlert';
import { logoutUser } from '../../data/auth/login/login';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: '#1565c0',
  // backgroundColor: '#0059D1',
  // backgroundColor: alpha('#4092CB', 0.72),
  // [theme.breakpoints.up('lg')]: {
  //   width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  // },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('xs')]: {
    minHeight: APPBAR_MOBILE,
    padding: theme.spacing(0, 5),
  },
  [theme.breakpoints.up('sm')]: {
    minHeight: APPBAR_MOBILE,
    padding: theme.spacing(0, 5),
  },
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_MOBILE,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};

export default function DashboardNavbar({ onOpenSidebar }) {
  const user_id = Cookies.get('user_name');
  const handleLogout = () => {
    logoutUser()
      .then((logoutResponse) => {
        TimerAlertBox('success', 'Logout Successfully', '', 1500, 'center').then(() => {
          if (Cookies.get('user_name') === undefined) {
            window.location.href = `${window.location.origin}/dashboard/app`;
          }
        });
      })
      .catch((logoutError) => {
        AlertBox('error', 'Logout Failed', 'Axios Post Error.', false, '', true, 'OK').then(() => {
          window.location.href = `${window.location.origin}/dashboard/app`;
        });
      });
  };
  return (
    <RootStyle>
      <ToolbarStyle>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ width: '100%' }}>
          <Stack direction="row" alignItems="center" justifyContent={'flex-start'} spacing={{ xs: 0.5, sm: 1.5 }}>
            <IconButton
              onClick={onOpenSidebar}
              sx={{ mr: 1, color: 'text.primary', display: { xs: 'none', lg: 'none' } }}
            >
              <Iconify icon="eva:menu-2-fill" />
            </IconButton>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Logo
                sx={{
                  mx: 1,
                  width: { xs: '40px !important', lg: '150px !important' },
                  height: { xs: '40px !important', lg: '60px !important' },
                }}
              />
            </Box>
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={{ xs: 0.5, sm: 1.5 }}>
            <IconButton
              sx={{
                mr: 1,
                color: 'text.primary',
                display: { xs: 'inline-flex', sm: 'inline-flex', md: 'none', lg: 'none' },
              }}
            >
              <Iconify icon="eva:menu-2-fill" />
            </IconButton>
            <Button
              component={RouterLink}
              to={`/dashboard/user/edit/${user_id}`}
              variant="outlined"
              size="medium"
              startIcon={<AccountCircleIcon />}
              sx={{
                display: { xs: 'none', sm: 'none', md: 'inline-flex', lg: 'inline-flex' },
              }}
            >
              Profile
            </Button>
            <Button
              onClick={handleLogout}
              variant="outlined"
              size="medium"
              startIcon={<LogoutIcon />}
              sx={{
                display: { xs: 'none', sm: 'none', md: 'inline-flex', lg: 'inline-flex' },
              }}
            >
              Logout
            </Button>
          </Stack>
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}
