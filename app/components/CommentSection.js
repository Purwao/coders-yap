"use client"
import Giscus from '@giscus/react'
import React from 'react'

function CommentSection() {
  return (
    <div>
        <div className="giscus"></div>
 <Giscus
      id="comments"
      repo="Purwao/coders-yap"
      repoId="R_kgDOPA2isQ"
      category="Blog Comment"            // Optional, but good for clarity
      categoryId="DIC_kwDOPA2isc4CsYve"
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme="dark_tritanopia"
      lang="en"
      loading="lazy"
      crossorigin="anonymous"
    />
    </div>
  )
}

export default CommentSection