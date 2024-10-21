import { hex2contrast, hex2rgb } from '@csstools/convert-colors'
import { guid } from '../../utils/guid'
import { addHash } from '../../utils/add_hash'

export const renderSimpleIcon = ({
  aProps = {},
  bgHex = '#fff',
  fallbackHex = '#000',
  icon,
  imgProps = {},
  minContrastRatio = 1,
  size = 42,
}) => {
  const originalHex = addHash(icon.hex)
  const bgHexHash = addHash(bgHex)
  const fallbackHexHash = addHash(fallbackHex)
  const isAccessibleColor = hex2contrast(bgHexHash, originalHex) > minContrastRatio
  const rgb = isAccessibleColor ? hex2rgb(originalHex) : hex2rgb(fallbackHexHash)
  const [r, g, b] = rgb.map((percent) => Math.round((percent / 100) * 255))
  const imgSrc = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" style="fill: rgb(${r}, ${g}, ${b});" viewBox="0 0 24 24" height="${size}px" width="${size}px"> <title>${icon.title}</title> <path d="${icon.path}"></path> </svg>`

  const a = {
    key: guid(),
    title: icon.title,
    style: { cursor: 'pointer' },
    ...aProps,
  }

  const i = {
    height: size,
    width: size,
    alt: icon.title,
    src: imgSrc,
    ...imgProps,
  }

  return (
    <a {...a}>
      <img alt={""} {...i} />
    </a>
  )
}

export default renderSimpleIcon;
