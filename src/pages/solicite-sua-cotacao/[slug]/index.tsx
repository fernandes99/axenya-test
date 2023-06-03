import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from "next";
import { SMALL_CACHE_TIME } from "../../../constants/time";
import Head from "next/head";
import { Col, Layout, Row } from "../../../styles/grid";
import theme from "../../../styles/theme";
import { Text } from "../../../styles/text";
import { BsArrowRight } from "react-icons/bs";
import { FormBlock } from "../../../components/form";
import { useMemo } from "react";
import { S } from "styles/pages/quotation/styles";

export async function getStaticPaths(): Promise<GetStaticPathsResult<any>> {
    return {
        paths: [],
        fallback: 'blocking',
    };
}

export async function getStaticProps({
    params,
}: GetStaticPropsContext): Promise<GetStaticPropsResult<any>> {
    const companySizeSlug = params?.slug as string;

    return {
        props: {
            companySize: companySizeSlug
        },
        revalidate: SMALL_CACHE_TIME
    };
}

interface PartnerLandingPageProps {
    companySize: 'PMEI' | 'PMEII' | 'PJ',
}


const SubscribeSegmentPage = ({ companySize }: PartnerLandingPageProps) => {
    return (
        <>
            <Head>
                <title>Axenya: Solicite sua cotação</title>
                <meta name="description" content="Revolucionando a experiência que as empresas e pessoas têm com a saúde." />
            </Head>

            <S.Section bg={theme.colors.primary}>
                <Layout>
                    <Row>
                        <Col>
                            <S.Content bg={theme.colors.primary}>
                                <div>
                                    <Text
                                        as='h1'
                                        category='h3'
                                        weight='bold'
                                        mb='32px'
                                        mt='32px'
                                        color={theme.colors.white}
                                    >
                                        Revolucionando a experiência que as empresas e as pessoas têm com a saúde.
                                    </Text>
                                    <Text
                                        as='p'
                                        category='m2'
                                        color={theme.colors.white}
                                        mb='24px'
                                    >
                                        Somos especialistas em encontrar o plano de saúde ideal para sua empresa.
                                    </Text>
                                    <Text
                                        as='p'
                                        category='m2'
                                        color={theme.colors.white}
                                        mb='24px'
                                    >                          
                                        <strong>Preencha o nosso formulário</strong> e muito em breve nossa equipe entrará em contato com você.
                                    </Text>
                                    <Text
                                        as='p'
                                        category='m2'
                                        color={theme.colors.white}
                                        mb='24px'
                                    >
                                        Seja muito bem-vindo!
                                    </Text>
                                    <BsArrowRight size={32} color={theme.colors.white} />
                                </div>
                            </S.Content>
                        </Col>
                        <Col>
                            <S.Content bg={theme.colors.primary}>
                                <S.Box width="90%">
                                    <FormBlock companySize={companySize} />
                                </S.Box>
                            </S.Content>
                        </Col>
                    </Row>
                </Layout>
            </S.Section>
        </>
    )
}


export default SubscribeSegmentPage;