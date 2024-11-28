import axios from "axios";
import { IUser } from "../../models/User.js";
import refreshToken from "./refreshToken.js";
import throwError from "../../lib/utils/throwError.js";

const axiosInstance = axios.create({
  baseURL: "https://api.spotify.com/v1",
  withCredentials: true,
});

export const spotifyAxios = (user: IUser) => {
  const request = async (config: {
    url: string;
    method: string;
    data?: any;
  }) => {
    try {
      const response = await axiosInstance({
        ...config,
        headers: {
          Authorization: `Bearer ${user.spotifyToken.accessToken}`,
        },
      });

      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        console.warn("Access token expired. Attempting to refresh...");

        // Refresh token
        const newTokens = await refreshToken(user.spotifyToken.refreshToken);

        // Update user's token
        user.spotifyToken.accessToken = newTokens.accessToken;
        if (newTokens.refreshToken) {
          user.spotifyToken.refreshToken = newTokens.refreshToken;
        }
        await user.save();

        // Retry request with new token
        const retryResponse = await axiosInstance({
          ...config,
          headers: {
            Authorization: `Bearer ${newTokens.accessToken}`,
          },
        });
        return retryResponse.data;
      }

      throwError(`Failed to communicate with Spotify API: ${error.message}`);
    }
  };

  return {
    get: (url: string, config: object = {}) =>
      request({ url, method: "GET", ...config }),
    post: (url: string, data: any, config: object = {}) =>
      request({ url, method: "POST", data, ...config }),
    put: (url: string, data: any, config: object = {}) =>
      request({ url, method: "PUT", data, ...config }),
    delete: (url: string, config: object = {}) =>
      request({ url, method: "DELETE", ...config }),
    patch: (url: string, data: any, config: object = {}) =>
      request({ url, method: "PATCH", data, ...config }),
  };
};
