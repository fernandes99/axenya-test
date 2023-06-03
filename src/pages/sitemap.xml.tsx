import { partners } from "../constants/partners";
import { config } from "../helpers/configs";
import { getAllArticles } from "../services/blog/articles";
import { ArticleType } from "../types/dato/blog.types";

export async function getServerSideProps({ res }: any) {
    let paths = ['privacidade', 'carreiras', 'blog'];

    const articleList = await getAllArticles() as ArticleType[]; // TODO: custa caro a longo prazo, solução paliativa, solução ideal é inserir um serviço mapeando rotas e construindo sitemap prébuild
    
    articleList.forEach(article => paths.push(`blog/${article.slug}`));
    partners.forEach(partner => paths.push(`parcerias/${partner.slug}`));

    const sitemap = generateSiteMap(paths);

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
}

function generateSiteMap(paths: string[]) {
    return `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            <url>
                <loc>${config.url.base}</loc>
            </url>
            ${paths.map((path: string) => `
                <url>
                    <loc>${`${config.url.base}/${path}`}</loc>
                </url>
            `)
            .join('')}
        </urlset>
    `;
}

const SiteMap = () => {}

export default SiteMap;
