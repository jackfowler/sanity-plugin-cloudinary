import React from 'react'

export default {
  name: 'sizeNote',
  type: 'note',
  description: (
    <>
      Suggested image width 3000px. Suggested video width 1920px.{' '}
      <a
        target="_blank"
        href="https://formwork.notion.site/Website-Asset-Specs-3478e27896e4456b9d4976ff8b06ffbf"
      >
        More information
      </a>
      .
    </>
  ),
  hidden: ({parent}) => parent?.resource_type !== undefined,
}