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
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { AppBar, Stack, Box, Typography, Button, Tabs, Tab, InputBase, IconButton } from '@mui/material';
import { useTheme, alpha, styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchIcon from '@mui/icons-material/Search';
import Iconify from '../../components/Iconify';


const RootStyle = styled('div')({
      zIndex: 900,
      display: 'flex',
      minHeight: '100%',
      overflow: 'hidden',
      backgroundColor: "#FFFFFF"
});


PageNavBar.propTypes = {
      topValue: PropTypes.number,
      title_name: PropTypes.string,
      to: PropTypes.string,
};

export default function PageNavBar({ topValue, title_name, to }) {
      return (
            <RootStyle>
                  <AppBar position="fixed" color="primary" sx={{ top: topValue, zIndex: 900, }}>
                        <Box sx={{ backgroundColor: "#FFFFFF", color: "#211D4E", height: 50, paddingLeft: 5, paddingRight: 5 }}>
                              <Stack direction="row" alignItems="center" justifyContent="space-between">
                                    <Box
                                          component={RouterLink}
                                          to={to}
                                          display="flex"
                                          justifyContent="left"
                                          alignItems="center"
                                          sx={{
                                                cursor: 'pointer',
                                                textDecoration: 'none',
                                                '&:focus, &:hover, &:visited, &:link, &:active': {
                                                      color: '#211D4E',
                                                },
                                          }}
                                    >
                                          <IconButton aria-label="next button" color="primary" disableRipple={true}>
                                                <KeyboardArrowLeftIcon fontSize="large" color='#211D4E' sx={{ color: '#211D4E' }} />
                                          </IconButton>
                                          <Typography
                                                variant="subtitle1"
                                                gutterBottom
                                                sx={{ margin: 0, display: { xs: 'none', sm: 'block', md: 'block', lg: 'block', xl: 'block' } }}
                                          >
                                                Back
                                          </Typography>
                                    </Box>

                                    <Typography align="center" variant="title_page" gutterBottom sx={{ margin: 0 }} color="primary">
                                          {title_name}
                                    </Typography>

                                    <Box
                                          display="flex"
                                          justifyContent="left"
                                          alignItems="center"
                                          visibility={false}
                                          sx={{
                                                cursor: 'pointer',
                                                textDecoration: 'none',
                                                '&:focus, &:hover, &:visited, &:link, &:active': {
                                                      color: '#211D4E',
                                                },
                                                visibility: "hidden",
                                          }}
                                    > <IconButton aria-label="next button" color="primary" disableRipple={true}>
                                                <KeyboardArrowLeftIcon fontSize="large" color='#211D4E' sx={{ color: '#211D4E' }} />
                                          </IconButton>
                                          <Typography
                                                variant="subtitle1"
                                                gutterBottom
                                                sx={{ margin: 0, display: { xs: 'none', sm: 'block', md: 'block', lg: 'block', xl: 'block' } }}
                                          >
                                                Back
                                          </Typography>
                                    </Box>
                              </Stack>
                        </Box>
                  </AppBar>
            </RootStyle >
      )
}