import axios from 'axios'

//BaseURL - https://api.themoviedb.org/3/
//api key - api_key=927ae0433845ac266478c8a41bed6d66
//Resto url - /movie/11

// https://api.themoviedb.org/3/discover/movie?api_key=927ae0433845ac266478c8a41bed6d66&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api