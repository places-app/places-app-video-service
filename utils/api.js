const axios = require('axios');

module.exports = {
  // get request that sends the new video and userplaceid
  updateRemoteUrl: (videoUrl, userPlaceId) => {
    const baseURL = `${process.env.SRC_PROTOCOL}${process.env.SRC_HOST}:${process.env.SRC_PORT}`;
    axios({
      url: '/api/userplaces',
      withCredentials: true,
      method: 'put',
      baseURL,
      data: {
        userPlaceId,
        videoUrl,
      },
    })
    .then((res) => {
      console.log('response status from remote server:', res.status);
    })
    .catch((err) => {
      console.log(err);
    });
  },
};
