import { AppBar, Stack, Box, Typography, Button, Tabs, Tab } from '@mui/material';
import { useTheme, alpha, styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Iconify from '../../components/Iconify';

const RootStyle = styled('div')({
      display: 'flex',
      minHeight: '100%',
      overflow: 'hidden',
      backgroundColor: "#FFFFFF"
});
PageNavBar.propTypes = {
      topValue: PropTypes.number,
};
export default function PageNavBar({ topValue }) {
      return (
            <RootStyle>
                  <AppBar position="fixed" color="primary" sx={{ top: topValue }}>
                        <div style={{ backgroundColor: "#FFFFFF", color: "#211D4E", height: 40 }}>
                              <div style={{
                                    height: "100%",
                                    width: "100%",
                              }}>
                                    <Stack direction="row"
                                          spacing={{ xs: 1, sm: 2, md: 4 }}
                                          justifyContent="space-evenly"
                                          alignItems="center"
                                          height="100%"
                                          width="100%"
                                    >
                                          <Box sx={{ display: "flex" }}><Typography >{`Sequence No. `}</Typography><Typography variant="title_blue_small">{`001 `}</Typography></Box>
                                          <Box sx={{ display: "flex" }}><Typography>{`Name `}</Typography><Typography variant="title_blue_small">{`Ewe Ven Fang `}</Typography></Box>
                                          <Box sx={{ display: "flex" }}><Typography >{`Age `}</Typography><Typography variant="title_blue_small">{`22 `}</Typography></Box>
                                          <Box sx={{ display: "flex" }}><Typography>{`Gender `}</Typography><Typography variant="title_blue_small">{`Female `}</Typography></Box>
                                          <Box sx={{ display: "flex" }}><Typography>{`Package `}</Typography><Typography variant="title_blue_small">{`K2 `}</Typography></Box>
                                    </Stack>
                              </div>
                        </div>
                  </AppBar>
            </RootStyle>
      )
}