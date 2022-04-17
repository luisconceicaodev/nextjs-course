import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>Next.Js Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active Next.Js meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

// Reserved Name, Next.JS recognized this and will call this before calling the component function (HomePage)
// Prepares props for this page, could contain the data this page needs
// is allowed to be asyncronous (async promise), so Next.JS will wait for the promise to resolve
// waits for data to be loaded and THEN it loads the component function (HomePage) (good for SEO -> source file is populated)

// PROBLEMS with getStaticProps => data could be outdated (not a problem for pages that change rarely)
// // if data changes frequently there's a property "revalidate" that handles the above issue
// // REVALIDADE => number of seconds until it re-generates the page for an incoming request

// // getStaticProps ensure that your pre-rendered page contains data that you might need to wait for
// // with revalidate you can ensure that this page is updated regularly after deployment

export const getStaticProps = async () => {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@miguelcluster.fnavw.mongodb.net/meetups?retryWrites=true&w=majority`
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  // finds all documents in the collection
  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 3600,
  };
};

// // but sometimes a regular update is not enough. sometimes you want to re-generate this page dynamically after deploy
// for every incoming request. Not during the build process and not after every X amount of seconds
// ALTERNATIVE: getServerSideProps
// Difference: will not run during the build process but instead always on the server after deployment

/* export const getServerSideProps = async (context) => {
  // fetch data from an API
  // must return an object that has to hold a "props" object (mandatory name)
  // you can't use revalidate here because it doesn't make sense, on every request it'll re-generate

  // you can have access to request and respond object
  const req = context.req;
  const res = context.res;

  return {
    props: {
      meetups: DUMMY_DATA,
    },
  };
}; */

/* 
getStaticProps vs getServerSideProps

If you don't have data that changes all the time (multiple times per second) 
and if you don't need access to the request object (ex: authentication) then getStaticProps is better

On getStaticProps:
- You pre-generate a HTML file that file can then be stored and served in a CDN 
and that is faster than re-generating and fetching that data for every incoming request

*/

export default HomePage;
