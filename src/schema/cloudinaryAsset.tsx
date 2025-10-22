/* eslint-disable */
import CloudinaryInput from '../components/CloudinaryInput'
import AssetDiff from '../components/AssetDiff'
import AssetPreview from '../components/AssetPreview'
import { defineType } from 'sanity'
import buildCloudinaryUrl from '../buildCloudinaryUrl'

export const cloudinaryAssetSchema = defineType({
  type: 'object',
  name: 'cloudinary.asset',
  fields: [
    {
      type: 'sizeNote',
      name: 'sizeNote',
    },
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
			name: 'customisePreviewLoop',
			title: 'Customise Preview Loop?',
			type: 'boolean',
			description: 'By default, the player preview loop will play the first 3 seconds of the video. Check this option to customise the preview loop start and end time.',
			hidden: ({ parent }) => !parent?.player
		},
    {
			name: 'previewLoopStartTime',
			title: 'Preview Loop Start Time',
			type: 'string',
			description: 'The start time of the preview loop in seconds. eg. 0:15',
			hidden: ({ parent }) => !parent?.customisePreviewLoop || !parent?.player || !parent?.resource_type
		},
    {
			name: 'previewLoopEndTime',
			title: 'Preview Loop End Time',
			type: 'string',
			description: 'The end time of the preview loop in minutes. eg. 0:30',
			hidden: ({ parent }) => !parent?.customisePreviewLoop || !parent?.player || !parent?.resource_type
		},
    {
			name: 'note2',
			type: 'note',
			description: 'You can also use decimal seconds for more control. eg. 0:15.25',
			options: {
				tone: 'caution'
			},
			hidden: ({ parent }) => !parent?.customisePreviewLoop || !parent?.player || !parent?.resource_type
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
    prepare({url, resource_type, type, public_id}) {
      return {
        title: url,
        media: <img src={buildCloudinaryUrl({resource_type, type, public_id})}/>
      }
    },
  },
})
