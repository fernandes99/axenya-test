import { HOME_CACHE_TIME } from "../constants/time";
import { config } from "../helpers/configs";

export const getJob = (slug: string) => {
    return fetch(`${config.url.base}/api/dato/jobs/${slug}`, { next: { revalidate: HOME_CACHE_TIME } })
        .then(response => response.json())
        .then(result => result.data.allJobs[0]);
}