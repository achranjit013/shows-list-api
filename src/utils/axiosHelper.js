import axios from "axios";

const apiURL = "https://api.tvmaze.com/search/shows?q=";
const apiCastURL = "https://api.tvmaze.com/shows/7308/cast";
export const fetchShows = async (str) => {
  const result = await axios.get(apiURL + str);
  const result1 = await axios.get(apiCastURL);
  console.log(result1);
  return result.data;
};
