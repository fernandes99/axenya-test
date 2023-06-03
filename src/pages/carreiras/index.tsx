import { Navigation } from "../../components/navigation";
import { Col, Flex, Layout, Row } from "../../styles/grid";
import { Text } from "../../styles/text";
import theme from "../../styles/theme";
import { BiBrain, BiBulb, BiCategory, BiChart, BiConversation, BiGroup, BiShapeCircle, BiTrendingUp, BiUserCheck } from 'react-icons/bi';
import { MdLocationOn } from 'react-icons/md';
import { BsChevronDown, BsChevronUp, BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from 'react-icons/bs';
import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { config } from "../../helpers/configs";
import { jobList, leaderList, teamsList } from "../../constants/careers/data";
import { S } from "styles/pages/career/styles";

const cultureList = [
    {
        title: 'Sonhamos cada vez mais alto, não medimos esforços e nossa ambição não tem limites',
        text: 'Estamos nisso para ajudar a levar a humanidade para um futuro melhor, para proporcionar mudanças disruptivas e desafiar constantemente o status quo. Qualquer coisa menos, simplesmente não basta.',
        icon: <BiTrendingUp size={32} color="#1B90B3" />
    },
    {
        title: 'Sempre pensamos e operamos do ponto de vista do cliente',
        text: 'Nossos clientes e pacientes são nossa razão de existir. Como tal, focamos em primeiro lugar em oferecer a melhor solução para os clientes que atendemos, tratando o resultado final como consequência de um serviço de excelência.',
        icon: <BiUserCheck size={32} color="#1B90B3" />
    },
    {
        title: 'Nós nos esforçamos para combinar idealismo com pragmatismo',
        text: 'Contratamos apenas os melhores e mais talentosos e fornecemos um ambiente onde eles podem prosperar, com amplo espaço para capacitação, crescimento e tomada de decisões.',
        icon: <BiChart size={32} color="#1B90B3" />
    },
    {
        title: 'Acreditamos no poder de grandes pessoas e grandes equipes',
        text: 'Trabalhamos sob a filosofia da melhorias constantes, sempre dispostos a sacrificar ou adicionar elementos aos nossos projetos, redesenhando-os do zero ou até mesmo desfazendo-os totalmente, se necessário. Incentivamos nosso pessoal a experimentar, assumir riscos e realmente tratar os erros como oportunidades de aprendizado.',
        icon: <BiGroup size={32} color="#1B90B3" />
    },
    {
        title: 'Acreditamos em uma cultura de aprendizado genuína',
        text: 'Trabalhamos sob a filosofia da melhorias constantes, sempre dispostos a sacrificar ou adicionar elementos aos nossos projetos, redesenhando-os do zero ou até mesmo desfazendo-os totalmente, se necessário. Incentivamos nosso pessoal a experimentar, assumir riscos e realmente tratar os erros como oportunidades de aprendizado.',
        icon: <BiBrain size={32} color="#1B90B3" />
    },
    {
        title: 'Operamos como uma meritocracia de ideias',
        text: 'Valorizamos a transparência e a verdade radical. Lutamos por um ambiente onde todas as ideias tenham a oportunidade de serem expressas e analisadas, de forma objetiva e por seus próprios méritos. Também tratamos os colaboradores de forma proporcional às suas contribuições, operando como uma genuína meritocracia. Não temos medo de lidar com os atritos que esses processos podem produzir.',
        icon: <BiConversation size={32} color="#1B90B3" />
    },
    {
        title: 'Abraçamos a inovação abertamente',
        text: 'Além de contar com nosso conhecimento interno e recursos para inovação, também buscamos ativamente fontes externas para expandir e aprimorar o que fazemos.',
        icon: <BiBulb size={32} color="#1B90B3" />
    }
]

const CareersPage: React.FC = () => {
    const router = useRouter();
    const [itemsExpanded, setItemsExpanded] = useState<number[]>([]);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [scrolledLeader, setScrolledLeader] = useState(false);
    const [slideLimit, setSlideLimit] = useState(false);
    const [slideInitial, setSlideInitial] = useState(true);
    const [isMobile, setMobile] = useState<boolean>(false);
    const refLeaderList = useRef(null);
    const refTeamList = useRef(null);
    const MOBILE_BREAKPOINT = 520;

    const handleScroll = (event: any) => {
        const position = event?.target?.scrollTop;
        setScrollPosition(position);
    };

    const scrollCarouselLeader = (direction: 'next' | 'prev') => {
        setScrolledLeader(direction == 'next');
        
        const leaderListEl:any = refLeaderList.current;
        const dir = direction == 'next' ? 999 : -999;

        return leaderListEl.scrollTo(dir, 0);
    }

    const handleSlideTeamsBlock = (direction: 'next' | 'prev') => {
        const teamsBlock:any = refTeamList.current;
        const GAP_VALUE = 24;
        const CURRENT_TRANSLATE = teamsBlock.style.transform ? Number(teamsBlock.style.transform.match(/\d+/)[0]) : 0;
        const TOTAL_WIDTH_BLOCK = teamsBlock.firstChild.offsetWidth;
        const TOTAL_WIDTH_ALL_BLOCKS = teamsBlock.firstChild.offsetWidth * teamsBlock.children.length;

        let newTranslate = TOTAL_WIDTH_BLOCK + GAP_VALUE;

        if (CURRENT_TRANSLATE > 0) {
            newTranslate = direction == 'next'
                ? CURRENT_TRANSLATE + newTranslate
                : CURRENT_TRANSLATE - newTranslate;
        }

        setSlideInitial(newTranslate == 0);
        setSlideLimit((newTranslate * 2) > TOTAL_WIDTH_ALL_BLOCKS);

        if (newTranslate > TOTAL_WIDTH_ALL_BLOCKS) return null;

        return teamsBlock.style.transform = `translateX(-${newTranslate}px)`;
    }

    const getPathLogo = (type: 'dark' | 'light') => {
        let path = isMobile ? 'axenya-logo' : 'axenya-logotype';
            path = type == 'dark' ? `${path}.svg` : `${path}-white.svg`;
            path = `${config.url.base}/${path}`;

        return path;
    }

    const handleItemsExpanded = (index: number) => {
        const itemHasActived = itemsExpanded.includes(index);

        return itemHasActived
            ? setItemsExpanded(itemsExpanded.filter(item => item !== index))
            : setItemsExpanded([...itemsExpanded, index]);
    }

    useEffect(() => {
        const root = document.querySelector('#__next');
        setMobile(window?.outerWidth <= MOBILE_BREAKPOINT);

        root?.addEventListener('scroll', handleScroll, { passive: true });
        window?.addEventListener('resize', () => setMobile(window.outerWidth <= MOBILE_BREAKPOINT));

        return () => root?.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <Head>
                <title>Axenya | Carreiras</title>
                <meta name="description" content="Axenya, o primeiro ecossistema inteligente de saúde. Junte-se a nós na missão de transformar a saúde das pessoas, empresas e de todo ecossistema." />
            </Head>

            <S.TopNav scrollPosition={scrollPosition}>
                <Layout>
                    <S.TopNavContent style={{ paddingRight: scrollPosition > 800 ? '0' : '48px' }}>
                        <a href="/" title="Ir para o ínicio">
                            <img
                                src={scrollPosition > 800 ? getPathLogo('dark') : getPathLogo('light')}
                                alt="Logo Axenya"
                                height={52}
                                style={{ marginTop: scrollPosition === 0 ? '64px' : '0' }}
                            />
                        </a>

                        <ul>
                            <li>
                                <a
                                    onClick={() => router.push({ hash: '#por-que-existimos' })}
                                    href="#por-que-existimos"
                                    style={{
                                        color: router.asPath.includes('por-que-existimos') ? theme.colors.secondary : theme.colors.gray
                                    }}
                                >
                                    Por que existimos?
                                </a>
                            </li>
                            <li>
                                <a
                                    onClick={() => router.push({ hash: '#cultura' })}
                                    href="#cultura"
                                    style={{
                                        color: router.asPath.includes('cultura') ? theme.colors.secondary : theme.colors.gray
                                    }}
                                >
                                    Cultura
                                </a>
                            </li>
                            <li>
                                <a
                                    onClick={() => router.push({ hash: '#lideres' })}
                                    href="#lideres"
                                    style={{
                                        color: router.asPath.includes('lideres') ? theme.colors.secondary : theme.colors.gray
                                    }}
                                >
                                    Líderes
                                </a>
                            </li>
                            <li>
                                <a
                                    onClick={() => router.push({ hash: '#times' })}
                                    href="#times"
                                    style={{
                                        color: router.asPath.includes('times') ? theme.colors.secondary : theme.colors.gray
                                    }}
                                >
                                    Times
                                </a>
                            </li>
                            <li>
                                <a
                                    onClick={() => router.push({ hash: '#vagas' })}
                                    href="#vagas"
                                    style={{
                                        color: router.asPath.includes('vagas') ? theme.colors.secondary : theme.colors.gray
                                    }}
                                >
                                    Vagas
                                </a>
                            </li>
                        </ul>
                    </S.TopNavContent>
                </Layout>
            </S.TopNav>

            <S.Header>
                <Layout>
                    <Col width="60%">
                        <Text
                            as="h1"
                            category="h2"
                            color={theme.colors.white}
                            weight="bold"
                            mb="12px"
                        >
                            O mercado de saúde está doente. Mas nós acreditamos que podemos curá-lo!
                        </Text>

                        <Text
                            as="h2"
                            category="m2"
                            color={theme.colors.gray_ligheter}
                            style={{ lineHeight: '140%' }}
                            mb="24px"
                        >
                            Junte-se a nós na missão de transformar a saúde das pessoas, empresas e de todo ecossistema, unindo inovação, inteligência e tecnologia, com um lado humano e acolhedor essencial quando falamos em saúde!
                        </Text>

                        <S.Button
                            onClick={() => {
                                location.hash = "vagas";
                                document.getElementById("vagas")?.scrollIntoView();
                            }}
                        >
                            Faça parte do time
                        </S.Button>
                    </Col>
                    <Col count={2}>
                        <Navigation light /> 
                    </Col>
                </Layout>
            </S.Header>

            <S.ImageContent>
                <Layout>
                    <img
                        src="https://www.datocms-assets.com/87998/1673981690-team-axenya-01122022.png"
                        alt="Time Axenya dezembro de 2022"
                    />
                </Layout>
            </S.ImageContent>

            <S.Content id="por-que-existimos">
                <Layout>
                    <Col width="80%" style={{ marginBottom: 24 }}>
                        <Text
                            as="h3"
                            category="m1"
                            weight="medium"
                            mb="24px"
                        >
                            Por que nós existimos?
                        </Text>

                        <Text
                            as="p"
                            category="s1"
                            style={{ lineHeight: "140%" }}
                            color="#0C0D11"
                            mb="16px"
                        >
                            Víamos uma série de ineficiências no mercado de saúde:
                            empresas sofriam com a burocracia e eram mal atendidas, não tinham foco claro na prevenção, não entendiam o risco de saúde a que estavam expostas e ainda gerenciavam a saúde de suas pessoas sem inteligência de dados. Com isso, acabavam sofrendo perdas financeiras.
                        </Text>

                        <Text
                            as="p"
                            category="s1"
                            style={{ lineHeight: "140%" }}
                            color="#0C0D11"
                        >
                            Para esse mercado, enxergamos uma solução e propomos <strong style={{ fontWeight: 'bold', color: '#1B90B3' }}>algo diferente:</strong>
                        </Text>
                    </Col>

                    <Row gap="16px">
                        <Col>
                            <S.Card>
                                <S.IconBox>
                                    <BiCategory size={32} color="#1B90B3" />
                                </S.IconBox>
                                <Text as="p" category="m2" weight="medium">
                                    Uma nova categoria de tecnologia em saúde para atender às necessidades do cliente de ponta a ponta
                                </Text>
                            </S.Card>
                        </Col>
                        <Col>
                            <S.Card>
                                <S.IconBox>
                                    <BiShapeCircle size={32} color="#1B90B3" />
                                </S.IconBox>
                                <Text as="p" category="m2" weight="medium">
                                    Queremos mudar a forma com que empresas enxergam, lidam e gerenciam saúde.
                                </Text>
                            </S.Card>
                        </Col>
                    </Row>
                </Layout>
            </S.Content>
            <S.Content style={{ position: 'relative' }} id="cultura">
                <Layout overflow='hidden'>
                    <Text
                        as="h3"
                        category="m1"
                        weight="medium"
                        mb="48px"
                    >
                        Nossa cultura
                    </Text>

                    <Row gap="24px">
                        <Col count={2}>
                            <S.CultureList>
                                {cultureList?.map((item, index) => (
                                    <S.CultureItem
                                        onClick={() => handleItemsExpanded(index)}
                                        key={index}
                                    >
                                        <S.IconBox style={{ marginBottom: 'auto' }}>
                                            {item.icon}
                                        </S.IconBox>
                                        <div>
                                            <Text
                                                as="p"
                                                category="m2"
                                                style={{ lineHeight: "140%" }}
                                                color="#0C0D11"
                                            >
                                                {item.title}
                                            </Text>
                                            {itemsExpanded.includes(index) &&
                                                <Text
                                                    as="p"
                                                    category="s1"
                                                    style={{ lineHeight: "140%" }}
                                                    color="#67696C"
                                                    mt="8px"
                                                >
                                                    {item.text}
                                                </Text>
                                            }
                                        </div>
                                        {itemsExpanded.includes(index)
                                            ? <BsChevronUp size={24} color="#afafaf" style={{ marginBottom: 'auto' }} />
                                            : <BsChevronDown size={24} color="#afafaf" />
                                        }
                                    </S.CultureItem>
                                ))}
                            </S.CultureList>
                        </Col>
                        <Col count={1} style={{ position: 'relative' }}>
                            <S.GroupImages>
                                <div>
                                    <img src="https://www.datocms-assets.com/87998/1674074347-grupo-axenya-01.png" alt="Grupo de pessoas Axenya" />
                                    <img src="https://www.datocms-assets.com/87998/1674074324-grupo-axenya-02.png" alt="Grupo de pessoas Axenya" />
                                </div>
                            </S.GroupImages>
                        </Col>
                    </Row>
                </Layout>
            </S.Content>

            <S.Content id="lideres">
                <Layout>
                    <Flex style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                        <Text
                            as="h3"
                            category="m1"
                            weight="medium"
                        >
                            Nossos líderes
                        </Text>

                        <Flex gap='8px'>
                            <BsFillArrowLeftCircleFill size={32} onClick={() => scrollCarouselLeader('prev')} style={{ cursor: 'pointer', opacity: scrolledLeader ? '1' : '.5' }} />
                            <BsFillArrowRightCircleFill size={32} onClick={() => scrollCarouselLeader('next')} style={{ cursor: 'pointer', opacity: scrolledLeader ? '.5' : '1' }} />
                        </Flex>
                    </Flex>

                    <S.LeaderList ref={refLeaderList}>
                        {leaderList.map((leader, index) => (
                            <S.LeaderCard
                                key={index}
                                // onClick={() => window.open(leader.linkedIn)}
                                title={`Acessar LinkedIn de ${leader.name}`}
                            >
                                <S.LeaderImage>
                                    <img src={leader.image} alt={leader.name} />
                                </S.LeaderImage>
                                <Text
                                    as="h5"
                                    category="m2"
                                    style={{ lineHeight: "140%" }}
                                    color="#0C0D11"
                                >
                                    {leader.name}
                                </Text>
                                <Text
                                    as="p"
                                    category="s2"
                                    style={{ lineHeight: "140%", fontSize: '14px' }}
                                    color="#949494"
                                >
                                    {leader.role}
                                </Text>
                                <Text
                                    as="p"
                                    category="s2"
                                    style={{ lineHeight: "140%", fontSize: '14px'  }}
                                    color="#949494"
                                >
                                    {leader.about}
                                </Text>
                            </S.LeaderCard>
                        ))}
                    </S.LeaderList>
                </Layout>
            </S.Content>

            <S.Content id="vagas" style={{ paddingTop: 60 }}>
                <Layout>
                    <Text
                        as="h3"
                        category="m1"
                        weight="medium"
                        mb="24px"
                    >
                        Vagas abertas
                    </Text>
                    <S.JobList>
                        {jobList.map((job, index) => (
                            <li key={index}>
                                <Row gap="8px" style={{ alignItems: 'center' }}>
                                    <Col count={3}>
                                        <Text
                                            as="p"
                                            category="s1"
                                            weight="medium"
                                            mb="8px"
                                        >
                                            {job.name}
                                        </Text>
                                        <Text
                                            as="p"
                                            category="s2"
                                            weight="medium"
                                            color="#949494"
                                        >
                                            <MdLocationOn size={16} style={{ marginBottom: -2, marginRight: 4 }}/>
                                            {job.local} e {job.type}
                                        </Text>
                                    </Col>
                                    <Col count={1}>
                                        <a href={job.link} target="_blank" title="Ver mais detalhes da vaga">
                                            Ver vaga
                                        </a>
                                    </Col>
                                </Row>
                            </li>
                        ))}
                    </S.JobList>
                </Layout>
            </S.Content>

            <S.Content id="times" style={{ padding: '180px 0' }}>
                <Layout style={{ overflow: 'hidden' }}>
                    <Flex style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                        <Text
                            as="h3"
                            category="m1"
                            weight="medium"
                        >
                            Nossos times
                        </Text>
                        <Flex gap='8px'>
                            <BsFillArrowLeftCircleFill size={32} onClick={() => handleSlideTeamsBlock('prev')} style={{ cursor: 'pointer', pointerEvents: slideInitial ? 'none' : 'unset', opacity: slideInitial ? '.5' : '1' }} />
                            <BsFillArrowRightCircleFill size={32} onClick={() => handleSlideTeamsBlock('next')} style={{ cursor: 'pointer', pointerEvents: slideLimit ? 'none' : 'unset', opacity: slideLimit ? '.5' : '1' }} />
                        </Flex>
                    </Flex>
                    <S.GridTeams ref={refTeamList}>
                        {teamsList.map((team, index) => (
                            <S.BlockTeam key={index}>
                                <img src={team.image} alt="Imagem dos times" width="100%" />
                                <Flex style={{ flexDirection: 'column', height: '100%', gap: 24 }}>
                                    {team.group.map((info, index) => (
                                        <S.BoxTeam key={index}>
                                            <Text
                                                as="p"
                                                category="s1"
                                                color="#0C0D11"
                                                weight="medium"
                                                mb="12px"
                                            >
                                                {info.title}
                                            </Text>

                                            <Text
                                                as="p"
                                                category="s2"
                                                style={{ lineHeight: "140%" }}
                                                color="#949494"
                                            >
                                                {info.text}
                                            </Text>
                                        </S.BoxTeam>
                                    ))}
                                </Flex>
                            </S.BlockTeam>
                        ))}
                    </S.GridTeams>
                </Layout>
            </S.Content>
        </>
    )
}

export default CareersPage;