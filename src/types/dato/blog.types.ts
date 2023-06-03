import { ImageType } from "../global.types"

export interface ArticleType {
    id: string,
    slug: string,
    title: string,
    content: string,
    image: ImageType,
    category: CategoryType,
    author: AuthorType,
    metaTags: {
        title: string,
        description: string,
        twitterCard: string,
        image: ImageType
    },
    publishDate: Date
}

export interface SeoMetaTagType {
    content?: string,
    attributes?: string,
    tag?: string
} 

export interface AuthorType {
    name: string,
    rule: string,
    image: ImageType
}

export interface CategoryType {
    id: string,
    name: string,
    slug: string,
    color: {
        hex: string
    }
} 