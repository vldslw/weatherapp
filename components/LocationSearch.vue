<template>
  <div class="search">
    <input
      v-model="searchQuery"
      @input="getSearchResults"
      class="search__input"
      type="text"
      placeholder="Search for a location"
    />
    <p class="search__error" v-if="searchError">An error occured, please try later</p>
    <ul class="search__list" v-if="searchResults">
      <p class="search__noresults" v-if="searchResults.length === 0">
        No results found, please try a different search word
      </p>
      <li class="search__item" v-for="searchResult in searchResults" @click="viewCity(searchResult)">
        {{ searchResult.name }}{{ searchResult.state ? ', ' + searchResult.state : '' }}, {{ searchResult.country }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import axios from 'axios';
const router = useRouter();

const searchQuery = ref('');

const queryTimeout = ref(null);
const apiSecret = useRuntimeConfig().public.apiSecret;
const searchResults = ref(null);
const searchError = ref(null);

const viewCity = (searchResult) => {
  router.push({
    name: 'weather-country-region-city',
    params: {
      country: searchResult.country,
      region: searchResult.state ? searchResult.state : 'noregion',
      city: searchResult.name,
    },
    query: {
      lat: searchResult.lat,
      lon: searchResult.lon,
    },
  });
};

const getSearchResults = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== '') {
      try {
        const result = await axios.get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${searchQuery.value}&limit=5&appid=${apiSecret}`,
        );
        searchResults.value = result.data;
      } catch (error) {
        console.log(error);
        searchError.value = true;
      }
      return;
    }
    searchResults.value = null;
  }, 300);
};
</script>

<style lang="scss" scoped>
.search {
  position: relative;
  &__input {
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid black;
    outline: none;
  }
  &__list {
    position: absolute;
    width: 100%;
    box-sizing: border-box;
    top: 36px;
    padding: 10px;
    margin: 0;
  }
  &__item {
    cursor: pointer;
    list-style: none;
    &:hover {
      font-weight: 700;
      transition: font-weight 0.3s;
    }
  }
  &__error {
    padding: 10px;
    margin: 0;
    color: dimgray;
  }
  &__noresults {
    margin: 0;
    color: dimgray;
  }
}
</style>
