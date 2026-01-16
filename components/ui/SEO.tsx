import Head from 'next/head';

const SEO = ({
  title = 'Drift Running Club ✦ Concept by PARANTHESE STUDIO',
  description = 'A non-commercial concept project by Paranthese Studio, bringing to life a design for the running club brand Drift Running Club — exploring advanced front-end interactions and motion design.',
  image = '/images/ogimage.webp',
  url = 'https://drift-running-club.paranthese.studio/',
}) => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta content="#000000" name="msapplication-TileColor" />
      <meta content="#000000" name="theme-color" />
      <title>{title}</title>
      <meta content={title} name="apple-mobile-web-app-title" />
      <meta content="yes" name="mobile-web-app-capable" />
      <meta content="yes" name="apple-mobile-web-app-capable" />
      <meta content="black-translucent" name="apple-mobile-web-app-status-bar-style" />
      <meta content={description} name="description" />
      <meta content="notranslate" name="google" />

      {/* OGTAGS */}
      <meta content="DRIFT RUNNING CLUB" property="og:site_name" />
      <meta content={title} property="og:title" />
      <meta content="en_US" property="og:locale" />
      <meta content={description} property="og:description" />
      <meta content={image} property="og:image" />
      <meta content={url} property="og:url" />
      <meta content="website" property="og:type" />

      {/* FAVICON */}
      <link href="/favicon/favicon-96x96.png" rel="icon" sizes="96x96" type="image/png" />
      <link href="/favicon/favicon.svg" rel="icon" type="image/svg+xml" />
      <link href="/favicon.ico" rel="shortcut icon" />
      <link href="/favicon/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
      <link href="/favicon/site.webmanifest" rel="manifest" />

      {/* SEO */}
      <link href={url} rel="canonical" />
      <meta content="index, follow" name="robots" />
    </Head>
  );
};

export default SEO;
