<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header class="header">
    <RouterLink class="header__logo" to="/">#movienow</RouterLink>
  </header>
</template>
<style lang="scss">
.header {
  background: var(--color-red);
  height: 100px;
  box-shadow: 0px 8px 7px 0px #00000047;
  border: none;
  &__logo {
    display: block;
    font-weight: 700;
    font-size: 48px;
    line-height: 48px;
    letter-spacing: 0.21em;
    text-align: center;
    text-transform: uppercase;
    color: var(--color-black);
    padding: 36px 0 16px 0;
  }
}
@media (max-width: 576px) {
  .header {
    &__logo {
      font-size: 24px;
    }
  }
}
</style>
