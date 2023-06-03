import { useMemo, useState } from "react"
import { NavigationType } from "../../types/dato/navigation.types";
import { Nav, NavItem, Border, Backdrop, Button } from "./styles"
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { useEffect } from "react";
import { useRouter } from "next/router";
import { HOME_CACHE_TIME } from "../../constants/time";

interface NavProps {
    light?: boolean;
}

export const Navigation = (props: NavProps) => {
    const router = useRouter();
    const [navData, setNavData] = useState<NavigationType>();
    const [showNav, setShowNav] = useState<boolean>(false);
    const [isDesktop, setDesktop] = useState<boolean>(true);
    const DESKTOP_BREAKPOINT = 1240;

    useMemo(() => {
        if (global.window) {
            fetch('/api/dato/navigation', { next: { revalidate: HOME_CACHE_TIME } })
                .then(res => res.json())
                .then(result => {
                    if (!result?.data?.navigation) return;
                    setNavData(result.data.navigation);
                });
        }
    }, []);

    useEffect(() => {
        setDesktop(window?.outerWidth > DESKTOP_BREAKPOINT);
        window?.addEventListener('resize', () => setDesktop(window.outerWidth > DESKTOP_BREAKPOINT));
    }, [])

    return (
        <>
            {(isDesktop || showNav) &&
                <>
                    <Nav light={!!props.light}>
                        <ul>
                            {navData?.navigationList?.map((item, index) =>
                                <NavItem actived={router.pathname.includes(item.slug) || (router.pathname == '/' && item.slug == 'home')} key={item.id}>
                                    <a href={item.link} target={item.openNewTab ? "_blank" : "_self"}>
                                        {item.text}
                                    </a>
                                </NavItem>
                            )}

                            <Border />
                        </ul>
                    </Nav>

                    <Backdrop onClick={() => setShowNav(false)} light={!!props.light} />
                </>
            }
            
            {!isDesktop &&
                <Button onClick={() => setShowNav(!showNav)} light={!!props.light}>
                    <HiOutlineMenuAlt2 />
                </Button>
            }
        </>
    )
} 