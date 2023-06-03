import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (!process.env.SALES_FORCE_URL) {
        return res.status(400).json({ error: "url-sales-force-not-found" });
    }

    if (req.method !== 'POST') {
        return res.status(400).json({ error: "wrong-method" });
    }

    try {
        const { name, email, phone, company, message } = JSON.parse(req.body);
        const url = "https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8";
        let urlencoded = new URLSearchParams();

        // urlencoded.append("debug", "1");
        // urlencoded.append("debugEmail", "b@axenya.com"); // for debug
        urlencoded.append("oid", "00DDn000002q7A8");
        urlencoded.append("retURL", "http://");
        urlencoded.append("first_name", name);
        urlencoded.append("last_name", '');
        urlencoded.append("email", email);
        urlencoded.append("phone", phone);
        urlencoded.append("company", company);
        urlencoded.append("description", message);
        urlencoded.append("submit", "Enviar");
    
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: urlencoded.toString()
        }
    
        await fetch(url, options)
            .then(response => response.text())
            .then(result => res.status(200).send(result))
            .catch(error => res.status(400).json({ error: error }));
    }
    catch (e) {
        res.status(500).json({ error: e });
    }
}
