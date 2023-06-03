import { BsChevronDown } from "react-icons/bs"
import { Layout } from "../../styles/grid"
import { Text } from "../../styles/text"
import theme from "../../styles/theme"
import { S } from "./styles"
import { navigationRef } from "../../store/globalRefs"

import Logotype from "../../assets/svg/axenya-logotype-white.svg";

export const TopNavigation = () => {
    return (
        <S.Header ref={navigationRef} className='default'>
            <Layout>
                <S.Nav>
                    <S.LogotypeBox>
                        <Logotype />
                    </S.LogotypeBox>
                    <S.NavList>
                        <S.NavItem>
                            <Text as='a' href='#' color={theme.colors.white}>
                                Sobre nós
                            </Text>
                        </S.NavItem>
                        <S.NavItem>
                            <Text as='a' href='#' color={theme.colors.white}>
                                Para o RH
                                <BsChevronDown color={theme.colors.white} />
                            </Text>
                        </S.NavItem>
                        <S.NavItem>
                            <Text as='a' href='#' color={theme.colors.white}>
                                Soluções
                                <BsChevronDown color={theme.colors.white} />
                            </Text>
                        </S.NavItem>
                    </S.NavList>
                    <S.NavBlock>
                        <Text as='a' href='#' color={theme.colors.white}>
                            Soluções
                            <BsChevronDown color={theme.colors.white} />
                        </Text>
                        <S.Button as='a' href='#' color={theme.colors.white}>
                            Fale com a gente
                        </S.Button>
                    </S.NavBlock>
                </S.Nav>
            </Layout>
        </S.Header>
    )
}