const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })

       // console.log(conn)
        console.log(`MongoDB connected to ${conn.connection.host} `.cyan.underline.bold)

    } catch (e) {
        console.log(`Error: ${e.message}`.red.bold)
        process.exit(1)
    }
}

module.exports = connectDB