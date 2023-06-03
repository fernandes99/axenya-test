import styled from "styled-components";

import theme from "../../../../styles/theme";
import { Text } from "../../../../styles/text";
import { CustomStyleProps } from "../../../../styles/styled";
import { Row } from "../../../../styles/grid";
import Image from "next/image";


export const S = {
    Section: styled.section<CustomStyleProps>`
        position: relative;
        background: ${props => props.bg || theme.colors.primary}; 
        height: ${props => props.height || 'unset'}; 
        max-width: 2560px;
        margin: 0 auto;
        transition: all .5s;
        overflow: ${props => props.overflow || 'unset'};

        &.hide {
            opacity: 0;
        }

        &.fade-in {
            opacity: 1;
        }
    `,
    Content: styled.div<CustomStyleProps>`
        padding-top: ${props => props.pt || 0};
        padding-bottom: ${props => props.pb || 0};
        padding-left: ${props => props.pl || 0};
        padding-right: ${props => props.pr || 0};
        position: sticky;
        top: 120px;
    `,
    StickyContent: styled.div<CustomStyleProps>`
        position: sticky;
        top: ${props => props.top || '120px'};
        height: ${props => props.height || '100vh'};
    `,
    Title: styled(Text)`
        font-size: 2.5rem;
        font-weight: bold;
        color: ${theme.colors.white};
        margin-bottom: 24px;
    `,
    Button: styled(Text)<CustomStyleProps>`
        display: flex;
        background-color: ${props => props.bg || '#3AB8B7'};
        width: fit-content;
        padding: 12px 24px;
        border-radius: 100px;
        transition: all .3s;
        cursor: pointer;

        &:hover {
            background-color: #278f8e;
        }
    `,
    Background: styled.div`
        position: absolute;
        top: -80px;

        :before {
            content: '';
            position: absolute;
            bottom: 0px;
            left: 0;
            width: 100%;
            height: 200px;
            background: linear-gradient(transparent, ${theme.colors.primary});
        }
    `,
    Divider: styled.div`
        height: 1px;
        width: 100vw;
        background-color: ${theme.colors.white};
        margin: 48px 0;
    `,
    Soluction: {
        Block: styled.div`
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 120%;
            margin-left: -10%;
            border-radius: 16px;
            padding-left: 80px;
            background-color: #F5F5F5;
            z-index: ${theme.mixins.index.z1};
            transform: translateY(-180px);
        ` ,
    },
    Phrase: styled(Text)<CustomStyleProps>`
        position: absolute;
        top: 30%;
        text-align: center;
        transition: all .2s;

        strong {
            color: ${theme.colors.primary};
        }
    `,
    PhraseList: styled.div`
        position: relative;
        display: flex;
        justify-content: center;
        align-content: center;
        height: 300px;
        overflow: hidden;
    `,
    PhraseBlock: styled.div`
        position: relative;
        padding: 240px 0;
        transition: all .3s;
    `,
    PhraseBackground: styled.div`
        position: absolute;
        top: -200px;
        left: 0;
        width: 100%;
        z-index: ${theme.mixins.index.none};

        img {
            width: 100%;
            height: auto;
        }

        &:before{
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 300px;
            background: linear-gradient(${theme.colors.white}, transparent);

        }
    `,
    Metrics: {
        Block: styled.div`
            width: 60%;
        `,
        Stars: styled.div`
            display: flex;
            gap: 8px;
            align-items: center;
        `
    },
    Tech: {
        ImageBox: styled.div`
            position: relative;
            bottom: -105px;
            margin-top: 320px;
            z-index: ${theme.mixins.index.z0};

            img {
                z-index: ${theme.mixins.index.z0};
                width: 100%;
                height: auto;
            }
        `,
        InfoBox: styled.div<{ side: 'left' | 'right' }>`
            position: absolute;
            top: ${props => props.side === 'left' ? '-140px' : '-200px'};
            left: ${props => props.side === 'left' ? '63px' : 'unset'};
            right: ${props => props.side === 'left' ? 'unset' : '127px'};
            width: 340px;
            z-index: ${theme.mixins.index.z1};
            opacity: 0;
            transform: translateY(40px);
            transition: all .5s;

            &.fade-in {
                transform: translateY(0);
                opacity: 1;
            }
        `,
        Line: styled.div<{ side: 'left' | 'right' }>`
            position: absolute;
            height: ${props => props.side === 'left' ? '216px' : '365px'};
            left: -12px;
            top: 0px;
            border-left: 2px dotted ${theme.colors.primary};

            &:before {
                content: '';
                position: absolute;
                left: -3px;
                width: 4px;
                height: 24px;
                background: #3AB8B7;
            }
        `
    },
    Benefits: {
        Block: styled.div`
            border: 1px solid #3AB8B7;
            border-radius: 8px;
            overflow: hidden;
            padding-left: 68px;
            margin-bottom: 64px;
        `,
        BlockInfo: styled(Row)`
            opacity: 0;
            transform: translateY(-50px);
            transition: all 1s;

            &.fade-in {
                opacity: 1;
                transform: translateY(0px);
            }
        `,
        Box: styled.div`
            display: flex;
            align-items: flex-start;
            gap: 16px;
        `,
        Center: styled.div`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
        `,
        Progress: styled.div<{ value: string }>`
            position: relative;
            width: 100%;
            height: 12px;
            border-radius: 12px;
            background-color: #B2E1D8;
            overflow: hidden;
            margin-top: 16px;
            
            &:before {
                content: '';
                transition: all 2s;
                position: absolute;
                left: 0;
                top: 0;
                height: 100%;
                width: ${props => props.value}%;
                background-color: #3AB8B7;
            }
        `,
        Divider: styled.div`
            height: 110px;
            width: 1px;
            background-color: ${theme.colors.gray_ligheter};
            margin-top: -20px;

            @media (max-width: ${props => props.theme.media.desktop}) {
                display: none;
            }
        `,
    },
    Unicef: {
        Image: styled.img`
            position: relative;
            width: 120%;
            height: auto;
            left: -20%;
        `
    },
    About: {
        TitleBox: styled.div`
            margin-bottom: 64px;
        `,
        ImageBox: styled.div`
            margin-top: -140px;

            img {
                width: 100%;
                height: auto;
                max-width: 1400px;
            }
        `
    }
}