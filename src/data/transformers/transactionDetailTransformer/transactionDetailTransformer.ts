/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TransactionDetail as TransactionDetailEntity } from '../../../entities/transactionDetail'
import { TransactionDetail as TransactionDetailGraphQL } from '../../../gen/graphqlTypes'
import { CreditCardNetworkTransformer } from '../creditCardNetworkTransformer'
import { MarkupTransformer } from '../markupTransformer'

/**
 * Utility transformer class, responsible for transforming between
 * `TransactionDetail` GraphQL and Entity types.
 *
 * @export
 * @class TransactionDetailTransformer
 */
export class TransactionDetailTransformer {
  /**
   * Transform a `TransactionDetail` GraphQL type to its Entity type.
   *
   * @static
   * @param {TransactionDetailGraphQL} graphql
   * @returns {TransactionDetailEntity}
   * @memberof TransactionDetailTransformer
   */
  public static toEntity(
    graphql: TransactionDetailGraphQL,
  ): TransactionDetailEntity {
    return {
      virtualCardAmount: graphql.virtualCardAmount,
      markup: MarkupTransformer.toEntity(graphql.markup),
      serviceFee: graphql.serviceFee,
      fundingSourceId: graphql.fundingSourceId,
      fundingSourceAmount: graphql.fundingSourceAmount,
      fundingSourceLast4: graphql.fundingSourceLast4,
      fundingSourceNetwork: CreditCardNetworkTransformer.toEntity(
        graphql.fundingSourceNetwork,
      ),
    }
  }

  /**
   * Transform a `TransactionDetail` Entity type to its GraphQL type.
   *
   * @static
   * @param {TransactionDetailEntity} entity
   * @returns {TransactionDetailGraphQL}
   * @memberof TransactionDetailTransformer
   */
  public static toGraphQL(
    entity: TransactionDetailEntity,
  ): TransactionDetailGraphQL {
    return {
      __typename: 'TransactionDetail',
      virtualCardAmount: entity.virtualCardAmount,
      markup: MarkupTransformer.toGraphQL(entity.markup),
      serviceFee: entity.serviceFee,
      fundingSourceId: entity.fundingSourceId,
      fundingSourceAmount: entity.fundingSourceAmount,
      fundingSourceLast4: entity.fundingSourceLast4,
      fundingSourceNetwork: CreditCardNetworkTransformer.toGraphQL(
        entity.fundingSourceNetwork,
      ),
    }
  }
}
