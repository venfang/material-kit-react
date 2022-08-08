/* eslint-disable react/jsx-boolean-value */
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { alpha, createTheme, ThemeProvider as MUIThemeProvider, styled } from '@mui/material/styles';

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
  AppBar,
  Toolbar,
  IconButton,
  Fab,
  List,
  BottomNavigation,
  BottomNavigationAction,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  ImageListItem,
  CardHeader,
  CardMedia,
  CardActions,
  Divider,
} from '@mui/material';
// utils
import { useEffect, useState, useMemo } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import lightThemeOption, { darkThemeOption } from '../../../theme/option';

import Iconify from '../../../components/Iconify';
import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';

import Scrollbar from '../../../components/Scrollbar';
//

// ----------------------------------------------------------------------
const IconButtonStyle = styled((props) => <IconButton {...props} />)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));
const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
});
const CoverImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '200px',
  objectFit: 'cover',
  position: 'absolute',
});

export default function ProfilePost() {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const light = useMemo(lightThemeOption);

  return (
    <Grid container spacing={3} sx={{ mt: 0.5 }}>
      <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
        <Card sx={{ position: 'relative', minHeight: '400px' }}>
          <CardContent>
            <Typography variant="h5">Popular</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Paper>
            <TextField
              id="filled-multiline-flexible"
              fullWidth
              multiline
              rows={4}
              placeholder={'Write something...'}
              value={value}
              onChange={handleChange}
              variant="filled"
            />
            {/* <Grid container spacing={2}>
            <Grid item xs={4}>
              <ImageListItem sx={{ height: '250px !important', width: '100% !important' }}>
                <img
                  alt=""
                  src={'https://i.pinimg.com/736x/a6/bd/2b/a6bd2b1e5439b9d5c92bf7bcaa5693df.jpg'}
                  style={{ height: '250px !important' }}
                />
              </ImageListItem>
            </Grid>
            <Grid item xs={4}>
              <ImageListItem sx={{ height: '250px !important', width: '100% !important' }}>
                <img
                  alt=""
                  src={'https://i.pinimg.com/736x/a6/bd/2b/a6bd2b1e5439b9d5c92bf7bcaa5693df.jpg'}
                  style={{ height: '250px !important' }}
                />
              </ImageListItem>
            </Grid>
            <Grid item xs={4}>
              <ImageListItem sx={{ height: '250px !important', width: '100% !important' }}>
                <img
                  alt=""
                  src={'https://i.pinimg.com/736x/a6/bd/2b/a6bd2b1e5439b9d5c92bf7bcaa5693df.jpg'}
                  style={{ height: '250px !important' }}
                />
              </ImageListItem>
            </Grid>
          </Grid> */}

            <BottomNavigation showLabels sx={{ borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px' }}>
              <Box sx={{ display: 'flex', mx: 1, p: 1, bgcolor: 'background.paper' }}>
                <IconButtonStyle component="label">
                  <InsertPhotoIcon />
                </IconButtonStyle>

                <IconButtonStyle component="label">
                  <InsertEmoticonIcon />
                </IconButtonStyle>

                <IconButtonStyle component="label">
                  <PhotoCameraIcon />
                </IconButtonStyle>

                {/* <BottomNavigationAction sx={{ minWidth: 'auto' }} label="Recents" icon={<InsertEmoticonIcon />} /> */}
              </Box>

              <Box sx={{ flexGrow: 1 }} />

              <Box sx={{ px: 1.5 }} display="flex" justifyContent="center" alignItems="center">
                <Button
                  sx={{ mr: 1 }}
                  variant="contained"
                  component={RouterLink}
                  to="#"
                  startIcon={<Iconify icon="eva:plus-fill" />}
                >
                  Post
                </Button>
              </Box>
            </BottomNavigation>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ mt: 3 }}>
          <Card sx={{ position: 'relative', minHeight: '400px' }}>
            <CardHeader
              avatar={<Avatar src="https://i.pinimg.com/736x/a6/bd/2b/a6bd2b1e5439b9d5c92bf7bcaa5693df.jpg">R</Avatar>}
              action={
                <IconButton aria-label="settings">
                  <MoreIcon />
                </IconButton>
              }
              title="Tham ZY"
              subheader="August 14, 2022"
            />
            <CardContent>
              <Typography variant="subtitle1">The food here is delicious!</Typography>

              <Grid container spacing={2} sx={{ mt: 0.5 }}>
                <Grid item xs={12} sm={8} md={6} lg={6} xl={6}>
                  <Card sx={{ maxWidth: { xs: 4 / 4, sm: 4 / 4, md: 4 / 4, lg: 4 / 4, xl: 4 / 4 } }}>
                    <CardMedia
                      component="img"
                      sx={{ height: 'auto' }}
                      image="https://i.pinimg.com/736x/a6/bd/2b/a6bd2b1e5439b9d5c92bf7bcaa5693df.jpg"
                      alt="green iguana"
                    />
                  </Card>
                </Grid>
              </Grid>

              <Box sx={{ width: '100%', bgcolor: 'background.paper', mt: 2 }}>
                <List>
                  <Divider />
                  <ListItem disablePadding>
                    <CardActions>
                      <Button color="primary" startIcon={<FavoriteBorderIcon />}>
                        Like {'(6)'}
                      </Button>
                      <Button color="primary" startIcon={<ChatBubbleOutlineIcon />}>
                        Comment {'(2)'}
                      </Button>
                    </CardActions>
                  </ListItem>
                  <Divider />
                  <Scrollbar sx={{ maxHeight: '300px' }} autoHideMode={false}>
                    <Paper square sx={{ p: 2 }}>
                      <Paper sx={{ mb: 2 }} elevation={12}>
                        <CardHeader
                          action={
                            <Typography variant="subtitle2" color="text.primary" align="justify">
                              3h
                            </Typography>
                          }
                          avatar={
                            <Avatar src="https://bestigcaptions.com/wp-content/uploads/2022/02/Best-Boys-Profile-Whatsapp-DP.jpg">
                              R
                            </Avatar>
                          }
                          titleTypographyProps={{ variant: 'subtitle1' }}
                          title="Anderson Wong"
                          subheader="IT Full Stack Developer"
                        />
                        <CardContent>
                          <Typography variant="body2" color="text.primary" align="justify">
                            Great Looking!
                          </Typography>
                        </CardContent>
                      </Paper>

                      <Paper sx={{ mb: 2 }} elevation={12}>
                        <CardHeader
                          action={
                            <Typography variant="subtitle2" color="text.primary" align="justify">
                              7h
                            </Typography>
                          }
                          avatar={
                            <Avatar src="https://i0.wp.com/smsforwishes.com/wp-content/uploads/2022/05/105274370_103709461393684_681293867908537804_n.jpeg?resize=700%2C700&ssl=1">
                              R
                            </Avatar>
                          }
                          titleTypographyProps={{ variant: 'subtitle1' }}
                          title="Chloe Lim"
                          subheader="Accountant"
                        />
                        <CardContent>
                          <Typography variant="body2" color="text.primary" align="justify">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                            been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                            galley of type and scrambled it to make a type specimen book. It has survived not only five
                            centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
                            passages, and more recently with desktop publishing software like Aldus PageMaker including
                            versions of Lorem Ipsum.
                          </Typography>
                        </CardContent>
                      </Paper>
                    </Paper>
                  </Scrollbar>
                  <Divider />
                  {/* Own Comment */}
                  <Paper square sx={{ px: 0, pb: 0 }}>
                    <Paper sx={{ mb: 0, mt: 4 }} elevation={0}>
                      <CardHeader
                        sx={{ p: 0, alignItems: 'flex-start' }}
                        avatar={
                          <Avatar src="https://i.pinimg.com/736x/a6/bd/2b/a6bd2b1e5439b9d5c92bf7bcaa5693df.jpg">
                            R
                          </Avatar>
                        }
                        title={
                          <>
                            <TextField
                              id="filled-multiline-flexible"
                              fullWidth
                              multiline
                              rows={4}
                              placeholder={'Add a comment...'}
                              value={value}
                              onChange={handleChange}
                              variant="filled"
                            />

                            <CardContent sx={{ padding: '0px !important' }}>
                              <BottomNavigation>
                                <Box sx={{ display: 'flex', p: 1, bgcolor: 'background.paper' }}>
                                  <IconButtonStyle component="label">
                                    <InsertEmoticonIcon />
                                  </IconButtonStyle>
                                </Box>

                                <Box sx={{ flexGrow: 1 }} />

                                <Box sx={{ pl: 1.5, pr: 0 }} display="flex" justifyContent="center" alignItems="center">
                                  <Button
                                    variant="contained"
                                    component={RouterLink}
                                    to="#"
                                    startIcon={<Iconify icon="eva:plus-fill" />}
                                  >
                                    Send
                                  </Button>
                                </Box>
                              </BottomNavigation>
                            </CardContent>
                          </>
                        }
                      />
                    </Paper>
                  </Paper>
                </List>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}
