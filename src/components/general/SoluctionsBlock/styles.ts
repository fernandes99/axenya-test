import styled from "styled-components";

const S = {
    Box: styled.div`
        h2 {
            width: 50%;
            margin: 0 auto 80px;

            @media (max-width: 1024px) {
                width: 100%
            }
        }
    `,
    Block: styled.div<{ side?: 'right' | 'left' }>`
        display: flex;
        flex-direction: column;
        flex: 1;
        
        ul {
            flex-direction: ${props => props.side === 'right' ? 'row-reverse' : 'row'};
        }

        &:not(:last-child) {
            margin-bottom: 120px;
        }

        h4 {
            font-size: 28px;
            font-weight: normal;
            color: #0C0D11;
            margin-bottom: 32px;
        }

        ul {
            display: flex;
            align-items: flex-start;
            gap: 80px;

            & > div {
                flex: 1;
            }

            & img {
                max-width: 80%;
            }

            @media (max-width: 1024px) {
                flex-direction: column !important;
                justify-content: center;
                align-items: center;
            }
        }

        @media (max-width: 1024px) {
            h4 {
                font-size: 22px;
                margin-bottom: 24px;
            }
        }
    `,
    List: styled.ul`
        
    `,
    Item: styled.li`
        
    `,
}

export default S;