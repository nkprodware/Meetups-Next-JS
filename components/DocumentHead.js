import Head from "next/head";

function DocumentHead(props) {
  const description = props.htmlMeta.description;
  const _title = props.htmlMeta.title;

  return (
    <Head>
      <title>{props.htmlMeta.id ? _title : "Meetups"}</title>
      <meta property="description" content={description} key="description" />
    </Head>
  );
}

export default DocumentHead;
