/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CardType as CardTypeEntity } from '../../../entities/cardType'
import { CardType as CardTypeGraphQL } from '../../../gen/graphqlTypes'
import { EntityDataFactory } from '../../../util/data-factory/entity'
import { GraphQLDataFactory } from '../../../util/data-factory/graphQl'
import { CreditCardFundingSourceTransformer } from './creditCardFundingSourceTransformer'

describe('CreditCardFundingSourceTransformer tests', () => {
  it('should transform from entity to graphql', () => {
    expect(
      CreditCardFundingSourceTransformer.toGraphQL(
        EntityDataFactory.creditCardFundingSource,
      ),
    ).toEqual(GraphQLDataFactory.creditCardFundingSource)
  })

  it('should transform from graphql to entity', () => {
    expect(
      CreditCardFundingSourceTransformer.toEntity(
        GraphQLDataFactory.creditCardFundingSource,
      ),
    ).toEqual(EntityDataFactory.creditCardFundingSource)
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
