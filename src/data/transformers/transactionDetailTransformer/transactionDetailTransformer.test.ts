import { TransactionDetailTransformer } from './transactionDetailTransformer'
import { TransactionDetail as TransactionDetailEntity } from '../../../entities/transactionDetail'
import { TransactionDetail as TransactionDetailGraphQL } from '../../../gen/graphqlTypes'
import {
  defaultMarkupEntity,
  defaultMarkupGraphQL,
} from '../markupTransformer/markupTransformer.test'
import {
  defaultCreditCardNetworkEntity,
  defaultCreditCardNetworkGraphQL,
} from '../creditCardNetworkTransformer/creditCardNetworkTransformer.test'

const amount = {
  currency: 'AUD',
  amount: 100,
}
const fundingSourceId = 'mock-funding-source-id'
const fundingSourceLast4 = '1234'

export const defaultTransactionDetailEntity: TransactionDetailEntity = {
  virtualCardAmount: amount,
  markup: defaultMarkupEntity,
  fundingSourceId,
  serviceFee: amount,
  fundingSourceAmount: amount,
  fundingSourceLast4,
  fundingSourceNetwork: defaultCreditCardNetworkEntity,
}

export const defaulTransactionDetailGraphQL: TransactionDetailGraphQL = {
  __typename: 'TransactionDetail',
  virtualCardAmount: amount,
  markup: defaultMarkupGraphQL,
  fundingSourceId,
  serviceFee: amount,
  fundingSourceAmount: amount,
  fundingSourceLast4,
  fundingSourceNetwork: defaultCreditCardNetworkGraphQL,
}

describe('TransactionDetailTransformer tests', () => {
  it('should transform from entity to graphql', () => {
    expect(
      TransactionDetailTransformer.toGraphQL(defaultTransactionDetailEntity),
    ).toEqual(defaulTransactionDetailGraphQL)
  })

  it('should transform from graphql to entity', () => {
    expect(
      TransactionDetailTransformer.toEntity(defaulTransactionDetailGraphQL),
    ).toEqual(defaultTransactionDetailEntity)
  })
})
