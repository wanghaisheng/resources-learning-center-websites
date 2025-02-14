import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import MarkdownRenderer from 'react-markdown-renderer'

export default function Figure({ styles, image, license, caption, credit, size, alt, src }) {
  if (!styles) styles = {}

  let imageEl = <>Image not found ({src})</>

  if (image) {
    if (image.extension === 'svg') {
      imageEl = <img className={styles.image} alt={alt} src={image.publicURL} />
    } else {
      imageEl = <GatsbyImage className={styles.image} image={getImage(image)} alt={alt} />
    }
  }

  return (
    <figure className={`${styles.container} ${styles[size]}`}>
      <div className={styles.inner}>
        {imageEl}
        {(credit || caption) && (
          <figcaption className={styles.captions}>
            <span className={styles.caption}>{caption && <MarkdownRenderer markdown={caption} />}</span>
            {credit && (
              <span className={styles.credit}>
                <>{credit}</>
                {license && (
                  <>
                    {','} {license.url ? <a href={license.url}>{license.title}</a> : <>{license.title}</>}.
                  </>
                )}
              </span>
            )}
          </figcaption>
        )}
      </div>
    </figure>
  )
}
