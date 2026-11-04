import { ImageResponse } from 'next/og'

export const alt = 'Zywel Fankam | Full Stack Developer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 80,
          background: '#0a0a0a',
          color: '#ededed',
        }}
      >
        <div style={{ display: 'flex', fontSize: 84, fontWeight: 700 }}>
          Zywel<span style={{ color: '#2DD4BF' }}>.</span>
        </div>
        <div style={{ fontSize: 44, marginTop: 24, color: '#2DD4BF' }}>Full Stack Developer</div>
        <div style={{ fontSize: 30, marginTop: 24, color: '#a1a1aa' }}>React · Next.js · TypeScript · Django</div>
      </div>
    ),
    { ...size }
  )
}
