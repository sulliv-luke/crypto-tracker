import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";
import {
  Container,
  TableCell,
  LinearProgress,
  Typography,
  TextField,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  Paper,
} from "@mui/material";
import axios from "axios";
import { CoinList } from "../config/api";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

// eslint-disable-next-line react-refresh/only-export-components
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const StyledRow = styled(TableRow)({
  backgroundColor: "#16171a",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#131111",
  },
  fontFamily: "Montserrat",
});

const StyledPagination = styled(Pagination)({
  "& .MuiPaginationItem-root": {
    color: "gold",
    padding: 20,
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
});

const StyledContainer = styled(Container)({
  textAlign: 'center',
});

const StyledTypography = styled(Typography)({
  margin: 18, 
  fontFamily: "Montserrat",
});

const StyledTextField = styled(TextField)({
  marginBottom: 20, 
  width: "100%",
})

const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });

  export default function CoinsTable() {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const { currency, symbol } = CryptoState();

    const history = useNavigate();

    const fetchCoins = async () => {
      setLoading(true);
      const { data } = await axios.get(CoinList(currency));
      console.log(data);
  
      setCoins(data);
      setLoading(false);
    };

    useEffect(() => {
      fetchCoins();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency]);

    const handleSearch = () => {
      return coins.filter(
        (coin) =>
          coin.name.toLowerCase().includes(search) ||
          coin.symbol.toLowerCase().includes(search)
      );
    };

    return (
      <ThemeProvider theme={darkTheme}>
        <StyledContainer>
            <StyledTypography variant="h4">
              Cryptocurrency Prices by Market Cap
            </StyledTypography>
            <StyledTextField 
              label="Search For a Crypto Currency.."
              variant="outlined"
              onChange={(e) => setSearch(e.target.value)}/>
              <TableContainer component={Paper}>
                {loading ? (
                  <LinearProgress style={{ backgroundColor: "gold" }} />
                ): (
                  <Table aria-label="simple table">
                    <TableHead>
                      <StyledRow>
                        {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                          <TableCell
                            style={{
                            color: "white",
                            fontWeight: "700",
                            fontFamily: "Montserrat",
                          }}
                          key={head}
                          align={head === "Coin" ? "" : "right"}
                        >
                          {head}
                        </TableCell>
                      ))}
                      </StyledRow>
                    </TableHead>

                    <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <StyledRow
                        onClick={() => history(`/coins/${row.id}`)}
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                      </StyledRow>
                    );
                  })}
              </TableBody>
                  </Table>
                )}
              </TableContainer>
              <StyledPagination
          count={(handleSearch()?.length / 10).toFixed(0)}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
        </StyledContainer>
      </ThemeProvider>
    );

  }
