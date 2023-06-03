import styled from "styled-components";

export const Container = styled.div`
    position: relative;
    width: 100vw;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    background: url('https://www.datocms-assets.com/87998/1670278055-background_home.png');
    background-repeat: no-repeat;
    background-position-x: 60vw;
    background-position-y: -60px;

    @media (max-width: 1024px) {
        background: unset;
    }
`

export const Section = styled.section`
    height: 100%;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    &[data-section="principal"] {
        width: 1200px;
        display: grid;
        grid-template-columns: 5fr 2fr;
        padding: 180px 0 240px;
        gap: 32px;

        b {
            background-color: ${props => props.theme.colors.primary};
            color: ${props => props.theme.colors.white};
            border-radius: ${props => props.theme.mixins.radius.small};
            padding: 0 12px;
            font-weight: 500;
            display: inline-block;
        }

        a {
            border: 1px solid ${props => props.theme.colors.gray_darker};
            color: ${props => props.theme.colors.gray_darker};
            border-radius: ${props => props.theme.mixins.radius.small};
            background-color: ${props => props.theme.colors.white};
            font-weight: bold;
            background-color: transparent;
            padding: 12px 36px;
            cursor: pointer;
            text-decoration: none;
            transition: all .3s;

            &:hover {
                background-color: ${props => props.theme.colors.primary};
                border-color: ${props => props.theme.colors.primary};
                color: ${props => props.theme.colors.white};
                transform: translateY(-2px);
            }
        }

        @media (max-width: 1280px) {
            width: 1000px;
        }

        @media (max-width: 1024px) {
            &[data-section="principal"] {
                display: grid;
                grid-template-columns: 1fr;
                padding-bottom: 80px;
                gap: 32px;
                width: 100%;
                height: 100%;
                padding: 120px 32px 140px;
            }

        }
    }

    &[data-section="apresentation"] {
        position: relative;
        height: 100%;
        padding: 80px 0;
        background-color: #F5FBFB;

        .content {
            overflow: overlay;
            height: 100%;
            width: 100%;
        }

        @media (max-width: 1024px) {
            height: 100%;
            overflow: hidden;
        }
    }

    &[data-section="soluctions"] {
        position: relative;
        background-color: #ECF4F4;
        padding: 120px;
        height: 100%;

        @media (max-width: 1024px) {
            padding: 120px 16px;
        }

        @media (max-width: 768px) {
            background-color: #fff;
        }
    }

    &[data-section="results"] {
        height: 100%;
        width: 100%;
        padding: 120px 180px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        h5 {
            color: #A2BABA;
            font-weight: bolder;
            font-size: 18px;
            letter-spacing: 5px;
            margin-bottom: 16px;
            text-transform: uppercase;
            margin-bottom: 24px;
        }

        @media (max-width: 1024px) {
            overflow: scroll;
            padding: 120px 0 120px 24px;

            h5 {
                font-size: 16px;
            }
        }
    }

    &[data-section="form"] {
        position: relative;
        height: 100%;
        background-color: ${props => props.theme.colors.primary};
        color: ${props => props.theme.colors.white};
        padding: 120px 40px;

        .content {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 32px;
            height: 100%;
            width: 1200px;
        }

        img {
            margin-bottom: 32px;
        }

        h3 {
            font-size: 44px;
            margin-bottom: 32px;
        }

        p {
            font-size: 24px;
            color: #C1C2C6;
            margin-bottom: 24px;
        }

        svg {
            font-size: 48px;
        }

        form {
            display: grid;
            gap: 16px;

            input, textarea, button {
                height: 52px;
                padding: 0 24px;
                border-radius: 4px;
                background-color: transparent;
                font-size: 18px;
            }

            input, textarea {
                border: 1px solid #8F8F8F;
                color: #fff;
            }

            textarea {
                padding-top: 16px;
                height: 120px;
            }

            input[type="submit"] {
                border: 1px solid #3896B4;
                color: #3896B4;
                cursor: pointer;
                transition: all .3s;

                &:hover {
                    background-color: #3896B4;
                    color: #000;
                }
            }
        }

        @media (max-width: 1024px) {
            .content {
               grid-template-columns: 1fr;
               grid-template-rows: repeat(2, 1fr);
            }

            img {
                margin-bottom: 32px;
                width: 72px;
            }

            h3 {
                font-size: 38px;
                margin-bottom: 24px;
            }

            p {
                font-size: 20px;
                color: #C1C2C6;
                margin-bottom: 16px;
            }
        }

        @media (max-width: 768px) {
            img {
                width: 52px;
            }

            h3 {
                font-size: 32px;
            }

            svg:last-child {
                display: none;
            }
        }
    }

    &[data-section="partners"] {
        background-color: #F9F9F9;
        height: 100%;
        padding: 120px 24px;
        display: grid;
        align-items: center;
        justify-content: center;
        gap: 32px;
        overflow: hidden;

        h5 {
            font-size: 18px;
            color: #3D3F42;
            text-align: center;
        }

        .content {
            position: relative;
            width: 100%;
            margin: 0 auto;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 72px;
            
            &:before {
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, #F9F9F9 0%, rgba(249, 249, 249, 0) 48.96%, #F9F9F9 100%);
            }
        }

        @media (max-width: 768px) {
            .content {
                gap: 32px;

                img {
                    width: 1200px;
                }
            }
        }
    }

    &[data-section="achievements"] {
        background-color: #F9F9F9;
        height: 100%;
        padding: 120px 24px;
        overflow: hidden;

        .content {
            width: 1200px;

            ul {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 32px;

                li {
                    width: 100%;
                    margin: 0 auto;
                    display: grid;
                    align-items: center;
                    justify-content: center;
                    padding: 0 80px;
                    gap: 12px;

                    strong {
                        font-size: 48px;
                        font-weight: 500;
                        text-align: center;
                    }

                    p {
                        font-size: 24px;
                        text-align: center;
                        color: #6B6C70;
                        margin-bottom: auto;
                    }
                    
                    &:not(:last-child) {
                        border-right: 1px solid #EAF2F4;
                    }
                }
            }
        }

        @media (max-width: 1024px) {
            .content {
                width: 100%;
                padding: 0 24px;

                ul {
                    grid-template-columns: unset;
                    gap: 64px;

                    li {
                        border: unset !important;
                    }
                }
            }
        }

        @media (max-width: 768px) {
            .content ul {
                li {
                    padding: 0 24px;
                    gap: 8px;

                    strong {
                        font-size: 32px;
                    }

                    p {
                        font-size: 20px;
                    }
                }
            }
        }
    }

    &[data-section="blog"] {
        height: 100%;
        overflow: hidden;
        
        .content {
            width: 1200px;
            padding: 120px 0;

            h5 {
                font-size: 28px;
                color: #2E3030;
                margin-bottom: 24px;
                text-align: center;
                font-weight: 500;

                a {
                    font-weight: bold;
                    color: #000;
                }
            }

            ul {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 24px;

                li {
                    display: flex;
                
                    a {
                        display: grid;
                        grid-template-rows: 50% 50%;
                        box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.1);
                        height: 380px;
                        border-radius: 8px;
                        transition: all .3s;
                        overflow: hidden;
                        cursor: pointer;
                        text-decoration: none;

                        &:hover {
                            transform: translateY(-5px);
                        }

                        div:first-child {
                            position: relative;
                            display: flex;
                            align-items: center;
                            overflow: hidden;

                            img {
                                width: 100%;
                            }
                        }

                        div:last-child {
                            padding: 24px;

                            strong {
                                color: #000;
                                font-size: 24px;
                                display: -webkit-box;
                                -webkit-line-clamp: 2;
                                -webkit-box-orient: vertical;
                                overflow: hidden;
                            }

                            p {
                                margin-top: 16px;
                                font-size: 16px;
                                color: #6B6C70;
                                line-height: 150%;
                                display: -webkit-box;
                                -webkit-line-clamp: 3;
                                -webkit-box-orient: vertical;
                                overflow: hidden;
                            }
                        }
                    }
                }
            }
        }

        @media (max-width: 768px) {
            padding: 80px 0;

            .content {
                width: 100%;
                padding: 0;
                
                ul {
                    grid-template-columns: repeat(4, 300px);
                    overflow: auto;
                    padding-bottom: 32px;

                    li {
                        &:first-child {
                            margin-left: 24px;
                        }

                        &:last-child {
                            margin-right: 24px;
                        }
                    }
                }
            }
        }
    }
`

export const LogoAxenya = styled.img`
    margin-bottom: 52px;
    height: 80px;

    @media (max-width: 1024px) {
        height: 60px;
        margin-bottom: 38px;
    }
`

export const LogoDetail = styled.img`
    position: absolute;
    top: 0;
    left: -35%;
    width: auto;
    height: 150% !important;
    transform: translateY(-15%);
    opacity: .03;
    z-index: -1;
    
    @media (max-width: 768px) {
        height: auto;
        width: 90%;
    }
`

export const SlideContent = styled.div`
    display: flex;
    align-items: flex-start;
    width: 1200px;
    gap: 120px;

    @media (max-width: 1024px) {
        width: 100%;
    }
`

export const Slide = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 100%;

    @media (max-width: 1024px) {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        grid-template-columns: unset;
        height: 100%;
        width: 100%;
        padding: 80px 32px;
        gap: 80px;

        img {
            width: 90% !important;
        }
    }
`

export const SlideBox = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 100vh;

    h5 {
        color: #A2BABA;
        font-weight: bolder;
        font-size: 18px;
        letter-spacing: 5px;
        margin-bottom: 16px;
    }

    img {
        width: fit-content;
        height: 100%;
        margin: auto;
    }

    @media (max-width: 1024px) {
        height: unset;

        h5 {
            font-size: 14px;
        }

        h3 {
            font-size: 24px;
        }

        p {
            font-size: 16px;
        }
    }
`

export const SlideImage = styled.div`
    position: sticky;
    height: 100vh;
    top: 0;
    display: flex;
    align-items: center;

    &.fade {
        animation: fade-in-keyframes 1s;
    }

    & img {
        max-width: 100%;
        width: 100%;
    }

    @media (max-width: 1024px) {
        margin-top: 64px;
        height: unset;
        justify-content: center;
    }

    @keyframes fade-in-keyframes {
        from {opacity: 0}
        to {opacity: 1}
    }
`

export const SoluctionsBox = styled.div`
    width: 100%;
    background-color: #fff;
    padding: 80px;
    display: grid;
    gap: 24px;
    border-radius: 16px;
    box-shadow: 0px 5px 10px rgb(0 0 0 / 5%);
    z-index: 1;

    h3 {
        text-align: center;
        font-size: 34px;
        font-weight: normal;
        margin-bottom: 80px;

        @media (max-width: 1024px) {
            margin-bottom: 32px;
        }

        @media (max-width: 768px) {
            br {
                display: none;
            }
        }

        b {
            font-weight: bold;
        }
    }

    > div:nth-child(2n) ul {
        flex-direction: row;
    }

    @media (max-width: 1024px) {
        padding: 32px;

        h3 {
            font-size: 24px;
        }
    }

    @media (max-width: 768px) {
        box-shadow: unset;
        padding: 0;
    }
`

export const SoluctionsBlock = styled.div<{ side?: 'right' | 'left' }>`
    display: flex;
    flex-direction: column;
    flex: 1;

    ul {
        flex-direction: ${props => props.side == 'right' ? 'row-reverse' : 'row'};
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
`

export const SoluctionsInfo = styled.div<{ open: boolean }>`
    display: grid;
    grid-auto-flow: column;
    align-items: ${props => props.open ? 'start' : 'center'};
    justify-content: start;
    gap: 24px;
    background-color: #F5F5F5;
    padding: 24px 48px 24px 24px;
    border-radius: 8px;
    opacity: ${props => props.open ? '1' : '.5'};
    cursor: pointer;
    transition: all .3s;

    &:hover {
        transform: translateY(-2px);
    }

    svg {
        width: 28px;
        height: auto;
    }

    h5 {
        font-size: 24px;
        color: #0C0D11;
        font-weight: 500;
        margin-bottom: ${props => props.open ? '12px' : '0'};
    }

    p.subtitle {
        display: ${props => props.open ? 'block' : 'none'};
        color: ${props => props.theme.colors.gray_dark};
        font-size: 21px;
        line-height: 120%;
        cursor: auto;
    }

    @media (max-width: 1024px) {
        padding: 16px;

        h5 {
            font-size: 20px;
            line-height: 120%;
        }

        p {
            font-size: 18px !important;
            line-height: 140% !important;
        }
    }
`

export const SoluctionsItem = styled.li`
    display: block;
    margin-bottom: 16px;
`

export const SoluctionsImage = styled.div`
    text-align: center;
    flex: 1;

    @media (max-width: 1024px) {
        img {
            width: auto;
            max-height: 320px;
            margin: 32px 0;
        }
    }
`

const resultWidth = 950;

export const ResultList = styled.ul<{currentResult: number}>`
    transform: ${props => `translateX(-${props.currentResult * resultWidth}px)`};
    width: 100%;
    display: flex;
    transition: all .5s;

    li {
        display: flex;
        flex-direction: column;
        gap: 16px;
        width: ${resultWidth}px;
        padding-right: 120px;
        opacity: .1;

        &.is-actived {
            opacity: 1;
        }

        h3 {
            font-size: 44px;
            font-weight: bold;
        }

        p {
            font-size: 24px;
            color: #6B6C70;
            margin-bottom: 32px;
        }
    }

    @media (max-width: 1024px) {
        li {
            padding-right: 5vw;
            width: 90vw;
            opacity: 1;

            h3 {
                font-size: 28px;
            }

            p {
                font-size: 16px;
                margin-bottom: 24px;
                line-height: 140%;
            }
        }
    }
`

export const ResultBlock = styled.div`
    position: relative;

    button {
        position: absolute;
        top: 0;
        left: ${resultWidth / 1.1}px;
        background-color: #0C0D11;
        border: unset;
        width: 52px;
        height: 52px;
        border-radius: 50%;
        cursor: pointer;
        transition: all .3s;

        svg {
            fill: #fff;
            font-size: 26px;
        }

        &:hover {
            transform: translateY(-3px);
        }

        &.left {
            right: 0px;
            left: -5%;
        }

        @media (max-width: 1024px) {
            display: none;
        }
    }
`

export const Detail = styled.img<{ side: "left" | "right", opacity?: string }>`
    position: absolute;
    left: ${props => props.side === "left" ? 0 : "unset"};
    right: ${props => props.side === "right" ? 0 : "unset"};
    top: 0;
    opacity: ${props => props.opacity ? props.opacity : "0.5"};
    transform: ${props => props.side === "right" ? "rotateY(180deg)" : "unset"};

    @media (max-width: 1024px) {
        width: 200px;
    }
`

export const LoadingForm = styled.div`
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
`

export const FeedbackForm = styled.div`
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
`