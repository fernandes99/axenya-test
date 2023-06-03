import { GetServerSidePropsResult } from "next";
import Head from "next/head";
import { config } from "../../helpers/configs";
import { getAllArticles } from "../../services/blog/articles";
import { Col, Flex, Layout, Row } from "../../styles/grid";
import { Text } from "../../styles/text";
import { ArticleType, CategoryType } from "../../types/dato/blog.types";
import { S } from "styles/pages/blog/styles";
import { CategoryFlag, TopNav, TopNavContent } from "styles/pages/blog/article/styles";

export async function getServerSideProps(): Promise<GetServerSidePropsResult<Record<string, unknown>>> {
    const articleList = await getAllArticles() as ArticleType[];

    if (!articleList?.length) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            articleList,
        },
    };
}

type BlogPageProps = {
    articleList: ArticleType[]
}

const BlogPage = ({ articleList }: BlogPageProps) => {
    const categories = articleList.map(article => article.category).reduce((prev: any, current) => {
        if (!prev.length || prev.some((i: any) => i.name !== current.name)) prev.push(current);
        return prev;
    }, []);

    return (
        <>
            <Head>
                <title>Blog Axenya: Ecossistema inteligente de saúde</title>
                <meta property="og:title" content="Blog Axenya: Ecossistema inteligente de saúde"></meta>
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
                                as="h2"
                                category="b2"
                                weight="bold"
                                mb="32px"
                            >
                                Conteúdos em destaque
                            </Text>
                            <S.ArticleList>
                                {articleList.map((article, index) => (
                                    <li key={index}>
                                        <CategoryFlag
                                            href={`${config.url.base}/blog/categorias/${article.category.slug}`}
                                            title={`Ver mais sobre ${article.category.name}`}
                                            style={{
                                                backgroundColor: `${article.category.color.hex}20`,
                                                color: `${article.category.color.hex}`,
                                            }}
                                        >
                                            {article.category.name}
                                        </CategoryFlag>
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
                        <Col>
                            <Text
                                as="h2"
                                category="b2"
                                weight="bold"
                                mb="32px"
                            >
                                Categorias
                            </Text>
                            <Flex gap="8px" style={{ flexWrap: 'wrap' }}>
                                {categories?.map((category: CategoryType, index: number) => (
                                    <CategoryFlag
                                        key={index}
                                        href={`${config.url.base}/blog/categorias/${category.slug}`}
                                        title={`Ver mais sobre ${category.name}`}
                                        style={{
                                            marginBottom: 0,
                                            backgroundColor: `${category.color.hex}20`,
                                            color: `${category.color.hex}`,
                                        }}
                                    >
                                        {category.name}
                                    </CategoryFlag>
                                ))}
                            </Flex>
                        </Col>
                    </Row>
                </Layout>
            </S.BlogContent>
        </>
    )
}

export default BlogPage;