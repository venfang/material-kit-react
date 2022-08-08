import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Link, Card, Grid, Avatar, Typography, CardContent } from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
//
import SvgIconStyle from '../../../components/SvgIconStyle';
import Iconify from '../../../components/Iconify';
import POSTS from '../../../_mock/blog';

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
});

const TitleStyle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
}));

const InfoStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));

const CoverImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

export default function ProfileGallery() {
  return (
    <Grid container spacing={3} sx={{ mt: 0.5 }}>
      {POSTS.map((post, index) => {
        const { id, cover, title, like, comment, share, author, createdAt } = post;

        const POST_INFO = [
          { number: like, icon: 'eva:heart-fill' },
          { number: comment, icon: 'eva:message-circle-fill' },
        ];
        return (
          <Grid key={id} item xs={12} sm={6} md={4} lg={4} xl={3}>
            <Card sx={{ position: 'relative' }}>
              <CardMediaStyle sx={{}}>
                <CoverImgStyle alt={title} src={cover} />
              </CardMediaStyle>

              <CardContent
                sx={{
                  pt: 4,
                }}
              >
                <Typography gutterBottom variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>
                  {fDate(createdAt)}
                </Typography>

                <TitleStyle to="#" color="inherit" variant="subtitle2" underline="hover" component={RouterLink}>
                  {title}
                </TitleStyle>

                <InfoStyle>
                  {POST_INFO.map((info, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexWrap: 'nowrap',
                        ml: 1,
                      }}
                    >
                      <Iconify icon={info.icon} sx={{ mr: 0.5 }} />
                      <Typography variant="caption">{fShortenNumber(info.number)}</Typography>
                    </Box>
                  ))}
                </InfoStyle>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
