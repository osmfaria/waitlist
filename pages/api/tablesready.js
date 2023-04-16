import axios from 'axios'

export default async function handler(req, res) {
  const { method, body } = req

  if (method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const response = await axios.post(
      'https://api.tablesready.com/public/walk-in',
      body,
      {
        headers: {
          appkey: process.env.APPKEY,
        },
      }
    )

    return res.status(200).json(response.data)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
