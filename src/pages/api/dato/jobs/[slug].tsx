import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const url = process.env.DATOCMS_GRAPQL_URL as string;
    
    if (!process.env.DATOCMS_KEY) {
        return res.status(401).send({ error: "DatoCMS key not found" });
    }

    try {
        const { slug } = req.query as any;

        if (!slug) res.status(500).send({ error: "Job slug not found" });

        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': process.env.DATOCMS_KEY // token api dato CMS
            },
            body: JSON.stringify({
                query: getQueryJobs(slug),
            }),
        })
        .then((res) => res.json())

        return res.status(200).send(result);
    }
    catch (e) {
        return res.status(404).send({ error: e });
    }
}

export const getQueryJobs = (slug?: string) => {
    return `
        {
            allJobs ${slug ? `(filter: {slug: {eq: "${slug}"}})` : ''} {
                id
                name
                slug
                about
                responsibilities 
                benefits 
                differentials 
                requirements
                jobModel
                process
                subscribeLink
            }
        }
    `
}