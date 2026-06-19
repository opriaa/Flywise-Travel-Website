🌍 FlyWise — Travel, Currency & Weather App

FlyWise is a multi-page React web application that helps travelers make informed decisions by providing real-time currency exchange rates and 7-day weather forecasts for any country — all in one place.

🔗 Live Demo: flywise-travel-website.vercel.app


✨ Features


🌐 Select any country and instantly view live data
💱 Real-time currency conversion using ExchangeRate-API
☀️ 7-day weather forecast using OpenWeatherMap API
📱 Fully responsive design built with Material UI
⚡ Smooth async data fetching with independent loading states
🛡️ Graceful error handling — one API failing doesn't break the other

🏗️ Architecture
User selects a country
        │
        ▼
useEffect triggers on country change
        │
        ├──► ExchangeRate-API (currency data)
        │
        └──► OpenWeatherMap API (weather data)
        │
        ▼
Independent loading & error states per section
        │
        ▼
React renders live data with Material UI components

📂 Project Structure

flywise/
├── src/
│   ├── components/
│   │   ├── CountrySelector.jsx
│   │   ├── CurrencyCard.jsx
│   │   └── WeatherCard.jsx
│   ├── App.jsx
│   └── index.js
├── public/
└── package.json

🚀 Getting Started

Prerequisites


Node.js (v16 or higher)
npm or yarn


Installation

bash# Clone the repository
git clone https://github.com/opriaa/flywise.git

# Navigate to project directory
cd flywise

# Install dependencies
npm install

# Add your API keys in a .env file
REACT_APP_EXCHANGE_API_KEY=your_key_here
REACT_APP_WEATHER_API_KEY=your_key_here

# Run the development server
npm start

The app will run at http://localhost:3000
