import { makeStyles } from "@material-ui/core/styles";
import { colors } from "../../constant/constant";

const editStyle = makeStyles((theme) => ({
  editWrapper: {
    padding: theme.spacing(4, 0, 8),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3, 0, 5),
    },
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(3, 0, 4),
    },
    "& .btnWrapper": {
      marginTop: theme.spacing(3),
      display: "flex",
      justifyContent: "space-between",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
      },
      "& .btn": {
        height: "40px",
        lineHeight: "40px",
        borderRadius: "4px",
        textTransform: "none",
        fontSize: "16px",
        minWidth: "100px",
        "&+.btn": {
          marginTop: theme.spacing(2),
          [theme.breakpoints.down("sm")]: {
            marginTop: theme.spacing(1),
          },
        },
      },
    },
    "& .formRowWrapper": {
      display: "flex",
      alignItems: "center",
      marginBottom: theme.spacing(2),
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
      },
      "& .formCol": {
        flex: "1",
        "&:not(:last-child)": {
          marginRight: theme.spacing(2),
          [theme.breakpoints.down("sm")]: {
            marginRight: 0,
            marginBottom: theme.spacing(2),
          },
        },
        "&.fullWidth": {
          flex: "2",
        },
        "& .MuiOutlinedInput-root": {
          width: "100%",
        },
      },
    },
    "& .inputSmall": {
      height: "40px",
      lineHeight: "normal",
      padding: "5px 12px",
    },
  },
  greenBtn: {
    backgroundColor: colors.green,
    color: "#fff",
    "&:hover": {
      backgroundColor: colors.darkGreen,
    },
  },
  pinkBtn: {
    backgroundColor: colors.pink,
    color: "#fff",
    "&:hover": {
      backgroundColor: colors.darkPink,
    },
  },
  // Media Queries
  [theme.breakpoints.down("sm")]: {
    "& .formCol": {
      "& .MuiOutlinedInput-root": {
        width: "100%",
      },
    },
  },
  [theme.breakpoints.down("xs")]: {
    "& .formCol": {
      "&:not(:last-child)": {
        marginBottom: theme.spacing(2),
      },
    },
  },
}));

export { editStyle };
