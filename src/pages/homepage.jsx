import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import "./homepage.css";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, Button, Container, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";

function Homepage(props) {
  const [loading, setLoading] = useState(false);
  let currArr = [];
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        "https://restcountries.com/v3.1/all?fields=name,flags,currencies,continents,latlng,cca2,cca3,capital,maps",
      )
      .then(async (res) => {
        console.log("obj", res);

        await timeout(300);
        let countryData = res.data.map((e) => {
          let curren = e.currencies != null ? Object.keys(e.currencies)[0] : "";
          let symbolCurr =
            e.currencies != null ? e?.currencies[curren]?.symbol : "$";
          let conti = e.continents[0];
          currArr.push(curren);
          return {
            label: e.name.common,
            flag: e.flag,
            curr: curren,
            c2: e.cca2,
            c3: e.cca3,
            ll: e.latlng,
            symbol: symbolCurr,
            map: e.maps.openStreetMaps,
            continent: conti,
            capital: e.capital,
          };
        });
        props.setCurrArr(currArr);
        countryData.sort((a, b) => a.label.localeCompare(b.label));
        props.setCountryListFn(countryData);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error in api call on homepage:", err);
        setLoading(false); // add this so the spinner stops!
      });
  }, []);

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  const showLoading = () => {
    return (
      <div className="homepage-loader">
        <CircularProgress />
        <Typography variant="h6" style={{ marginTop: "10px", color: "white" }}>
          Loading countries list...
        </Typography>
      </div>
    );
  };

  const handleNavigation = (path) => {
    if (props.countrySelected) {
      navigate(path);
    } else {
      alert("Please select a country first!");
    }
  };

  const showHomePage = () => {
    return (
      <div className="boxes_two">
        <Container>
          <Typography
            variant="h2"
            className="tagline"
            style={{ color: "white", fontWeight: 200 }}
          >
            Magical Travel by Flywise
          </Typography>
          <Typography
            className="subtext"
            style={{ color: "white" }}
            variant="subtitle2"
            gutterBottom
          >
            Here, the focus is on seamless travel experiences. Explore the world
            with ease.
          </Typography>
        </Container>
        <Container maxWidth="sm" className="homepage-content-container">
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            style={{ color: "#cccccc", fontWeight: 600 }}
          >
            Welcome to Flywise
          </Typography>
          <Autocomplete
            disablePortal
            className="auto-comp"
            disableClearable
            options={props.countriesList}
            sx={{ width: "100%", marginBottom: "20px" }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select a country"
                variant="outlined"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
              />
            )}
            renderOption={(props, option) => {
              const { key, ...optionProps } = props;
              return (
                <Box
                  key={key}
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...optionProps}
                >
                  {option.flag} {option.label} ({option.c2})
                </Box>
              );
            }}
            onChange={(e, value) => {
              props.setCountrySelected(value);
            }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            endIcon={<SendIcon />}
            onClick={() => handleNavigation("/currency")}
            style={{
              marginBottom: "10px",
              backgroundColor: "rgba(25, 118, 210, 0.8)",
            }}
          >
            Convert currency
          </Button>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            endIcon={<SendIcon />}
            onClick={() => handleNavigation("/weather")}
            style={{ backgroundColor: "rgba(156, 39, 176, 0.8)" }}
          >
            Find weather
          </Button>
        </Container>{" "}
      </div>
    );
  };

  return (
    <div className="homepage-container">
      {loading ? showLoading() : showHomePage()}
    </div>
  );
}

export default Homepage;
