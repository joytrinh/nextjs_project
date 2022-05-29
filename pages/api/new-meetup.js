import { MongoClient } from "mongodb";

// /api/new-meetup

async function handler (req, res)
{
    if (req.method === 'POST')
    {
        const data = req.body

        const client = await MongoClient.connect('mongodb+srv://joycheng:J0yCheng@nextjsproject0.euqyu.mongodb.net/?retryWrites=true&w=majority')
        const db = client.db()

        const meetupsCollection = db.collection('meetups')

        await meetupsCollection.insertOne(data)

        client.close()

        res.status(201).json({message: 'Meetup inserted!'})
    }
}
export default handler
