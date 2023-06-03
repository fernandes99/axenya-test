import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from "next";
import Head from "next/head";

import { ArticleType, CategoryType } from "../../../../types/dato/blog.types";
import { getAllArticlesByCategoryId, getCategoryBySlug } from "../../../../services/blog/articles";
import { BLOG_CACHE_TIME } from "../../../../constants/time";
import { Col, Layout, Row } from "../../../../styles/grid";
import { config } from "../../../../helpers/configs";
import { Text } from "../../../../styles/text";
import theme from "../../../../styles/theme";
import { TopNav, TopNavContent } from "styles/pages/blog/article/styles";
import { S } from "styles/pages/blog/styles";


export async function getStaticPaths(): Promise<GetStaticPathsResult<any>> {
    return {
        paths: [],
        fallback: 'blocking',
    };
}

export async function getStaticProps({
    params,
  }: GetStaticPropsContext): Promise<GetStaticPropsResult<any>> {
    console.log('LOG - CATEGORIAS/[SLUG]');
    
    const slug = params?.slug as string;
    const category = await getCategoryBySlug(slug);
    const articles = await getAllArticlesByCategoryId(category?.id);

    console.log('LOG - CATEGORIAS/[SLUG]', category);

    if (!articles || !category) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            articles,
            category
        },
        revalidate: BLOG_CACHE_TIME
    };
}

type ArticlePageProps = {
    category: CategoryType,
    articles: ArticleType[]
}

const ArticlePage = ({ articles, category }: ArticlePageProps) => {
    const title = `${category.name}: Axenya Blog`;

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta property="og:title" content={title}></meta>
                <meta name="description" content="Tudo sobre saúde, tecnologia e gestão da saúde. Blog Axenya. Um ecossistema de saúde completo." />
            </Head>

            <TopNav>
                <Layout>
                    <TopNavContent>
                        <a href={`${config.url.base}/`} title="Ir ao inicio">
                            <img src={`${config.url.base}/axenya-logotype-white.svg`} alt="Logo Axenya" height={48}/>
                        </a>

                        <ul>
                            <li>
                                <a href={`${config.url.base}/`} title="Acessar site">
                                    Acessar site
                                </a>
                            </li>
                        </ul>
                    </TopNavContent>
                </Layout>
            </TopNav>

            <S.BlogContent>
                <Layout>
                    <Row gap="24px">
                        <Col count={3}>
                            <Text
                                as="p"
                                category="s3"
                                weight="bolder"
                                mb="4px"
                                color='#a2baba'
                                style={{ letterSpacing: 2 }}
                            >
                                CATEGORIA
                            </Text>
                            <Text
                                as="h2"
                                category="h2"
                                weight="bold"
                                mb="32px"
                            >
                                {category.name}
                            </Text>
                            <Text
                                as="p"
                                category="s2"
                                weight="light"
                                mb="12px"
                                color={theme.colors.gray_dark}
                            >
                                {articles.length} artigos publicados
                            </Text>
                            <S.ArticleList>
                                {articles.map((article, index) => (
                                    <li key={index}>
                                        <a href={`${config.url.base}/blog/${article.slug}`} title={`Ver mais`}>
                                            <img
                                                src={article.image.url}
                                                alt={article.image.alt}
                                                width="100%"
                                            />
                                            <Text
                                                as="h3"
                                                category="m2"
                                                style={{
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 3,
                                                    WebkitBoxOrient: 'vertical',
                                                }}
                                            >
                                                {article.title}
                                            </Text>
                                        </a>
                                    </li>
                                ))}
                            </S.ArticleList>
                        </Col>
                    </Row>
                </Layout>
            </S.BlogContent>
        </>
    )
}

export default ArticlePage;
