export interface JobType {
    id: string,
    name: string,
    slug: string,
    about: string,
    responsibilities: string,
    benefits: string,
    differentials: string,
    requirements: string,
    jobModel: 'in_person' | 'hybrid' | 'home_office',
    process: string,
    subscribeLink: string
}