import { Fragment } from "react";
import classes from "./MeetupDetail.module.css";

// This approach allows for nested routes unlike the file naming in the root
const MeetupDetails = (props) => {
  return (
    <section className={classes.detail}>
      <img src={props.image} alt={props.title} />
      <h1>{props.title}</h1>
      <address>{props.address}</address>
      <p>{props.description}</p>
    </section>
  );
};

export default MeetupDetails;
