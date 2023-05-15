import { TransactionTransformer } from './transactionTransformer'
import { Transaction as TransactionEntity } from '../../../entities/transaction'
import { Transaction as TransactionGraphQL } from '../../../gen/graphqlTypes'
import {
  defaultMerchantEntity,
  defaultMerchantGraphQL,
} from '../merchantTransformer/merchantTransformer.test'
import { TransactionType as TransactionTypeEntity } from '../../../entities/transactionType'
import { TransactionType as TransactionTypeGraphQL } from '../../../gen/graphqlTypes'
import {
  defaultTransactionDetailEntity,
  defaulTransactionDetailGraphQL,
} from '../transactionDetailTransformer/transactionDetailTransformer.test'

const id = 'mock-id'
const owner = 'mock-owner-id'
const now = new Date()
const declineReason = 'mock-decline-reason'
const userCurrencyAmount = {
  currency: 'AUD',
  amount: 100,
}

export const defaultTransactionEntity: TransactionEntity = {
  id,
  owner,
  createdAt: now,
  updatedAt: now,
  type: TransactionTypeEntity.Pending,
  transactedAt: now,
  billedAmount: userCurrencyAmount,
  transactedAmount: userCurrencyAmount,
  merchant: defaultMerchantEntity,
  declineReason,
  detail: [defaultTransactionDetailEntity],
}

export const defaultTransactionGraphQL: TransactionGraphQL = {
  __typename: 'Transaction',
  id,
  owner,
  createdAtEpochMs: now.getTime(),
  updatedAtEpochMs: now.getTime(),
  type: TransactionTypeGraphQL.Pending,
  transactedAtEpochMs: now.getTime().toString(),
  billedAmount: userCurrencyAmount,
  transactedAmount: userCurrencyAmount,
  merchant: defaultMerchantGraphQL,
  declineReason,
  detail: [defaulTransactionDetailGraphQL],
}

describe('TransactionTransformer tests', () => {
  it('should transform from entity to graphql', () => {
    expect(TransactionTransformer.toGraphQL(defaultTransactionEntity)).toEqual(
      defaultTransactionGraphQL,
    )
  })

  it('should transform from graphql to entity', () => {
    expect(TransactionTransformer.toEntity(defaultTransactionGraphQL)).toEqual(
      defaultTransactionEntity,
    )
  })

  it.each`
    entity                              | graphQL
    ${TransactionTypeEntity.Chargeback} | ${TransactionTypeGraphQL.Chargeback}
    ${TransactionTypeEntity.Complete}   | ${TransactionTypeGraphQL.Complete}
    ${TransactionTypeEntity.Decline}    | ${TransactionTypeGraphQL.Decline}
    ${TransactionTypeEntity.Pending}    | ${TransactionTypeGraphQL.Pending}
    ${TransactionTypeEntity.Refund}     | ${TransactionTypeGraphQL.Refund}
    ${TransactionTypeEntity.Reversal}   | ${TransactionTypeGraphQL.Reversal}
  `(
    'should transform entity ($entity) to graphQL ($graphQL)',
    ({ entity, graphQL }) => {
      expect(
        TransactionTransformer['toGraphQLTransactionType'](entity),
      ).toStrictEqual(graphQL)
    },
  )

  it.each`
    graphQL                              | entity
    ${TransactionTypeGraphQL.Chargeback} | ${TransactionTypeEntity.Chargeback}
    ${TransactionTypeGraphQL.Complete}   | ${TransactionTypeEntity.Complete}
    ${TransactionTypeGraphQL.Decline}    | ${TransactionTypeEntity.Decline}
    ${TransactionTypeGraphQL.Pending}    | ${TransactionTypeEntity.Pending}
    ${TransactionTypeGraphQL.Refund}     | ${TransactionTypeEntity.Refund}
    ${TransactionTypeGraphQL.Reversal}   | ${TransactionTypeEntity.Reversal}
  `(
    'should transform graphQL ($graphQL) to entity ($entity)',
    ({ graphQL, entity }) => {
      expect(
        TransactionTransformer['toEntityTransactionType'](graphQL),
      ).toStrictEqual(entity)
    },
  )
})
