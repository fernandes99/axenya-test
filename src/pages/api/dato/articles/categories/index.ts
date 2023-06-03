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

        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': process.env.DATOCMS_KEY
            },
            body: JSON.stringify({
                query: queryAllCategories,
            }),
        })
        .then((res) => res.json());

        return res.status(200).send(result);
    }
    catch (e) {
        return res.status(404).send({ error: e });
    }
}

export const queryAllCategories = `
    {
        allArticleCategories {
            id
            name
            slug
            color {
                hex
            }
        }
    }
`