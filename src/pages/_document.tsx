import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Mengubah Title Global */}
        <title>Roxyfi</title>

        {/* Mengubah favicon */}
        <link rel="icon" href="/public/images/11zon_cropped (1).png" />
        
        {/* Preconnect untuk meningkatkan kecepatan memuat font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Mengimpor font Orbitron dari Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
