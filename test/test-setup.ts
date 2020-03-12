import '@testing-library/jest-dom/extend-expect'

beforeEach(() => {
  if (typeof window !== 'undefined') {
    // install matchMedia polyfill for jsdom environments
    require('matchmedia-polyfill')
    require('matchmedia-polyfill/matchMedia.addListener')
  }
})
