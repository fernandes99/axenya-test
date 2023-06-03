import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const url = 'https://graphql.datocms.com/';
    
    if (!process.env.DATOCMS_KEY) {
        return res.status(404).send({ error: "DatoCMS Key Not Found" });
    }

    try {
        res.setHeader(
            'Cache-Control',
            'no-cache, no-store, max-age=0, must-revalidate'
        );
        const { categoryId } = req.query as any;
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': process.env.DATOCMS_KEY // token api dato CMS
            },
            body: JSON.stringify({
                query: getQueryArticles(categoryId || ''),
            }),
        })
        .then((res) => res.json());

        return res.status(200).send(result);
    }
    catch (e) {
        return res.status(404).send({ error: e });
    }
}

export const getQueryArticles = (categoryId: '') => `
    {
        allArticles (filter: { category: ${ categoryId ? `{ eq: "${categoryId}" }` : `{}` }}) {
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
                id
                slug
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