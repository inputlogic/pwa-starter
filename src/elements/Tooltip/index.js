import W from 'wasmuth'

import './style.less'

const getPos = props => W.pipe(
  W.pick(['up', 'right', 'down', 'left']),
  W.filter(x => !!x),
  W.toPairs,
  W.path('0.0')
)(props)

export default function Tooltip ({
  className = '',
  text = 'I am default text',
  length = 'medium',
  children,
  ...props
}) {
  return <div
    className={`tooltip ${className}`}
    data-tooltip={text}
    data-tooltip-pos={getPos(props)}
    data-tooltip-length={length}
    {...props}
  >
    {children}
  </div>
}
