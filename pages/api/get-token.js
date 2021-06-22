import axios from 'axios'

export default async function handler(req, res) {
  let options = {
    params: {
      p: 'B2C_1_ROPCPartner',
      username: process.env.USER_NAME,
      password: process.env.PASSWORD,
      grant_type: process.env.GRANT_TYPE,
      client_id: process.env.CLIENT_ID,
      response_type: process.env.RESPONSE_TYPE,
      scope: process.env.SCOPE
    },
    headers: {}
  }

  // console.log('options', options)
  await axios.post(process.env.TOKEN_URL, {}, options)
    .then(response => {
      // console.log('response', response.data.access_token)
      res.status(response.status).send({data: response.data.access_token})
    })
    .catch(err => {
      console.log('error', err.response.status, err.response.data.error)
      res.status(err.response.status).send({error: err.response.data.error})
    })
}