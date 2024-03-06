/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CreditCardFundingSource as CreditCardFundingSourceEntity } from '../../../entities/creditCardFundingSource'
import {
  CardType as CardTypeGraphQL,
  CreditCardFundingSource as CreditCardFundingSourceGraphQL,
} from '../../../gen/graphqlTypes'
import { CardType as CardTypeEntity } from '../../../entities/cardType'
import { FundingSourceStateTransformer } from '../fundingSourceStateTransformer'
import { CreditCardNetworkTransformer } from '../creditCardNetworkTransformer'
import { FundingSourceFlagsTransformer } from '../fundingSourceFlagsTransformer'

/**
 * Utility transformer class, responsible for transforming between
 * `CreditCardFundingSource` Entity and GraphQL types.
 *
 * @export
 * @class CreditCardFundingSourceTransformer
 */
export class CreditCardFundingSourceTransformer {
  /**
   * Transform a `CreditCardFundingSource` GraphQL type to its Entity type.
   *
   * @static
   * @param {CreditCardFundingSourceGraphQL} graphql
   * @returns {CreditCardFundingSourceEntity}
   * @memberof CreditCardFundingSourceTransformer
   */
  public static toEntity(
    graphql: CreditCardFundingSourceGraphQL,
  ): CreditCardFundingSourceEntity {
    return {
      id: graphql.id,
      owner: graphql.owner,
      version: graphql.version,
      createdAt: new Date(graphql.createdAtEpochMs),
      updatedAt: new Date(graphql.updatedAtEpochMs),
      state: FundingSourceStateTransformer.toEntity(graphql.state),
      flags: FundingSourceFlagsTransformer.toEntity(graphql.flags),
      currency: graphql.currency,
      fingerprint: graphql.fingerprint,
      last4: graphql.last4,
      network: CreditCardNetworkTransformer.toEntity(graphql.network),
      cardType: CreditCardFundingSourceTransformer.toEntityCardType(
        graphql.cardType,
      ),
    }
  }

  /**
   * Transform a `CreditCardFundingSource` Entity type to its GraphQL type.
   *
   * @static
   * @param {CreditCardFundingSourceEntity} entity
   * @returns {CreditCardFundingSourceGraphQL}
   * @memberof CreditCardFundingSourceTransformer
   */
  public static toGraphQL(
    entity: CreditCardFundingSourceEntity,
  ): CreditCardFundingSourceGraphQL {
    return {
      __typename: 'CreditCardFundingSource',
      id: entity.id,
      owner: entity.owner,
      version: entity.version,
      createdAtEpochMs: entity.createdAt.getTime(),
      updatedAtEpochMs: entity.updatedAt.getTime(),
      state: FundingSourceStateTransformer.toGraphQL(entity.state),
      flags: FundingSourceFlagsTransformer.toGraphQL(entity.flags),
      currency: entity.currency,
      fingerprint: entity.fingerprint,
      last4: entity.last4,
      network: CreditCardNetworkTransformer.toGraphQL(entity.network),
      cardType: CreditCardFundingSourceTransformer.toGraphQLCardType(
        entity.cardType,
      ),
    }
  }

  /**
   * Transform a `CardType` GraphQL type to its Entity type.
   *
   * @static
   * @param {CardTypeGraphQL} graphql
   * @returns {CardTypeEntity}
   * @memberof CreditCardFundingSourceTransformer
   */
  private static toEntityCardType(graphql: CardTypeGraphQL): CardTypeEntity {
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
   * Transform a `CardType` Entity type to its GraphQL type.
   *
   * @static
   * @param {CardTypeEntity} entity
   * @returns {CardTypeGraphQL}
   * @memberof CreditCardFundingSourceTransformer
   */
  private static toGraphQLCardType(entity: CardTypeEntity): CardTypeGraphQL {
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
