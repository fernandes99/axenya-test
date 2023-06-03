export interface NavigationType {
    navigationList: NavigationItemType[],
}

export interface NavigationItemType {
    id: string,
    text: string,
    slug: string
    link: string,
    openNewTab: boolean,
}