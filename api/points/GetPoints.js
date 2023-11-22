import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";

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
        const dbCollection = db.collection("standings");
        const accountsCollection = db.collection("accounts");

        const usersPoints = await dbCollection.find().toArray();


        // Add user's usernames to returned payload.
        const userIDs = usersPoints.map((point) => new ObjectId(point.userID));

        const userAccounts = await accountsCollection.find({ _id: { $in: userIDs } }).toArray();
        const userIdToUsername = new Map(userAccounts.map((account) => [account._id.toString(), account.username]));

        const usersPointsWithUsernames = usersPoints.map((point) => {
            return {
                ...point,
                username: userIdToUsername.get(point.userID.toString()),
            };
        });

        response.status(200).json({ usersPoints: usersPointsWithUsernames });


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