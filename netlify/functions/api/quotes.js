import { request } from '../../../app';

exports.handler = async (event, context) => {
  const symbol = event.queryStringParameters.symbol;
  const start = event.queryStringParameters.start;
  const end = event.queryStringParameters.end;
  try {
    const response = await request.get(
      `https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/quotes/historical?symbol=${symbol}&convert=USD&time_start=${start}&time_end=${end}`
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
