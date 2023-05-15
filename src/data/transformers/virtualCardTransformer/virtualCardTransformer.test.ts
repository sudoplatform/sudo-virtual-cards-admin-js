import { VirtualCardTransformer } from './virtualCardTransformer'
import { VirtualCard as VirtualCardEntity } from '../../../entities/virtualCard'
import { VirtualCard as VirtualCardGraphQL } from '../../../gen/graphqlTypes'
import {
  defaultOwnerEntity,
  defaultOwnerGraphQL,
} from '../ownerTransformer/ownerTransformer.test'
import {
  defaultCardStateEntity,
  defaultCardStateGraphQL,
} from '../cardStateTransformer/cardStateTransformer.test'

const id = 'mock-id'
const owner = 'mock-owner-id'
const version = 1
const algorithm = 'sha256'
const keyId = 'mock-key-id'
const keyRingId = 'mock-keyring-id'
const fundingSourceId = 'mock-funding-source-id'
const currency = 'AUD'
const now = new Date()
const last4 = '1234'

export const defaultVirtualCardEntity: VirtualCardEntity = {
  id,
  version,
  owner,
  createdAt: now,
  updatedAt: now,
  algorithm,
  keyId,
  keyRingId,
  owners: [defaultOwnerEntity],
  fundingSourceId,
  currency,
  state: defaultCardStateEntity,
  activeTo: now,
  cancelledAt: now,
  last4,
}

export const defaultVirtualCardGraphQL: VirtualCardGraphQL = {
  __typename: 'VirtualCard',
  id,
  version,
  owner,
  createdAtEpochMs: now.getTime(),
  updatedAtEpochMs: now.getTime(),
  algorithm,
  keyId,
  keyRingId,
  owners: [defaultOwnerGraphQL],
  fundingSourceId,
  currency,
  state: defaultCardStateGraphQL,
  activeToEpochMs: now.getTime(),
  cancelledAtEpochMs: now.getTime(),
  last4,
}

describe('VirtualCardTransformer tests', () => {
  it('should transform entity to graphql', () => {
    expect(VirtualCardTransformer.toGraphQL(defaultVirtualCardEntity)).toEqual(
      defaultVirtualCardGraphQL,
    )
  })

  it('should transform graphql to entity', () => {
    expect(VirtualCardTransformer.toEntity(defaultVirtualCardGraphQL)).toEqual(
      defaultVirtualCardEntity,
    )
  })
})
