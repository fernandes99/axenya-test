import { BLOG_CACHE_TIME, HOME_CACHE_TIME } from "../../constants/time";
import { config } from "../../helpers/configs";

export const getAllArticles = () => {
    return fetch(`${config.url.base}/api/dato/articles`, { next: { revalidate: BLOG_CACHE_TIME } })
        .then(response => response.json())
        .then(result => result.data.allArticles);
}

export const getArticle = (slug: string) => {
    return fetch(`${config.url.base}/api/dato/articles/${slug}`, { next: { revalidate: BLOG_CACHE_TIME } })
        .then(response => response.json())
        .then(result => result.data.allArticles[0]);
}

export const getAllArticlesByCategoryId = (categoryId: string) => {
    return fetch(`${config.url.base}/api/dato/articles?categoryId=${categoryId}`, { next: { revalidate: 0 } })
        .then(response => response.json())
        .then(result => result.data?.allArticles);
}

export const getAllCategories = () => {
    return fetch(`${config.url.base}/api/dato/articles/categories`, { next: { revalidate: BLOG_CACHE_TIME } })
        .then(response => response.json())
        .then(result => result.data.allArticleCategories);
}

export const getCategoryBySlug = (slug: string) => {
    return fetch(`${config.url.base}/api/dato/articles/categories?slug=${slug}`, { next: { revalidate: 0 } })
        .then(response => response.json())
        .then(result => result.data.allArticleCategories[0]);
}