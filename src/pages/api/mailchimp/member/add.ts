import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (!process.env.MAILCHIMP_URL) {
        return res.status(404).json({ error: "url-not-found" });
    }

    if (req.method !== 'POST') {
        return res.status(404).json({ error: "wrong-method" });
    }

    try {
        const url = `${process.env.MAILCHIMP_URL}/lists/${process.env.MAILCHIMP_AUDIENCE_ID}/members`;
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${process.env.MAILCHIMP_API_KEY}`,
                'Cache-Control': 'no-cache'
            },
            body: req.body,
        })
        .then(response => response);
    
        return res.status(200).send(await result.json());
    }
    catch (e) {
        res.status(404).json({ error: e });
    }
}
