import PropTypes from "prop-types";
// @mui
import { styled, alpha } from "@mui/material/styles";
import {
  Box,
  Stack,
  AppBar,
  Toolbar,
  Typography,
  Paper,
  Grid,
} from "@mui/material";
import InputBase from "@mui/material/InputBase";
// hooks
import useOffSetTop from "../../../hooks/useOffSetTop";
import useResponsive from "../../../hooks/useResponsive";
// next
import Image from "next/image";

// utils
import cssStyles from "../../../utils/cssStyles";
// config
import { HEADER, NAVBAR } from "../../../config";
// components
import Iconify from "../../../components/Iconify";
import { IconButtonAnimate } from "../../../components/animate";
//
import Searchbar from "./Searchbar";
import AccountPopover from "./AccountPopover";
import LanguagePopover from "./LanguagePopover";
import ContactsPopover from "./ContactsPopover";
import NotificationsPopover from "./NotificationsPopover";
import useSettings from "../../../hooks/useSettings";

// ----------------------------------------------------------------------

const RootStyle = styled(AppBar, {
  shouldForwardProp: (prop) =>
    prop !== "isCollapse" && prop !== "isOffset" && prop !== "verticalLayout",
})(({ isCollapse, isOffset, verticalLayout, theme }) => ({
  ...cssStyles(theme).bgBlur(),
  boxShadow: "none",
  height: HEADER.MOBILE_HEIGHT,
  zIndex: theme.zIndex.appBar + 1,
  paddingLeft: "0 !important",
  paddingRight: "0 !important",
  transition: theme.transitions.create(["width", "height"], {
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up("lg")]: {
    height: HEADER.DASHBOARD_DESKTOP_HEIGHT,
    width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH + 1}px)`,
    ...(isCollapse && {
      width: `calc(100% - ${NAVBAR.DASHBOARD_COLLAPSE_WIDTH}px)`,
    }),
    ...(isOffset && {
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
    }),
    ...(verticalLayout && {
      width: "100%",
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
      backgroundColor: theme.palette.background.paper,
    }),
  },
}));

// ----------------------------------------------------------------------

DashboardHeader.propTypes = {
  isCollapse: PropTypes.bool,
  onOpenSidebar: PropTypes.func,
  verticalLayout: PropTypes.bool,
};

export default function DashboardHeader({
  onOpenSidebar,
  isCollapse = false,
  verticalLayout = false,
}) {
  const isOffset =
    useOffSetTop(HEADER.DASHBOARD_DESKTOP_HEIGHT) && !verticalLayout;

  const isDesktop = useResponsive("up", "lg");

  const { themeMode } = useSettings();

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: themeMode === "light" ? "#F0E8F5": "#100616",
    // "&:hover": {
    //   backgroundColor: alpha(theme.palette.common.black, 0.12),
    // },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "420px !important",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));
  return (
    <RootStyle
      isCollapse={isCollapse}
      isOffset={isOffset}
      verticalLayout={verticalLayout}
    >
      <Toolbar
        sx={{
          minHeight: "100% !important",
          px: { lg: 5 },
          backgroundColor: themeMode === "light" ? "#fff" : "#1A0A23",
        }}
      >
        {/* {isDesktop && verticalLayout && <Image src={"/logo/icandy-logo.png"} 
        width={48} height={48}/>} */}

        {!isDesktop && (
          <IconButtonAnimate
            onClick={onOpenSidebar}
            sx={{ mr: 1, color: "text.primary" }}
          >
            <Iconify icon="eva:menu-2-fill" />
          </IconButtonAnimate>
        )}
      
        {
          isDesktop && (
            <Image src={"/logo/logo.png"} width={48} height={48}/>
          )
        }
        {/* <Typography
          sx={{
            fontSize: "32px",
            textTransform: "uppercase",
            color: "#9413EE",
            paddingLeft: "5px",
            lineHeight: "37px",
            display:{md: "block", sm: "none", xs: "none", lg: "block"}
          }}
        >
          HottiGras
        </Typography> */}
        <Grid sx={{ display:{md: "none", sm: "block", xs: "block", lg: "none"} }}>

        <Searchbar />
        </Grid>
        <Grid sx={{ display:{md: "block", sm: "none", xs: "none", lg: "block"} }}>
          <Search>
            <SearchIconWrapper>
              <Iconify icon={"eva:search-fill"} width={20} height={20} 
              bgColor="#6E767D"/>
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search icandy…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Grid>
        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 0.5, sm: 1.5 }}
        >
          {/* <LanguagePopover /> */}
          {/* <NotificationsPopover /> */}
          {/* <ContactsPopover /> */}
          <AccountPopover />
        </Stack>
      </Toolbar>
    </RootStyle>
  );
}
