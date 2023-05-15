import { CreditCardFundingSourceTransformer } from './creditCardFundingSourceTransformer'
import { CardType as CardTypeEntity } from '../../../entities/cardType'
import {
  CreditCardFundingSource as CreditCardFundingSourceGraphQL,
  CardType as CardTypeGraphQL,
} from '../../../gen/graphqlTypes'
import { CreditCardFundingSource as CreditCardFundingSourceEntity } from '../../../entities/creditCardFundingSource'
import {
  defaultFundingSourceStateEntity,
  defaultFundingSourceStateGraphQL,
} from '../fundingSourceStateTransformer/fundingSourceStateTransformer.test'
import { CreditCardNetwork as CreditCardNetworkEntity } from '../../../entities/creditCardNetwork'
import { CreditCardNetwork as CreditCardNetworkGraphQL } from '../../../gen/graphqlTypes'

const id = 'mock-id'
const owner = 'mock-owner-id'
const version = 1
const now = new Date()
const currency = 'AUD'
const last4 = '1234'
const fingerprint = 'mock-fingerprint'

export const defaultCreditCardFundingSourceEntity: CreditCardFundingSourceEntity =
  {
    id,
    owner,
    version,
    createdAt: now,
    updatedAt: now,
    cardType: CardTypeEntity.Debit,
    currency,
    state: defaultFundingSourceStateEntity,
    last4,
    fingerprint,
    network: CreditCardNetworkEntity.MasterCard,
  }

export const defaultCreditCardFundingSourceGraphQL: CreditCardFundingSourceGraphQL =
  {
    __typename: 'CreditCardFundingSource',
    id,
    owner,
    version,
    createdAtEpochMs: now.getTime(),
    updatedAtEpochMs: now.getTime(),
    cardType: CardTypeGraphQL.Debit,
    currency,
    state: defaultFundingSourceStateGraphQL,
    last4,
    fingerprint,
    network: CreditCardNetworkGraphQL.Mastercard,
  }

describe('CreditCardFundingSourceTransformer tests', () => {
  it('should transform from entity to graphql', () => {
    expect(
      CreditCardFundingSourceTransformer.toGraphQL(
        defaultCreditCardFundingSourceEntity,
      ),
    ).toEqual(defaultCreditCardFundingSourceGraphQL)
  })

  it('should transform from graphql to entity', () => {
    expect(
      CreditCardFundingSourceTransformer.toEntity(
        defaultCreditCardFundingSourceGraphQL,
      ),
    ).toEqual(defaultCreditCardFundingSourceEntity)
  })

  it.each`
    entity                    | graphQL
    ${CardTypeEntity.Credit}  | ${CardTypeGraphQL.Credit}
    ${CardTypeEntity.Debit}   | ${CardTypeGraphQL.Debit}
    ${CardTypeEntity.Other}   | ${CardTypeGraphQL.Other}
    ${CardTypeEntity.Prepaid} | ${CardTypeGraphQL.Prepaid}
  `(
    'should transform entity ($entity) to graphQL ($graphQL)',
    ({ entity, graphQL }) => {
      expect(
        CreditCardFundingSourceTransformer['toGraphQLCardType'](entity),
      ).toStrictEqual(graphQL)
    },
  )

  it.each`
    graphQL                    | entity
    ${CardTypeGraphQL.Credit}  | ${CardTypeEntity.Credit}
    ${CardTypeGraphQL.Debit}   | ${CardTypeEntity.Debit}
    ${CardTypeGraphQL.Other}   | ${CardTypeEntity.Other}
    ${CardTypeGraphQL.Prepaid} | ${CardTypeEntity.Prepaid}
  `(
    'should transform graphQL ($graphQL) to entity ($entity)',
    ({ graphQL, entity }) => {
      expect(
        CreditCardFundingSourceTransformer['toEntityCardType'](graphQL),
      ).toStrictEqual(entity)
    },
  )
})
