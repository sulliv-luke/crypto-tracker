/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { HistoricalChart } from "../config/api";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import {
  CircularProgress,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import SelectButton from "./SelectButton";
import { chartDays } from "../config/data";
import { CryptoState } from "../CryptoContext";
import { styled } from "@mui/system";

const StyledContainer = styled("div")(({ theme }) => ({
    backgroundColor: "#14161a",
    color: theme.palette.primary.contrastText,
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      padding: 20,
      paddingTop: 0,
    },
  }));

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

 
const CoinInfo = ({ coin }) => {
    const [historicData, setHistoricData] = useState();
    const [days, setDays] = useState(1);
    const { currency } = CryptoState();
    const [flag,setflag] = useState(false);

    const fetchHistoricData = async () => {
        const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
        setflag(true);
        setHistoricData(data.prices);
    };

    useEffect(() => {
        fetchHistoricData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [days]);

    return (
        <ThemeProvider theme={darkTheme}>
            <StyledContainer>
            {!historicData | flag===false ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {setDays(day.value);
                    setflag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
            </StyledContainer>
        </ThemeProvider>

    );


}

export default CoinInfo;

