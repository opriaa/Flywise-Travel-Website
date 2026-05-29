import bg5 from "./assets/bg5.jpg";
import bg6 from "./assets/bg6.jpg";
import bg7 from "./assets/bg7.jpg";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/homepage";
import Currency from "./pages/currency";
import Weather from "./pages/weather";
import Nopage from "./pages/nopage";
import ButtonAppBar from "./appBar";
import { useEffect, useState } from "react";

function App() {
  const [countriesList, setCountriesList] = useState(() => {
    const saved = localStorage.getItem("countriesList");
    return saved ? JSON.parse(saved) : null;
  });

  const [countrySelected, setCountrySelected] = useState(() => {
    const saved = localStorage.getItem("countrySelected");
    return saved ? JSON.parse(saved) : null;
  });

  const [weatherData, setWeatherData] = useState([]);
  const [currenciesData, setCurrenciesData] = useState([]);

  const [currArr, setCurrArr] = useState(() => {
    const saved = localStorage.getItem("currArr");
    return saved ? JSON.parse(saved) : [];
  });

  // Persist countriesList to localStorage
  useEffect(() => {
    if (countriesList) {
      localStorage.setItem("countriesList", JSON.stringify(countriesList));
    }
  }, [countriesList]);

  // Persist countrySelected to localStorage
  useEffect(() => {
    if (countrySelected) {
      localStorage.setItem("countrySelected", JSON.stringify(countrySelected));
    }
  }, [countrySelected]);

  // Persist currArr to localStorage
  useEffect(() => {
    if (currArr.length > 0) {
      localStorage.setItem("currArr", JSON.stringify(currArr));
    }
  }, [currArr]);

  useEffect(() => {
    console.log("vs- new cont list = ", countriesList);
  }, [countriesList]);

  useEffect(() => {
    console.log("vs- new currency list = ", currArr);
  }, [currArr]);

  useEffect(() => {
    console.log("vs- selected cont = ", countrySelected);
  }, [countrySelected]);

  const setCountryListFn = (data) => {
    setCountriesList(data);
  };

  useEffect(() => {
    console.log("vs- new weather list = ", weatherData);
  }, [weatherData]);

  useEffect(() => {
    console.log("vs- new currencies list = ", currenciesData);
  }, [currenciesData]);

  return (
    <div>
      <ButtonAppBar />
      <Routes>
        <Route
          path="/"
          element={
            <div
              style={{
                backgroundImage: `url(${bg5})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
              }}
            >
              <Homepage
                countriesList={countriesList}
                setCountryListFn={setCountryListFn}
                setCountrySelected={setCountrySelected}
                countrySelected={countrySelected}
                setCurrArr={setCurrArr}
              />
            </div>
          }
        />
        <Route
          path="/currency"
          element={
            <div
              style={{
                bbackgroundImage: `url(${bg6})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
              }}
            >
              <Currency
                countrySelected={countrySelected}
                setCurrenciesData={setCurrenciesData}
                currArr={currArr}
                countriesList={countriesList}
              />
            </div>
          }
        />
        <Route
          path="/weather"
          element={
            <div
              style={{
                backgroundImage: `url(${bg7})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
              }}
            >
              <Weather
                countrySelected={countrySelected}
                setWeatherData={setWeatherData}
                weatherData={weatherData}
              />
            </div>
          }
        />
        <Route path="*" element={<Nopage />} />
      </Routes>
    </div>
  );
}

export default App;
