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
export default function Button(theme) {
  return {
    MuiButton: {
      variants: [
        {
          props: { variant: 'cancel' },
          style: {
            border: '1px solid #5A567B',
            backgroundColor: '#5A567B',
            color: '#ffffff',
            height: 40,
            ...responsiveFontSizes({ xs: 8, sm: 10, md: 12, lg: 14 }),
            '&:hover': {
              boxShadow: theme.customShadows.z8,
              backgroundColor: '#5A567B',
            },
          },
        },
        {
          props: { variant: 'comment_value' },
          style: {
            border: '1px solid #ffffff',
            backgroundColor: '#3949ab',
            color: '#ffffff',
            height: 40,
            ...responsiveFontSizes({ xs: 8, sm: 10, md: 12, lg: 14 }),
            '&:hover': {
              boxShadow: theme.customShadows.z8,
              backgroundColor: '#ffffff',
              color: '#3949ab',
            },
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            border: '1px solid #ffffff',
            textTransform: 'none',
            backgroundColor: '#1565c0',
            color: '#ffffff',
            ...responsiveFontSizes({ xs: 8, sm: 10, md: 12, lg: 14 }),
            '&:hover': {
              boxShadow: theme.customShadows.z8,
              border: '1.5px solid #ffffff',
              backgroundColor: '#ffffff',
              color: '#1565c0',
            },
          },
        },
        {
          props: { variant: 'contained' },
          style: {
            border: '1px solid #ffffff',
            backgroundColor: '#1565c0',
            color: '#ffffff',
            height: 40,
            ...responsiveFontSizes({ xs: 8, sm: 10, md: 12, lg: 14 }),
            '&:hover': {
              boxShadow: theme.customShadows.z8,
              backgroundColor: '#ffffff',
              color: '#1565c0',
            },
          },
        },
        {
          props: { variant: 'submit' },
          style: {
            border: '1px solid #ffffff',
            backgroundColor: '#1e88e5',
            color: '#ffffff',
            height: 40,
            ...responsiveFontSizes({ xs: 8, sm: 10, md: 12, lg: 14 }),
            '&:hover': {
              boxShadow: theme.customShadows.z8,
              backgroundColor: '#1565c0',
            },
          },
        },
        {
          props: { variant: 'return' },
          style: {
            border: '1px solid #ffffff',
            backgroundColor: 'transparent',
            color: '#211D4E',
            height: 40,
            ...responsiveFontSizes({ xs: 8, sm: 10, md: 12, lg: 14 }),
            '&:hover': {
              backgroundColor: 'transparent',
            },
          },
        },
      ],
      styleOverrides: {
        root: {
          '&:hover': {
            boxShadow: 'none',
          },
        },
        sizeLarge: {
          height: 48,
        },
        containedInherit: {
          color: theme.palette.grey[800],
          boxShadow: theme.customShadows.z8,
          '&:hover': {
            backgroundColor: theme.palette.grey[400],
          },
        },
        containedPrimary: {
          boxShadow: theme.customShadows.primary,
        },
        containedSecondary: {
          boxShadow: theme.customShadows.secondary,
        },
        outlinedInherit: {
          border: `1px solid ${theme.palette.grey[500_32]}`,
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
        textInherit: {
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
      },
    },
  };
}
