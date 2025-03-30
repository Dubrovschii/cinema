
import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";


export const useApiStore = defineStore("apiStore", {
    state: () => ({
        baseLink: "http://localhost:5173/",
        isLoading: false,
    }),

    actions: {
    },
});
