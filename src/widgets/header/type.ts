type Category = 'pc'|'mobile'|'console'|'tv'

type LinkType = {
    title: string;
    to: string
}

type ExpandLinkType = {
    title: string;
    links: LinkType[];
}

export type { LinkType, ExpandLinkType,Category }