const axios = require("axios");

export default async function handler(req, res) {
  const accountId = req.body.accountId
  const url = process.env.FINCLUSIVE_BASE_URL + '/banking/api/account/' + accountId
  const subscriptionKey = process.env.AP_SUBSCRIPTION_KEY

  const token = req.headers.token
  const options = {
    params: {
      "subscription-key": subscriptionKey
    },
    headers: {
      "Authorization": "Bearer " + token
    }
  }
  
  axios.get(url, options)
    .then(response => {
      console.log('res', response.data)
      res.status(response.status).send({data: response.data})
    })
    .catch(err => {
      console.log('err', err.response.data)
      res.status(err.response.status).send({error: err.response.data})
    })
}
