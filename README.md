# The Weather App

The Weather App is a React-based application that provides current weather information for various cities. Users can add cities to their list, view current weather conditions, and customize the displayed weather details via settings.

## Features

- Display current weather for the user's location.
- Add and manage a list of cities.
- Customize weather details such as humidity, feels-like temperature, sunrise, and sunset times.
- Dynamic background images based on weather conditions.
- Local storage support for saving cities and settings.
## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager) or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/weather-app.git
2. Navigate to the project directory:

cd weather-app
3. Install the dependencies:

npm install
# or
yarn install
##Running the App in Development Mode
1. Start the development server:

npm start
# or
yarn start
2. Open your browser and visit http://localhost:3000 to view the app.
##Building the App
To create an optimized production build, run:


npm run build
# or
yarn build
The build artifacts will be stored in the build/ directory.

##API
The application uses the OpenWeatherMap API to fetch weather data. Ensure you have a valid API key from OpenWeatherMap and replace the placeholder API key in the code with your actual key.

Environment Variables
Create a .env file in the root directory and add the following:


REACT_APP_WEATHER_API_KEY=your_openweathermap_api_key
This will ensure that your API key is securely loaded into the application.





