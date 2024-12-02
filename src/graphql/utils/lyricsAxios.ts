import axios from "axios";

const lyricsAxios = axios.create({
  baseURL: "https://lrclib.net/api",
});

export default lyricsAxios;
