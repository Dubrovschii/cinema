<script setup>
import { defineProps, ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import iconsduration from "../assets/icons/duration.svg";

const props = defineProps({
  id: {
    type: Number,
    required: false,
  },
  poster: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  actors: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isList: {
    type: Boolean,
    default: false,
  },
  duration: {
    type: String,
    required: false,
  },
});

const loading = ref(true);

onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 1000);
});
</script>
<template>
  <div class="card" :class="{ 'card--list': isList }">
    <!-- <RouterLink class="card__link" :to="`/movie/${id}`"> -->
    <div class="card__wrap">
      <div class="card__poster">
        <img v-if="!loading" :src="poster" alt="poster" />

        <div v-if="loading" class="card__preloader">Загрузка...</div>
      </div>
      <div class="card__content">
        <div v-if="!loading" class="card__title">
          <RouterLink class="card__link" :to="`/movie/${id}`">{{
            title
          }}</RouterLink>
        </div>
        <div v-if="!loading" class="card__date">
          <span class="card__pretitle">{{ year }}, {{ genre }}</span>
        </div>
        <div v-if="!loading" class="card__director">
          <span class="card__pretitle">Режиссёр:</span> {{ director }}
        </div>
        <div v-if="!loading" class="card__actors">
          <span class="card__pretitle">Актёры:</span> {{ actors }}
        </div>
        <div v-if="!loading" class="card__descr">
          {{ description }}
        </div>

        <div v-if="!loading && duration !== ''" class="card__duration">
          <div class="card__duration_info">
            <span>{{ duration }}</span>
            <img :src="iconsduration" alt="" v-if="duration !== ''" />
          </div>
        </div>
      </div>
    </div>
    <!-- </RouterLink> -->
  </div>
</template>

<style lang="scss" scoped>
.card {
  margin-bottom: 24px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &--list:hover {
    transform: translateY(-8px);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  }

  &__wrap {
    display: flex;
    width: 100%;
  }

  &__poster {
    background: var(--color-grey);
    max-width: 168px;
    width: 100%;
    position: relative;

    img {
      display: block;
      max-width: 112px;
      width: 100%;
      max-height: 168px;
      height: 100%;
      margin: 0 auto;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .card__preloader {
      width: 100%;
      height: 168px;
      background: linear-gradient(
        90deg,
        var(--color-ligthgrey) 25%,
        var(--color-grey) 50%,
        var(--color-white) 65%
      );
      background-size: 200% 100%;
      animation: skeleton-loading 1.5s infinite ease-in-out;
      border-radius: 4px;
      text-align: center;
      line-height: 168px;
      color: var(--color-darkgrey);
      font-size: 16px;
      font-weight: bold;
    }
  }

  &__content {
    background: var(--color-darkgrey);
    padding: 32px 24px 32px 32px;
    width: 100%;
    position: relative;
  }

  &__title a {
    color: var(--color-white);
    font-weight: 700;
    font-size: 36px;
    line-height: 36px;
  }

  &__pretitle {
    font-weight: 700;
    font-size: 12px;
    line-height: 12px;
    text-transform: uppercase;
    color: var(--color-brown);
  }

  &__director {
    color: var(--color-brown);
    margin-top: 8px;
  }

  &__actors {
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: var(--color-ligthgrey);
    margin-top: 10px;
  }

  &__descr {
    margin-top: 16px;
    font-family: Roboto;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: var(--color-white);
  }

  &__duration {
    max-width: 184px;
    width: 100%;
    background: var(--color-grey);
    position: absolute;
    top: 32px;
    right: 0;
    clip-path: polygon(5% 0, 100% 0, 100% 100%, 0 100%, 0 100%);

    &_info {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      padding: 9px 18px;

      span {
        font-weight: 700;
        color: var(--color-black);
        font-size: 12px;
        line-height: 24px;
        text-align: right;
        text-transform: uppercase;
      }

      img {
        width: 24px;
        height: 24px;
      }
    }
  }

  @keyframes skeleton-loading {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
}

@media (max-width: 575px) {
  .card__title a {
    font-size: 25px;
    line-height: 30px;
  }
  .card__poster {
    max-width: 120px;
  }
  .card__content {
    padding: 15px 20px 20px 20px;
  }
  .card__duration {
    max-width: 120px;
    top: 15px;
    &_info {
      padding: 4px;
      gap: 2px;
      span {
        font-size: 10px;
        line-height: normal;
      }
    }
  }
}
@media (max-width: 375px) {
  .card__wrap {
    flex-flow: column;
  }
  .card__poster {
    height: 100px;
    max-width: 100%;
  }
  .card__poster img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
    padding: 10px;
  }
}
</style>
