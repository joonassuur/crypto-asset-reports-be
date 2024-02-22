exports.handler = async (event, context) => {
  const symbol = req.query.symbol;
  const start = req.query.start;
  const end = req.query.end;
  try {
    const response = await request.get(
      `https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/quotes/historical?symbol=${symbol}&convert=USD&time_start=${start}&time_end=${end}`
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
