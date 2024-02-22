import { request } from '../../../app';

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  try {
    const response = await request.post(
      `https://api.coinmarketcap.com/gravity/v4/gravity/global-search`,
      body
    );
    if (response?.data) {
      return {
        statusCode: 200,
        body: JSON.stringify(response.data.data),
      };
    }
  } catch (error) {
    return {
      statusCode: error.response.status,
      body: JSON.stringify({ message: error.response.data }),
    };
  }
};
