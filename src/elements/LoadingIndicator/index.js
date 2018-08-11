import './style.less'

export default function LoadingIndicator ({variant = 'flashing'}) {
  return <div className={`dot-${variant}`} />
}
