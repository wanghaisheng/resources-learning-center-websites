import { graphql } from 'gatsby'
import React from 'react'
import App from './App'
import PostBody from './PostBody'
import Meta from './Meta'
import { useI18next } from 'gatsby-plugin-react-i18next'
import * as styles from './Page.module.scss'

export const query = graphql`
  query ($id: String!, $language: String!, $translations: [String!]) {
    site: site {
      siteMetadata {
        title
      }
    }
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    post: file(id: { eq: $id }) {
      modifiedTime(locale: "de-DE", formatString: "dddd, D.M.YYYY")
      childMdx {
        fields {
          slug
          locale
        }
        frontmatter {
          title
          intro
        }
      }
    }
    translations: allFile(filter: { id: { in: $translations } }) {
      nodes {
        relativeDirectory
        childMdx {
          fields {
            locale
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
    pages: allFile(filter: { relativeDirectory: {glob: "**/pages/**"}, extension: { eq: "mdx" }, sourceInstanceName: { eq: "content" }, childMdx: { fields: { locale: { eq: $language } } } }) {
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
  }
`
const Page = ({ data, children, pageContext }) => {
  const frontmatter = data.post.childMdx.frontmatter

  return (
    <App
      pages={data.pages.nodes}
      translationData={{ translations: data.translations.nodes, currentLanguage: pageContext.language, currentSlug: data.post.childMdx.fields.slug }}
    >
      <article id="content" className={styles.container}>
        <main>
          <h1 className={styles.title}>{frontmatter.title}</h1>
          <PostBody>{children}</PostBody>
        </main>
      </article>
    </App>
  )
}

export function Head({ data, pageContext }) {
  const frontmatter = data.post.childMdx.frontmatter

  const translationData = { currentLanguage: pageContext.language }

  return <Meta translationData={translationData} title={`${frontmatter.title} – ${data.site.siteMetadata.title}`} description={frontmatter.intro} />
}

export default Page
