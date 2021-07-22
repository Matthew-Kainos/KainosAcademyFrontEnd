const axios = require('axios').default;

const backEndURL = process.env.BACK_END_URL;

exports.sendCreateCapabilityPostRequest = async (newCapabilityDetails) => {
  const response = await axios({
    method: 'post',
    url: `${backEndURL}/add/capability`,
    data: {
      newCapabilityDetails,
    },
  });
  return response;
};
