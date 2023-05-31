/* eslint-disable */
import CloudinaryInput from '../components/CloudinaryInput'
import AssetDiff from '../components/AssetDiff'
import AssetPreview from '../components/AssetPreview'
import {defineType} from 'sanity'

export const cloudinaryAssetSchema = defineType({
  type: 'object',
  name: 'cloudinary.asset',
  fields: [
    {
      type: 'string',
      name: 'public_id',
      readOnly: true,
    },
    {
      type: 'string',
      name: 'resource_type',
      hidden: true,
      // "image", "?"
    },
    {
      type: 'string',
      name: 'type',
      hidden: true,
      // "upload", "?"
    },
    {
      type: 'string',
      name: 'format',
      hidden: true,
      // "jpg"
    },
    {
      type: 'number',
      name: 'version',
      hidden: true,
    },
    {
      type: 'url',
      name: 'url',
      hidden: true,
    },
    {
      type: 'url',
      name: 'secure_url',
      hidden: true,
    },
    {
      type: 'number',
      name: 'width',
      hidden: true,
    },
    {
      type: 'number',
      name: 'height',
      hidden: true,
    },
    {
      type: 'number',
      name: 'bytes',
      hidden: true,
    },
    {
      type: 'number',
      name: 'duration',
      hidden: true,
      // can be null
    },
    {
      type: 'array',
      name: 'tags',
      of: [{type: 'string'}],
      hidden: true,
    },
    {
      type: 'datetime',
      name: 'created_at',
      hidden: true,
    },
    {
      type: 'array',
      name: 'derived',
      of: [{type: 'cloudinary.assetDerived'}],
      hidden: true,
    },
    {
      type: 'string',
      name: 'access_mode',
      hidden: true,
    },
    {
      type: 'cloudinary.assetContext',
      name: 'context',
      hidden: true,
    },
    // metadata array of unknown content
  ],
  ...({
    components: {
      input: CloudinaryInput,
      diff: AssetDiff,
      preview: AssetPreview,
    },
  } as {}), //TODO revert this change when rc.1 is released
  preview: {
    select: {
      url: 'url',
      resource_type: 'resource_type',
      derived: 'derived.0.url',
    },
    prepare({url, derived, resource_type}) {
      return {
        title: url,
        value: {
          title: url,
          resource_type,
          url: derived || url,
        },
      }
    },
  },
})
