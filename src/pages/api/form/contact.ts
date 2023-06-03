import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const url = 'https://script.google.com/macros/s/AKfycbz-b-Jhpqppt0rxDVj9zp0eNH0irpqrXi9165J7agJVKcEk4nz8XjUCoLej3K6wUoGIog/exec';
    
    if (!url) {
        return res.status(404).json({ error: "Sheet URL Env Not Found" });
    }

    try {
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': '*',
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
