import Layout from "../components/layout/Layout";
import "../styles/globals.css";

// component will be the page content of our pages
// we can wrap component with our "sections" / "layouts"
const MyApp = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
