import {LINK_DATA,EXPAND_LINK_DATA} from "./linkData"


type Category = 'pc'|'mobile'|'console'|'tv'

type LinkType = {
    title: string;
    to: string
}

type ExpandLinkType = {
    title: string;
    links: LinkType[];
}

export {LINK_DATA,EXPAND_LINK_DATA}
export type { LinkType, ExpandLinkType,Category }