import React from 'react'
import LanguageSwitcher from './LanguageSwitcher'
import Footer from './Footer'
import SkipToContent from './SkipToContent'
import SiteHeader from './SiteHeader'
import './global.scss'

function App({ translationData, language, pages, children }) {
  return (
    <>
      <SkipToContent />
      <SiteHeader>
        <LanguageSwitcher translationData={translationData} />
      </SiteHeader>
      {children}
      <Footer pages={pages} language={language} />
    </>
  )
}

export default App
