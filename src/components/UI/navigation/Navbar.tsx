import { useEffect, useState } from "react"
import { NavigationDesktop } from "./NavigationDesktop"
import { NavigationMobile } from "./NavigationMobile"
import style from './Navbar.module.css'
import Search from "../search/Search"

const Navbar = () => {
    const [isMobile, setIsMobile] = useState(false)

    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        checkSize()
        window.addEventListener('resize', checkSize)
        return () => window.removeEventListener('resize',checkSize)
    }, [])

    useEffect(() => {
        let header = document.getElementById('header') as HTMLElement

        header.classList.add(style['unscrolled'])

        const onScroll = () => {
            header = header || document.getElementById('header') as HTMLElement
            const scrollTop = document.documentElement.scrollTop;

            if (scrollTop > 30) {
                header.classList.add(style['scrolled'])
            }
            else if (scrollTop < 30) {
                header.classList.remove(style['scrolled'])
            }
        }

        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll)
    }, [isMobile])

    const checkSize = () => {
        if (window.innerWidth < 1224) {
            setIsMobile(true)
        }
        else {
            setIsMobile(false)
        }
    }

    const onSearchClick = () => {
        setIsActive(true)
    }

    return (
        <header id="header">
            {isMobile ? <NavigationMobile onSearchClick={onSearchClick}/> : <NavigationDesktop onSearchClick={onSearchClick}/>}
            <Search isActive={isActive} setIsActive={setIsActive}/>
        </header>
    )
}

    export default Navbar