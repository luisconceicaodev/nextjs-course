import { MongoClient } from "mongodb";

// not a react component function
// API Routes are about defining functions that contain server side code
// Will only run on the server, never run on the client
// The code in them will never be exposed to the client so we can use credentials without compromising security
// Those functions are triggered when a request is sent to this route -> /api/new-meetup

const handler = async (req, res) => {
  if (req.method === "POST") {
    // body is the data of the incoming request
    const data = req.body;
    const { title, image, address, description } = data;

    // connects to database
    // safe to put passwords since this won't be run on client side
    // if database/collections that we are trying to connect doesn't exist yet it will be created on the fly
    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@miguelcluster.fnavw.mongodb.net/meetups?retryWrites=true&w=majority`
    );
    const db = client.db();

    /*
     ** MongoDB is NoSQL
     ** Collections = SQL Tables
     ** Documents = SQL Entries in Tables
     */
    const meetupsCollection = db.collection("meetups");

    // Inserts data into the database
    const result = await meetupsCollection.insertOne(data);

    console.log("result: ", result);

    // closes database connection
    client.close();

    // json data that goes with the outgoing response
    res.status(201).json({ message: "Meetup inserted!" });
  }
};

export default handler;
