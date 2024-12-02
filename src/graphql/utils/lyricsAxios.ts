import axios from "axios";
import throwError from "../../lib/utils/throwError.js";

const axiosInstance = axios.create({
  baseURL: "https://lrclib.net/api",
});

const request = async (config: { url: string; method: string; data?: any }) => {
  try {
    const response = await axiosInstance({
      ...config,
    });

    return response.data;
  } catch (error: any) {
    const status = error.response?.status;

    if (status === 404) {
      console.warn("Lyrics not found.");
      return null;
    } else if (status === 500) {
      console.error("Server error occurred.");
      throwError(
        "An error occurred on the lyrics server. Please try again later."
      );
    } else {
      console.error(`Unexpected error: ${error.message}`);
      throwError(`Failed to communicate with Lyrics API: ${error.message}`);
    }
  }
};

const lyricsAxios = {
  get: (url: string, config: object = {}) =>
    request({ url, method: "GET", ...config }),
};

export default lyricsAxios;
