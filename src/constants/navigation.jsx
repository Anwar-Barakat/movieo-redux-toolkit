import { BiCameraMovie, BiSearch } from "react-icons/bi"
import { IoHomeOutline } from "react-icons/io5"
import { PiTelevisionSimpleLight } from "react-icons/pi"

export const navItems = [
    {
        label: 'TV Shows',
        href: 'tv',
        icon: <PiTelevisionSimpleLight />
    },
    {
        label: 'Movies',
        href: 'movies',
        icon: <BiCameraMovie />
    },
]

export const mobileNavItems = [
    {
        label: 'Home',
        href: '',
        icon: <IoHomeOutline />
    },
    ...navItems,
    {
        label: 'Search',
        href: 'search',
        icon: <BiSearch />
    }
]