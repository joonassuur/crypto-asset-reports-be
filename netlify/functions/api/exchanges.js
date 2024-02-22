import { request } from '../../../app';

exports.handler = async (event, context) => {
  try {
    const response = await request.get(
      `https://sandbox-api.coinmarketcap.com/v1/exchange/listings/latest`
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
