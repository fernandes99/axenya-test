import styled from "styled-components";

export const S = {
    Header: styled.div`
        width: 100vw;
        padding: 140px 0 340px;
        background-color: ${props => props.theme.colors.primary};
        position: relative;
        background: url('https://www.datocms-assets.com/87998/1674163938-background-carreiras.png') no-repeat;
        background-size: cover;

        @media (max-width: ${props => props.theme.media.desktop}) {
            padding: 120px 0 260px;
        }

        @media (max-width: ${props => props.theme.media.mobile}) {
            padding-bottom: 160px;
        }
    `,
    TopNav: styled.nav<{ scrollPosition: number }>`
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 70px;
        display: flex;
        align-items: center;
        z-index: 1;
        transition: all .5s;
        background-color: ${props => props.scrollPosition == 0 ? 'transparent' : props.scrollPosition > 800 ? '#fffffff0' : '#0000009e'};
        border-bottom: 1px solid #00000014;
    `,
    TopNavContent: styled.div`
        display: flex;
        height: 100%;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        gap: 24px;

        img {
            transition: all .2s;
            margin-right: 8px;
        }

        > a {
            display: flex;
        }

        ul {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 32px;

            li {
                display: flex;

                a {
                    text-decoration: none;
                    color: #67696C;
                }
            }
        }

        @media (max-width: ${props => props.theme.media.mobile}) {
            ul {
                gap: 8px;
            }
        }
    `,
    Button: styled.button`
        display: flex;
        align-items: center;
        width: fit-content;
        border: 1px solid #fff;
        border-radius: 4px;
        padding: 16px 32px;
        background-color: transparent;
        color: #fff;
        font-size: .8rem;
        font-weight: bold;
        transition: all .3s;
        cursor: pointer;

        &:hover {
            background-color: #fff;
            color: #000;
        }
    `,
    ImageContent: styled.div`
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        left: 0;
        filter: drop-shadow(0px 16px 40px rgba(24, 24, 24, 0.15));
        margin-top: -240px;

        img {
            border-radius: 4px;
            width: 100%;
        }

        @media (max-width: ${props => props.theme.media.mobile}) {
            margin: -140px 0 -80px;
        }
    `,
    Content: styled.div`
        padding-top: 140px;
        overflow: hidden;
    `,
    Card: styled.div`
        padding: 32px;
        border: 1px solid #e7e7e7;
        border-radius: 8px;
    `,
    IconBox: styled.div`
        display: flex;
        align-items: center;
        width: fit-content;
        border-radius: 50%;
        padding: 16px;
        background-color: #DFF4FD;
        margin-bottom: 24px;
    `,
    CultureList: styled.ul`
        display: flex;
        flex-direction: column;
        gap: 48px;
    `,
    CultureItem: styled.li`
        display: grid;
        grid-template-columns: 1fr 9fr 1fr;
        align-items: center;
        gap: 24px;
        transition: all .2s;
        cursor: pointer;

        &:hover {
            transform: translateY(-2px);
        }
    `,
    GroupImages: styled.div`
        div {
            position: absolute;
            left: 0;
            width: 150%;

            img {
                margin-bottom: 24px;
                width: 100%;
            }
        }

        &:after {
            content: '';
            position: absolute;
            bottom: 0;
            right: 0;
            width: 100%;
            height: 320px;
            background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #fff 100%);
            z-index: 1;
        }

        @media (max-width: ${props => props.theme.media.desktop}) {
            margin-top: 32px;

            div {
                display: flex;
                align-items: center;
                gap: 24px;
                position: relative;
                left: 0;
                width: 100%;
                height: 480px;
                overflow: hidden;

                img {
                    margin-bottom: 24px;
                    width: auto;
                    height: 100%;
                }
            }
        }
    `,
    LeaderList: styled.ul`
        display: grid;
        grid-template-columns: repeat(5, 320px);
        gap: 24px;
        overflow-y: auto;
        scroll-behavior: smooth;

        &::-webkit-scrollbar {
            display: none;
        }
    `,
    LeaderCard: styled.li`
        display: flex;
        flex-direction: column;
        gap: 8px;
        cursor: pointer;
        transition: all .3s;

        &:hover {
            margin-bottom: 0;

            img {
                filter: unset;
                transform: scale(1.05);
            }

            p:last-child {
                opacity: 1;
            }
        }

        img {
            transition: all .3s;
            width: 100%;
            filter: grayscale(1) brightness(0.5);
        }

        p:last-child {
            transition: all .3s;
            opacity: 0;
        }

        @media (max-width: ${props => props.theme.media.desktop}) {
            p:last-child {
                opacity: 1;
            }

            img {
                filter: unset;
            }
        }
    `,
    LeaderImage: styled.div`
        overflow: hidden;
        height: 320px;
    `,
    GridTeams: styled.div`
        display: grid;
        grid-template-columns: repeat(3, 100%);
        scroll-behavior: smooth;
        gap: 24px;
        transition: all .3s;

        @media (max-width: ${props => props.theme.media.tablet}) {
            gap: 16px;
        }

        @media (max-width: ${props => props.theme.media.mobile}) {
            gap: 8px;
        }
    `,
    BoxTeam: styled.div`
        padding: 24px 32px;
        border: 1px solid #e7e7e7;
        flex: 1;

        @media (max-width: ${props => props.theme.media.tablet}) {
            padding: 16px 24px;
        }

        @media (max-width: ${props => props.theme.media.mobile}) {
            padding: 8px 12px;
        }
    `,
    BlockTeam: styled.div`
        display: grid;
        grid-template-columns: 340px 1fr;
        gap: 24px;

        @media (max-width: ${props => props.theme.media.tablet}) {
            gap: 16px;
            grid-template-columns: 240px 1fr;
        }

        @media (max-width: ${props => props.theme.media.mobile}) {
            gap: 8px;
            grid-template-columns: 120px 1fr;
        }
    `,
    JobList: styled.ul`
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;

        li {
            display: flex;
            justify-content: space-between;
            padding: 16px 24px;
            border: 1px solid #ededed;
            border-radius: 4px;

            a {
                display: flex;
                align-items: center;
                border: 1px solid ${props => props.theme.colors.secondary};
                text-decoration: none;
                padding: 8px 12px;
                border-radius: 4px;
                color: ${props => props.theme.colors.secondary};
                font-weight: 500;
                transition: all .3s;
                width: 90px;
                text-align: center;

                &:hover {
                    background-color: ${props => props.theme.colors.secondary};
                    color: ${props => props.theme.colors.white};
                }
            }
        }

        @media (max-width: ${props => props.theme.media.tablet}) {
            grid-template-columns: repeat(2, 1fr);
        }

        @media (max-width: ${props => props.theme.media.mobile}) {
            grid-template-columns: 1fr;
        }
    `
}