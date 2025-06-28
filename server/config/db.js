import mongoose from 'mongoose';

const connectDbB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    }catch (err) {
        console.log('Error connecting to MongoDB');
        process.exit(1);
    }
}

export default connectDbB;