import styled from "styled-components";

export const Section = styled.section`
    padding: 80px 0;

    @media (max-width: 1024px) {
        padding: 64px 0;
    }
`

export const TopNav = styled.nav`
    width: 100vw;
    height: 80px;
    display: flex;
    align-items: center;
    padding: 12px 0;
    background-color: ${props => props.theme.colors.primary};
`

export const TopNavContent = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    a:first-child {
        height: 48px;
    }

    a:last-child {
        text-decoration: unset;
        color: #fff;
        padding: 13px 24px;
        border: 2px solid #3c3c3c;
        border-radius: 6px;
        transition: all .3s;

        &:hover {
            background-color: white;
            color: #000;
        }
    }

    li {
        display: flex;
    }
`

export const HeadArticle = styled.div`
    margin-bottom: 64px;

    img {
        border-radius: 8px;
    }
`

export const AuthorBox = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 24px;

    img {
        border-radius: 50%;
    }
`

export const CategoryFlag = styled.a`
    display: flex;
    align-items: center;
    width: fit-content;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 2px;
    text-transform: uppercase;
    text-decoration: none;
    background-color: #e6f9ff;
    padding: 8px;
    margin-bottom: 16px;
    border-radius: 4px;
    color: ${props => props.theme.colors.secondary};
`

export const BodyArticle = styled.div`
    p, em, b {
        font-size: 20px;
        line-height: 150%;
        color: #211f1f;
    }

    p {
        margin-bottom: 24px;
    }

    h1 {
        font-size: 1.8rem;
    }

    h2 {
        font-size: 1.6rem;
    }

    h3 {
        font-size: 1.4rem;
    }

    img {
        max-width: 100%;
        border-radius: 8px;
    }

    li {
        margin-left: 16px;

        p {
            margin-bottom: 8px;
        }

        &::marker {
          font-weight: bold;  
        }
    }
`

export const ShareBlock = styled.div`
    display: flex;
    gap: 16px;

    svg {
        opacity: .5;
        transition: all .3s;
        border-radius: 8px;
        padding: 6px;
        background: #ededed;
        cursor: pointer;

        &:hover {
            opacity: 1;
            background: #ededed;
        }
    }

    @media (max-width: 1024px) {
        flex-direction: row;
    }
`

export const AsideBlock = styled.div`

` 