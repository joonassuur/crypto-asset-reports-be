import { request } from '../../../app';

exports.handler = async (event, context) => {
  const id = event.queryStringParameters.id;
  const start = event.queryStringParameters.start;
  const end = event.queryStringParameters.end;
  const interval = event.queryStringParameters.interval;

  try {
    const response = await request.get(
      `https://sandbox-api.coinmarketcap.com/v1/exchange/quotes/historical?id=${id}&convert=USD&time_start=${start}&time_end=${end}&interval=${
        interval || '5m'
      }`
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
