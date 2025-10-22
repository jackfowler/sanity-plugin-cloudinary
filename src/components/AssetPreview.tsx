/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from 'react'

const AssetPreview = (props: any) => {
  console.log(typeof props?.renderDefault)
  if(!props?.renderDefault) return null
  return (
    <div style={{position: 'relative'}}>
      {props?.featured &&
        <div style={{position: 'absolute', top: '6px', right: '6px', zIndex: 10}}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="11" cy="11" r="11" fill="black"/>
          <path d="M10.0489 4.92705C10.3483 4.00574 11.6517 4.00574 11.9511 4.92705L12.7961 7.52786C12.93 7.93989 13.3139 8.21885 13.7472 8.21885H16.4818C17.4505 8.21885 17.8533 9.45846 17.0696 10.0279L14.8572 11.6353C14.5067 11.8899 14.3601 12.3413 14.494 12.7533L15.339 15.3541C15.6384 16.2754 14.5839 17.0415 13.8002 16.4721L11.5878 14.8647C11.2373 14.6101 10.7627 14.6101 10.4122 14.8647L8.19983 16.4721C7.41612 17.0415 6.36164 16.2754 6.66099 15.3541L7.50604 12.7533C7.63992 12.3413 7.49326 11.8899 7.14277 11.6353L4.93039 10.0279C4.14668 9.45846 4.54945 8.21885 5.51818 8.21885H8.25283C8.68606 8.21885 9.07001 7.93989 9.20389 7.52786L10.0489 4.92705Z" fill="white"/>
          </svg>
        </div>
      }
      {props?.renderDefault(props)}
    </div>
  )
}

export default AssetPreview
