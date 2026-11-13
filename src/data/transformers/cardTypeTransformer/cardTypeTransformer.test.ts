/*
 * Copyright © 2026 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CardTypeTransformer } from './cardTypeTransformer'
import { CardType as CardTypeEntity } from '../../../entities/cardType'
import { CardType as CardTypeGraphQL } from '../../../gen/graphqlTypes'

describe('CardTypeTransformer tests', () => {
  it.each`
    entity                    | graphQL
    ${CardTypeEntity.Credit}  | ${CardTypeGraphQL.Credit}
    ${CardTypeEntity.Debit}   | ${CardTypeGraphQL.Debit}
    ${CardTypeEntity.Prepaid} | ${CardTypeGraphQL.Prepaid}
    ${CardTypeEntity.Other}   | ${CardTypeGraphQL.Other}
  `(
    'should transform entity ($entity) to graphQL ($graphQL)',
    ({ entity, graphQL }) => {
      expect(CardTypeTransformer.toGraphQL(entity)).toStrictEqual(graphQL)
    },
  )

  it.each`
    graphQL                    | entity
    ${CardTypeGraphQL.Credit}  | ${CardTypeEntity.Credit}
    ${CardTypeGraphQL.Debit}   | ${CardTypeEntity.Debit}
    ${CardTypeGraphQL.Prepaid} | ${CardTypeEntity.Prepaid}
    ${CardTypeGraphQL.Other}   | ${CardTypeEntity.Other}
  `(
    'should transform graphQL ($graphQL) to entity ($entity)',
    ({ graphQL, entity }) => {
      expect(CardTypeTransformer.toEntity(graphQL)).toStrictEqual(entity)
    },
  )
})
