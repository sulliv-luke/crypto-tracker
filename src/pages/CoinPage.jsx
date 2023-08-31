/* eslint-disable react-hooks/exhaustive-deps */
import { LinearProgress, Typography} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from 'html-react-parser';
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api";
import { numberWithCommas } from "../components/CoinsTable";
import { CryptoState } from "../CryptoContext";
import { styled } from "@mui/material/styles";

const StyledContainer = styled('div')(({ theme }) => ({
    minWidth: "100vw",
    margin: 0,
    padding: 0,
    color: theme.palette.primary.contrastText,
    width: "75%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  }));

  const StyledSidebar = styled("div")(({ theme }) => ({
      width: "40%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey",
  }));

  const StyledHeading = styled(Typography)({
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "Montserrat",
  });

  const StyledDesc = styled(Typography)({
    width: "100%",
    fontFamily: "Montserrat",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify",
  })

  const StyledMarketData = styled("div")(({ theme }) => ({
      alignSelf: "start",
      padding: 25,
      paddingTop: 10,
      width: "100%",
      [theme.breakpoints.down("md")]: {
        display: "flex",
        justifyContent: "space-around",
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
      },
      [theme.breakpoints.down("xs")]: {
        alignItems: "start",
      },
  }));

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();
  const [parsedDescription, setDescription] = useState();
  
  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (coin) {
        setDescription(parse(coin?.description.en.split(". ")[0]));
    }
  }, [coin]);
  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;
  console.log(coin);
  return (
    <StyledContainer>
        <StyledSidebar>
            <img
            src={coin?.image.large}
            alt={coin?.name}
            height="200"
            style={{ marginBottom: 20 }}
            />
            <StyledHeading variant="h3">{coin?.name}</StyledHeading>
            <StyledDesc variant="subtitle1">
                {parsedDescription}
            </StyledDesc>
            <StyledMarketData>
                <span style={{ display: "flex" }}>
                    <StyledHeading variant="h5">
                        Market Cap
                    </StyledHeading>
                    &nbsp; &nbsp;
                    <Typography
                    variant="h5"
                    style={{
                    fontFamily: "Montserrat",
                    }}>
                        {symbol}{" "}
                        {numberWithCommas(
                        coin?.market_data.market_cap[currency.toLowerCase()]
                        .toString()
                        .slice(0, -6)
                        )}
                        M
                    </Typography>
                </span>

                <span style={{ display: "flex" }}>
                    <StyledHeading variant="h5">
                        Current Price
                    </StyledHeading>
                    &nbsp; &nbsp;
                    <Typography
                    variant="h5"
                    style={{
                    fontFamily: "Montserrat",
                    }}>
                        {symbol}{" "}
                        {numberWithCommas(
                        coin?.market_data.current_price[currency.toLowerCase()]
                        .toString()
                        )}
                    </Typography>
                </span>
            </StyledMarketData>
        </StyledSidebar>
        <CoinInfo coin={coin} />
    </StyledContainer>
  )

}

export default CoinPage;