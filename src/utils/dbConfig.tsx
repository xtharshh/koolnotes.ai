import mongoose from 'mongoose';

export async function dbConnect(): Promise<void> {
    try {
        await mongoose.connect(process.env.MONGO_URI!, {
            
        });

        mongoose.connection.on('connected', () => {
            console.log('MongoDB connected');
        });

        mongoose.connection.on('error', (error) => {
            console.error('MongoDB connection error:', error);
        });

        console.log('DB is connected');
    } catch (error) {
        console.error('MongoDB error:', error);
    }
}
