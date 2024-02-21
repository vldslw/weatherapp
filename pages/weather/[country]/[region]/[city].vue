<template>
  <div class="city">
    Weather in {{ city }}
  </div>
</template>

<script setup>
 const { city } = useRoute().params;

</script>

<style lang="scss" scoped>
.city {
  padding: 20px 40px;
}

</style>