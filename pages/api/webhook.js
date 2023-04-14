import connectDB from '../../lib/db-connect'
import Party from '../../models/party'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const webhookData = req.body

    console.log('webhook received ✅', webhookData)

    await connectDB()

    if (webhookData) {
      if (webhookData.event === 'party.created') {
        const { name, phone } = webhookData.data

        const isParty = await Party.findOne({ tableId: `${phone}${name}` })
        console.log('party finder 🧑‍🔬:', isParty)
        if (!isParty) {
          const newParty = new Party({
            name,
            phone,
            tableId: `${phone}${name}`,
          })
          await newParty.save()
          res.status(201).end()
        }
        res.status(200).end()
      } else if (webhookData.event === 'party.marked') {
        const { name, phone } = webhookData.data

        await Party.deleteOne({ tableId: `${phone}${name}` })
        res.status(204).end()
      }
    }
  } else {
    res.status(405).end()
  }
}
