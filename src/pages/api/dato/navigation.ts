import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const url = 'https://graphql.datocms.com/';
    
    if (!process.env.DATOCMS_KEY) {
        return res.status(404).json({ error: "DatoCMS Key Not Found" });
    }

    try {
        const maxAge = 60; // 1h in minutes
        res.setHeader('Cache-Control', `public, s-maxage=${maxAge}, stale-while-revalidate=${maxAge}`);

        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': process.env.DATOCMS_KEY // token api dato CMS
            },
            body: JSON.stringify({
                query: QueryNavigationData,
            }),
        })
        .then((res) => res.json())
        .then((result) => result);

        return res.status(200).json(result);
    }
    catch (e) {
        return res.status(404).json({ error: e });
    }
}

const QueryNavigationData = `{
    navigation {
        navigationList {
            id,
            text,
            slug,
            link,
            openNewTab,
        }
    }
}`
