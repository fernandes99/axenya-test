import Head from "next/head";
import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from "next";

import { GENERAL_CACHE_TIME } from "../../../constants/time";
import { partners } from "../../../constants/partners";
import { Col, Row, Layout, Flex } from "../../../styles/grid";
import { BiPlus } from "react-icons/bi";
import theme from "../../../styles/theme";
import { useState } from "react";
import { Text } from "../../../styles/text";
import { BsArrowRight, BsFillCheckCircleFill } from "react-icons/bs";
import { showToast } from "../../../helpers/toast";
import { ToastContainer } from "react-toastify";
import { FeedbackForm, LoadingForm } from "../../../styles/pages/home/styles";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { ArtonForm } from "../../../components/pages/parcerias/ArtonForm";
import { HubsForm } from "../../../components/pages/parcerias/HubsForm";
import { S } from "styles/pages/partner/styles";

export async function getStaticPaths(): Promise<GetStaticPathsResult<any>> {
    return {
        paths: [],
        fallback: 'blocking',
    };
}

export async function getStaticProps({
    params,
  }: GetStaticPropsContext): Promise<GetStaticPropsResult<any>> {
    const partnerSlug = params?.slug as string;
    const partnerData = partners.find(partner => partner.slug === partnerSlug);
    
    if (!partnerSlug || !partnerData) {
        return {
            notFound: true
        }
    }

    return {
        props: {...partnerData},
        revalidate: GENERAL_CACHE_TIME
    };
}

interface PartnerLandingPageProps {
    slug: string,
    name: string,
    pathLogo: string
}

const PartnerLandingPage = (partner: PartnerLandingPageProps) =>  {
    const title = `Axenya + ${partner.name}`;
    const [loadingForm, setLoadingForm] = useState(false);
    const [sendedForm, setSendedForm] = useState(false);

    const FormBlock = () => (
        <>
            {loadingForm && <LoadingForm />}
            {sendedForm ?
                <FeedbackForm>
                    <AiOutlineCheckCircle size={36} />
                    <Text
                        as="p"
                        category="m1"
                        color={theme.colors.white}
                    >
                        Informações enviadas com sucesso! Entraremos em contato em breve
                    </Text>
                </FeedbackForm>
                :
                <>
                    {partner.slug === 'arton' &&
                        <ArtonForm
                            onError={() => showToast("error", "Houve um problema ao enviar suas informações, tente novamente mais tarde.")}
                            onSuccess={() => {
                                showToast("success", "Suas informações foram enviadas com sucesso!");
                                setSendedForm(true);
                            }}
                            setLoading={setLoadingForm}
                            partner={{...partner }}
                        />
                    }
                    {partner.slug === 'clube-hubs' &&
                        <HubsForm
                            onError={() => showToast("error", "Houve um problema ao enviar suas informações, tente novamente mais tarde.")}
                            onSuccess={() => {
                                showToast("success", "Suas informações foram enviadas com sucesso!");
                                setSendedForm(true);
                            }}
                            setLoading={setLoadingForm}
                            partner={{...partner }}
                        />
                    }
                </>
            }
        </>
    )

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content="O primeiro ecossistema inteligente de saúde. Substituímos a sua corretora de saúde e fazemos muito mais." />
            </Head>

            <S.Nav>
                <Layout>
                    <S.BrandBox>
                        <img src='/axenya-logotype.svg' />
                        <BiPlus size={24} color={theme.colors.gray_light} />
                        <img src={partner.pathLogo} alt={`Logo de ${partner.name}`} />
                    </S.BrandBox>
                </Layout>
            </S.Nav>

            {partner.slug === 'arton' ?
                <S.Section>
                    <Row>
                        <Col>
                            <S.Content bg='rgb(0 0 0 / 97%)'>
                                <S.Box>
                                    <Text
                                        as='h1'
                                        category='h3'
                                        weight='bold'
                                        mb='32px'
                                        mt='32px'
                                        color={theme.colors.white}
                                    >
                                        Você não precisa mais escolher entre saúde e redução de custos!
                                    </Text>
                                    <Text
                                        as='p'
                                        category='s1'
                                        weight='bold'
                                        mb='32px'
                                        color={theme.colors.white}
                                    >
                                        A Axenya é uma “one-stop-shop” na Gestão de saúde empresarial.
                                    </Text>
                                    <Text
                                        as='p'
                                        category='s1'
                                        mb='32px'
                                        style={{ lineHeight: '140%' }}
                                        color={theme.colors.white}
                                    >
                                        Um Ecossistema inteligente e completo de saúde. Da escolha, desenho e formatação do produto ideal para cada empresa, ao gerenciamento e automatização de rotinas operacionais até uma gestão eficaz de saúde, analisando e integrando dados de saúde populacional, individual e múltiplas outras fontes de dados, e trazendo, assim, soluções personalizadas para cada necessidade e situação.
                                    </Text>

                                    <Flex direction="column" gap="16px">
                                        <Flex>
                                            <BsFillCheckCircleFill
                                                size={22}
                                                color={theme.colors.success}
                                            />
                                            <Text
                                                as='p'
                                                category='s1'
                                                weight='bold'
                                                ml='8px'
                                                color={theme.colors.white}
                                            >
                                                Tecnologia de ponta
                                            </Text>
                                        </Flex>
                                        <Flex>
                                            <BsFillCheckCircleFill
                                                size={22}
                                                color={theme.colors.success}
                                            />
                                            <Text
                                                as='p'
                                                category='s1'
                                                weight='bold'
                                                ml='8px'
                                                color={theme.colors.white}
                                            >
                                                Ciência de dados
                                            </Text>
                                        </Flex>
                                        <Flex>
                                            <BsFillCheckCircleFill
                                                size={22}
                                                color={theme.colors.success}
                                            />
                                            <Text
                                                as='p'
                                                category='s1'
                                                weight='bold'
                                                ml='8px'
                                                color={theme.colors.white}
                                            >
                                                Equipe multiprofissional médica
                                            </Text>
                                        </Flex>
                                    </Flex>
                                </S.Box>
                            </S.Content>
                        </Col>
                        <Col>
                            <S.Content bg={theme.colors.primary}>
                                <S.Box width='75%'>
                                    <FormBlock />
                                </S.Box>
                            </S.Content>
                        </Col>
                    </Row>
                </S.Section>
                :
                <S.Section bg={theme.colors.primary} p='120px 0'>
                    <Layout>
                        <S.ColBox>
                            <div>
                                <img src="/axenya-logo-white.svg" alt="Logo Axenya" width="48px" />
                                <Text
                                    as='h1'
                                    category='h3'
                                    weight='bold'
                                    color={theme.colors.white}
                                    mb='24px'
                                    mt='24px'
                                >
                                    Nós cuidamos da sua saúde para que você tenha tempo para cuidar do seu negócio!
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
                                    <strong>Preencha o formulário</strong> e nossa equipe entrará em contato com você já com uma cotação indicativa.
                                </Text>
                                <Text
                                    as='p'
                                    category='m2'
                                    color={theme.colors.white}
                                    mb='24px'
                                >
                                    Seja muito bem vindo!
                                </Text>
                                <BsArrowRight size={32} color={theme.colors.white} />
                            </div>
                            <div>
                                <FormBlock />
                            </div>
                        </S.ColBox>
                    </Layout>
                </S.Section>
            }

            <ToastContainer />
        </>
    )
};


export default PartnerLandingPage;