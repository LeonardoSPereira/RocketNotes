import axios from "axios";

export const api = axios.create({

    //prod URL
    baseURL: "https://rocketnotes-api-3yrk.onrender.com",

    //dev URL
    //baseURL: "http://localhost:3333",

});