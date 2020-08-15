import axios from 'axios';

export default (filename: string, blob: Blob, onProgress: (c: number) => void): Promise<string> => {
  const config = {
    onUploadProgress: (progressEvent: {
      loaded: number,
      total: number
    }) => {
      const completed = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      onProgress(completed);
    }
  };

  const data = new FormData();
  data.append('file', new File([blob], filename));

  return axios.post('https://siasky.net/skynet/skyfile', data, config)
    .then(res => res.data.skylink);
}
