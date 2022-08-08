import { useState } from 'react';
import { Outlet } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
//
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
  backgroundColor: "#EDEDED"
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + -28,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('xs')]: {
    paddingTop: APP_BAR_MOBILE + 0,
  },
  [theme.breakpoints.up('sm')]: {
    paddingTop: APP_BAR_DESKTOP + -28,
  },
  [theme.breakpoints.up('md')]: {
    paddingTop: APP_BAR_DESKTOP + -28,

  },
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + -28,
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);

  return (
    <RootStyle>
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
      {/* <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} /> */}
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}
