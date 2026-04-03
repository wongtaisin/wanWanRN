import drinkSvg from './drink'
import eatSvg from './eat'
import svgComponents from './index'
import playSvg from './play'

describe('svg component registry', () => {
  it('exports the expected svg component mappings', () => {
    expect(svgComponents.drinkSvg).toBe(drinkSvg)
    expect(svgComponents.eatSvg).toBe(eatSvg)
    expect(svgComponents.playSvg).toBe(playSvg)
  })

  it('only exposes the assigned svg components', () => {
    expect(Object.keys(svgComponents).sort()).toEqual(['drinkSvg', 'foodSvg', 'playSvg'])
    expect(svgComponents).not.toHaveProperty('otherSvg')
    expect(svgComponents).not.toHaveProperty('vipSvg')
  })
})
