import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import {Fragment} from "react";

function HomePage (props)
{
    return (<Fragment>
                <Head>
                    <title>React Meetups</title>
                    <meta name='description' content='Browse a huge list of meetups' />
                </Head>
                <MeetupList meetups={props.meetups}/>
            </Fragment>)
}
/*
export async function getServerSideProps (context) // MUST BE THIS NAME, so we dont use useEffect
{
    // used when data is changed multiple times every second
    const req = context.req // get authentication
    const res = context.res
    // fetch data from an api, we can write server code here and it only runs on server
    return {
        props: { // MUST BE THIS NAME & OBJECT
            meetups: DUMMY_MEETUPS
        },
        // revalidate: 10 // run whenever there is a request, so no need
    }
}
*/

export async function getStaticProps () // MUST BE THIS NAME, so we dont use useEffect
{
    // fetch data from an api
    const client = await MongoClient.connect('mongodb+srv://joycheng:J0yCheng@nextjsproject0.euqyu.mongodb.net/?retryWrites=true&w=majority')
    const db = client.db()
    const meetupsCollection = db.collection('meetups')
    const meetups = await meetupsCollection.find().toArray()
    client.close()

    return { // MUST BE OBJECT
        props: {
            meetups: meetups.map(o => ({
                id: o._id.toString(),
                title: o.title,
                image: o.image,
                address: o.address,
                description: o.description,
            }))
        },
        revalidate: 1
    }
}

export default HomePage
