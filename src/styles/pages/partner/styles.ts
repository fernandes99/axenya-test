import styled from "styled-components";

export const S = {
    Nav: styled.nav`
        display: flex;
        align-items: center;
        height: 80px;
        width: 100vw;
    `,
    BrandBox: styled.div`
        display: flex;
        align-items: center;
        position: relative;
        gap: 16px;
        height: 80px;

        img {
            width: auto;
            height: 40%;

            &:first-child {
                height: 60%;
            }
        }
    `,
    Section: styled.section<{ bg?: string, p?: string }>`
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
    BackgroundImage: styled.img`
        position: absolute;
        width: 100%;
        bottom: -160px;
        left: 0;
    `,
    Form: styled.form`
        display: flex;
        flex-direction: column;
        gap: 24px;
    `,
    Button: styled.button`
        height: 52px;
        padding: 0 24px;
        background-color: transparent;
        font-size: 18px;
        border-radius: 4px;
        border: 1px solid #3896B4;
        color: #3896B4;
        cursor: pointer;
        transition: all .3s;

        &:hover {
            background-color: #3896B4;
            color: #000;
        }
    `,
    SelectFormPartner: styled.select<{ hasError: boolean }>`
        height: 52px;
        padding: 0 24px;
        background-color: transparent;
        font-size: 18px;
        border-radius: 4px;
        border: ${props => props.hasError ? '1px solid #ff6161' : '1px solid #8F8F8F'};
        color: #FFF;
        cursor: pointer;

        option {
            background: ${props => props.theme.colors.primary};
            color: #fff;
        }
    `,
    SelectBox: styled.div`
        position: relative;
        display: flex;
        flex-direction: column;

        label {
            position: absolute;
            top: -12px;
            left: 8px;
            background-color: #000;
            color: ${props => props.theme.colors.gray};
            padding: 4px 8px;
            font-size: 14px;
        }
    `,
    CheckBox: styled.div`
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        justify-content: start;

        label {
            color: ${props => props.theme.colors.gray_ligheter};
            font-size: 16px;
            margin-left: 12px;
        }

        input[type="checkbox"] {
            width: 22px;
        }
    `,
    ColBox: styled.div`
        display: grid;
        grid-template-columns: 48% 48%;
        gap: 4%;

        @media (max-width: 1024px) {
            grid-template-columns: 100%;
        }
    `,
    InputsBox: styled.div`
        margin-top: 16px;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;

        @media (max-width: 1024px) {
            grid-template-columns: repeat(2, 1fr);
        }
    `,
    InputBox: styled.div`
        display: grid;
        align-items: center;
        grid-template-columns: 1fr 2fr;
        gap: 8px;
    `
}