import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image"

import { AiFillStar } from "react-icons/ai";

import { setThemeNavigation } from "../../../../helpers/general";
import { Col, Flex, Layout, Row } from "../../../../styles/grid"
import { Text } from "../../../../styles/text"
import theme from "../../../../styles/theme"
import { S } from "./styles"

export const Sections = {
    Principal: () => {
        const [sectionRef, inViewSection] = useInView({
            threshold: .2
        });

        const contentRef = useRef<HTMLDivElement>(null);
        const infoRef = useRef<HTMLDivElement>(null);
        const imageRef = useRef<HTMLDivElement>(null);

        const handleScroll = () => {
            const contentElement = contentRef.current!;
            const infoElement = infoRef.current!;
            const imageElement = imageRef.current!;
            const scrollPosition = window.pageYOffset || 0;
            const sectionPosition = contentElement?.getBoundingClientRect().y;
            const opacity = sectionPosition / window.innerHeight + 1;

            contentElement.style.opacity = `${opacity}`;
            infoElement.style.transform = `translateY(${scrollPosition * 0.8}px)`;
            imageElement.style.transform = `translateY(${scrollPosition * 0.8}px)`;
        };

        useEffect(() => {
            window.addEventListener('scroll', handleScroll);

            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }, []);

        useMemo(() => {
            if (inViewSection) {
                setThemeNavigation('default');
            }
        }, [inViewSection]);

        return (
            <S.Section ref={sectionRef}>
                <Layout ref={contentRef}>
                    <S.Content pt='160px' pb='440px'>
                        <Row gap='32px'>
                            <Col ref={infoRef}>
                                <S.Title as='h1'>
                                    Fazemos a saúde fluir de um jeito inteligente.
                                </S.Title>
                                <Text
                                    as='h2'
                                    category='s1'
                                    color={theme.colors.white}
                                    mb='16px'
                                >
                                    Cuidamos melhor das pessoas, conquistamos melhores resultados clínicos e reduzimos os custos com saúde das empresas.
                                </Text>
                                <S.Button as='a' color={theme.colors.white}>
                                    RH, Fale com a gente
                                </S.Button>
                            </Col>
                            <Col>
                                <S.Background ref={imageRef}>
                                    <img
                                        src='/assets/img/axenya-background.png'
                                        alt='Uma fotografia de uma mulher, com uma sobreposição de imagens relacionado a saúde'
                                        width={1100}
                                        height={900}
                                    />
                                </S.Background>
                            </Col>
                        </Row>
                    </S.Content>
                </Layout>
            </S.Section>
        )
    },
    Soluction: () => {
        const [sectionRef, inViewSection] = useInView({
            threshold: 0.9
        });
        const { Block } = S.Soluction;

        useMemo(() => {
            if (inViewSection) {
                setThemeNavigation('dark');
            }
        }, [inViewSection]);

        return (
            <S.Section bg={theme.colors.white} ref={sectionRef}>
                <Layout>
                    <Block>
                        <div>
                            <Text
                                as='h2'
                                category='b1'
                                weight='light'
                                color='#7E7E7E'
                                mb='24px'
                            >
                                Um ecossistema personalizado e inteligente de saúde, que flui sem amarras, atendendo pessoas e empresas, de ponta a ponta.
                            </Text>
                            <S.Button as='a' color={theme.colors.white} bg={theme.colors.primary}>
                                RH, Fale com a gente
                            </S.Button>
                        </div>
                        <img
                            src='/assets/img/soluctions-diagram.png'
                            alt='As 8 principais soluções da Axenya'
                            width={1000}
                            height={664}
                        />
                    </Block>
                </Layout>
            </S.Section>
        )
    },
    Phrase: () => {
        const PharesElements = [
            (<>Tudo para destravar o sistema de saúde.</>),
            (<>Que finalmente pode trabalhar a seu favor.</>),
            (<><strong style={{ color: '#3AB8B7' }}>Nós Cuidamos da burocracia,</strong><br/><strong style={{ color: '#3896B4' }}>Você Cuida da sua empresa.</strong></>)
        ];
        const sectionRef = useRef<HTMLDivElement>(null);
        const phraseRef = useRef<HTMLDivElement>(null);
        const [sectionOnView, setSectionOnView] = useState(false);
        const [sectionCurrentPosition, setSectionCurrentPosition] = useState(0);
        const [sectionTotalHeight, setSectionTotalHeight] = useState(0);
        const [phraseHeight, setPhraseHeight] = useState(0);
        const contentHeight = sectionTotalHeight / (PharesElements.length + 1);

        useEffect(() => {
            const handleScroll = () => {
                const sectionElement = sectionRef.current!;
                const { top, bottom, y, height } = sectionElement.getBoundingClientRect();
                const sectionInViewValue = window.innerHeight - y;
                const opacity = (sectionInViewValue / window.innerHeight) * 2;
                const phraseElement = phraseRef.current!;

                setPhraseHeight(phraseElement?.getBoundingClientRect().height);
                setSectionCurrentPosition(sectionInViewValue);
                setSectionTotalHeight(height);
                
                sectionElement.style.opacity = `${opacity}`;

                setSectionOnView(top <= 0 && bottom >= 0)
            };
        
            window.addEventListener('scroll', handleScroll);

            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }, []);

        useMemo(() => {
            if (sectionOnView) {
                setThemeNavigation('light');
            }
        }, [sectionOnView])

        return (
            <>
                <S.Section
                    bg={theme.colors.white}
                    ref={sectionRef}
                    height='300vh'
                >
                    <S.StickyContent height='auto'>
                        <Layout>
                            <div style={{ height: '75vh' }}>
                                <S.PhraseList ref={phraseRef}>
                                    {PharesElements.map((phraseElement, index) => {
                                        const currentHeight = (contentHeight * (index + 1) / 4) + 200;
                                        const translate = -((sectionCurrentPosition / 3) - (currentHeight));
                                        let opacity = (translate + 100) / 100;
                                        
                                        if (translate > phraseHeight / 2.8) {
                                            opacity = translate / 1000;

                                            if (translate > phraseHeight / 2.2) {
                                                opacity = 0;
                                            }
                                        }

                                        return (
                                            <S.Phrase
                                                as='h3'
                                                category='h1'
                                                weight='bold'
                                                color={theme.colors.primary}
                                                key={index}
                                                style={{
                                                    opacity: opacity,
                                                    transform: `translateY(${translate}px)`,
                                                    fontSize: '2.5rem'
                                                }}
                                            >
                                                {phraseElement}
                                            </S.Phrase>
                                        )
                                    })}
                                </S.PhraseList>
                            </div>
                        </Layout>
                        <S.PhraseBlock>
                            <S.PhraseBackground>
                                <img
                                    src='/assets/img/25052023-pacient-and-doctor.png'
                                    alt='Uma doutora cuidando de seu paciente'
                                    width={1920}
                                    height={1420}
                                />
                            </S.PhraseBackground>
                            <Layout>
                                <Col width='60%' style={{ margin: '0 auto' }}>
                                    <Text
                                        as='h4'
                                        category='h3'
                                        weight='bold'
                                        mb='24px'
                                    >
                                        Somos especialistas em ajudar empresas a melhorar a gestão de pessoas através da saúde integrada.
                                    </Text>
                                    <Text
                                        as='h4'
                                        category='b2'
                                        weight='light'
                                        mb='24px'
                                    >
                                        Com análises abrangentes, automação e preços justos, o Axenya oferece uma plataforma integrada para manter a sinistralidade atualizada, melhorar a eficiência e garantir uma gestão de saúde eficaz.
                                    </Text>
                                    <S.Button
                                        as='a'
                                        color={theme.colors.white}
                                        bg={theme.colors.primary}
                                    >
                                        Conheça nossas soluções
                                    </S.Button>
                                </Col>
                            </Layout>
                        </S.PhraseBlock>
                    </S.StickyContent>
                </S.Section>
            </>
        )
    },
    Tech: () => {
        const sectionRef = useRef<HTMLDivElement>(null);
        const titleRef = useRef<HTMLDivElement>(null);
        const imageRef = useRef<HTMLDivElement>(null);
        const leftBoxRef = useRef<HTMLDivElement>(null);
        const rightBoxRef = useRef<HTMLDivElement>(null);

        const [sectionOnView, setSectionOnView] = useState(false);

        useEffect(() => {
            const sectionElement = sectionRef.current!;

            const handleTitleElement = () => {
                const titleElement = titleRef.current!;
                const elementPosition = titleElement?.getBoundingClientRect().y;
                const elementInViewHalf = window.innerHeight / 3 - elementPosition;
                const opacity = (elementInViewHalf / window.innerHeight) * 5;
                const transition = Math.min(60, (elementInViewHalf / window.innerHeight) * 300);

                titleElement.style.opacity = `${opacity}`;
                titleElement.style.transform = `translateY(${transition}px)`;
            }

            const handleImageElement = () => {
                const imageElement = imageRef.current!;
                const sectionPosition = sectionElement?.getBoundingClientRect().y;
                const opacity = (-sectionPosition * 4) / window.innerHeight;
                const transition = Math.max(-100, ((sectionPosition * 4) / window.innerHeight) * 200);

                imageElement.style.opacity = `${opacity}`;
                imageElement.style.transform = `translateY(${transition}px)`;
            }

            const handleLeftBoxElement = () => {
                const leftBoxElement = leftBoxRef.current!;
                const sectionHeight = sectionElement?.getBoundingClientRect().height;
                const sectionPosition = sectionElement?.getBoundingClientRect().y;
                const shouldShow = sectionPosition < -(sectionHeight / 4);

                if (shouldShow) leftBoxElement.classList.add('fade-in');
                else leftBoxElement.classList.remove('fade-in');
            }

            const handleRightBoxElement = () => {
                const rightBoxElement = rightBoxRef.current!;
                const sectionHeight = sectionElement?.getBoundingClientRect().height;
                const sectionPosition = sectionElement?.getBoundingClientRect().y;
                const shouldShow = sectionPosition < -(sectionHeight / 3);

                if (shouldShow) rightBoxElement.classList.add('fade-in');
                else rightBoxElement.classList.remove('fade-in');
            }

            const handleScroll = () => {
                handleTitleElement();
                handleImageElement();
                handleLeftBoxElement();
                handleRightBoxElement();

                const { top, bottom } = sectionElement.getBoundingClientRect();
                setSectionOnView(top <= 0 && bottom >= 0);
            };
        
            window.addEventListener('scroll', handleScroll);

            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }, []);

        useMemo(() => {
            if (sectionOnView) {
                setThemeNavigation('light');
            }
        }, [sectionOnView]);

        return (
            <S.Section
                bg='#F5F5F5'
                ref={sectionRef}
                height='300vh'
            >
                <S.StickyContent height='auto' top='80px'>
                    <Layout>
                        <Col width='60%' ref={titleRef}>
                            <Text as='h3' category='b1' mb='24px' weight='bold'>
                                Tecnologia para otimizar processos.
                            </Text>
                            <Text as='p' category='m2' weight='light'>
                                Somos uma empresa com DNA tecnológico, mas nosso objetivo é utilizar a tecnologia para otimizar processos e garantir uma experiência humana excepcional para nossos clientes.
                            </Text>
                        </Col>

                        <S.Tech.ImageBox ref={imageRef}>
                            <S.Tech.InfoBox side='left' ref={leftBoxRef}>
                                <Text as='p' category='s1' mb='8px'>
                                    Para a empresa: Hub RH
                                </Text>
                                <Text as='p' category='s2' mb='8px' color={theme.colors.gray_dark}>
                                    Um sistema online, que automatiza, metrifica e organiza toda a rotina do dia a dia com as provedoras e planos de saúde.
                                </Text>
                                <S.Tech.Line side='left' />
                            </S.Tech.InfoBox>
                            <S.Tech.InfoBox side='right' ref={rightBoxRef}>
                                <Text as='p' category='s1' mb='8px'>
                                    Para os colaboradores: Axenya App
                                </Text>
                                <Text as='p' category='s2' mb='8px' color={theme.colors.gray_dark}>
                                    Um app conectado a 450 dispositivos que captura indicadores de saúde, oferece 3 níveis de suporte, um plano personalizado e ainda centraliza dados em um só lugar.
                                </Text>
                                <S.Tech.Line side='right' />
                            </S.Tech.InfoBox>
                            <div>
                                <img
                                    src='/assets/img/25052023-device-axenya.png'
                                    alt='Plataforma web e app Axenya'
                                    width={1200}
                                    height={940}
                                />
                            </div>
                        </S.Tech.ImageBox>
                    </Layout>
                </S.StickyContent>
            </S.Section>
        )
    },
    Benefits: () => {
        const { Block, Box, Center, Progress, Divider, BlockInfo } = S.Benefits;
        const [sectionRef, inViewSection] = useInView({
            threshold: .4
        });
        
        return (
            <S.Section
                bg={theme.colors.white}
                ref={sectionRef}
            >
                <S.Content pt='120px' pb='120px'>
                    <Layout>
                        <Block>
                            <Row gap='68px' style={{ alignItems: 'center' }}>
                                <Col count={2}>
                                    <Text as='h3' category='b1' mb='24px' weight='bold'>
                                        Soluções completas para seus colaboradores
                                    </Text>
                                    <Text as='p' category='m2' weight='light' mb='24px'>
                                        Somos uma empresa com DNA tecnológico, mas nosso objetivo é utilizar a tecnologia para otimizar processos e garantir uma experiência humana excepcional para nossos clientes.
                                    </Text>
                                    <S.Button as='a' color={theme.colors.white} bg={theme.colors.primary}>
                                        Soluções para seus colaboradores
                                    </S.Button>
                                </Col>
                                <Col count={3}>
                                    <img
                                        src='/assets/img/25052023-woman-seat-happy.jpg'
                                        alt='Mulher olhando para um tablet sorrindo'
                                        width={640}
                                        height={511}
                                    />
                                </Col>
                            </Row>
                        </Block>

                        <BlockInfo gap='32px' className={inViewSection ? 'fade-in' : ''}>
                            <Col>
                                <Box>
                                    <Center>
                                        <Progress value={inViewSection ? '90' : '0'} />
                                        <Text
                                            as='p'
                                            category='s2'
                                            color={theme.colors.gray_dark}
                                            align='center'
                                            mt='8px'
                                        >
                                            Passaram a se sentir melhor com nosso plano de cuidado
                                        </Text>
                                    </Center>
                                    <Text as='p' category='b1' weight='bold'>
                                        90%
                                    </Text>
                                </Box>
                            </Col>
                            <Divider />
                            <Col>
                                <Box>
                                    <Center>
                                        <Progress value={inViewSection ? '78' : '0'} />
                                        <Text
                                            as='p'
                                            category='s2'
                                            color={theme.colors.gray_dark}
                                            align='center'
                                            mt='8px'
                                        >
                                            Melhoraram hábitos e rotinas de saúde
                                        </Text>
                                    </Center>
                                    <Text as='p' category='b1' weight='bold'>
                                        78%
                                    </Text>
                                </Box> 
                            </Col>
                            <Divider />
                            <Col>
                                <Box>
                                    <Center>
                                        <Progress value={inViewSection ? '71' : '0'} />
                                        <Text
                                            as='p'
                                            category='s2'
                                            color={theme.colors.gray_dark}
                                            align='center'
                                            mt='8px'
                                        >
                                            Confiam mais no médico
                                        </Text>
                                    </Center>
                                    <Text as='p' category='b1' weight='bold'>
                                        71%
                                    </Text>
                                </Box> 
                            </Col>
                        </BlockInfo>
                    </Layout>
                </S.Content>
            </S.Section>
        )
    },
    Unicef: () => {
        const sectionRef = useRef<HTMLDivElement>(null);
        const [sectionOnView, setSectionOnView] = useState(false);

        const handleScroll = () => {
            const sectionElement = sectionRef.current!;
            const { top, bottom, y, height } = sectionElement.getBoundingClientRect();
            const opacity = (height - y) / 200;
            const transition = Math.min(0, (height - y) - 100);

            sectionElement.style.opacity = `${opacity}`;
            sectionElement.style.transform = `translateY(${transition}px)`;

            setSectionOnView(top <= 0 && bottom >= 0);
        };

        useMemo(() => {
            if (sectionOnView) {
                setThemeNavigation('light');;
            }
        }, [sectionOnView]);

        useEffect(() => {
            window.addEventListener('scroll', handleScroll);

            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }, []);

        return (
            <S.Section bg={theme.colors.white} ref={sectionRef}>
                <Layout>
                    <Row style={{ alignItems: 'center' }}>
                        <Col count={2} style={{ zIndex: '1' }}>
                            <Text
                                as='h3'
                                category='b1'
                                mb='24px'
                                weight='bold'
                            >
                                A saúde como ferramenta de impacto social.
                            </Text>
                            <Text
                                as='h4'
                                category='b2'
                                weight='light'
                                color={theme.colors.gray_dark}
                                mb='24px'
                            >
                                Axenya, Unicef e sua empresa, juntos transformando a vida de quem mais precisa.
                            </Text>
                            <S.Button
                                as='a'
                                color={theme.colors.white}
                                bg={theme.colors.primary}
                            >
                                Saiba mais
                            </S.Button>
                        </Col>
                        <Col count={3}>
                            <S.Unicef.Image
                                src='/assets/img/25052023-unicef-axenya.png'
                                alt='Unicef + Axenya'
                                width={720}
                                height={591}
                            />
                        </Col>
                    </Row>
                </Layout>
            </S.Section>
        )
    },
    Metrics: () => {
        const { Block, Stars } = S.Metrics;
        const sectionRef = useRef<HTMLDivElement>(null);
        const [sectionOnView, setSectionOnView] = useState(false);

        const handleScroll = () => {
            if (sectionRef.current) {
                const section = sectionRef.current!;
                const { top, bottom } = section.getBoundingClientRect();
                
                setSectionOnView(top <= 0 && bottom >= 0);
            }
        };
        
        useEffect(() => {
            window.addEventListener('scroll', handleScroll);
        
            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }, []);

        useMemo(() => {
            if (sectionOnView) {
                setThemeNavigation('default');
            }
        }, [sectionOnView])

        return (
            <S.Section ref={sectionRef}>
                <Layout>
                    <S.Content pt='160px' pb='160px'>
                        <Col width="55%">
                            <Text as='h3' category='b1' weight='light' color={theme.colors.white} mb='32px'>
                                Logenvidade de relacionamentos, alta capacidade de integrar e gerenciar dados, precisão de diagnóstico, soluções personalizadas, cuidado. O jeito Axenya de gerir a saúde de empresas e pessoas.
                            </Text>

                            <S.Divider />
                            <Row gap='32px'>
                                <Col>
                                    <Text as='p' category='h1' weight='light' color={theme.colors.white} mb='8px'>
                                        5%
                                    </Text>
                                    <Text as='p' category='m2' weight='light' color={theme.colors.white}>
                                        Média de reajuste da carteira corporativa nos últimos 2 anos
                                    </Text>
                                </Col>
                                <Col>
                                    <Text as='p' category='h1' weight='light' color={theme.colors.white} mb='8px'>
                                        77%
                                    </Text>
                                    <Text as='p' category='m2' weight='light' color={theme.colors.white}>
                                        Sinistralidade média da carteira
                                    </Text>
                                </Col>
                                <Col>
                                    <Text as='p' category='h1' weight='light' color={theme.colors.white} mb='8px'>
                                        24 horas
                                    </Text>
                                    <Text as='p' category='m2' weight='light' color={theme.colors.white}>
                                        SLA de atendimento
                                    </Text>
                                </Col>
                            </Row>
                            <S.Divider />
                            <Row gap='32px'>
                                <Col>
                                    <Text as='p' category='h1' weight='light' color={theme.colors.white} mb='8px'>
                                        6,8 anos
                                    </Text>
                                    <Text as='p' category='m2' weight='light' color={theme.colors.white}>
                                        média de tempo de relacionamento com cada cliente
                                    </Text>
                                </Col>
                                <Col>
                                    <Text as='p' category='h1' weight='light' color={theme.colors.white} mb='8px'>
                                        200+
                                    </Text>
                                    <Text as='p' category='m2' weight='light' color={theme.colors.white}>
                                        Clientes corporativos
                                    </Text>
                                </Col>
                                <Col>
                                    <Text as='p' category='h1' weight='light' color={theme.colors.white} mb='8px'>
                                        99%
                                    </Text>
                                    <Text as='p' category='m2' weight='light' color={theme.colors.white} mb='8px'>
                                        Índice de retenção de clientes
                                    </Text>
                                    <Stars>
                                        {[...Array(5)].map(() => 
                                            <AiFillStar color="#F6CA45" size={24} />
                                        )}
                                    </Stars>
                                </Col>
                            </Row>
                            <S.Divider />
                        </Col>
                    </S.Content>
                </Layout>
            </S.Section>
        )
    },
    About: () => {
        const { TitleBox, ImageBox } = S.About;

        return (
            <S.Section bg={theme.colors.white}>
                <Layout
                    fullWidth
                    style={{
                        maxWidth: '1800px',
                        padding: '80px 60px',
                    }}
                >
                    <TitleBox>
                        <Text as='h4' category='h3' weight='bold' mb='8px'>
                            Desafiamos o sistema.<br />Deciframos e Reiventamos a saúde.
                        </Text>
                        <Text as='h4' category='b2' weight='light' color={theme.colors.gray_dark} mb='8px'>
                            Somos uma nova Categoria. Somos Axenya!
                        </Text>
                    </TitleBox>
                    <Row gap='48px'>
                        <Col count={1}>
                            <Flex gap='16px'>
                                <img src='/assets/img/25052023-mariano-garcia.png' alt='Mariano García' width={48} height={48} />
                                <img src='/assets/img/25052023-roberto-vianna.png' alt='Roberto Vianna' width={48} height={48} />
                                <img src='/assets/img/25052023-fernando-sampietro.png' alt='Fernando Sampietro' width={48} height={48} />
                                <img src='/assets/img/25052023-ricardo-ramalho.png' alt='Ricardo Ramalho' width={48} height={48} />
                                <img src='/assets/img/25052023-andre-saigh.png' alt='Andre Saigh' width={48} height={48} />
                                <img src='/assets/img/25052023-marcelo-rinesi.png' alt='Marcelo Rinesi' width={48} height={48} />
                            </Flex>
                            <Text as='h4' category='s1' weight='light' color={theme.colors.gray_dark} mb='16px' mt='16px'>
                                Nós somos uma empresa formada por líderes com mais de 35 anos de experiência na área de saúde e gestão de planos. Nosso conhecimento e expertise nos permitem oferecer soluções personalizadas e eficientes para cada uma de nossas empresas parceiras.
                            </Text>
                            <S.Button as='a' color={theme.colors.white} bg={theme.colors.primary}>
                                Conheça nossa empresa
                            </S.Button>
                        </Col>
                        <Col count={3}>
                            <ImageBox>
                                <img
                                    src='/assets/img/25052023-table-data-axenya.png'
                                    alt='Tabela de benefícios Axenya'
                                    width={1400}
                                    height={755}
                                />
                            </ImageBox>
                        </Col>
                    </Row>
                </Layout>
            </S.Section>
        )
    }
}