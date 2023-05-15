import { MarkupTransformer } from '../markupTransformer'
import { Markup as MarkupEntity } from '../../../entities/markup'
import { Markup as MarkupGraphQL } from '../../../gen/graphqlTypes'

const percent = 1
const flat = 2
const minCharge = 0.5

export const defaultMarkupEntity: MarkupEntity = {
  percent,
  flat,
  minCharge,
}

export const defaultMarkupGraphQL: MarkupGraphQL = {
  __typename: 'Markup',
  percent: `${percent}`,
  flat: `${flat}`,
  minCharge: `${minCharge}`,
}

describe('MarkupTransformer tests', () => {
  it('should transform from entity to graphql', () => {
    expect(MarkupTransformer.toGraphQL(defaultMarkupEntity)).toEqual(
      defaultMarkupGraphQL,
    )
  })

  it('should transform from graphql to entity', () => {
    expect(MarkupTransformer.toEntity(defaultMarkupGraphQL)).toEqual(
      defaultMarkupEntity,
    )
  })
})
