import { OwnerTransformer } from '../ownerTransformer'
import { Owner as OwnerEntity } from '../../../entities/owner'
import { Owner as OwnerGraphQL } from '../../../gen/graphqlTypes'

const id = 'mock-owner-id'
const issuer = 'mock-owner-issuer'

export const defaultOwnerEntity: OwnerEntity = {
  id,
  issuer,
}

export const defaultOwnerGraphQL: OwnerGraphQL = {
  __typename: 'Owner',
  id,
  issuer,
}

describe('OwnerTransformer tests', () => {
  it('should transform from entity to graphql', () => {
    expect(OwnerTransformer.toGraphQL(defaultOwnerEntity)).toEqual(
      defaultOwnerGraphQL,
    )
  })

  it('should transform from graphql to entity', () => {
    expect(OwnerTransformer.toEntity(defaultOwnerGraphQL)).toEqual(
      defaultOwnerEntity,
    )
  })
})
