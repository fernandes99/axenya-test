import { NextApiRequest, NextApiResponse } from "next";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    const url = 'https://graphql.datocms.com/';
    
    if (!process.env.DATOCMS_KEY) {
        return res.status(404).json({ error: "DatoCMS Key Not Found" });
    }

    try {
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': process.env.DATOCMS_KEY // token api dato CMS
            },
            body: JSON.stringify({
                query: QueryPrivacyData,
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

const QueryPrivacyData = `
{
    privacy {
        axenyaPrivacy,
    }
}`
