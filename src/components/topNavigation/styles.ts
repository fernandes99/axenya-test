import styled from "styled-components";
import theme from "../../styles/theme";

import { Text } from "../../styles/text";

export const S = {
    Header: styled.header`
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        width: 100%;
        height: 52px;
        background-blend-mode: soft-light;
        mix-blend-mode: normal;
        backdrop-filter: blur(5px);
        z-index: ${theme.mixins.index.z1};
        transition: all .5s;

        &.dark {
            background-color: rgba(0, 0, 0, 0.9);
        }

        &.light {
            background-color: rgba(255, 255, 255, 0.8);
            * {
                color: ${theme.colors.gray_darker};
                border-color: ${theme.colors.gray_darker}; 
            }
            svg * {
                fill: ${theme.colors.gray_darker};
            }
        }
    `,
    Nav: styled.nav`
        display: grid;
        grid-template-columns: 1fr 2fr 1fr;
        a {
            font-size: 14px;
        }
    `,
    NavList: styled.ul`
        display: flex;
        align-items: center;
        gap: 32px;
    `,
    NavItem: styled.li`
        display: flex;
        align-items: center;

        a {
            display: flex;
            align-items: center;
            gap: 8px;
            text-decoration: unset;
        }
    `,
    NavBlock: styled.div`
        display: flex;
        align-items: center;
        gap: 32px;

        a {
            display: flex;
            align-items: center;
            gap: 8px;
        }
    `,
    Button: styled(Text)`
        border: 1px solid ${theme.colors.white};
        padding: 8px 20px;
        border-radius: 20px;
        text-decoration: unset;
    `,
    LogotypeBox: styled.div`
        svg {
            height: 42px;
            width: auto;
        }
    `
}