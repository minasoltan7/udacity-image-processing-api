import functions from '../utilities/resizeFunctions'

const { imageExist } = functions

describe('Testing our utilities functions', () => {
  it('Expecting imageExist("fjord") to be true )', () => {
    expect(imageExist('fjord')).toBe(true)
  })
  it('Expecting imageExist("notExistingImage") to be false )', () => {
    expect(imageExist('notExistingImage')).toBe(false)
  })
})
