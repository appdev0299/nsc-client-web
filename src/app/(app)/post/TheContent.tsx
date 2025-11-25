import React from 'react'

const TheContent = ({ content }: { content: string }) => {
  return <div dangerouslySetInnerHTML={{ __html: content }} />
}

export default TheContent
