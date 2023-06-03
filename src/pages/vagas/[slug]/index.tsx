import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from "next";
import Head from "next/head";

import { NavSmall } from "../../../components/navigation/small";
import { HOME_CACHE_TIME } from "../../../constants/time";
import { getJob } from "../../../services/jobs";
import { Layout } from "../../../styles/grid";
import { Text } from "../../../styles/text";
import { JobType } from "../../../types/dato/jobs.types";
import theme from "../../../styles/theme";
import { CultureBlock } from "../../../components/pages/carreiras/CultureBlock";
import { S } from "styles/pages/jobs/styles";


export async function getStaticPaths(): Promise<GetStaticPathsResult<any>> {
    return {
        paths: [],
        fallback: 'blocking',
    };
}

export async function getStaticProps({
    params,
  }: GetStaticPropsContext): Promise<GetStaticPropsResult<any>> {
    const slug = params?.slug as string;
    const job = await getJob(slug!);

    if (!job) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            job
        },
        revalidate: HOME_CACHE_TIME 
    };
}

interface JobPageProps {
    job: JobType
}

const JobPage = ({ job }: JobPageProps) => {
    const title = `Axenya | Vaga ${job.name}`;

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content="Blog Axenya" />
            </Head>

            <NavSmall />

            <S.Section bg={theme.colors.primary}>
                <Layout>
                    <Text
                        as="h1"
                        category="b1"
                        weight="bold"
                        color={theme.colors.white}
                        mb="16px"
                    >
                        {job.name}
                    </Text>
                </Layout>
            </S.Section>

            <Layout overflow="hidden">
                <S.Section>
                    <Text
                        as="h3"
                        category="b1"
                        weight="bold"
                        mb="16px"
                    >
                        Sobre a Axenya
                    </Text>
                    <Text category="s1" color={theme.colors.gray_dark}>
                        Uma empresa que cuida de pessoas e explora o que há de mais avançado em Tecnologia e Inteligência Artificial, somos o primeiro e atualmente único ecossistema inteligente de saúde na América Latina.
                        Com um time movido por paixão, energia, entusiasmo e com “sede” de desenvolvimento contínuo, procuramos por pessoas que se identifiquem, estejam motivadas e abertas pela busca de conhecimento e aprimoramento.
                    </Text>
                </S.Section>

                <S.Section>
                    <Text
                        as="h3"
                        category="b1"
                        weight="bold"
                        mb="16px"
                    >
                        Sobre a Vaga
                    </Text>
                    <Text category="s1" color={theme.colors.gray_dark}>
                        {job.about}
                    </Text>
                </S.Section>

                <S.Section>
                    <Text
                        as="h3"
                        category="m2"
                        weight="bold"
                        mb="16px"
                    >
                        Responsabilidades e missões:
                    </Text>
                    <Text category="s1" color={theme.colors.gray_dark}>
                        {job.responsibilities}
                    </Text>
                </S.Section>

                <S.Section>
                    <Text
                        as="h3"
                        category="m2"
                        weight="bold"
                        mb="16px"
                    >
                        O que esperamos? - requisitos necessários
                    </Text>
                    <Text category="s1" color={theme.colors.gray_dark}>
                        {job.requirements}
                    </Text>
                </S.Section>

                <S.Section>
                    <Text
                        as="h3"
                        category="m2"
                        weight="bold"
                        mb="16px"
                    >
                        O que me leva além? - diferenciais
                    </Text>
                    <Text category="s1" color={theme.colors.gray_dark}>
                        {job.differentials}
                    </Text>
                </S.Section>

                <S.Section>
                    <Text
                        as="h3"
                        category="b1"
                        weight="bold"
                        mb="32px"
                    >
                        Informações adicionais
                    </Text>
                    <Text
                        as="h3"
                        category="m2"
                        weight="bold"
                        mb="16px"
                    >
                        Modelo de trabalho
                    </Text>
                    <Text category="s1" color={theme.colors.gray_dark} mb="24px">
                        {job.jobModel === 'hybrid' &&
                            "As atividades seguem na modalidade híbrida! Nós auxiliamos em fornecer a estrutura base de trabalho, enviando o material básico necessário. A Axenya está localizada na Zona Sul de São Paulo, no Itaim Bibi."
                        }
                    </Text>
                    <Text
                        as="h3"
                        category="m2"
                        weight="bold"
                        mb="16px"
                    >
                        Como é o processo seletivo:
                    </Text>
                    <Text category="s1" color={theme.colors.gray_dark}>
                        {job.process}
                    </Text>
                </S.Section>

                <S.Section>
                    <Text
                        as="h3"
                        category="b1"
                        weight="bold"
                        mb="16px"
                    >
                        Benefícios
                    </Text>
                    <Text category="s1" color={theme.colors.gray_dark}>
                        {job.benefits}
                    </Text>
                </S.Section>

                <S.Section>
                    <Text category="s1" color={theme.colors.gray_dark} mb="16px" style={{ lineHeight: '140%' }}>
                        O <strong>mercado de saúde está doente.</strong> Mas nós acreditamos que podemos mudar isso.
                        Mostramos ao mercado que tem uma forma de fazer negócio que ele não sabia que era possível. Queremos ser a <strong>melhor e maior empresa de saúde do mercado.</strong>
                        Podemos e vamos <strong>transformar o cenário de saúde das pessoas e corporações,</strong> através da junção de <strong>tecnologia e lado humano</strong>, para conseguir <strong>qualidade, escala e inteligência de dados.</strong>
                        <br />
                        Estamos formando o melhor time para nos ajudar a chegar lá, com nossa cultura e ideologia.
                        Quer fazer parte disso? Inscreva-se!
                    </Text>

                    <S.SubscribeButton href={job.subscribeLink} target="_blank" title="Acessar página de inscrição">
                        Inscreva-se
                    </S.SubscribeButton>
                </S.Section>

                <S.Section style={{ padding: '80px 0 0', marginBottom: '120px' }}>
                    <CultureBlock />
                </S.Section>
            </Layout>

        </>
    )
}

export default JobPage;