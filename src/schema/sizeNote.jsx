import React from 'react'

export default {
  name: 'sizeNote',
  type: 'note',
  description: (
    <>
      Suggested image width 4000px. Suggested video width 1920px.{' '}
      <a
        target="_blank"
        href="https://jackywinter.notion.site/Website-Asset-Specs-5186266eff6b44ba84b9000136026921"
      >
        More information
      </a>
      .
    </>
  ),
  hidden: ({parent}) => parent?.resource_type !== undefined,
}