import styled from "styled-components";
import theme from "styles/theme";

export const S = {
    Section: styled.section<{ bg?: string, p?: string }>`
        position: relative;
        background-color: ${props => props.bg || '#fff'};
        max-width: 2560px;
        margin: 0 auto;
        padding: ${props => props.p || 0};
    `,
    Content: styled.div<{ bg: string }>`
        position: relative;
        display: flex;
        justify-content: center;
        background-color: ${props => props.bg};
        padding: 120px 24px;
        height: 100%;
        overflow: hidden;
    `,
    Box: styled.div<{ width?: string }>`
        width: ${props => props.width || '60%'};

        @media (max-width: 1024px) {
            width: 100%;
        }
    `,
    CustomButton: styled.button`
        display: flex;
        align-items: center;
        border: 1px solid #D2D2D2;
        background-color: transparent;
        border-radius: 6px;
        padding: 16px;
        transition: all .3s;
        cursor: pointer;

        &:hover {
            border: ${`1px solid ${theme.colors.secondary}`};
            
            svg {
                fill: ${theme.colors.secondary};
            }
        }
    `,
    Background: styled.img`
        position: absolute;
        bottom: -80px;
        left: -20%;
    `,
    Fade: styled.div< { transition: boolean }>`
        opacity: ${props => props.transition ? 1 : 0};
        transition: all .75s ease-in-out;
    `,
    Slogan: styled.p`
        position: absolute;
        bottom: 10%;
        right: 10%;
        color: ${theme.colors.white};
    `
}