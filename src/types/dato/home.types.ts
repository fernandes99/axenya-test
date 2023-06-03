import { ImageType } from "../global.types"

export interface HomeType {
    title: string,
    subtitle: string,
    cta?: string
    switchKeys: string[],
    backgroundImage: ImageType,
    slides: SlideType[],
    soluctions: SoluctionBlockType[],
    results: ResultsType[],
    partnerTitle: string,
    partners: PartnerType[],
    achievements: AchievementType[],
    hidePrincipalSection: boolean,
    hideSecondSection: boolean,
    hideSoluctionSection: boolean,
    hideResultSection: boolean,
    hidePartnerSection: boolean,
    hideAchievementSection: boolean,
}

export interface SoluctionBlockType {
    id: string,
    title: string,
    soluctionList: SoluctionType[]
}

export interface SoluctionType {
    id: string,
    title: string,
    subtitle: string,
    icon: string,
    image: ImageType,
}

export interface AchievementType {
    id: string,
    title: string,
    subtitle: string,
}

export interface SlideType {
    id: string,
    label: string,
    title: string,
    subtitle: string,
    image?: ImageType
}

export interface ResultsType {
    id: string,
    title: string,
    subtitle: string,
    image: ImageType
}

export interface PartnerType {
    id: string,
    logo: {
        url: string,
        alt: string,
        title: string
    }
}