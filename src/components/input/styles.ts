import styled from "styled-components";

const S = {
    Field: styled.div`
        display: flex;
        flex-direction: column;
        gap: 8px;

        textarea {
            padding: 16px;
            height: 100px;
        }
    `,
    Input: styled.input<{ hasError: boolean }>`
        font-family: inherit;
        height: 52px;
        padding: 0 24px;
        border-radius: 4px;
        background-color: transparent;
        font-size: 18px;
        border: ${props => props.hasError ? '1px solid #ff6161' : '1px solid #8F8F8F'};
        color: #fff;
    `,
    Message: styled.span`
        color: #ff6161;
    `,
    Box: styled.div`
        display: flex;
        align-items: center;
        gap: 4px;
    `
}

export default S;