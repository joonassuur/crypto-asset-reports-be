exports.handler = async (event, context) => {
  const id = req.query.id;
  const start = req.query.start;
  const end = req.query.end;
  const interval = req.query.interval;

  try {
    const response = await request.get(
      `https://sandbox-api.coinmarketcap.com/v1/exchange/quotes/historical?id=${id}&convert=USD&time_start=${start}&time_end=${end}&interval=${
        interval || '5m'
      }`
    );
    if (response?.data) {
      res.send(response.data.data);
    }
  } catch (error) {
    res.status(error.response.status).send({
      message: error.response.data,
    });
  }
};
