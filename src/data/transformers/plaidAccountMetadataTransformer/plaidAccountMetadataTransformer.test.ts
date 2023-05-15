import { PlaidAccountMetadataTransformer } from './plaidAccountMetadataTransformer'
import { PlaidAccountMetadata as PlaidAccountMetadataGraphQL } from '../../../gen/graphqlTypes'
import { PlaidAccountMetadata as PlaidAccountMetadataEntity } from '../../../entities/plaidAccountMetadata'

const accountId = 'mock-account-id'
const subtype = 'mock-subtype'

export const defaultPlaidAccountMetadataEntity: PlaidAccountMetadataEntity = {
  accountId,
  subtype,
}

export const defaultPlaidAccountMetadataGraphQL: PlaidAccountMetadataGraphQL = {
  __typename: 'PlaidAccountMetadata',
  accountId,
  subtype,
}

describe('PlaidAccountMetadataTransformer tests', () => {
  it('should transform from entity to graphql', () => {
    expect(
      PlaidAccountMetadataTransformer.toGraphQL(
        defaultPlaidAccountMetadataEntity,
      ),
    ).toEqual(defaultPlaidAccountMetadataGraphQL)
  })

  it('should transform from graphql to entity', () => {
    expect(
      PlaidAccountMetadataTransformer.toEntity(
        defaultPlaidAccountMetadataGraphQL,
      ),
    ).toEqual(defaultPlaidAccountMetadataEntity)
  })
})
