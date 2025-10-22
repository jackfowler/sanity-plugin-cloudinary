import React, {useCallback, useState} from 'react'
import WidgetInput from './WidgetInput'
import {nanoid} from 'nanoid'
import {ObjectInputProps, PatchEvent, set, MemberField} from 'sanity'
import {CloudinaryAsset} from '../types'
import {useSecrets} from '@sanity/studio-secrets'
import {InsertHandlerParams} from '../types'
import {openMediaSelector} from '../utils'
import SecretsConfigView, {namespace, Secrets} from './SecretsConfigView'
import {TextInput, Stack} from '@sanity/ui'

const CloudinaryInput = (props: ObjectInputProps) => {
  const [showSettings, setShowSettings] = useState(false)
  const {secrets} = useSecrets<Secrets>(namespace)
  const {onChange, schemaType: type} = props
  const value = (props.value as CloudinaryAsset) || undefined

  const handleSelect = useCallback(
    (payload: InsertHandlerParams) => {
      const [asset] = payload.assets
      if (!asset) {
        return
      }

      onChange(
        PatchEvent.from([
          set(
            Object.assign(
              {
                _type: type.name,
                _version: 1,
                ...(value?._key ? {_key: value._key} : {_key: nanoid()}),
              },
              asset
            )
          ),
        ])
      )
    },
    [onChange, type, value?._key]
  )

  const action = secrets
    ? () =>
        openMediaSelector(
          secrets.cloudName,
          secrets.apiKey,
          false, // single selection
          handleSelect,
          value
        )
    : () => setShowSettings(true)

  return (
    <div>
      {showSettings && <SecretsConfigView onClose={() => setShowSettings(false)} />}
      <WidgetInput onSetup={() => setShowSettings(true)} openMediaSelector={action} {...props} />
      <Stack space={3}>
      {props?.members?.map((member) => {
        if ('name' in member && member.name !== 'public_id') {
          return (
            <MemberField 
              member={member}
              renderInput={props.renderInput}
              renderField={props.renderField}
              renderItem={props.renderItem}
              renderPreview={props.renderPreview}
            />
          )
        }
        return null
      })}
      </Stack>
    </div>
  )
}

export default CloudinaryInput
