import axios from 'axios';

export async function fetchPhoto(query, page = 1) {
  const { data } = await axios.get('https://pixabay.com/api/', {
    params: {
      key: '31594547-deb644124a3b99171e9eee14b',
      q: query,
      page: page,
      per_page: 12,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  });
  return data;
}
