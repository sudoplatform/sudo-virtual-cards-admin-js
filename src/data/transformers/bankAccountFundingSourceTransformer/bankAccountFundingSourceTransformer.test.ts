import { BankAccountFundingSourceTransformer } from './bankAccountFundingSourceTransformer'
import { BankAccountType as BankAccountTypeEntity } from '../../../entities/bankAccountType'
import {
  BankAccountFundingSource as BankAccountFundingSourceGraphQL,
  BankAccountType as BankAccountTypeGraphQL,
} from '../../../gen/graphqlTypes'
import { BankAccountFundingSource as BankAccountFundingSourceEntity } from '../../../entities/bankAccountFundingSource'
import {
  defaultSignedAuthorizationTextEntity,
  defaultSignedAuthorizationTextGraphQL,
} from '../signedAuthorizationTextTransformer/signedAuthorizationTextTransformer.test'
import {
  defaultFundingSourceStateEntity,
  defaultFundingSourceStateGraphQL,
} from '../fundingSourceStateTransformer/fundingSourceStateTransformer.test'

const id = 'mock-id'
const owner = 'mock-owner-id'
const version = 1
const now = new Date()
const currency = 'AUD'
const last4 = '1234'
const fingerprint = 'mock-fingerprint'

export const defaultBankAccountFundingSourceEntity: BankAccountFundingSourceEntity =
  {
    id,
    owner,
    version,
    createdAt: now,
    updatedAt: now,
    bankAccountType: BankAccountTypeEntity.Savings,
    currency,
    state: defaultFundingSourceStateEntity,
    last4,
    fingerprint,
    authorization: defaultSignedAuthorizationTextEntity,
  }

export const defaultBankAccountFundingSourceGraphQL: BankAccountFundingSourceGraphQL =
  {
    __typename: 'BankAccountFundingSource',
    id,
    owner,
    version,
    createdAtEpochMs: now.getTime(),
    updatedAtEpochMs: now.getTime(),
    bankAccountType: BankAccountTypeGraphQL.Savings,
    currency,
    state: defaultFundingSourceStateGraphQL,
    last4,
    fingerprint,
    authorization: defaultSignedAuthorizationTextGraphQL,
  }

describe('BankAccountFundingSourceTransformer tests', () => {
  it('should transform from entity to graphql', () => {
    expect(
      BankAccountFundingSourceTransformer.toGraphQL(
        defaultBankAccountFundingSourceEntity,
      ),
    ).toEqual(defaultBankAccountFundingSourceGraphQL)
  })

  it('should transform from graphql to entity', () => {
    expect(
      BankAccountFundingSourceTransformer.toEntity(
        defaultBankAccountFundingSourceGraphQL,
      ),
    ).toEqual(defaultBankAccountFundingSourceEntity)
  })

  it.each`
    entity                            | graphQL
    ${BankAccountTypeEntity.Checking} | ${BankAccountTypeGraphQL.Checking}
    ${BankAccountTypeEntity.Other}    | ${BankAccountTypeGraphQL.Other}
    ${BankAccountTypeEntity.Savings}  | ${BankAccountTypeGraphQL.Savings}
  `(
    'should transform entity ($entity) to graphQL ($graphQL)',
    ({ entity, graphQL }) => {
      expect(
        BankAccountFundingSourceTransformer['toGraphQLBankAccountType'](entity),
      ).toStrictEqual(graphQL)
    },
  )

  it.each`
    graphQL                            | entity
    ${BankAccountTypeGraphQL.Checking} | ${BankAccountTypeEntity.Checking}
    ${BankAccountTypeGraphQL.Other}    | ${BankAccountTypeEntity.Other}
    ${BankAccountTypeGraphQL.Savings}  | ${BankAccountTypeEntity.Savings}
  `(
    'should transform graphQL ($graphQL) to entity ($entity)',
    ({ graphQL, entity }) => {
      expect(
        BankAccountFundingSourceTransformer['toEntityBankAccountType'](graphQL),
      ).toStrictEqual(entity)
    },
  )
})
