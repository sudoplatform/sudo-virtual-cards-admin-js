/*
 * Copyright © 2026 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CardType as CardTypeGraphQL } from '../../../gen/graphqlTypes'
import { CardType as CardTypeEntity } from '../../../entities/cardType'

/**
 * Utility transformer class, responsible for transforming between
 * `CardType` GraphQL and Entity types.
 *
 * @export
 * @class CardTypeTransformer
 */
export class CardTypeTransformer {
  /**
   * Transform a CardType GraphQL type to its Entity type.
   *
   * @static
   * @param {CardTypeGraphQL} graphql
   * @returns {CardTypeEntity}
   * @memberof CardTypeTransformer
   */
  public static toEntity(graphql: CardTypeGraphQL): CardTypeEntity {
    switch (graphql) {
      case CardTypeGraphQL.Credit:
        return CardTypeEntity.Credit
      case CardTypeGraphQL.Debit:
        return CardTypeEntity.Debit
      case CardTypeGraphQL.Prepaid:
        return CardTypeEntity.Prepaid
      case CardTypeGraphQL.Other:
        return CardTypeEntity.Other
    }
  }

  /**
   * Transform a CardType Entity type to its GraphQL type.
   *
   * @static
   * @param {CardTypeEntity} entity
   * @returns {CardTypeGraphQL}
   * @memberof CardTypeTransformer
   */
  public static toGraphQL(entity: CardTypeEntity): CardTypeGraphQL {
    switch (entity) {
      case CardTypeEntity.Credit:
        return CardTypeGraphQL.Credit
      case CardTypeEntity.Debit:
        return CardTypeGraphQL.Debit
      case CardTypeEntity.Prepaid:
        return CardTypeGraphQL.Prepaid
      case CardTypeEntity.Other:
        return CardTypeGraphQL.Other
    }
  }
}
