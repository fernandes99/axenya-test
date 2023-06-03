import Head from "next/head";
import { useEffect, useState } from "react";
import { Col, Layout } from "../../styles/grid";
import { Text } from "../../styles/text";
import { S } from "styles/pages/privacy/styles";

const PrivacyPage: React.FC = () => {
  const [privacyData, setPrivacyData] = useState('');

  const fetchPrivacyData = async () => {
    fetch('/api/dato/privacy')
        .then(res => res.json())
        .then(result => {
          if (!result?.data?.privacy) return;

          const breakLinesFormated = result.data.privacy.axenyaPrivacy.replaceAll('\n', '<br />') 

          setPrivacyData(breakLinesFormated);
        });
  }

  useEffect(() => {
      fetchPrivacyData();
  }, [])

  return (
    <>
    <Head>
      <title>Axenya | Política de Privacidade</title>
      <meta name="description" content="Axenya | Política de Privacidade" />
    </Head>

    <Layout>
      <S.Box>
        <Col>
          <Text as="h1" category="h2" mb="32px">
            Política de Privacidade da Axenya
          </Text>

          {!!privacyData &&
            <>
              <div dangerouslySetInnerHTML={{ __html: privacyData }} />
            </>
          }
        </Col>
      </S.Box>
    </Layout>
    </>
  )
}
  
  export default PrivacyPage;
  