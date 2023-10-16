import { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import DocumentHead from "../../components/DocumentHead";

function MeetupDetails(props) {
  console.log("show props", props.onAddMeetup);
  return (
    <Fragment>
      <DocumentHead htmlMeta={props.meetupsData} />
      <MeetupDetail
        image={props.meetupsData.image}
        title={props.meetupsData.title}
        description={props.meetupsData.description}
        address={props.meetupsData.address}
        id={props.meetupsData.id}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://nkprodware:iizDo9YKoMK1KMXy@cluster0.1em0l6i.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: "blocking",
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  console.log("id", meetupId);
  const client = await MongoClient.connect(
    "mongodb+srv://nkprodware:iizDo9YKoMK1KMXy@cluster0.1em0l6i.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupsData: {
        id: selectedMeetup._id.toString(),
        image: selectedMeetup.image,
        title: selectedMeetup.title,
        description: selectedMeetup.description,
        address: selectedMeetup.address,
      },
    },
  };
}

export default MeetupDetails;
