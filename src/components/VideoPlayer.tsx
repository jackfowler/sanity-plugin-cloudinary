import React, {CSSProperties} from 'react'

type PlayerKind = 'player' | 'diff'

export type VideoPlayerProps = {
  src: string
  // eslint-disable-next-line react/no-unused-prop-types
  kind: PlayerKind
  controls: boolean
}

export default function VideoPlayer(props: VideoPlayerProps) {
  const {src, controls} = props

  const style: CSSProperties = {
    width: '100%',
    height: 'auto',
  }

  return (
    <video controls={controls} style={style}>
      <source src={src} type="video/mp4" />
    </video>
  )
}
