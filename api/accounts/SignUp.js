import { MongoClient } from "mongodb";
import bcrypt from 'bcrypt';

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




        // Retrieve data sent by signup_page and insert into databasee
        if (request.method === "POST") {
            // Save data to formData variable
            const formData = request.body;

            // Delete verify_password property
            delete formData.verify_password;

            // Hash the user's password
            const hashedPassword = await bcrypt.hash(formData.password, 10);
            // Update the formData with the hashed password
            formData.password = hashedPassword;

            // Check if email or username already exists in database
            const email = formData.email;
            const username = formData.username;
            // Return error to frontend if true
            const emailInDatabase = await dbCollection.findOne({ email });
            const usernameInDatabase = await dbCollection.findOne({ username });
            if (emailInDatabase) {
                response.status(400).json({ error: 'Email address taken.' });
                return;
            } else if (usernameInDatabase) {
                response.status(401).json({ error: 'Username taken.' });
                return;
            }

            const result = await dbCollection.insertOne(formData);
            response.status(201).json({ message: "Account successfully created.", result });


            // Return error if neither musician or venue selected
            } else {
                response.status(405).json({ error: "Method Not Allowed" });
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

