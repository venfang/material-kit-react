import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography, Box } from '@mui/material';
// hooks
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import useResponsive from '../../hooks/useResponsive';
// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';
// sections
import { LoginForm } from '../../views_sections/auth/login';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('xs')]: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  [theme.breakpoints.up('md')]: {
    padding: '100px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '100vh',
  },

}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(4, 4, 4, 4),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(6, 2),
}));

// ----------------------------------------------------------------------

export default function Login() {
  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');

  return (
    <Page title="Login">
      <RootStyle>
        {/* <HeaderStyle>
          <Box display="flex" justifyContent="center" alignItems="center">

          </Box>
        </HeaderStyle> */}

        {mdUp && (
          <SectionStyle>
            <Logo
              sx={{
                mx: 8,
                width: { xs: '100px !important', lg: '250px !important' },
                height: { xs: '100px !important', lg: '100px !important' },
              }} />
            {/* <svg viewBox="0 0 1440 320">
              <path fill="#FFFFFF" fillOpacity="1" d="M0,96L80,96C160,96,320,96,480,106.7C640,117,800,139,960,138.7C1120,139,1280,117,1360,106.7L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z" />
            </svg> */}
          </SectionStyle>
        )}
        <SectionStyle>
          <Container maxWidth="sm">
            <ContentStyle>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mb: 4,
                  bgcolor: 'background.paper',
                  borderRadius: 1,
                }}
              >
                <Typography variant="title" sx={{ color: '#211D4E', fontWeight: '700', textAlign: 'center' }}>
                  Login
                </Typography>
                <ExitToAppIcon sx={{ ml: 1 }} />
              </Box>

              <LoginForm />

              {/* <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Don’t have an account?{' '}
                <Link variant="subtitle2" component={RouterLink} to="/register">
                  Get started
                </Link>
              </Typography> */}
            </ContentStyle>
          </Container>
        </SectionStyle>
      </RootStyle>
    </Page>
  );
}
