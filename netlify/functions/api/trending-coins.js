exports.handler = async (event, context) => {
  try {
    const response = await request.get(
      `https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=BTC,ETH,USDT,BNB,SOL,XRP`
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
