/*
 * Copyright © 2026 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { FundingSourceTypeTransformer } from './fundingSourceTypeTransformer'
import { FundingSourceType as FundingSourceTypeEntity } from '../../../entities/fundingSourceType'
import { FundingSourceType as FundingSourceTypeGraphQL } from '../../../gen/graphqlTypes'

describe('FundingSourceTypeTransformer tests', () => {
  it.each`
    entity                                 | graphQL
    ${FundingSourceTypeEntity.CreditCard}  | ${FundingSourceTypeGraphQL.CreditCard}
    ${FundingSourceTypeEntity.BankAccount} | ${FundingSourceTypeGraphQL.BankAccount}
  `(
    'should transform entity ($entity) to graphQL ($graphQL)',
    ({ entity, graphQL }) => {
      expect(FundingSourceTypeTransformer.toGraphQL(entity)).toStrictEqual(
        graphQL,
      )
    },
  )

  it.each`
    graphQL                                 | entity
    ${FundingSourceTypeGraphQL.CreditCard}  | ${FundingSourceTypeEntity.CreditCard}
    ${FundingSourceTypeGraphQL.BankAccount} | ${FundingSourceTypeEntity.BankAccount}
  `(
    'should transform graphQL ($graphQL) to entity ($entity)',
    ({ graphQL, entity }) => {
      expect(FundingSourceTypeTransformer.toEntity(graphQL)).toStrictEqual(
        entity,
      )
    },
  )
})
