import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const url = 'https://graphql.datocms.com/';
    
    if (!process.env.DATOCMS_KEY) {
        return res.status(404).send({ error: "DatoCMS Key Not Found" });
    }

    console.log('TESTEEEEE  SLUG ON CATEGORIES API SLUG')

    try {
        res.setHeader(
            'Cache-Control',
            'no-cache, no-store, max-age=0, must-revalidate'
        );

        console.log('API/DATO/ARTICLES/CATEGORIES QUERY', req.query)

        const { slug } = req.query as any;
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': process.env.DATOCMS_KEY
            },
            body: JSON.stringify({
                query: getQueryAllCategories(slug),
            }),
        })
        .then((res) => res.json());

        return res.status(200).json(result);
    }
    catch (e) {
        return res.status(404).send({ error: e });
    }
}

export const getQueryAllCategories = (slug: '') => `
    {
        allArticleCategories (filter: { slug: ${slug ? `{ eq: "${slug}" }` : `{}`}}) {
            id
            name
            slug
            color {
                hex
            }
        }
    }
`