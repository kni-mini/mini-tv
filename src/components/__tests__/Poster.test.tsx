/// <reference types="@testing-library/jest-dom" />

import { render, screen } from '@testing-library/react'
import Poster from '../Poster'

// …rest of your tests…




describe('Poster component', () => {
  it('renders a Next/Image (→ <img>) for type="image"', () => {
    render(<Poster type="image" src="/foo.jpg" alt="foo image" />)
    const img = screen.getByAltText('foo image')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/foo.jpg')
  })

  it('renders a plain <img> for type="gif" with lazy loading and loop support', () => {
    render(
      <Poster
        type="gif"
        src="/fun.gif"
        alt="fun gif"
        loop
      />
    )
    const gif = screen.getByAltText('fun gif')
    expect(gif).toBeInTheDocument()
    expect(gif).toHaveAttribute('src', '/fun.gif')
    expect(gif).toHaveAttribute('loading', 'lazy')
  })

  it('renders a <video> for type="video" with the correct attributes', () => {
    render(
      <Poster
        type="video"
        src="/clip.mp4"
        autoplay
        loop
        muted
      />
    )

    const video = screen.getByTestId('poster-video') as HTMLVideoElement
    expect(video).toBeInTheDocument()
    expect(video).toHaveAttribute('src', '/clip.mp4')
    // boolean attributes appear as an empty string when present
    expect(video).toHaveAttribute('autoPlay')
    expect(video).toHaveAttribute('loop')
    expect(video.muted).toBe(true)
  })
})
