import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

function Currency(props) {
  const [loadingCurrency, setLoadingCurrency] = useState(false);
  const [filteredCurrencies, setFilteredCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState(null);
  const [toCurrency, setToCurrency] = useState(null);
  const [filteredCurrenciesRates, setFilteredCurrenciesRates] = useState([]);
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("");

  // console.log("vs- exchange rates", filteredCurrenciesRates);

  //--------------------------------------------------------------------------------------------------------
  useEffect(() => {
    setLoadingCurrency(true);
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get(
          "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json",
        );

        const UppercaseCurrencies = Object.keys(response.data).reduce(
          (acc, key) => {
            acc[key.toUpperCase()] = response.data[key];
            return acc;
          },
          {},
        );
        props.setCurrenciesData(UppercaseCurrencies);
        // console.log("vs-", Object.keys(UppercaseCurrencies));

        const filteredCurr = Object.keys(UppercaseCurrencies)
          .filter((key) => props.currArr.includes(key))
          .map((key) => ({
            code: key,
            name: UppercaseCurrencies[key],
          }));
        setFilteredCurrencies(filteredCurr);

        // console.log("vs -new currr", filteredCurrencies); //------------------to be displayed in options
        if (props.countrySelected) {
          const selectedCurrency = filteredCurr.find(
            (c) => c.code === props.countrySelected.curr,
          );
          setToCurrency(selectedCurrency || null); // Set it only if found
        } else {
          setToCurrency(null); // Keep 'To' empty if accessed via navbar
        }
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };
    const fetchCurrenciesRates = async () => {
      try {
        const response = await axios.get(
          "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json",
        );
        console.log(response.data);
        const UppercaseCurrenciesRates = Object.keys(response.data.eur).reduce(
          (acc, key) => {
            acc[key.toUpperCase()] = response.data.eur[key];
            return acc;
          },
          {},
        );
        // console.log("vs-big", UppercaseCurrenciesRates);
        const filteredCurrRates = Object.keys(UppercaseCurrenciesRates)
          .filter((key) => props.currArr.includes(key))
          .reduce((obj, key) => {
            obj[key] = UppercaseCurrenciesRates[key];
            return obj;
          }, {});
        setFilteredCurrenciesRates(filteredCurrRates); //---------------------displayed
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };
    fetchCurrencies();
    fetchCurrenciesRates();
    setLoadingCurrency(false);
  }, [props.countrySelected]);

  const handleSwitch = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };
  //---------------------------------------------------------------------------------------------

  const handleConversionButton = () => {
    console.log("Button clicked!"); // Debugging log
    console.log("Exchange Rates:", filteredCurrenciesRates); // Debug rates
    if (!fromCurrency || !toCurrency || !amount) {
      alert("Please select currencies and enter an amount.");
      return;
    }
    const fromRate = filteredCurrenciesRates[fromCurrency.code];
    const toRate = filteredCurrenciesRates[toCurrency.code];
    if (fromRate && toRate) {
      const converted = (amount / fromRate) * toRate;
      setConvertedAmount(converted.toFixed(2));
    } else {
      setConvertedAmount(" unavailable");
    }
  };

  const showLoader = () => {
    return (
      <div className="currency-loader">
        <CircularProgress />
        <div>Loading ...</div>
      </div>
    );
  };
  const boxStyles = {
    background: "transparent", // Set background to transparent
    textAlign: "center",
    borderRadius: 2,
    padding: "8rem 2rem",
    boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
    maxWidth: "1200px",
    width: "100%",
    margin: "auto",
    backgroundColor: "rgba(58, 56, 56, 0.2)",
    marginBottom: "100px",
  };

  const showCurrencyPage = () => {
    return (
      <Container maxWidth="md" sx={boxStyles}>
        <Typography
          variant="h4"
          sx={{ marginBottom: "2rem", color: "#ff577c", fontWeight: 600 }}
        >
          Currency Converter
        </Typography>
        <Box
          sx={{
            backgroundColor: "transparent",
            borderRadius: "8px",
            padding: "20px",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{ marginBottom: "10px", color: "white" }}
          >
            Destination {props.countrySelected?.label}
          </Typography>
          <Typography variant="h6" sx={{ color: "white" }}>
            Capital: {props.countrySelected?.capital}
          </Typography>
          <Typography variant="h6" sx={{ color: "white" }}>
            Continent: {props.countrySelected?.continent}
          </Typography>
        </Box>
        {/*amount*/}
        <Grid container spacing={2}>
          <Grid item xs={12} md>
            <TextField
              label=" Enter the Amount"
              fullWidth
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
              InputProps={{
                type: "number",
              }}
            />
          </Grid>
          {/*from country*/}
          <Grid item xs={12} md={3}>
            <Autocomplete
              options={filteredCurrencies}
              getOptionLabel={(option) => ` ${option.code} - ${option.name}`}
              value={fromCurrency}
              onChange={(event, newValue) => setFromCurrency(newValue)}
              style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
              renderInput={(params) => <TextField {...params} label="From" />}
            />
          </Grid>
          {/*switch button*/}
          <Grid item xs={12} md="auto">
            <Button
              sx={{ borderRadius: 5, height: "100%" }}
              onClick={handleSwitch}
            >
              <SwapHorizIcon sx={{ fontSize: 30 }} />
            </Button>
          </Grid>
          {/*to country*/}
          <Grid item xs={12} md={3}>
            <Autocomplete
              options={filteredCurrencies}
              getOptionLabel={(option) => ` ${option.code} - ${option.name}`}
              value={toCurrency}
              onChange={(event, newValue) => setToCurrency(newValue)}
              style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
              renderInput={(params) => <TextField {...params} label="To" />}
            />
          </Grid>
        </Grid>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleConversionButton}
            sx={{ marginTop: "2rem" }}
          >
            Convert
          </Button>
          {convertedAmount && (
            <Typography variant="h6" sx={{ marginTop: "1rem", color: "white" }}>
              {" "}
              {/* Set text color to white */}
              {props.countrySelected == null ? (
                <div>
                  Converted Amount is = {convertedAmount} {toCurrency.code}
                </div>
              ) : (
                <div>
                  Converted Amount is: {convertedAmount}{" "}
                  {props.countrySelected.symbol}
                </div>
              )}
            </Typography>
          )}
        </div>
      </Container>
    );
  };

  return (
    <>
      <div className="currency-container">
        {loadingCurrency ? showLoader() : showCurrencyPage()}
      </div>
    </>
  );
}

export default Currency;
