import { config } from "../../../helpers/configs"
import { Layout } from "../../../styles/grid"
import { TopNav, TopNavContent } from "./styles"

export const NavSmall = () => {
    return (
        <TopNav>
            <Layout>
                <TopNavContent>
                    <a href={`${config.url.base}/`} title="Ir ao inicio">
                        <img src={`${config.url.base}/axenya-logotype-white.svg`} alt="Logo Axenya" height={48}/>
                    </a>

                    <ul>
                        <li>
                            <a href={`${config.url.base}/`} title="Acessar site">
                                Acessar site
                            </a>
                        </li>
                    </ul>
                </TopNavContent>
            </Layout>
        </TopNav>
    )
}