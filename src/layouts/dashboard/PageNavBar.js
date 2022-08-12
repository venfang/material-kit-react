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

import { AppBar, Stack, Box, Typography, Button, Tabs, Tab, InputBase, InputAdornment } from '@mui/material';
import { useTheme, alpha, styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchIcon from '@mui/icons-material/Search';
import Iconify from '../../components/Iconify';

const RootStyle = styled('div')({
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
                  <AppBar position="fixed" color="primary" sx={{ top: topValue }}>
                        <Box sx={{ backgroundColor: "#FFFFFF", color: "#211D4E", height: 50 }}>
                              <Stack
                                    display="flex"
                                    flexDirection="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    height="100%"
                                    width="100%"
                              >
                                    <Button variant="return" component={RouterLink} to={to} startIcon={<Iconify icon="ant-design:left-outlined" />} >
                                          Back
                                    </Button>
                                    <Typography variant="title_page" >{title_name}</Typography>
                                    <InputBase
                                          className='textField'
                                          sx={{ marginRight: 5 }}
                                          startAdornment={<InputAdornment position="end"><SearchIcon style={{ color: "#1565c0" }} /></InputAdornment>}
                                    />
                              </Stack>
                        </Box>
                  </AppBar>
            </RootStyle >
      )
}