import connectDB from '../../lib/db-connect'
import Party from '../../models/party'

export default async function handler(req, res) {
  await connectDB()
  console.log('deleting waitlist 🧪...')
  try {
    await Party.deleteMany()
    res.status(200).json({ message: 'Tables removed' })
  } catch (err) {
    res.status(500).json({ error: 'An error ocurred' })
  }
}
