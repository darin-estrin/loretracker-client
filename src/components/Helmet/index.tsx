import React from 'react';
import { Helmet } from 'react-helmet'


interface IProps {
  title: string
  canonicalLink?: string
}

const Head:React.FC<IProps> = (props) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{props.title}</title>
      <link rel="canonical" href={props.canonicalLink} />
    </Helmet>
  )
}

Head.defaultProps = {
  canonicalLink: 'https://loretracker.com'
}

export default Head;