import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import DocumentHead from "../components/DocumentHead";
import { Fragment } from "react";

function HomePage(props) {
  return (
    <Fragment>
      <DocumentHead htmlMeta={props.meetups} />
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://nkprodware:iizDo9YKoMK1KMXy@cluster0.1em0l6i.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();

  if (meetups) {
    return {
      props: {
        meetups: meetups.map((meetup) => ({
          title: meetup.title ? meetup.title : null,
          image: meetup.image ? meetup.image : null,
          address: meetup.address ? meetup.address : null,
          id: meetup._id.toString(),
          description: meetup.description,
        })),
      },
      revalidate: 1,
    };
  } else {
    return {
      props: null,
    };
  }
}

// export async function getServerSideProps(context) {
//   const req = context.req
//   const res = context.res
//   return {
//     props: {
//       meetups: dummy_meetups
//     }
//   }
// }

export default HomePage;
