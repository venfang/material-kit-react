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

export default function Input(theme) {
  return {
    MuiInputBase: {
      styleOverrides: {
        root: {
          "&.textField": {
            backgroundColor: "#FFFFFF",
            boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.2)",
            border: "0.1px solid #bdbdbd",
            borderRadius: 2,
            height: "40px",
            fontWeight: 500,

            ...responsiveFontSizes({ xs: 10, sm: 12, md: 14, lg: 14 }),
            '&.Mui-disabled': {
              backgroundColor: "#EDEDED",
            },
            input: {
              padding: "13px",
              color: "#5A567B !important",
              WebkitTextFillColor: "#5A567B !important",
              '&::placeholder': {
                opacity: 0.6,
                color: "#5A567B",
              },
            },
          },
          '&.Mui-disabled': {
            '& svg': { color: theme.palette.text.disabled }
          }
        },
        input: {
          '&::placeholder': {
            opacity: 1,
            color: theme.palette.text.disabled
          }
        }
      }
    },
    MuiInput: {
      styleOverrides: {
        underline: {
          '&:before': {
            borderBottomColor: theme.palette.grey[500_56],
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          padding: '25px 25px 8px',
          backgroundColor: theme.palette.grey[500_12],
          '&:hover': {
            backgroundColor: theme.palette.grey[500_16],
          },
          '&.Mui-focused': {
            backgroundColor: theme.palette.action.focus,
          },
          '&.Mui-disabled': {
            backgroundColor: theme.palette.action.disabledBackground,
          },
        },
        underline: {
          '&:before': {
            borderBottomColor: theme.palette.grey[500_56],
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.grey[500_32],
          },
          '&.Mui-disabled': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.action.disabledBackground,
            },
          },
        },
      },
    },
  };
}
