// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDB from '../../../lib/db-connect'
import Party from '../../../models/party'

export default async function handler(req, res) {
  console.log(req.method)
  if (req.method === 'POST') {
    const { name, phone, tableId } = req.body
    console.log('tableId: ', tableId)
    await connectDB()

    try {
      const newParty = new Party({ name, phone, tableId })
      await newParty.save()

      res.status(201).json(newParty)
    } catch (error) {
      res.status(500).json({ error: 'An error ocurred' })
    }
  } else if (req.method === 'GET') {
    await connectDB()

    try {
      const parties = await Party.find().sort({ _id: 1 })
      res.status(200).json(parties)
    } catch (error) {
      res.status(500).json({ error: 'An error ocurred' })
    }
  } else if (req.method === 'DELETE') {
    await connectDB()
    console.log('deleting tables')
    await Party.deleteMany()
    res.status(204).end()
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
