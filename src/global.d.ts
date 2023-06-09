import 'vite/client'

enum SECTION_TITLE {
    ABOUT = 'About',
    HOME = 'Home',
    RESUME = 'Resume',
    PROJECTS = 'Projects',
    CONTACT = 'Contact'
}

declare interface SocialMedia {
    href: string
    icon: string
    title: string
}

declare interface SectionData {
    icon: string
    id: string
    title: SECTION_TITLE
}

declare interface LabelProps {
    class?: string
}

declare interface InputProps {
    class?: string
    type?: string
    autocomplete?: string
}

declare module 'svelte-hamburgers'
