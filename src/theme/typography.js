// ----------------------------------------------------------------------

function pxToRem(value) {
  return `${value / 16}rem`;
}

function responsiveFontSizes({ xs, sm, md, lg }) {
  return {
    '@media (min-width:480px)': {
      fontSize: pxToRem(xs),
    },
    '@media (min-width:600px)': {
      fontSize: pxToRem(sm),
    },
    '@media (min-width:900px)': {
      fontSize: pxToRem(md),
    },
    '@media (min-width:1200px)': {
      fontSize: pxToRem(lg),
    },
  };
}

const FONT_PRIMARY = 'Montserrat, sans-serif';

const typography = {
  fontFamily: FONT_PRIMARY,
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  fontWeightBold: 700,
  h1: {
    fontWeight: 700,
    lineHeight: 80 / 64,
    fontSize: pxToRem(40),
    ...responsiveFontSizes({ sm: 52, md: 58, lg: 64 }),
  },
  h2: {
    fontWeight: 700,
    lineHeight: 64 / 48,
    fontSize: pxToRem(32),
    ...responsiveFontSizes({ sm: 40, md: 44, lg: 48 }),
  },
  h3: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(24),
    ...responsiveFontSizes({ sm: 26, md: 30, lg: 32 }),
  },
  h4: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(20),
    ...responsiveFontSizes({ sm: 20, md: 24, lg: 24 }),
  },
  h5: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(18),
    ...responsiveFontSizes({ sm: 19, md: 20, lg: 20 }),
  },
  h6: {
    fontWeight: 700,
    lineHeight: 28 / 18,
    fontSize: pxToRem(17),
    ...responsiveFontSizes({ sm: 18, md: 18, lg: 18 }),
  },
  subtitle1: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(16),
  },
  subtitle2: {
    fontWeight: 600,
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
  },
  body1: {
    lineHeight: 1.5,
    fontSize: pxToRem(16),
  },
  body2: {
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
  },
  caption: {
    lineHeight: 1.5,
    fontSize: pxToRem(12),
  },
  overline: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
  button: {
    fontWeight: 700,
    lineHeight: 24 / 14,
    fontSize: pxToRem(14),
    textTransform: 'capitalize',
  },
  label_group: {
    fontWeight: 600,
    lineHeight: 1.0,
    fontSize: pxToRem(10),
    textTransform: 'capitalize',
    ...responsiveFontSizes({ xs: 9, sm: 11, md: 13, lg: 12 }),
    color: '#1565c0',
  },
  endorment: {
    fontWeight: 600,
    lineHeight: 0.5,
    fontSize: pxToRem(10),
    textTransform: 'capitalize',
    ...responsiveFontSizes({ xs: 6, sm: 6, md: 9, lg: 9 }),
    color: '#211D4E',
  },
  label: {
    fontWeight: 600,
    lineHeight: 0.5,
    fontSize: pxToRem(10),
    textTransform: 'capitalize',
    color: '#211D4E',
    ...responsiveFontSizes({ xs: 8, sm: 10, md: 12, lg: 12 }),
  },
  text: {
    fontWeight: 600,
    lineHeight: 0.5,
    fontSize: pxToRem(10),
    textTransform: 'none',
    color: '#5A567B',
    ...responsiveFontSizes({ xs: 8, sm: 10, md: 12, lg: 12 }),
  },
  ext: {
    fontWeight: 600,
    lineHeight: 0.5,
    fontSize: pxToRem(10),
    textTransform: 'none',
    color: '#5A567B',
    ...responsiveFontSizes({ xs: 8, sm: 10, md: 12, lg: 12 }),
  },
  title: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(20),
    ...responsiveFontSizes({ xs: 10, sm: 12, md: 14, lg: 14 }),
    textTransform: 'uppercase',
    color: '#FFFFFF',
  },
  title_blue_small: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(10),
    ...responsiveFontSizes({ xs: 10, sm: 12, md: 16, lg: 16 }),
    textTransform: 'capitalize',
    color: '#FFFFFF',
  },
  title_blue: {
    fontWeight: 400,
    lineHeight: 1.5,
    marginRight: 10,
    fontSize: pxToRem(10),
    ...responsiveFontSizes({ xs: 10, sm: 12, md: 16, lg: 16 }),
    textTransform: 'capitalize',
    color: '#FFFFFF',
  },
  title_page: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(18),
    ...responsiveFontSizes({ sm: 20, md: 24, lg: 24 }),
    textTransform: 'uppercase',
    color: '#1565c0',
  },
};

export default typography;
