<template>
  <div class="city">
    <h2 class="city__heading">Current weather in {{ city }}, {{ country }}</h2>
    <div class="city__period">
      <p class="city__date">
        {{
          new Date(currentWeatherData.dt * 1000).toLocaleDateString('en-GB', {
            weekday: 'long',
            day: 'numeric',
            month: 'numeric',
          })
        }}
      </p>
      <p class="city__time">
        {{ new Date(currentWeatherData.dt * 1000).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' }) }}
      </p>
    </div>
    <CurrentWeather v-if="currentWeatherData" :currentWeatherData="currentWeatherData" />
    <h2 class="city__heading">3-day weather forecast</h2>
    <ForecastWeather v-if="weatherForecastData" :weatherForecastData="weatherForecastData" />
  </div>
</template>

<script setup>
import axios from 'axios';
const { city, country } = useRoute().params;
const { lat, lon } = useRoute().query;

const apiSecret = '78944caa0320d81e58634fc3895452b7';

const getCurrentWeatherData = async () => {
  try {
    const currentWeatherData = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiSecret}&units=metric`,
    );
    return currentWeatherData.data;
  } catch (error) {
    console.log(error);
  }
};

const getWeatherForecastData = async () => {
  try {
    const weatherForecastData = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiSecret}&units=metric`,
    );
    return weatherForecastData.data;
  } catch (error) {
    console.log(error);
  }
};

const currentWeatherData = await getCurrentWeatherData();
const weatherForecastData = await getWeatherForecastData();
console.log(weatherForecastData);
</script>

<style lang="scss" scoped>
.city {
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  &__heading {
    font-size: 16px;
    font-weight: 500;
    text-transform: uppercase;
    text-align: center;
    color: dimgray;
  }
  &__period {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  &__date {
    margin: 0 10px 0 0;
    font-weight: 600;
  }
  &__time {
    margin: 0;
  }
}
</style>
