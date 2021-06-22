const axios = require("axios");

export default async function handler(req, res) {
  const url = process.env.FINCLUSIVE_BASE_URL + '/customer/' + process.env.FINCLUSIVE_ID + '/client/individual'
  const subscriptionKey = process.env.CAAS_SUBSCRIPTION_KEY
  
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
      res.status(response.status).send({data: response.data})
    })
    .catch(err => {
      console.log('err', err.response.data)
      res.status(err.response.status).send({error: err.response.data})
    })
}