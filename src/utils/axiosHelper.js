import axios from "axios";

const apiURL = "https://api.tvmaze.com/search/shows?q=";
const apiCastURL = "https://api.tvmaze.com/shows/";
export const fetchShows = async (str) => {
  // for modal, to get cast, episode details
  if (!isNaN(str)) {
    const result1 = await axios.get(
      apiCastURL +
        str +
        "?embed[]=cast&embed[]=episodes&embed[]=seasons&embed[]=crew&embed[]=akas&embed[]=images"
    );
    return result1.data;
  }

  // to get search result
  const result = await axios.get(apiURL + str);

  return result.data;
};
