import { NextComponentType, NextPageContext } from "next";
import Footer from "../footer";
import { useRouter } from "next/router";
import FooterV2 from "components/footer-v2";

interface PropsLayout {
    Component: NextComponentType<NextPageContext, any, any>,
    pageProps: any
} 

const Layout = (props: PropsLayout) => {
    const router = useRouter();
    const { Component, pageProps } = props;

    return (
        <>
            <Component {...pageProps} />
            {router.pathname === '/homolog/home' ?
                <FooterV2 />
                :
                <Footer />
            }
        </>
    )
}

export default Layout;