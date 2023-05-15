// id: graphql.id,
//       transactionResponse: TransactionResponseTransformer.toEntity(graphql.transactionResponse),
//       last4: graphql.last4,
//       transactions: TransactionConnectionTransformer.toEntity(
//         graphql.transactions,
//       ),

import { TransactionResponseTransformer } from './transactionResponseTransformer'
import { TransactionResponse as TransactionResponseEntity } from '../../../entities/transactionResponse'
import { TransactionResponse as TransactionResponseGraphQL } from '../../../gen/graphqlTypes'
import {
  defaultCardStateEntity,
  defaultCardStateGraphQL,
} from '../cardStateTransformer/cardStateTransformer.test'
import {
  defaultTransactionConnectionEntity,
  defaultTransactionConnectionGraphQL,
} from '../transactionConnectionTransformer/transactionConnectionTransformer.test'

const id = 'mock-id'
const last4 = '1234'

export const defaultTransactionResponseEntity: TransactionResponseEntity = {
  id,
  cardState: defaultCardStateEntity,
  last4,
  transactions: defaultTransactionConnectionEntity,
}

export const defaultTransactionResponseGraphQL: TransactionResponseGraphQL = {
  __typename: 'TransactionResponse',
  id,
  cardState: defaultCardStateGraphQL,
  last4,
  transactions: defaultTransactionConnectionGraphQL,
}

describe('TransactionResponseTransformer tests', () => {
  it('should transform from entity to graphql', () => {
    expect(
      TransactionResponseTransformer.toGraphQL(
        defaultTransactionResponseEntity,
      ),
    ).toEqual(defaultTransactionResponseGraphQL)
  })

  it('should transform from graphql to entity', () => {
    expect(
      TransactionResponseTransformer.toEntity(
        defaultTransactionResponseGraphQL,
      ),
    ).toEqual(defaultTransactionResponseEntity)
  })
})
