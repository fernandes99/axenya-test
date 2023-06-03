import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const url = 'https://graphql.datocms.com/';
    
    if (!process.env.DATOCMS_KEY) {
        return res.status(401).send({ error: "DatoCMS key not found" });
    }

    try {
        const { slug } = req.query as any;

        if (!slug) res.status(500).send({ error: "Article not found" });

        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': process.env.DATOCMS_KEY // token api dato CMS
            },
            body: JSON.stringify({
                query: getQueryArticles(slug),
            }),
        })
        .then((res) => res.json())

        return res.status(200).send(result);
    }
    catch (e) {
        return res.status(404).send({ error: e });
    }
}

export const getQueryArticles = (slug?: string) => {
    return `
    {
        allArticles ${slug ? `(filter: {slug: {eq: "${slug}"}})` : ''} {
            id
            slug
            title
            content
            publishDate
            image {
                url
                alt
                title
            }
            category {
                name
                color {
                    hex
                }
            }
            author {
                name
                rule
                image {
                    url
                    alt
                }
            }
            metaTags {
                title
                description
                twitterCard
                image {
                    url
                    alt
                    title
                }
            }
        }
    }
    `
}