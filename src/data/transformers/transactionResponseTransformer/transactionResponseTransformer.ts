/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TransactionResponse as TransactionResponseGraphQL } from '../../../gen/graphqlTypes'
import { TransactionResponse as TransactionResponseEntity } from '../../../entities/transactionResponse'
import { CardStateTransformer } from '../cardStateTransformer'
import { TransactionConnectionTransformer } from '../transactionConnectionTransformer'

/**
 * Utility transformer class, responsible for transforming between
 * `TransactionResponse` GraphQL and Entity types.
 *
 * @export
 * @class TransactionResponseTransformer
 */
export class TransactionResponseTransformer {
  /**
   * Transform a `TransactionResponse` GraphQL type to its Entity type.
   *
   * @static
   * @param {TransactionResponseGraphQL} graphql
   * @returns {TransactionResponseEntity}
   * @memberof TransactionResponseTransformer
   */
  public static toEntity(
    graphql: TransactionResponseGraphQL,
  ): TransactionResponseEntity {
    return {
      id: graphql.id,
      cardState: CardStateTransformer.toEntity(graphql.cardState),
      last4: graphql.last4,
      transactions: TransactionConnectionTransformer.toEntity(
        graphql.transactions,
      ),
    }
  }

  /**
   * Transform a `TransactionResponse` Entity type to its GraphQL type.
   *
   * @static
   * @param {TransactionResponseEntity} entity
   * @returns {TransactionResponseGraphQL}
   * @memberof TransactionResponseTransformer
   */
  public static toGraphQL(
    entity: TransactionResponseEntity,
  ): TransactionResponseGraphQL {
    return {
      __typename: 'TransactionResponse',
      id: entity.id,
      cardState: CardStateTransformer.toGraphQL(entity.cardState),
      last4: entity.last4,
      transactions: TransactionConnectionTransformer.toGraphQL(
        entity.transactions,
      ),
    }
  }
}
