import connectDB from '../../../lib/db-connect'
import Party from '../../../models/party'

export default async function deleteTable(req, res) {
  if (req.method === 'DELETE') {
    await connectDB()
    const { id } = req.query

    try {
      await Party.deleteOne({ tableId: id })
      res.status(204).end()
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'An error ocurred' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
