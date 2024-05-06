import { Helmet } from "react-helmet";

const DynamicMeta = ({ title, description }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default DynamicMeta;
