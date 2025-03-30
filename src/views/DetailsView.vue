<script setup>
import { ref } from "vue";
import headerComponent from "../components/headerComponent.vue";
import axios from "axios";

import { RouterLink } from "vue-router";
import arrowBack from "../assets/icons/arrowBack.svg";

import itemCard from "../components/itemCard.vue";

import { useRoute } from "vue-router";
import { useApiStore } from "@/stores/apiStore";

const apiStore = useApiStore();
const route = useRoute();
const movieId = route.params.id;
const movie = ref([]);

const getIngoMovie = async () => {
  try {
    apiStore.isLoading = true;
    const response = await axios.get(
      `https://mashroom-movies-api.netlify.app/api/movie/${movieId}`
    );

    if (response?.data?.success && response.data) {
      movie.value = response.data.data;
    } else {
      console.error("Ошибка: данные не получены.");
    }
  } catch (error) {
    console.error("Ошибка загрузки фильмов:", error);
  } finally {
    apiStore.isLoading = false;
  }
};
getIngoMovie();
</script>
<template>
  <headerComponent />
  <section class="movie">
    <div class="container">
      <RouterLink class="movie__back" :to="`/`">
        <img :src="arrowBack" alt="" />
        <span>Назад к списку</span>
      </RouterLink>

      <div v-if="apiStore.isLoading" class="movies__loader"></div>

      <itemCard
        class="movies__movie"
        v-if="!apiStore.isLoading"
        v-model="movie"
        :key="movie.id"
        :isList="false"
        :id="movie.id"
        :poster="movie.poster"
        :title="movie.title"
        :year="movie.year"
        :genre="(movie.genres || []).join(', ')"
        :director="(movie.directors || []).join(', ')"
        :actors="(movie.actors || []).join(', ')"
        :description="movie.description || ''"
        :duration="
          movie.collapse?.duration && Array.isArray(movie.collapse.duration)
            ? movie.collapse.duration.join(', ')
            : movie.collapse?.duration || ''
        "
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.movie {
  background: var(--color-dobleblack);
  position: relative;
  min-height: 100vh;
  &__back {
    color: var(--color-double-red);
    font-weight: 400;
    font-size: 20px;
    line-height: 20px;
    letter-spacing: 0%;
    text-decoration: underline;
    text-decoration-style: solid;
    text-decoration-thickness: 0%;
    display: flex;
    align-items: center;
    padding-top: 42px;
    position: relative;
    img {
      margin-right: 20px;
    }
  }
  &__back::after {
    content: "";
    display: block;
    border-bottom: 1px solid var(--color-grey);
    height: 1px;
    width: 100%;
    position: absolute;
    bottom: -16px;
  }
}
.movies__movie {
  margin-top: 40px;
}
</style>
