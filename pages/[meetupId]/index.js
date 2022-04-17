import { Fragment } from "react";
import MeetupDetails from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

// This approach allows for nested routes unlike the file naming in the root
const MeetUpDetail = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetails
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
};

// useRouter can only be used on the component function NOT in the getStaticProps
// but you can use the context parameter (won't have request and response but will have params key)
// context.params.meetupId => naming that is inside the brackets [meetupId]
// problem: the params are not pre-generated when the user visits the page but only during the build process
export const getStaticProps = async (context) => {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@miguelcluster.fnavw.mongodb.net/meetups?retryWrites=true&w=majority`
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  // findOne finds a single object
  // ObjectId converts to mongo's data type
  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });
  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
    revalidate: 60,
  };
};

// hard codes the possible params that would be pre-generated and accounted for
// paths => array of objects with the keys accounted as pre-generated
// fallback => tells Next.Js whether my paths array has all supported parameter values or just some of them
// fallback: false => my paths contains all id values / fallback: true => my paths contains only some id values
// if false returns 404 page for unrecognized id values / if true will try to regenerate
export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@miguelcluster.fnavw.mongodb.net/meetups?retryWrites=true&w=majority`
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  // first argument ({}) give me all the objects (no filter criteria)
  // second argument gets which fields should be extracted per document
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
};

export default MeetUpDetail;
