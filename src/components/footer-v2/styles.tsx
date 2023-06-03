import styled from "styled-components";
import { CustomStyleProps } from "styles/styled";
import theme from "styles/theme";

export const S = {
    Footer: styled.footer`
        max-width: 2560px;
    `,
    Container: styled.section<{ bg?: string }>`
        width: 100%;
        background-color: ${props => props.bg ? props.bg : '#F5F5F5'};
        display: flex;
        justify-content: center;
    `,
    Content: styled.div<CustomStyleProps>`
        width: 100%;
        max-width: 1800px;
        padding: ${props => props.p ? props.p : '80px 60px'};

        a {
            text-decoration: none;

            &:hover {
                text-decoration: underline;
            }
        }
    `,
    Divider: styled.div`
        height: 1px;
        margin: 32px 0;
        background-color: #B0B0B0;
    `,
    LogotypeBox: styled.div`
        svg {
            height: 42px;
            width: auto;
        }
    `,
    IconBox: styled.div`
        background-color: ${theme.colors.primary};
        width: 58px;
        height: 58px;
        border-radius: 50%;
        padding: 8px;
        transition: all .3s;

        &:hover {
            background-color: ${theme.colors.gray_dark};
        }
    `
}