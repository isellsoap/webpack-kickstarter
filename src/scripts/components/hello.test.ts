import { hello } from './hello'

describe('hello', () => {
  it('should return Hello World by default', () => {
    expect(hello()).toEqual('Hello World')
  })

  it('should return Hello followed by a custom string', () => {
    expect(hello('you!')).toEqual('Hello you!')
  })
})
