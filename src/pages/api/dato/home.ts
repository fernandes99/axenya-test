import { NextApiRequest, NextApiResponse } from "next";
import { HOME_CACHE_TIME } from "../../../constants/time";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const url = 'https://graphql.datocms.com/';
    
    if (!process.env.DATOCMS_KEY) {
        return res.status(404).json({ error: "DatoCMS Key Not Found" });
    }

    try {
        const maxAge = 60; // 1h in minutes
        res.setHeader('Cache-Control', `public, s-maxage=${maxAge}, stale-while-revalidate=${maxAge}`);

        const result = await fetch(url, {
            next: { revalidate: HOME_CACHE_TIME },
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 's-maxage=604800',
                'Authorization': process.env.DATOCMS_KEY // token api dato CMS
            },
            body: JSON.stringify({
                query: QueryHomeData,
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

const QueryHomeData = `{
    home {
        title,
        subtitle,
        cta,
        switchKeys,
        background {
            url,
            alt
        },
        slides {
            id,
            label,
            title,
            subtitle,
            image {
                url,
                alt
            }
        },
        soluctions {
            id
            title,
            soluctionList {
                id,
                icon,
                title,
                subtitle,
                image {
                    url,
                    alt
                }
            }
        },
        results {
            id,
            title,
            subtitle,
            image {
                url,
                alt
            }
        },
        partnerTitle,
        partners {
            id,
            logo {
                url,
                alt,
                title
            }
        },
        achievements {
            id,
            title,
            subtitle
        }
        hidePrincipalSection,
        hideSecondSection,
        hideSoluctionSection,
        hideResultSection,
        hidePartnerSection,
        hideAchievementSection
    }
}`
