import React from 'react'
import {DiffFromTo} from 'sanity'
import VideoPlayer from './VideoPlayer'
import {assetUrl} from '../utils'
import {CloudinaryAsset} from '../types'

type Props = {
  value: CloudinaryAsset | undefined
}

const CloudinaryDiffPreview = ({value}: Props) => {
  if (!value) {
    return null
  }

  const url = assetUrl(value)

  if (value.resource_type === 'video' && url) {
    return (
      <section
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        <VideoPlayer src={url} kind="diff" controls={true} />
      </section>
    )
  }

  return <img alt="preview" src={url} style={{maxWidth: '100%', height: 'auto'}} />
}

type DiffProps = {
  diff: any
  schemaType: any
}

const AssetDiff = ({diff, schemaType}: DiffProps) => {
  return <DiffFromTo diff={diff} schemaType={schemaType} previewComponent={CloudinaryDiffPreview} />
}

export default AssetDiff
