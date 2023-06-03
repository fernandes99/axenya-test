import styled from "styled-components";

export const S = {
    LoadingForm: styled.div`
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #000000cc;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: progress;
        z-index: 10;

        &:after {
            content: " ";
            display: block;
            width: 64px;
            height: 64px;
            margin: 8px;
            border-radius: 50%;
            border: 6px solid #fff;
            border-color: #fff transparent #fff transparent;
            animation: lds-dual-ring 1.2s linear infinite;
        }

        @keyframes lds-dual-ring {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
    `,
    FeedbackForm: styled.div`
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
        width: 320px;
        height: 100%;
        margin: auto;

        svg {
            fill: #38B5B4;
        }

        p {
            margin: 16px 0 0;
        }
    `,
    Form: styled.form`
        display: flex;
        flex-direction: column;
        gap: 24px;
    `,
    FormButton: styled.button`
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
    OptionBox: styled.select<{ hasError: boolean }>`
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
    OldInputList: styled.div`
        margin-top: 16px;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;

        @media (max-width: 1024px) {
            grid-template-columns: repeat(2, 1fr);
        }
    `,
    OldInputItem: styled.div`
        display: grid;
        align-items: center;
        grid-template-columns: 1fr 2fr;
        gap: 8px;
    `
}