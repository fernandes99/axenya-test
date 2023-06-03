import Head from "next/head"
import { TopNavigation } from "../../../components/topNavigation";
import { Sections } from "../../../components/pages/home/sections";

const HomePage = () => {
    return (
        <>
            <Head>
                <title>Axenya | Ecossistema Inteligente de Saúde</title>
                <meta name="description" content="Axenya, o primeiro ecossistema inteligente de saúde. Substituímos a sua corretora de saúde e fazemos muito mais." />
                <meta name="robots" content="noindex, nofollow" />
            </Head>

            <TopNavigation />

            <Sections.Principal />
            <Sections.Soluction />
            <Sections.Phrase />
            <Sections.Tech />
            <Sections.Benefits />
            <Sections.Unicef />
            <Sections.Metrics />
            <Sections.About />
        </>
    )
}

export default HomePage;