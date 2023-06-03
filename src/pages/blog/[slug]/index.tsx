import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

import { FiShare2 } from "react-icons/fi";
import { ToastContainer } from "react-toastify";
import { BsTwitter } from "react-icons/bs";

import { Col, Flex, Layout, Row } from "../../../styles/grid";
import { Text } from "../../../styles/text";
import theme from "../../../styles/theme";
import { ArticleType } from "../../../types/dato/blog.types";
import { BodyArticle, HeadArticle, Section, TopNav, TopNavContent, AuthorBox, CategoryFlag, AsideBlock, ShareBlock } from "styles/pages/blog/article/styles";

import { BLOG_CACHE_TIME } from "../../../constants/time";
import { getArticle } from "../../../services/blog/articles";

import { config } from "../../../helpers/configs";
import useCopyToClipboard from "../../../helpers/hooks/useCopyToClipboard";
import { showToast } from "../../../helpers/toast";

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
    const article = await getArticle(slug!);

    if (!article) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            article
        },
        revalidate: BLOG_CACHE_TIME 
    };
}

type ArticlePageProps = {
    article: ArticleType
}

const ArticlePage = ({ article }: ArticlePageProps) => {
    const [content, setArticleContent] = useState('');
    const [copyStatus, copyToClipboard] = useCopyToClipboard('', 3000);

    const openWindow = (url: string) => {
        const left = (screen.width - 570) / 2;
        const top = (screen.height - 570) / 2;
        const params = `menubar=no,toolbar=no,status=no,width=570,height=570,top${top},left=${left}`;
        
        window.open(url, "", params);
    }

    const share = (type: 'twitter' | 'facebook') => {
        const pageUrl = window?.location.href;
        
        if (type === 'twitter') {
            const url = `https://twitter.com/intent/tweet?url=${pageUrl}&text=${article.metaTags.title}`;
            openWindow(url);
        }
    }

    const copyShareLink = () => {
        copyToClipboard(window?.location.href);

        if (copyStatus === 'failed') {
            return showToast('error', 'Link não copiado');
        }
        showToast('success', 'Link copiado');
    }

    useEffect(() => {
        const contentFormated = article.content
            .replaceAll('\n', '<br />')
            .replaceAll('<li><span>', '<li><p>')
            .replaceAll('</span></li>', '</p></li>')
            .replaceAll('<span>', '')
            .replaceAll('</span>', '');

        setArticleContent(contentFormated);
    }, [article])
    
    return (
        <>
            <Head>
                <title>{article.metaTags.title}</title>
                <meta name="description" content={article.metaTags.description} />
                <meta property="og:title" content={article.metaTags.title} />
                <meta property="og:description" content={article.metaTags.description} />
                <meta property="og:locale" content="pt_BR" />
                <meta property="og:type" content="article" />

                <meta property="og:image" content={article.metaTags.image.url} />
                <meta name="twitter:card" content={article.metaTags.twitterCard} />
                
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
            
            <Section>
                <Layout>
                    <Row gap="24px" style={{ position: 'relative'}}>
                        <Col count={3}>
                            <HeadArticle>
                                <Col>
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
                                    <Text
                                        as="h1"
                                        category="h3"
                                        weight="bold"
                                        mb="24px"
                                        mt="8px"
                                    >
                                        {article.title}
                                    </Text>
                                    <AuthorBox>
                                        <img
                                            src={article.author.image.url}
                                            alt={article.author.image.alt}
                                            width={72}
                                        />
                                        <Flex gap="4px" style={{ flexDirection: 'column' }}>
                                            <Text
                                                category="m2"
                                                weight="medium"
                                                color={theme.colors.gray_darker}
                                            >
                                                {article.author.name}
                                            </Text>
                                            <Text
                                                color={theme.colors.gray_dark}
                                            >
                                                {article.author.rule}
                                            </Text>
                                        </Flex>
                                    </AuthorBox>
                                </Col>
                                <Col>
                                    <img
                                        src={article.image.url}
                                        alt={article.title}
                                        title={article.title}
                                        width="100%"
                                        style={{
                                            maxHeight: "480px",
                                            objectFit: "cover"
                                        }}
                                    />
                                </Col>
                            </HeadArticle>

                            <BodyArticle
                                dangerouslySetInnerHTML={{ __html: content }}
                            />
                        </Col>
                        <Col
                            style={{
                                position: 'sticky',
                                top: '24px',
                                left: 0,
                                height: 'fit-content'
                            }}
                        >
                            <AsideBlock>
                                <Text
                                    as='p'
                                    color={theme.colors.gray_light}
                                    weight="bolder"
                                    mb='16px'
                                    style={{ letterSpacing: '2px', fontSize: 12 }}
                                >
                                    COMPARTILHE:
                                </Text>
                                <ShareBlock>
                                    <FiShare2 size={36} onClick={copyShareLink} title='Copiar link de compartilhamento' />
                                    <BsTwitter size={36} onClick={() => share('twitter')} title='Compatilhar no Twitter' />
                                </ShareBlock>
                            </AsideBlock>
                        </Col>
                    </Row>
                </Layout>
            </Section>
            <ToastContainer />
        </>
    )
}

export default ArticlePage;