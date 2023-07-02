export {}

import 'vite/client'

declare global {
    enum SECTION_TITLE {
        ABOUT = 'About',
        HOME = 'Home',
        RESUME = 'Resume',
        PROJECTS = 'Projects',
        CONTACT = 'Contact'
    }

    interface SocialMedia {
        href: string
        icon: string
        title: string
    }
    
    interface SectionData {
        icon: string
        id: string
        title: SECTION_TITLE
    }
    
    interface LabelProps {
        class?: string
    }
    
    interface InputProps {
        class?: string
        type?: string
        autocomplete?: string
    }

    interface ContactInformation {
        age: number
		email: string
		address: {
			city: string
			state: string
		}
		phoneNumber: string
        birthday: {
            day: number
            year: number
            month: number
        }
	}

    interface NormalizedContactInformation {
        age: number
        email: string
        address: string
        'Phone Number': string
        birthday: string
    }
    
    module 'svelte-hamburgers'
}




