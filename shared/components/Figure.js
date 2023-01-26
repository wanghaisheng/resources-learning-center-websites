import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'

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
      {imageEl}
      <div className={styles.captions}>
        {caption && <figcaption>{caption}</figcaption>}
        {credit && (
          <figcaption className={styles.credit}>
            <>{credit}</>
            {license && (
              <>
                {','} <a href={license.url}>{license.title}</a>
              </>
            )}
          </figcaption>
        )}
      </div>
    </figure>
  )
}
