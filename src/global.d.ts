import type { SECTION_TITLE } from './helpers/constants'

export interface SocialMedia {
    href: string
    icon: string
    title: string
}

export interface SectionData {
    icon: string
    id: string
    title: SECTION_TITLE
}