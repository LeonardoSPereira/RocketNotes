import axios from "axios";

export const api = axios.create({

    //prod URL
    baseURL: "https://rocketnotes-api-ywf4.onrender.com",

    //dev URL
    //baseURL: "http://localhost:3333",

});