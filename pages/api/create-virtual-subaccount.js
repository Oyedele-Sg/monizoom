const axios = require("axios");

export default async function handler(req, res) {
  const url = process.env.FINCLUSIVE_BASE_URL + '/banking/api/VirtualSubAccount'
  const subscriptionKey = process.env.AP_SUBSCRIPTION_KEY
  
  const token = req.headers.token
  const data = req.body

  const options = {
    params: {
      "subscription-key": subscriptionKey
    },
    headers: {
      "Authorization": "Bearer " + token
    }
  }

  axios.post(url, data, options)
    .then(response => {
      console.log('res', response.data)
      res.status(response.status).send(response.data)
    })
    .catch(err => {
      console.log('err', err.response.data)
      res.status(err.response.status).send(err.response.data)
    })
}