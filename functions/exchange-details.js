exports.handler = async (event, context) => {
  const id = req.query.id;

  try {
    const response = await request.get(
      `https://sandbox-api.coinmarketcap.com/v1/exchange/info?id=${id}`
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
