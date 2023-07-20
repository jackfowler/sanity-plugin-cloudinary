import React from 'react'
import VideoPlayer from './VideoPlayer'
import {assetUrl, assetUrlOptimised} from '../utils'
import {Flex} from '@sanity/ui'
import {CloudinaryAsset} from '../types'

interface ComponentProps {
  layout?: 'default' | 'block'
  value: CloudinaryAsset | undefined
  controls: boolean
}

const AssetPreview = ({value, layout, controls = false}: ComponentProps) => {
  const url = value && assetUrlOptimised(value)
  if (!value || !url) {
    return null
  }

  switch (value.resource_type) {
    case 'video':
      return (
        <Flex
          align="center"
          style={{
            maxWidth: layout === 'default' ? '80px' : '100%',
          }}
        >
          <VideoPlayer src={url} kind="player" controls={controls} />
        </Flex>
      )
    default:
      return (
        <Flex align="center">
          <img
            alt="preview"
            src={url}
            style={{
              maxWidth: layout === 'default' ? '80px' : '100%',
              height: 'auto',
            }}
          />
        </Flex>
      )
  }
}

export default AssetPreview
