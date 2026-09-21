import { Helmet } from "react-helmet-async";

const SITE = "https://college-degree-gpt.lovable.app";

interface PageMetaProps {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}

/** Per-route title, description and canonical. */
const PageMeta = ({ title, description, path, noindex }: PageMetaProps) => (
  <Helmet>
    <title>{title}</title>
    <meta name="title" content={title} />
    <meta name="description" content={description} />
    <link rel="canonical" href={`${SITE}${path}`} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={`${SITE}${path}`} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta
      name="robots"
      content={
        noindex
          ? "noindex, follow"
          : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      }
    />
  </Helmet>
);

export default PageMeta;
