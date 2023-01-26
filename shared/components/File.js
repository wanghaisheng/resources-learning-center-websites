import React from 'react'
import DownloadIcon from '../assets/download.svg'

export default function File({ styles, fileNode, title }) {
  if (!styles) styles = {}
  return (
    <a download href={fileNode.publicURL} className={styles.container}>
      <div>
        <span>{title || fileNode.base}</span>
        <p className={styles.meta}>
          <span className={styles.type}>{fileNode.extension}</span>
          <span>{fileNode.prettySize.replace('.', ',')}</span>
        </p>
      </div>
      <DownloadIcon />
    </a>
  )
}
