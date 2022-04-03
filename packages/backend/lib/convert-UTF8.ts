import { Iconv } from 'iconv'

export default (body, fromEncoding = 'utf-8') => {
  const ic = new Iconv(fromEncoding, 'iso-8859-1')
  const buf = ic.convert(JSON.stringify(body))
  return JSON.parse(buf.toString('utf-8'))
}
