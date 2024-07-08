// eslint-disable-next-line @typescript-eslint/no-explicit-any
const flattenArray = (input: any[]): number[] => {
  return input.reduce((previousValue, currentValue) => {
    if (typeof currentValue == 'number') {
      return [...previousValue, currentValue]
    } else {
      return [...previousValue, ...flattenArray(currentValue)]
    }
  }, [])
}

describe('flattenArray', () => {
  it('should flatten array of arrays', () => {
    expect(flattenArray([1, [2, [[3, 4], 5], 6]])).toStrictEqual([
      1, 2, 3, 4, 5, 6,
    ])
  })
})
