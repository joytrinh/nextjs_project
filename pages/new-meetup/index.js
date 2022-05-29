import { useRouter} from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import Head from "next/head";
import {Fragment} from "react";

function NewMeetupPage ()
{
    const router = useRouter()

    async function addMeetupHandler (enteredMeetupData)
    {
        const res = await fetch('/api/new-meetup', { // fileName of api
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        await res.json()
        router.push('/')
    }

    return <Fragment>
                <Head>
                    <title>Add a new meetup</title>
                    <meta name='description' content='Add a new meetup' />
                </Head>
                <NewMeetupForm onAddMeetup={addMeetupHandler}/>
            </Fragment>
}
export default NewMeetupPage
