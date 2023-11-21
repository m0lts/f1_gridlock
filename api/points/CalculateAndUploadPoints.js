import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

if (!process.env.MONGODB_URI) {
    throw new Error("Please add your Mongo URI to env.local")
}

export default async function handler(request, response) {

    let mongoClient;

    mongoClient = await (new MongoClient(uri, options)).connect();
    console.log("Just Connected!");

    try {
        const raceIDQuery = await fetch("https://v1.formula-1.api-sports.io/races?season=2023&timezone=Europe/London", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "v1.formula-1.api-sports.io",
                "x-rapidapi-key": "1835076bca70dce25b3140b61a996a98"
            }
        });
        const raceIDData = await raceIDQuery.json();
        const competitionRaces = raceIDData.response.filter(event => event.type === 'Race');
        const completedRaces = competitionRaces.filter(event => event.status === "Completed");



        const currentTime = new Date().getTime();

        // Find the race closest to the current time
        let closestRace = null;
        let closestTimeDifference = Infinity;

        completedRaces.forEach(race => {
        if (race.date) {
            const raceTime = new Date(race.date).getTime();
            const timeDifference = Math.abs(currentTime - raceTime);
            if (timeDifference < closestTimeDifference) {
            closestTimeDifference = timeDifference;
            closestRace = race.id;
            }
        }
        });

        const raceResultQuery = await fetch(`https://v1.formula-1.api-sports.io/rankings/races?race=${closestRace}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "v1.formula-1.api-sports.io",
                "x-rapidapi-key": "1835076bca70dce25b3140b61a996a98"
            }
        });
        const raceResult = await raceResultQuery.json();
        const driverIDs = raceResult.response.map(event => event.driver.id);
        const top10Drivers = driverIDs.splice(0, 10);

        // Get userID and prediction from database using closestRace.id
        const db = mongoClient.db("gridlock");
        const dbCollection = db.collection("predictions");
        const standingsCollection = db.collection("standings");
        const racePredictions = await dbCollection.find({ competition: closestRace }).toArray();

        // Calculated points gained for each user
        for (const racePrediction of racePredictions) {
            const userID = racePrediction.userID;
            const userPrediction = racePrediction.userPrediction;
            let points = 0;
        
            userPrediction.forEach((driverID, index) => {
                if (top10Drivers.includes(driverID)) {
                    points += 1;
                    if (index < 10 && driverID === top10Drivers[index]) {
                        points += 2;
                    }
                }
            });
        
            if (points === 30) {
                points += 10;
            }
        
            const existingUser = await standingsCollection.findOne({ userID });
        
            // ADD RACE ID TO SPECIFIC POINTS, SO THAT I CAN ADD A CONDITIONAL THAT CHECKS WHETHER THE POINTS FOR A RACE HAVE ALREADY BEEN ASSIGNED, AND IF THEY HAVE PREVENT DUPLICATES
            if (!existingUser) {
                await standingsCollection.insertOne({
                    userID,
                    points: [ points ]
                });
            } else {
                await standingsCollection.findOneAndUpdate(
                    { userID },
                    { $push: { points: points } }
                );
            }
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



