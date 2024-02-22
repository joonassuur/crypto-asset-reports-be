exports.handler = async (event, context) => {
  const body = req.body;
  try {
    const response = await request.post(
      `https://api.coinmarketcap.com/gravity/v4/gravity/global-search`,
      body
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
