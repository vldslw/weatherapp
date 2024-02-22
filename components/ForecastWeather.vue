<template>
  <div class="forecast">
    <div v-for="forecast in threeDaysForecast" :key="forecast.dt" class="forecast__item">
      <div class="forecast__period">
        <p class="forecast__date">
          {{ new Date(forecast.dt * 1000).toLocaleDateString('en-GB', { weekday: 'long' }) }}
        </p>
        <p class="forecast__time">{{ new Date(forecast.dt * 1000).toLocaleTimeString([], { hour: 'numeric' }) }}</p>
      </div>
      <div class="forecast__main">
        <p class="forecast__max-temperature">{{ Math.round(forecast.main.temp_max) }}&deg</p>
        <p class="forecast__min-temperature">{{ Math.round(forecast.main.temp_min) }}&deg</p>
      </div>
      <img
        class="forecast__icon"
        :src="`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`"
        alt="Weather icon"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  weatherForecastData: Object,
});

const threeDaysForecast = computed(() => {
  let now = new Date();
  now.setHours(0, 0, 0, 0);
  let threeDaysFromNow = new Date();
  threeDaysFromNow.setDate(now.getDate() + 4);
  threeDaysFromNow.setHours(0, 0, 0, 0);

  return props.weatherForecastData.list.filter((item) => {
    let forecastDate = new Date(item.dt * 1000);
    let forecastDateStartOfDay = new Date(forecastDate);
    forecastDateStartOfDay.setHours(0, 0, 0, 0);
    return forecastDateStartOfDay >= now && forecastDate < threeDaysFromNow;
  });
});
</script>

<style lang="scss" scoped>
.forecast {
  border: 1px solid grey;
  border-radius: 10px;
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
  &__item {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    border-bottom: 1px solid grey;
    margin-bottom: 10px;
    align-items: center;
    &:last-child {
      border-bottom: none;
      margin-bottom: 0;
    }
  }
  &__period {
    display: flex;
    flex-direction: column;
  }
  &__date {
    margin: 0;
    font-weight: 600;
  }
  &__time {
    color: grey;
    margin: 0;
  }
  &__main {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__max-temperature {
    margin: 0;
    font-size: 32px;
    font-weight: 500;
  }
  &__min-temperature {
    margin: 0;
    font-size: 18px;
    font-weight: 500;
    color: grey;
  }
  &__icon {
    margin: 0 0 0 auto;
    width: 50px;
    height: 50px;
  }
  &__description {
    text-align: start;
  }
}
</style>
