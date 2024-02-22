const express = require('express');
const axios = require('axios');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

export const request = axios.create({
  headers: {
    'X-CMC_PRO_API_KEY': '98ad3baa-6527-4251-be7e-b00d9e523c47',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
  },
});

app.get('/trending-coins', async (req, res) => {
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
});
app.get('/exchange-details', async (req, res) => {
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
});
app.get('/exchange-quotes-historical', async (req, res) => {
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
});
app.get('/exchange-assets', async (req, res) => {
  const id = req.query.id;

  try {
    const response = await request.get(
      `https://sandbox-api.coinmarketcap.com/v1/exchange/assets?id=${id}`
    );
    if (response?.data) {
      res.send(response.data.data);
    }
  } catch (error) {
    res.status(error.response.status).send({
      message: error.response.data,
    });
  }
});
app.get('/exchanges', async (req, res) => {
  try {
    const response = await request.get(
      `https://sandbox-api.coinmarketcap.com/v1/exchange/listings/latest`
    );
    if (response?.data) {
      res.send(response.data.data);
    }
  } catch (error) {
    res.status(error.response.status).send({
      message: error.response.data,
    });
  }
});
app.get('/coin-details', async (req, res) => {
  const symbol = req.query.symbol;

  try {
    const response = await request.get(
      `https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbol}`
    );
    if (response?.data) {
      res.send(response.data.data);
    }
  } catch (error) {
    res.status(error.response.status).send({
      message: error.response.data,
    });
  }
});

app.get('/quotes', async (req, res) => {
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
});

app.post('/search', async (req, res) => {
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
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
