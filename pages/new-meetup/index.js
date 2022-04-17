// This approach allows for nested routes unlike the file naming in the root
import NewMeetUpForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import { Fragment } from "react";
import Head from "next/head";

const NewMeetUpPage = () => {
  const router = useRouter();

  const addMeetUpHandler = async (enteredMeetupData) => {
    // could also use axios
    // will send a request to the api folder which  will trigger the handler function
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // waits for the fetch data
    const data = await response.json();

    console.log("Submitted meetup : ", data);

    router.push("/");

    // router.replace() Doesn't let user use the back button after sending him elsewhere
    //router.replace()
  };

  return (
    <Fragment>
      <Head>
        <title>Add a new meetup!</title>
        <meta name="description" content="Add a new meetup to our database" />
      </Head>
      <NewMeetUpForm onAddMeetup={addMeetUpHandler} />
    </Fragment>
  );
};

export default NewMeetUpPage;
