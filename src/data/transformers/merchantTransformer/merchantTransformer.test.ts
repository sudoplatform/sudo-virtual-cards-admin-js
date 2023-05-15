import { MerchantTransformer } from './merchantTransformer'
import { Merchant as MerchantEntity } from '../../../entities/merchant'
import { Merchant as MerchantGraphQL } from '../../../gen/graphqlTypes'

const id = 'mock-id'
const mcc = 'mock-mcc'
const country = 'australia'
const city = 'gold coast'
const state = 'QLD'
const postalCode = '4217'

export const defaultMerchantEntity: MerchantEntity = {
  id,
  mcc,
  country,
  city,
  state,
  postalCode,
}

export const defaultMerchantGraphQL: MerchantGraphQL = {
  __typename: 'Merchant',
  id,
  mcc,
  country,
  city,
  state,
  postalCode,
}

describe('MerchantTransformer tests', () => {
  it('should transform from entity to graphql', () => {
    expect(MerchantTransformer.toGraphQL(defaultMerchantEntity)).toEqual(
      defaultMerchantGraphQL,
    )
  })

  it('should transform from graphql to entity', () => {
    expect(MerchantTransformer.toEntity(defaultMerchantGraphQL)).toEqual(
      defaultMerchantEntity,
    )
  })
})
