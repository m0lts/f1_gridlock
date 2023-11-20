import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

if (!process.env.MONGODB_URI) {
    throw new Error("Please add your Mongo URI to env.local")
}

export default async function handler(request, response) {
    let mongoClient;

    try {
        mongoClient = await (new MongoClient(uri, options)).connect();
        console.log("Just Connected!");

        const db = mongoClient.db("gridlock");
        const dbCollection = db.collection("predictions");

        if (request.method === "POST") {
            const dataReceived = request.body;
            const userPrediction = dataReceived.driverIDs;
            const userID = dataReceived.userID;
            const competition = dataReceived.competition;

            const dbPrediction = await dbCollection.findOne({ competition, userID })

            if (dbPrediction) {
                await dbCollection.updateOne(
                    { competition, userID },
                    { $set: { driverIDs: userPrediction } }
                );
                response.status(200).json({ message: 'Prediction updated successfully' });
            } else {
                await dbCollection.insertOne(dataReceived);
                response.status(201).json({ message: 'Prediction added successfully' });
            }

            

        } else {
            response.status(405).json({ error: "Method Not Allowed" });
        }


    } catch (error) {
        console.error(error);
        response.status(500).json(error);
    } finally {
        if (mongoClient) {
            await mongoClient.close();
            console.log("MongoDB connection closed.");
        }
    }
}
