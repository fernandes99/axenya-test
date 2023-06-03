import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (!process.env.MAILCHIMP_URL) {
        return res.status(404).json({ error: "url-not-found" });
    }

    if (req.method !== 'POST') {
        return res.status(404).json({ error: "wrong-method" });
    }

    try {
        let { subscriber_hash } = req.body;
        const url = `${process.env.MAILCHIMP_URL}lists/${process.env.MAILCHIMP_AUDIENCE_ID}/members/${subscriber_hash}/notes`;
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body),
        })
        .then((result) => result);
    
        return res.status(200).send(result);
    }
    catch (e) {
        res.status(404).json({ error: e });
    }
}
