import { describe, expect, it } from 'vitest'
import { en } from './i18n/en'
// student UI strings

describe('i18n', () => {
  it('exposes homepage headline', () => {
    expect(en.home.headline).toContain('Anonymous')
  })
})
