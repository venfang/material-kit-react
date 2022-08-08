import { AppBar, Stack, Box, Typography, Button, Tabs, Tab } from '@mui/material';
import { useTheme, alpha, styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';

import Iconify from '../../components/Iconify';

const RootStyle = styled('div')({
      display: 'flex',
      minHeight: '100%',
      overflow: 'hidden',
      backgroundColor: "#211D4E"
});

export default function test({ topValue }) {
      return (
            <RootStyle>
                  <AppBar position="fixed" color="primary" sx={{ top: topValue }}>
                        <div style={{ backgroundColor: "#211D4E", color: "#FFFFFF", height: 30 }}>
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
                                          <Box sx={{ display: "flex" }}><Typography variant="title_blue">{`Sequence No. `}</Typography><Typography variant="title_blue_small">{`001 `}</Typography></Box>
                                          <Box sx={{ display: "flex" }}><Typography variant="title_blue">{`Name `}</Typography><Typography variant="title_blue_small">{`Ewe Ven Fang `}</Typography></Box>
                                          <Box sx={{ display: "flex" }}><Typography variant="title_blue">{`Age `}</Typography><Typography variant="title_blue_small">{`22 `}</Typography></Box>
                                          <Box sx={{ display: "flex" }}><Typography variant="title_blue">{`Gender `}</Typography><Typography variant="title_blue_small">{`Female `}</Typography></Box>
                                          <Box sx={{ display: "flex" }}><Typography variant="title_blue">{`Package `}</Typography><Typography variant="title_blue_small">{`K2 `}</Typography></Box>
                                    </Stack>
                              </div>
                        </div>
                  </AppBar>
            </RootStyle>
      )
}