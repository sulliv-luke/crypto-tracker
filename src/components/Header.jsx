import {
    AppBar,
    Container,
    MenuItem,
    Select,
    Toolbar,
    Typography,
  } from "@mui/material";
  import { createTheme, ThemeProvider } from "@mui/material/styles";
  import { styled } from "@mui/system";
  import { useNavigate } from "react-router-dom";
  import { CryptoState } from "../CryptoContext";
  
  const StyledTypography = styled(Typography)({
    flex: 1,
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
  });
  
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });
  
  function Header() {
    const { currency, setCurrency } = CryptoState();
  
    const history = useNavigate();
  
    return (
      <ThemeProvider theme={darkTheme}>
        <AppBar color="transparent" position="static">
          <Container>
            <Toolbar>
              <StyledTypography
                onClick={() => history(`/`)}
                variant="h6"
              >
                Crypto Tracker
              </StyledTypography>
              {/* <Button color="inherit">Login</Button> */}
              <Select
                variant="outlined"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={currency}
                style={{ width: 100, height: 40, marginLeft: 15 }}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={"EUR"}>EUR</MenuItem>
              </Select>
              </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
  