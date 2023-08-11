import { MongoClient } from 'mongodb';
const uri = "mongodb+srv://uktech0310:2124821@cluster0.i3vmoao.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const client = new MongoClient(uri);

async function run() {
    try {

        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        console.log("Successfully connected to Atlas");
    }
    catch (err) {
        console.log(err)
        // Ensures that the client will close when you finish/error
        await client.close();
        process.exit(1)
    }
}
run().catch(console.dir);

process.on('SIGINT', async function () {
    console.log("app is terminating");
    await client.close();
    process.exit(0);
});