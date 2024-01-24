import { CSSProperties, Fragment, HTMLProps } from 'react'

type TTextMatchHighlight = {
  children: string
  highlightText: string
  className?: HTMLProps<HTMLElement>['className']
  style?: CSSProperties
}

export function TextMatchHighlight({
  children,
  highlightText,
  style,
  className,
}: TTextMatchHighlight) {

  /** Safe guards */
  if (!children) return null

  if (!highlightText) return <>{children}</>

  /** Happy path */
  const textFragments = children.split(new RegExp(`(${highlightText})`, 'gi'))

  return (
    <>
      {textFragments.map((textFragment, idx) => {

        /** Return styled span element for highlighted text fragments */
        if (textFragment.toLowerCase() === highlightText.toLowerCase()) {
          return (
            <span key={idx} className={className} style={style}>
              {textFragment}
            </span>
          )
        }

        /** Return pure text node if it doesn't match highlightText prop */
        return <Fragment key={idx}>{textFragment}</Fragment>
      })}
    </>
  )
}