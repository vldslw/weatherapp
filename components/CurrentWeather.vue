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
    <div class="current__desc">
      <p class="current__desc-param">Humidity: {{ currentWeatherData.main.humidity }}%</p>
      <p class="current__desc-param">Wind: {{ currentWeatherData.wind.speed }} meter/sec</p>
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
  align-items: center;
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
    margin: auto 0;
    font-size: 48px;
  }
  @media screen and (max-width: 360px) {
    &__temperature {
      font-size: 32px;
  }
  }
  &__icon {
    width: 100px;
    height: 100px;
  }
  @media screen and (max-width: 360px) {
    &__icon {
      width: 50px;
    height: 50px;
  }
  }
  &__desc {
    text-align: start;
  }
  @media screen and (max-width: 360px) {
    &__desc {
      text-align: center;
  }
  }
  &__desc-param {
    margin: 0;
  }
  
}

@media screen and (max-width: 470px) {
  .current {
  flex-direction: column;
  }
}
</style>
