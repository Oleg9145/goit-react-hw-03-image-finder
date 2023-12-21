import axios from 'axios';

const KEY = '40583703-eda8f9e83cb09864f2b7e3718';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchImages = async (query, page = 1) => {
  try {
    const response = await axios.get(
      `${BASE_URL}?q=${encodeURIComponent(
        query
      )}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    return response.data.hits.map(({ id, webformatURL, largeImageURL }) => ({
      id,
      webformatURL,
      largeImageURL,
    }));
  } catch (error) {
    throw error;
  }
};
