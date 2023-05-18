const express = require('express');
const app = express();
require('dotenv').config()
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');









const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xemmjwp.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const dollsCollection = client.db('dolls').collection('information')

    app.get('/information',async (req, res)=>{
      const cursor = dollsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);






app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Server running!');
})
app.get('/', (req, res) => {
  res.send();
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})