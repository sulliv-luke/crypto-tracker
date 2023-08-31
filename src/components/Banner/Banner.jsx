import { Container, Typography } from "@mui/material";
import { styled } from "@mui/system";
import Carousel from "./Carousel";

const Banner = styled("div")({
  backgroundImage: "url(./banner2.jpg)",
  "& .bannerContent": {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
  "& .tagline": {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    marginBottom: 0,
  },
  "& .carousel": {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
});

export default function BannerComponent() {
  return (
    <Banner>
      <Container className="bannerContent">
        <div className="tagline">
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              fontFamily: "Montserrat",
              fontSize: "2.5rem",
            }}
          >
            Crypto Tracker
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Your home for Crypto updates
          </Typography>
        </div>
        <Carousel />
      </Container>
    </Banner>
  );
}
