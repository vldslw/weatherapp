
import type { logger } from 'nuxt/kit';
<template>
  <div>
    <input 
      v-model="searchQuery" 
      @input="getSearchResults"
      class="search__input" 
      type="text" 
      placeholder="Search for a location" 
    />
    <ul class="search__list" v-if="searchResults">
      <p v-if="searchError">An error occured, please try later</p>
      <p v-if="searchResults.length === 0">No results found, please try a different search word</p>
      <li class="search__item" v-for="searchResult in searchResults" @click="previewCity(searchResult)">{{ searchResult.name }}{{ searchResult.state ? ', ' + searchResult.state : '' }}, {{ searchResult.country }}</li>
    </ul>
  </div>
</template>

<script setup>
import axios from 'axios'
const router = useRouter()

const searchQuery = ref('');

const queryTimeout = ref(null);
const apiSecret = '78944caa0320d81e58634fc3895452b7';
const searchResults = ref(null);
const searchError = ref(null);

const previewCity = (searchResult) => {
  router.push({
    name: 'weather-country-region-city', 
    params: { country: searchResult.country, region: searchResult.state ? searchResult.state : 'noregion', city: searchResult.name },
    query: {
      lat: searchResult.lat,
      lon: searchResult.lon,
      preview: true
    }
  })
}

const getSearchResults = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== '') {
      console.log(apiSecret);
      try {
        const result = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${searchQuery.value}&limit=5&appid=${apiSecret}`);
        searchResults.value = result.data;
        console.log(searchResults.value);

      } catch (error) {
        searchError.value = true;
      }


      
      return
    }
    searchResults.value = null;

  }, 300)

}

</script>

<style lang="scss" scoped>
.search {
  &__input {
    padding: 10px;
    width: 100%;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid black;
    outline: none;

  }
  &__list {
    position: absolute;
    width: 100%;
    top: 130px;
    padding: 10px;
    margin: 0;
  }
  &__item {
    cursor: pointer;
    list-style: none;
  }
}

</style>