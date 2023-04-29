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

export interface LabelProps {
    class?: string
}

export interface InputProps {
    class?: string
    type?: string
    autocomplete?: string
}