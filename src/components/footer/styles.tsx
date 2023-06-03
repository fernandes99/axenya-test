import styled from "styled-components";

export const Container = styled.footer` 
    padding: 100px 0 60px;
    background: #000000;
    overflow: hidden;
`

export const Content = styled.div`
    width: 80%;
`

export const Grid = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;

    @media (max-width: 768px) {
        grid-template-columns: unset;
        gap: 32px;
    }
`

export const Box = styled.div`
    &:first-child {
        div {
            display: flex;
            align-items: center;

            img {
                margin-right: 16px;
            }

            span {
                font-size: 18px;
            }

            &:last-child {
                display: grid;
                margin-top: 24px;

                span {
                    color: #7B7B7B;
                    line-height: 180%;
                }
            }
        }
    }

    div.social {
        display: grid;
        grid-template-columns: repeat(3, 38px);
        gap: 16px;

        a {
            transition: all .3s;

            &:hover {
                transform: translateY(-3px);
            }
        }

        svg {
            width: 38px;
            height: 38px;
        }
    }

    &.contact {
        div {
            display: flex;
            align-items: center;
            gap: 24px
        }
    }

    a, p {
        margin: 20px 0 12px;
    }

    a {
        text-decoration: none;
        color: #fff;
        margin: 20px 0 12px;
        display: block;

        &:hover {
            text-decoration: underline;
        }
    }

    strong {
        font-size: 24px;
    }
`

export const Detail = styled.div`
    padding-top: 80px;
    margin-top: 80px;
    text-align: center;
    border-top: 1px solid #3D3F42;
`