
import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";


export const useApiStore = defineStore("apiStore", {
    state: () => ({
        baseLink: "http://localhost:5173/",
        isLoading: false,
    }),

    actions: {
        // async getMovies() {
        //     try {
        //         const response = await axios.get(`https://mashroom-movies-api.netlify.app/api/movies`);
        //         console.log(1, this.isLoading);
        //         this.isLoading = true;


        //         if (response && response.data && response.data.success) {

        //         } else {

        //             console.error("Ups....somethings go error");
        //         }
        //         console.log(3, this.isLoading);
        //     } catch (error) {
        //         notify({
        //             type: "error",
        //             title: "Error",
        //             text: "An error occurred while fetching translations.",
        //         });
        //         console.error("Error fetching translations:", error);
        //     }
        //     this.isLoading = false;

        //     console.log(3, this.isLoading);

        // },
        getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(";").shift();
            return null;
        },
        setCookie(name, value, days) {
            const expires = new Date();
            expires.setHours(24, 0, 0, 0);
            expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
            document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;Secure;SameSite=Strict`;
        },
        deleteCookie(name) {
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;Secure;SameSite=Strict`;
        },


    },
});
