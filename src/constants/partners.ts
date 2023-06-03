interface PartnerType {
    slug: string,
    name: string,
    pathLogo: string
}

export const partners = [
    {
        slug: 'clube-hubs',
        name: 'Clube Hubs',
        pathLogo: '/img/hubs-logo.png'
    },
    {
        slug: 'arton',
        name: 'Arton',
        pathLogo: '/img/arton-logo.png'
    },
] as PartnerType[];