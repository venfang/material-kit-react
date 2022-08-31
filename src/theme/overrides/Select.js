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
export default function Select(theme) {
      return {
            MuiSelect: {
                  styleOverrides: {

                        root: {
                              "&.red": {
                                    backgroundColor: "#FFFFFF",
                                    boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.2)",
                                    border: "0.1px solid #bdbdbd",
                                    borderRadius: 2,
                                    height: "40px",
                                    fontWeight: 500,
                                    color: "#FF0000 !important",
                                    WebkitTextFillColor: "#FF0000 !important",
                                    ...responsiveFontSizes({ xs: 8, sm: 10, md: 12, lg: 12 }),
                                    '&.Mui-disabled': {
                                          backgroundColor: "#EDEDED",
                                    },
                              },
                              backgroundColor: "#FFFFFF",
                              boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.2)",
                              border: "0.1px solid #bdbdbd",
                              borderRadius: 2,
                              height: "40px",
                              fontWeight: 500,
                              color: "#5A567B !important",
                              WebkitTextFillColor: "#5A567B !important",
                              ...responsiveFontSizes({ xs: 8, sm: 10, md: 12, lg: 12 }),
                              '&.Mui-disabled': {
                                    backgroundColor: "#EDEDED",
                                    color: "#5A567B !important",
                                    WebkitTextFillColor: "#5A567B !important",
                              },
                        }
                  }
            }
      }
}
