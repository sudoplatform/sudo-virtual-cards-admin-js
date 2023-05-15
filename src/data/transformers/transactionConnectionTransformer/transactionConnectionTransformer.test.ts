import { TransactionConnectionTransformer } from '../transactionConnectionTransformer'
import { TransactionConnection as TransactionConnectionEntity } from '../../../entities/transactionConnection'
import { TransactionConnection as TransactionConnectionGraphQL } from '../../../gen/graphqlTypes'
import {
  defaultTransactionEntity,
  defaultTransactionGraphQL,
} from '../transactionTransformer/transactionTransformer.test'

const nextToken = 'mock-token'

export const defaultTransactionConnectionEntity: TransactionConnectionEntity = {
  items: [defaultTransactionEntity],
  nextToken,
}

export const defaultTransactionConnectionGraphQL: TransactionConnectionGraphQL =
  {
    __typename: 'TransactionConnection',
    items: [defaultTransactionGraphQL],
    nextToken,
  }

describe('TransactionConnectionTransformer tests', () => {
  it('should transform from entity to graphql', () => {
    expect(
      TransactionConnectionTransformer.toGraphQL(
        defaultTransactionConnectionEntity,
      ),
    ).toEqual(defaultTransactionConnectionGraphQL)
  })

  it('should transform from graphql to entity', () => {
    expect(
      TransactionConnectionTransformer.toEntity(
        defaultTransactionConnectionGraphQL,
      ),
    ).toEqual(defaultTransactionConnectionEntity)
  })
})
