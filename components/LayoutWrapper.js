import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo-two.svg'
import LogoDark from '@/data/logo-dark.svg'
import Link from './Link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import { useTheme } from 'next-themes'
import { useEffect } from 'react'
import styled from 'styled-components'

const MainWrapper = styled.main`
  @media (max-width: 640px) {
    padding-top: 60px;
  }
`

const ScaledLightLogo = styled(Logo)`
  @media (max-width: 640px) {
    transform: scale(1.2);
    max-width: 80%;
  }
`

const ScaledDarkLogo = styled(LogoDark)`
  @media (max-width: 640px) {
    transform: scale(1.2);
    max-width: 80%;
  }
`
const HeaderWrapper = styled.header`
  @media (max-width: 640px) {
    justify-content: space-between;
    align-items: center;
  }
`

const LayoutWrapper = ({ children }) => {
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    function getThemeFromStorage() {
      const storageKey = 'theme'
      const theme = localStorage.getItem(storageKey)
      return theme ? theme : null
    }

    const theme = getThemeFromStorage()
    setTheme(theme)
  })

  return (
    <SectionContainer>
      <HeaderWrapper className="flex justify-between py-3">
        {/* <div className="flex h-screen flex-col justify-between"> */}
        {/* <header className="flex items-center justify-between py-3"> */}
        <div>
          <Link href="/" aria-label={siteMetadata.headerTitle}>
            <div className="flex items-center justify-between">
              <div className="mr-3">
                {theme === 'dark' ? <ScaledDarkLogo /> : <ScaledLightLogo />}
              </div>
            </div>
          </Link>
        </div>
        <div className="flex items-center text-base leading-5">
          <div className="hidden sm:block">
            {headerNavLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4"
              >
                {link.title}
              </Link>
            ))}
          </div>
          <ThemeSwitch />
          <MobileNav />
        </div>
      </HeaderWrapper>
      <MainWrapper>{children}</MainWrapper>
      <Footer />
      {/* </div> */}
    </SectionContainer>
  )
}

export default LayoutWrapper
