import styled from "styled-components";
import theme from "../../../styles/theme";

export const S = {
    Section: styled.section<{ bg?: string }>`
        padding: 40px 0;
        overflow: hidden;
        background-color: ${props => props.bg ? props.bg : theme.colors.white};
    `,
    SubscribeButton: styled.a`
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid ${props => props.theme.colors.secondary};
        text-decoration: none;
        padding: 12px 24px;
        border-radius: 4px;
        color: ${props => props.theme.colors.secondary};
        font-size: 1.2em;
        font-weight: 500;
        transition: all .3s;
        width: fit-content;
        text-align: center;

        &:hover {
            background-color: ${props => props.theme.colors.secondary};
            color: ${props => props.theme.colors.white};
        }
    `
}
