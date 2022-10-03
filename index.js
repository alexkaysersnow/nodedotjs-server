const axios = require('axios');
const dotenv = require('dotenv');
const express = require('express');
var cors = require('cors')

dotenv.config()

const data = JSON.stringify({
  "action": "create",
  "version": "0.1.0",
  "key": process.env.CUMUL_KEY,
  "token": process.env.CUMUL_TOKEN,
  "properties": {
    "integration_id": process.env.INTEGRATION_ID,
    "type": "sso",
    "expiry": "24 hours",
    "inactivity_interval": "1 year",
    "username": process.env.USER_USERNAME,
    "name": process.env.USER_NAME,
    "email": process.env.USER_EMAIL,
    "suborganization": process.env.USER_SUBORGANIZATION,
    "role": "editor"
  }
});

var config = {
  method: 'post',
  url: `${process.env.API_URL || 'https://api.cumul.io'}/0.1.0/authorization`,
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

const app = express();
const port = 4001;
app.use(cors());

app.get('/', (req, res) => {
  axios(config)
  .then(function (response) {
    const resp = {
      status: 'success',
      key: response.data.id,
      token: response.data.token
    };
    res.json(resp);
  })
  .catch(function (error) {
    const resp = {
      status: 'failed',
      error
    };
    res.json(resp);
  });
});

app.get('/dashb', (req, res) => {
    const resp = {
      dashboards: [
      {
        name: 'Snow',
        dashboardId: '8b9945be-c228-466e-bb41-6bb08eca2ae2',
      },
      {
        name: 'Alex',
        dashboardId: 'f2fc7bdb-e05b-4845-bbc8-dff1bf44f58f',
      },
    ]
  }

  res.json(resp);
});

app.listen(port, () => {
  console.log(`CUMUL Server app listening on port ${port}`)
});
