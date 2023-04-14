import mongoose from 'mongoose'

const partySchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String },
  tableId: { type: String, required: true },
})

const Party = mongoose.models.Party || mongoose.model('Party', partySchema)

export default Party
