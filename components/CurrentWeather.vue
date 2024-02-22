<template>
  <div class="current">
    <div class="current__main">
      <p class="current__temperature">{{ Math.round(currentWeatherData.main.temp) }}&deg</p>
      <img
        class="current__icon"
        :src="`http://openweathermap.org/img/wn/${currentWeatherData.weather[0].icon}@2x.png`"
        alt="Weather icon"
      />
    </div>
    <div class="current__description">
      <p class="current__humidity">Humidity: {{ currentWeatherData.main.humidity }}%</p>
      <p class="current__wind">Wind: {{ currentWeatherData.wind.speed }} meter/sec</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  currentWeatherData: Object,
});
</script>

<style lang="scss" scoped>
.current {
  display: flex;
  justify-content: space-between;
  border: 1px solid grey;
  border-radius: 10px;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  &__main {
    display: flex;
    justify-content: space-between;
  }
  &__temperature {
    margin: 20px;
    font-size: 48px;
    font-weight: 500;
  }
  &__icon {
    width: 100px;
    height: 100px;
  }
  &__description {
    text-align: start;
  }
}
</style>
