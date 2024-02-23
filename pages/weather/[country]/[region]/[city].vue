<template>
  <div class="city">
    <h2 class="city__heading">
      Current weather in <span class="city__heading-highlight">{{ city }}, {{ country }}</span>
    </h2>
    <div v-if="currentWeatherData" class="city__period">
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
    <p class="city__error" v-if="dataError">An error occured, please try later</p>
    <h2 class="city__heading">3-day weather forecast</h2>
    <p class="city__error" v-if="dataError">An error occured, please try later</p>
    <ForecastWeather v-if="weatherForecastData" :weatherForecastData="weatherForecastData" />
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
const { city, country } = useRoute().params;
const { lat, lon } = useRoute().query;
const dataError = ref(null);
const isLoading = ref(true);
const currentWeatherData = ref(null);
const weatherForecastData = ref(null);

const apiSecret = '78944caa0320d81e58634fc3895452b7';

const getCurrentWeatherData = async () => {
  try {
    isLoading.value = true;
    const currentWeatherData = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiSecret}&units=metric`,
    );
    isLoading.value = false;
    return currentWeatherData.data;
  } catch (error) {
    isLoading.value = false;
    dataError.value = true;
    console.log(error);
  }
};

const getWeatherForecastData = async () => {
  try {
    isLoading.value = true;
    const weatherForecastData = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiSecret}&units=metric`,
    );
    isLoading.value = false;
    return weatherForecastData.data;
  } catch (error) {
    isLoading.value = false;
    dataError.value = true;
    console.log(error);
  }
};

currentWeatherData.value = await getCurrentWeatherData();
weatherForecastData.value = await getWeatherForecastData();
</script>

<style lang="scss" scoped>
.city {
  padding: 20px 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  &__heading {
    font-size: 16px;
    text-transform: uppercase;
    text-align: center;
    color: dimgray;
    font-weight: 400;
  }
  &__heading-highlight {
    font-weight: 700;
    color: black;
  }
  &__period {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  &__date {
    margin: 0 10px 0 0;
    font-weight: 700;
  }
  &__time {
    margin: 0;
  }
  &__error {
    margin: 0;
    border: 1px solid grey;
    border-radius: 10px;
    width: 100%;
    padding: 20px;
    text-align: center;
    color: dimgray;
  }
}

@media screen and (max-width: 1280px) {
  .city {
    padding: 20px 180px;
  }
}

@media screen and (max-width: 800px) {
  .city {
    padding: 20px 40px;
  }
}
</style>
