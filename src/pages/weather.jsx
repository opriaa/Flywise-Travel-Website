import {
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Container,
  Box,
  Grid,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment/moment";
import "./weatherpage.css";

function Weather(props) {
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [selectedDay, setSelectedDay] = useState([]);
  const [days, setDays] = useState([]);
  const [currentWeather, setCurrentWeather] = useState(null);

  useEffect(() => {
    if (props.countrySelected != null) {
      setLoadingWeather(true);
      axios
        .get(
          `https://api.open-meteo.com/v1/forecast?latitude=${props.countrySelected.ll[0]}&longitude=${props.countrySelected.ll[1]}&hourly=temperature_2m,precipitation,weathercode`,
        )
        .then((res) => {
          const data = res.data;
          // console.log("vs- hey", res.data);

          const times = data.hourly.time;
          const temps = data.hourly.temperature_2m;
          const ppt = data.hourly.precipitation;
          const weatherCode = data.hourly.weathercode;

          const combinedData = times.map((time, index) => ({
            time,
            temp: temps[index],
            ppt: ppt[index],
            weatherCode: weatherCode[index],
            timeUnit: data.hourly_units.time,
            tempUnit: data.hourly_units.temperature_2m,
            pptUnit: data.hourly_units.precipitation,
            weatherCodeUnit: data.hourly_units.weathercode,
            timezone: data.timezone,
          }));
          props.setWeatherData(combinedData);
          console.log(combinedData);
          setLoadingWeather(false);
        })
        .catch((err) => {
          console.log("vs- error in api call on weather page", err);
          setLoadingWeather(false); // ← add this
        });
    }
  }, []);

  useEffect(() => {
    if (props.weatherData) {
      let day0 = [];
      let day1 = [];
      let day2 = [];
      let day3 = [];
      let day4 = [];
      let day5 = [];
      let day6 = [];
      props.weatherData.map((e, index) => {
        if (index < 24) {
          day0 = [...day0, e];
        } else if (index < 48) {
          day1 = [...day1, e];
        } else if (index < 72) {
          day2 = [...day2, e];
        } else if (index < 96) {
          day3 = [...day3, e];
        } else if (index < 120) {
          day4 = [...day4, e];
        } else if (index < 144) {
          day5 = [...day5, e];
        } else if (index < 168) {
          day6 = [...day6, e];
        }
      });
      setDays([day0, day1, day2, day3, day4, day5, day6]);
      setSelectedDay(day0);
    }
  }, [props.weatherData]);

  useEffect(() => {
    if (selectedDay.length > 0) {
      const currentTime = moment().format("YYYY-MM-DDTHH:00");
      const currentHourData = selectedDay.find(
        (hour) => hour.time === currentTime,
      );
      setCurrentWeather(currentHourData);
    }
  }, [selectedDay]);

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const showLoader = () => {
    return (
      <div className="weatherPage-loader">
        <CircularProgress />
        <div style={{ color: "white", paddingLeft: "20px" }}>
          <Typography variant="h4">Loading ...</Typography>
        </div>
      </div>
    );
  };
  const getWeatherEmoji = (code) => {
    switch (code) {
      case 0:
        return "☀️"; // Clear Sky
      case 1:
        return "🌤️"; // Mainly Clear
      case 2:
        return "⛅"; // Partly Cloudy
      case 3:
        return "☁️"; // Overcast
      case 45:
      case 48:
        return "🌫️"; // Fog
      case 51:
      case 53:
      case 55:
        return "🌦️"; // Drizzle
      case 61:
      case 63:
      case 65:
        return "🌧️"; // Rain Showers
      case 71:
      case 73:
      case 75:
        return "❄️"; // Snow
      case 80:
      case 81:
      case 82:
        return "🌦️"; // Rain Showers
      case 95:
      case 96:
      case 99:
        return "⛈️"; // Thunderstorms
      default:
        return "❓"; // Unknown
    }
  };

  const showWeatherPage = () => {
    return (
      <div>
        {props.weatherData && (
          <Container sx={{ color: "white" }}>
            <div style={{ padding: "20px" }}>
              <Typography
                variant="h4"
                style={{
                  marginTop: "60px",
                  marginBottom: "20px",
                  textAlign: "center",
                }}
              >
                Weather Forecast for {props.countrySelected?.label}{" "}
                {props.countrySelected?.flag}
              </Typography>

              {/* Current Weather Block */}
              {currentWeather && (
                <Box
                  sx={{
                    backgroundColor: "transparent",
                    borderRadius: "8px",
                    padding: "20px",
                    marginBottom: "20px",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h5" sx={{ marginBottom: "10px" }}>
                    Current Weather
                  </Typography>
                  <Typography variant="h6">
                    Temperature: {currentWeather.temp}°C
                  </Typography>
                  <Typography variant="h6">
                    Precipitation: {currentWeather.ppt || "0"} mm
                  </Typography>
                  <Typography variant="h6">
                    Condition: {getWeatherEmoji(currentWeather.weatherCode)}
                  </Typography>
                </Box>
              )}

              {/* Day Buttons */}
              <div
                style={{
                  marginBottom: "20px",
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                {days.map((day, index) => (
                  <Button
                    key={index}
                    color="inherit"
                    variant={selectedDay === day ? "outlined" : "text"}
                    onClick={() => handleDayClick(day)}
                  >
                    {index === 0
                      ? "Today"
                      : moment(day[0]?.time).format("dddd, DD MMM")}
                  </Button>
                ))}
              </div>

              {/* Weather Table */}
              {selectedDay.length > 0 && (
                <TableContainer
                  component={Paper}
                  style={{
                    font: "white",
                    maxWidth: "1000px",
                    margin: "0 auto",
                    backgroundColor: "rgba(99, 93, 93, 0.2)",
                  }}
                >
                  <Table
                    sx={{ alignItems: "center", display: "" }}
                    style={{ fontSize: 100 }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell align="center" sx={{ color: "white" }}>
                          Time
                        </TableCell>
                        <TableCell align="center" sx={{ color: "white" }}>
                          Temperature (°C)
                        </TableCell>
                        <TableCell align="center" sx={{ color: "white" }}>
                          Precipitation (mm)
                        </TableCell>
                        <TableCell align="center" sx={{ color: "white" }}>
                          Weather Condition
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedDay.map((hour, index) => (
                        <TableRow key={index}>
                          <TableCell align="center" sx={{ color: "white" }}>
                            {moment(hour.time).format("hh:mm A")}
                          </TableCell>
                          <TableCell align="center" sx={{ color: "white" }}>
                            {hour.temp}°C
                          </TableCell>
                          <TableCell align="center" sx={{ color: "white" }}>
                            {hour.ppt || "0"} mm
                          </TableCell>
                          <TableCell align="center" sx={{ color: "white" }}>
                            {getWeatherEmoji(hour.weatherCode)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </div>
          </Container>
        )}
      </div>
    );
  };
  return (
    <>
      <div className="weather-container">
        {props.countrySelected == null ? (
          <div className="select-cont">
            <Typography variant="h4" sx={{ color: "white" }}>
              Place not selected, go to the Home page to select the country.
            </Typography>
          </div>
        ) : loadingWeather ? (
          showLoader()
        ) : (
          showWeatherPage()
        )}
      </div>
    </>
  );
}

export default Weather;
