import axios from 'axios';
const instance = axios.create({
    baseURL: 'https://api.mcsrvstat.us/2/play.pokewild.com'
});
export default instance;