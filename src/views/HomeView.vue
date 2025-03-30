<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import headerComponent from "../components/headerComponent.vue";
import itemCard from "../components/itemCard.vue";
import { useApiStore } from "@/stores/apiStore";

const apiStore = useApiStore();
const filterByName = ref(false);
const filterByYear = ref(false);
const movies = ref([]);

const getMovies = async () => {
  try {
    apiStore.isLoading = true;
    const response = await axios.get(
      "https://mashroom-movies-api.netlify.app/api/movies"
    );

    if (response?.data?.success && response.data?.data) {
      movies.value = response.data.data;
    } else {
      console.error("Ошибка: данные не получены.");
    }
  } catch (error) {
    console.error("Ошибка загрузки фильмов:", error);
  } finally {
    apiStore.isLoading = false;
  }
};

const sortedMovies = computed(() => {
  let sorted = [...movies.value];

  if (filterByName.value) {
    sorted.sort((a, b) => {
      const engRegex = /^[A-Za-z]/;
      const rusRegex = /^[А-Яа-яЁё]/;

      const aIsEng = engRegex.test(a.title);
      const bIsEng = engRegex.test(b.title);
      const aIsRus = rusRegex.test(a.title);
      const bIsRus = rusRegex.test(b.title);

      if (aIsEng && bIsRus) return -1;
      if (aIsRus && bIsEng) return 1;

      return a.title.localeCompare(b.title, "ru");
    });
  } else if (filterByYear.value) {
    sorted.sort((a, b) => a.year - b.year);
  }

  return sorted;
});

onMounted(getMovies);
</script>

<template>
  <headerComponent />
  <section class="movies">
    <div class="container">
      <div class="movies__title">Фильмы</div>

      <div class="movies__filter">
        <label class="movies__filter_item">
          <input
            type="checkbox"
            :checked="filterByName"
            @change="
              filterByName = !filterByName;
              filterByYear = false;
            "
          />
          <span class="custom-checkbox"></span>
          Отсортировать по названию
        </label>

        <label class="movies__filter_item">
          <input
            type="checkbox"
            :checked="filterByYear"
            @change="
              filterByYear = !filterByYear;
              filterByName = false;
            "
          />
          <span class="custom-checkbox"></span>
          Отсортировать по году
        </label>
      </div>

      <div v-if="apiStore.isLoading" class="movies__loader"></div>

      <div class="movies__content">
        <itemCard
          class="movies__movie"
          v-for="movie in sortedMovies"
          :key="movie.id"
          :isList="true"
          :id="movie.id"
          :poster="movie.poster"
          :title="movie.title"
          :year="movie.year"
          :genre="movie.genres.join(', ')"
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
    </div>
  </section>
</template>

<style lang="scss">
.movies {
  background: var(--color-dobleblack);
  position: relative;
  min-height: 100vh;
  &__title {
    padding-top: 40px;
    font-weight: 500;
    font-size: 32px;
    line-height: 32px;
    color: var(--color-white);
  }
  &__filter {
    display: flex;
    gap: 32px;
    margin-top: 16px;
    color: var(--color-grey);
    position: relative;
    &_item {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      user-select: none;
      font-weight: 400;
      font-size: 16px;
      line-height: 16px;
    }
    &_item input {
      display: none;
    }
    &_item input:checked + .custom-checkbox {
      background-color: var(--color-double-red);
      border: none;
    }
    &_item input:checked + .custom-checkbox::after {
      content: url("../assets/icons/Path.svg");
      position: absolute;
      top: 2px;
      left: 4px;
      width: 11px;
      height: 9px;
      border-width: 0 2px 2px 0;
      background-repeat: no-repeat;
    }
  }
  &__filter::after {
    content: "";
    display: block;
    border-bottom: 1px solid var(--color-grey);
    height: 1px;
    width: 100%;
    position: absolute;
    bottom: -16px;
  }
  &__loader {
    width: 50px;
    height: 50px;
    background-image: url("../assets/icons/Loader.svg");
    background-size: cover;
    animation: rotate360 1s linear infinite;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &__content {
    margin-top: 40px;
  }
}
@keyframes rotate360 {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.custom-checkbox {
  width: 20px;
  height: 20px;
  border: 1px solid var(--color-grey);
  display: inline-block;
  position: relative;
}
@media (max-width: 375px) {
  .movies__filter_item {
    gap: 5px;
    font-size: 12px;
    line-height: 12px;
  }
}
</style>
