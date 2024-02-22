import { request } from '../../../app';

exports.handler = async (event, context) => {
  const id = event.queryStringParameters.id;

  try {
    const response = await request.get(
      `https://sandbox-api.coinmarketcap.com/v1/exchange/assets?id=${id}`
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
