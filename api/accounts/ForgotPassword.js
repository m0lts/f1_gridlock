import { MongoClient } from "mongodb";
import sendgrid from '@sendgrid/mail';

// Send grid API key
sendgrid.setApiKey("***");

const uri = process.env.MONGODB_URI;
const options = {};

if (!process.env.MONGODB_URI) {
    throw new Error("Please add your Mongo URI to env.local")
}


export default async function handler(request, response) {
    let mongoClient;

    try {

        // Connect to MongoDB
        mongoClient = await (new MongoClient(uri, options)).connect();
        console.log("Just Connected!");

        // Store DB name and collections in variables
        const db = mongoClient.db("gridlock");
        const dbCollection = db.collection("accounts");
        const passwordResetCollection = db.collection("password_reset_tokens");


        if (request.method === "POST") {
            // Save data to formData variable
            const receivedData = request.body;
            const email = receivedData.email;

            // Check if email is on database
            const userRecord = await dbCollection.findOne({ email });

            // End logic if user does not exist
            if (!userRecord) {
                response.status(400).json({ error: "Email not found" });
                return;
            }

            // Generate random token
            const generateRandomToken = (length) => {
                const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                let token = '';
                for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                token += characters[randomIndex];
                }
                return token;
            };
            const resetToken = generateRandomToken(10);

            // Create object to enter into document
            const dataToEnter = {
                email: email,
                token: resetToken,
                createdAt: new Date(),
            }

            // Insert reset password data into database
            await passwordResetCollection.insertOne(dataToEnter);


            const msg = {
                to: email,
                from: 'gridlock.contact@gmail.com',
                subject: 'Reset Your Password',
                text: `Please use this one-time-password code to reset your password: ${resetToken}`,
                // html: `<p>Please use this one-time-password code to reset your password: <a href="${resetLink}">${resetLink}</a></p>`,
            };

            const sendEmail = await sendgrid.send(msg);
            response.status(200).json({ message: 'Email successfully sent', sendEmail})

        }

    } catch (error) {
        console.error(error);
        response.status(500).json(error);
    } finally {
        // Close database connection
        if (mongoClient) {
            await mongoClient.close();
            console.log("MongoDB connection closed.");
        }
    }
}
