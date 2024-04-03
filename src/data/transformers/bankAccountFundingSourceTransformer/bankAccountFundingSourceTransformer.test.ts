/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { BankAccountType as BankAccountTypeEntity } from '../../../entities/bankAccountType'
import { BankAccountType as BankAccountTypeGraphQL } from '../../../gen/graphqlTypes'
import { EntityDataFactory } from '../../../util/data-factory/entity'
import { GraphQLDataFactory } from '../../../util/data-factory/graphQl'
import { BankAccountFundingSourceTransformer } from './bankAccountFundingSourceTransformer'

describe('BankAccountFundingSourceTransformer tests', () => {
  it('should transform from entity to graphql', () => {
    expect(
      BankAccountFundingSourceTransformer.toGraphQL(
        EntityDataFactory.bankAccountFundingSource,
      ),
    ).toEqual(GraphQLDataFactory.bankAccountFundingSource)
  })

  it('should transform from graphql to entity', () => {
    expect(
      BankAccountFundingSourceTransformer.toEntity(
        GraphQLDataFactory.bankAccountFundingSource,
      ),
    ).toEqual(EntityDataFactory.bankAccountFundingSource)
    const graphQlNoUnfundedAmount = {
      ...GraphQLDataFactory.bankAccountFundingSource,
      unfundedAmount: null,
    }

    const entityNoUnfundedAmount = {
      ...EntityDataFactory.bankAccountFundingSource,
      unfundedAmount: undefined,
    }
    expect(
      BankAccountFundingSourceTransformer.toEntity(graphQlNoUnfundedAmount),
    ).toEqual(entityNoUnfundedAmount)
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
