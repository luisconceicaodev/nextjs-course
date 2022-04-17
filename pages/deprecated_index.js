import MeetupList from "../components/meetups/MeetupList";
import { useState, useEffect } from "react";

const DUMMY_DATA = [
  {
    id: "1",
    title: "The First Meet Up",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Flag_of_Oklahoma.svg/2560px-Flag_of_Oklahoma.svg.png",
    address: "2863 Late Avenue, Oklahoma City",
    description: "This is a first meetup!",
  },
  {
    id: "2",
    title: "The Second Meet Up",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Flag_of_Oklahoma.svg/2560px-Flag_of_Oklahoma.svg.png",
    address: "2863 Late Avenue, Oklahoma City",
    description: "This is a second meetup!",
  },
];

const HomePage = () => {
  // NO LONGER NEEDS STATE NOR REF BECAUSE OF getStaticProps
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  useEffect(() => {
    // send a HTTP request and fetch data
    // nextJS doesn't wait for the data, returns the result of the first component cycle []
    // But NextJS offers two ways of Pre-Rendering: Static Generation OR Server-Side Rendering
    setLoadedMeetups(DUMMY_DATA);
  }, []);

  return <MeetupList meetups={loadedMeetups} />;
};

// Reserved Name, Next.JS recognized this and will call this before calling the component function (HomePage)
// Prepares props for this page, could contain the data this page needs
// is allowed to be asyncronous (async promise), so Next.JS will wait for the promise to resolve
// waits for data to be loaded and THEN it loads the component function (HomePage)
export const getStaticProps = async () => {
  // fetch data from an API
  // must return an object that has to hold a "props" object (mandatory name)

  return {
    props: {
      meetups: DUMMY_DATA,
    },
  };
};

export default HomePage;
