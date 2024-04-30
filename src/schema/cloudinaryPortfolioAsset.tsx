/* eslint-disable */
import CloudinaryInput from '../components/CloudinaryInput'
import AssetDiff from '../components/AssetDiff'
import AssetPreview from '../components/AssetPreview'
import { defineType } from 'sanity'
import buildCloudinaryUrl from '../buildCloudinaryUrl'

export const cloudinaryPortfolioAsset = defineType({
  type: 'object',
  name: 'cloudinary.portfolioAsset',
  fields: [
    {
      type: 'sizeNote',
      name: 'sizeNote',
    },
    {
      type: 'string',
      name: 'public_id',
      hidden: true,
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
		{
			name: 'note',
			type: 'note',
			description: 'Looks like your video is longer than 10 seconds, are you sure you don\'t want to show a player?',
			options: {
				tone: 'caution'
			},
			hidden: ({ parent }) => parent?.resource_type !== 'video' || parent?.duration < 10 || parent?.player,
		},
		{
			name: 'player',
			title: 'Show player?',
			type: 'boolean',
			description: 'Use this option if the video is longer than 10 seconds or requires sound. Video player will open in a lightbox.',
			hidden: ({ parent }) => parent?.resource_type !== 'video'
		},
		{
			name: 'showCaption',
			title: 'Caption',
			type: 'boolean',
      hidden: true,
		},
		{
			name: 'caption',
			type: 'string',
			// hidden: ({ parent }) => !parent?.showCaption,
      hidden: true,
		},
    {
			name: 'featured',
			title: 'Featured',
			type: 'boolean',
			description: 'If selected, this asset will be featured on the artists index.',
		},
    { 
      type: 'reference',
      name:'style',
      description: 'Outdated, use styles array below.',
      readOnly: true,
      options: {
        disableNew: true,
      },
      to: [{ type: 'style' }] 
    },
    {
      name: 'styles',
      type: 'object',
      fields: [
        { 
          type: 'reference',
          name:'primary',
          options: {
            disableNew: true,
          },
          to: [{ type: 'style' }] 
        },
        { 
          type: 'reference',
          name:'secondary',
          options: {
            disableNew: true,
          },
          to: [{ type: 'style' }] 
        },
        { 
          type: 'reference',
          name:'tertiary',
          options: {
            disableNew: true,
          },
          to: [{ type: 'style' }] 
        },
      ]
    },
		{
			name: 'link',
			type: 'link',
      description: 'Optional.',
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
      type: 'type',
      public_id: 'public_id',
      featured: 'featured',
    },
    prepare({url, resource_type, type, public_id, featured}) {
      return {
        title: url,
        featured,
        media: <img src={buildCloudinaryUrl({resource_type, type, public_id})}/>
      }
    },
  },
})
