import { graphql, useStaticQuery } from 'gatsby'
import { Link, useTranslation } from 'gatsby-plugin-react-i18next'
import React from 'react'
export default function Footer({ pages }) {
  const data = useStaticQuery(graphql`
    query {
      meta: site {
        buildTime(formatString: "D MMMM Y, HH:mm", locale: "de")
      }
    }
  `)
  const { t } = useTranslation()
  if (!pages) pages = []
  return (
    <footer>
      <nav>
        <ul>
          <li>
            <Link to="/">{t('Home')}</Link>
          </li>
          {pages.map((p) => {
            return (
              <li key={`navitem-${p.id}`}>
                <Link to={`/${p.childMdx.fields.slug}`}>{p.childMdx.frontmatter.title}</Link>
              </li>
            )
          })}
        </ul>
      </nav>
      <p>
        {t('PRIF and the authors')} {new Date().getFullYear()}
      </p>
    </footer>
  )
}
