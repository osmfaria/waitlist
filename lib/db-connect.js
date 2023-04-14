import mongoose from 'mongoose'

const connectDB = async () => {
  const uri = process.env.MONGODB_URI
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }

  if (!uri) {
    throw new Error(
      'Please define the MONGODB_URI environment variable inside .env.local'
    )
  }

  if (mongoose.connection.readyState === 1) {
    console.log('Using existing mongoose connection')
    return mongoose.connection
  } else {
    console.log('Creating new mongoose connection 🌍')

    try {
      await mongoose.connect(uri, options)
      console.log('Mongoose connection established')
      return mongoose.connection
    } catch (error) {
      console.error('Error connecting to MongoDB:', error)
      throw error
    }
  }
}

export default connectDB
