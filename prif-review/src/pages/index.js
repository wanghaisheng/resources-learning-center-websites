import React from 'react'
import { graphql } from 'gatsby'
import App from '../components/App'
import Meta from '../components/Meta'
import SkipToContent from '../components/SkipToContent'
import { Link, useTranslation } from 'gatsby-plugin-react-i18next'
import * as styles from './index.module.scss'

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    pages: allFile(filter: { extension: { eq: "mdx" }, sourceInstanceName: { eq: "pages" }, childMdx: { fields: { locale: { eq: $language } } } }) {
      nodes {
        id
        childMdx {
          fields {
            slug
          }
          frontmatter {
            title
            order
          }
        }
      }
    }
    reports: allFile(
      filter: {
        extension: { eq: "mdx" }
        sourceInstanceName: { eq: "reports" }
        name: { glob: "index.*" }
        childMdx: { fields: { locale: { eq: $language } } }
      }
      sort: { childMdx: { frontmatter: { order: ASC } } }
    ) {
      nodes {
        id
        relativeDirectory
        childMdx {
          fields {
            slug
            locale
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`

const Index = ({ data, pageContext }) => {
  const { t } = useTranslation()
  return (
    <App pages={data.pages.nodes} translationData={{ currentLanguage: pageContext.language }}>
      <SkipToContent />
      <main className={styles.container}>
        <h1>{t('PRIF Reports')}</h1>
        {data.reports.nodes.map((report) => {
          return (
            <li>
              <Link to={`/${report.relativeDirectory}`}>{report.childMdx.frontmatter.title}</Link>
            </li>
          )
        })}
      </main>
    </App>
  )
}

export default Index
export const Head = ({ data, pageContext }) => (
  <>
    <html lang={pageContext.language} />
    <Meta />
  </>
)
