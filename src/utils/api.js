import axios from 'axios';


const BASE_URL = `https://api.themoviedb.org/3`;
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;



export const fetchDataFromApi = async (url, params) => {
    try {

        const headers = {
            Authorization: `Bearer ${TMDB_TOKEN}`
        }

        const options = {
            headers,params
        }

        const { data } = await axios.get(BASE_URL + url, options);
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
}