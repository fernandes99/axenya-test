import styled from "styled-components";

const S = {
    List: styled.ul`
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 32px;

        @media (max-width: 768px) {
            grid-template-columns: repeat(1, 1fr);
            gap: 80px;
        }
    `,
    Item: styled.li`
        width: 100%;
        margin: 0 auto;
        display: grid;
        align-items: center;
        justify-content: center;
        padding: 0 64px;
        gap: 12px;
        
        &:not(:last-child) {
            border-right: 1px solid #EAF2F4;
        }
    `,
}

export default S;