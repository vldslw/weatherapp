<template>
  <div>
    <header class="header">
    <nav>
      <NuxtLink class="header__logo" to="/">The Weather App</NuxtLink>
    </nav>
    </header>
    <div>
      <slot />
    </div>

    </div>
</template>

<style lang="scss" scoped>

.header {
  display: flex;
  justify-content: space-between;
  padding: 20px 40px;
  font-size: 26px;
  font-weight: 600;
  &__logo {
    color: black;
    text-decoration: none;
  }
}


</style>