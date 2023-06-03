import React from 'react'
import Document, { DocumentInitialProps, DocumentContext, Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import { config } from '../helpers/configs';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        })

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      }
    } finally {
      sheet.seal()
    }
  }

  render(): JSX.Element {
    const GTM_ID = process.env.GTM_ID;

    return (
      <Html lang="pt">
        <Head>
          <meta charSet="utf-8" />
          <meta property="og:site_name" content="Axenya" />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap" rel="stylesheet" />

          <link rel="icon" href={`${config.url.base}/axenya_favicon.ico`} />

          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}></script>
          <script
            dangerouslySetInnerHTML={
              {
              __html: `window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GTM_ID}');`,
              }
            }
          />
        </Head>

        <body>
          <Main />
          <NextScript />

          <noscript
              dangerouslySetInnerHTML={{
                __html: `
                  <iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
                  height="0" width="0" style="display:none;visibility:hidden"></iframe>
                `,
              }}
            />
        </body>
      </Html>
    )
  }
}