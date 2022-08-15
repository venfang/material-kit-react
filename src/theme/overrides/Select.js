// ----------------------------------------------------------------------

export default function Select(theme) {
      return {
            MuiSelect: {
                  styleOverrides: {
                        root: {
                              backgroundColor: "#FFFFFF",
                              boxShadow: "inset 0px 1px 4px 0px rgba(0, 0, 0, 0.2)",
                              borderRadius: 2,
                              height: "40px",
                              fontWeight: 500,
                              '&.Mui-disabled': {
                                    backgroundColor: "#EDEDED",
                              },
                        }
                  }
            }
      }
}
