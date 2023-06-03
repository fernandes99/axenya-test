import Head from "next/head";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";

import { BsChevronRight } from "react-icons/bs";
import { HiUserGroup, HiUsers } from "react-icons/hi";
import { Text } from "../../styles/text";
import { Col, Flex, Row } from "../../styles/grid";
import theme from "../../styles/theme";
import { ImageSlider } from "../../components/pages/solicite-sua-cotacao/ImageSlider";
import { Navigation } from "../../components/navigation";
import { S } from "styles/pages/quotation/styles";

const SubscribeHubPage = () =>  {
    const router = useRouter();
    const goToSubscribeSegmentPage = (slug: 'PMEI' | 'PMEII' | 'PJ') => {
        router.push(`/solicite-sua-cotacao/${slug}`);
    }

    return (
        <>
            <Head>
                <title>Axenya: Solicite sua cotação</title>
                <meta name="description" content="Junte-se a nós e crie um ecossistema de saúde para sua empresa, torne-se um parceiro Axenya." />
            </Head>

            <S.Section>
                <Row>
                    <Navigation light /> 
                    <Col count={3}>
                        <S.Content bg={theme.colors.white}>
                            <S.Box>
                                <Text
                                    as='h1'
                                    category='h3'
                                    weight='bold'
                                    mb='16px'
                                >
                                    Revolucionando a experiência que as empresas e as pessoas têm com a saúde. 
                                </Text>
                                <Text
                                    as='p'
                                    category='s1'
                                    mb='42px'
                                    color={theme.colors.gray_dark}
                                >
                                    <strong>Preencha o nosso formulário</strong> e muito em breve a nossa equipe entrará em contato com você.
                                </Text>

                                <Flex direction="column" gap="16px">
                                    <S.CustomButton onClick={() => goToSubscribeSegmentPage('PMEI')}>
                                        <HiUsers
                                            size={20}
                                            color={theme.colors.secondary}
                                        />
                                        <Text
                                            as='p'
                                            category='s2'
                                            color={theme.colors.gray_darker}
                                            ml="12px"
                                            mr="auto"
                                        >
                                            Sua empresa tem entre <strong>02 e 29 vidas</strong>
                                        </Text>
                                        <BsChevronRight
                                            size={18}
                                            color={theme.colors.gray_light}
                                        />        
                                    </S.CustomButton>
                                    <S.CustomButton onClick={() => goToSubscribeSegmentPage('PMEII')}>
                                        <HiUsers
                                            size={20}
                                            color={theme.colors.secondary}
                                        />
                                        <Text
                                            as='p'
                                            category='s2'
                                            color={theme.colors.gray_darker}
                                            ml="12px"
                                            mr="auto"
                                        >
                                            Sua empresa tem entre <strong>30 e 99 vidas</strong>
                                        </Text>
                                        <BsChevronRight
                                            size={18}
                                            color={theme.colors.gray_light}
                                        />
                                    </S.CustomButton>
                                    <S.CustomButton onClick={() => goToSubscribeSegmentPage('PJ')}>
                                        <HiUserGroup
                                            size={20}
                                            color={theme.colors.secondary}
                                        />
                                        <Text
                                            as='p'
                                            category='s2'
                                            color={theme.colors.gray_darker}
                                            ml="12px"
                                            mr="auto"
                                        >
                                            Sua empresa tem <strong>+100 vidas</strong>
                                        </Text>
                                        <BsChevronRight
                                            size={18}
                                            color={theme.colors.gray_light}
                                        />
                                    </S.CustomButton>
                                </Flex>
                            </S.Box>
                        </S.Content>
                    </Col>

                    <Col count={2}>
                        <S.Content bg={theme.colors.primary}>
                            <S.Box width='75%'>
                                <ImageSlider>
                                    {(pathImage, transition) => (
                                        <S.Fade transition={transition}>
                                            <S.Background src={pathImage} alt="Médicos + técnologia" />
                                        </S.Fade>
                                    )}
                                </ImageSlider>
                                <S.Slogan>
                                    Um ecossistema inteligente<br />
                                    e completo de saúde.
                                </S.Slogan>
                            </S.Box>
                        </S.Content>
                    </Col>
                </Row>
            </S.Section>

            <ToastContainer />
        </>
    )
};

export default SubscribeHubPage;