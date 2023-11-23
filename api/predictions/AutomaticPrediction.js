import { MongoClient, ObjectId } from "mongodb";

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
        // Get all userIDs from database
        const db = mongoClient.db("gridlock");
        const accountsCollection = db.collection("accounts");
        const predictionsCollection = db.collection("predictions");

        const users = await accountsCollection.find().toArray();
        const userIDs = users.map(users => users._id.toString())


        // Get the next race's ID
        const raceIDQuery = await fetch("https://v1.formula-1.api-sports.io/races?season=2023&timezone=Europe/London", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "v1.formula-1.api-sports.io",
                "x-rapidapi-key": process.env.RAPIDAPI_KEY
            }
        });
        const raceIDData = await raceIDQuery.json();
        const competitionRaces = raceIDData.response.filter(event => event.type === 'Race');
        const scheduledRaces = competitionRaces.filter(event => event.status === "Scheduled");
        const competitionID = scheduledRaces[0].competition.id;
        const nextRaceID = scheduledRaces[0].id;

        // Get qualifying time for race
        const competitionSessions = raceIDData.response.filter(event => event.competition.id === competitionID);
        const competitionQualifying = competitionSessions.filter(event => event.type === '1st Qualifying');
        const qualifyingStartTime = new Date(competitionQualifying[0].date).getTime();


        // Get current time
        const currentTime = new Date().getTime();

        if (currentTime > qualifyingStartTime) {
            for (const userID of userIDs) {
                // Check if the user has a prediction for the next race
                const userPrediction = await predictionsCollection.findOne({ userID, competition: nextRaceID });
            
                if (!userPrediction) {
                    // If the user doesn't have a prediction for the next race, find their most recent prediction
                    const userMostRecentPrediction = await predictionsCollection.findOne(
                        { userID },
                        { sort: { submissionTime: -1 } } // Sort by submissionTime to get the most recent prediction
                    );
            
                    if (userMostRecentPrediction) {
                        // Create a new prediction for the next race based on the most recent prediction
                        const { driverIDs, competition } = userMostRecentPrediction;
            
                        // Assuming you have the submissionTime for the new prediction
                        const submissionTime = new Date().toISOString();
            
                        // Create a new prediction object for the next race
                        const newPrediction = {
                            userID: userID,
                            driverIDs: driverIDs,
                            competition: nextRaceID,
                            submissionTime: submissionTime
                        };
            
                        // Insert the new prediction into the database
                        await predictionsCollection.insertOne(newPrediction);
                        response.status(200).json({message: `Automatically submitted prediction for ${userID}.`})
                        
                    } else {
                        response.status(200).jsono({message: 'User has no predictions.'})
                    }
                } else {
                    response.status(200).json({message: `User ${userID} already has a submission for the next race`})
                }
            }
        } else {
            response.status(200).json({message: 'Qualifying has not started yet.'})
        }






        // // Find the race closest to the current time
        // let closestRace = null;
        // let closestTimeDifference = Infinity;

        // completedRaces.forEach(race => {
        // if (race.date) {
        //     const raceTime = new Date(race.date).getTime();
        //     const timeDifference = Math.abs(currentTime - raceTime);
        //     if (timeDifference < closestTimeDifference) {
        //     closestTimeDifference = timeDifference;
        //     closestRace = race.id;
        //     }
        // }
        // });

        // const raceResultQuery = await fetch(`https://v1.formula-1.api-sports.io/rankings/races?race=${closestRace}`, {
        //     "method": "GET",
        //     "headers": {
        //         "x-rapidapi-host": "v1.formula-1.api-sports.io",
        //         "x-rapidapi-key": process.env.RAPIDAPI_KEY
        //     }
        // });
        // const raceResult = await raceResultQuery.json();
        // const driverIDs = raceResult.response.map(event => event.driver.id);
        // const top10Drivers = driverIDs.splice(0, 10);


        // const racePredictions = await dbCollection.find({ competition: closestRace }).toArray();

        // if (racePredictions.length === 0) {
        //     response.status(200).json({message: 'No predictions in database'})
        // }

        // // Calculated points gained for each user
        // for (const racePrediction of racePredictions) {
        //     const userID = racePrediction.userID;
        //     const userPrediction = racePrediction.userPrediction;
        //     let points = 0;
        
        //     userPrediction.forEach((driverID, index) => {
        //         if (top10Drivers.includes(driverID)) {
        //             points += 1;
        //             if (index < 10 && driverID === top10Drivers[index]) {
        //                 points += 2;
        //             }
        //         }
        //     });
        
        //     if (points === 30) {
        //         points += 10;
        //     }
        
        //     const existingUser = await standingsCollection.findOne({ userID });
        
        //     if (!existingUser) {
        //         await standingsCollection.insertOne({
        //             userID,
        //             points: [{ competition: closestRace, points }],
        //             totalPoints: points,
        //         });
        //         response.status(200).json({message: 'Points uploaded to standings collection.'})
        //     } else {
        //         const existingCompetitionPoints = existingUser.points.find(point => point.competition === closestRace);

        //         if (!existingCompetitionPoints) {
        //             await standingsCollection.findOneAndUpdate(
        //                 { userID },
        //                 { $push: { points: { competition: closestRace, points } } },
        //                 { $inc: { totalPoints: points } }
        //             );
        //             response.status(200).json({message: 'Points uploaded to standings collection.'})
        //         } else {
        //             response.status(200).json({message: 'Points already uploaded for this race.'})
        //         }
        //     }
        // }

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



