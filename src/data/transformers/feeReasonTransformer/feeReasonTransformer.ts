/*
 * Copyright © 2026 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { FeeReason as FeeReasonGraphQL } from '../../../gen/graphqlTypes'
import { FeeReason as FeeReasonEntity } from '../../../entities/feeReason'

/**
 * Utility transformer class, responsible for transforming between
 * `FeeReason` GraphQL and Entity types.
 *
 * @export
 * @class FeeReasonTransformer
 */
export class FeeReasonTransformer {
  /**
   * Transform a FeeReason GraphQL type to its Entity type.
   *
   * @static
   * @param {FeeReasonGraphQL} graphql
   * @returns {FeeReasonEntity}
   * @memberof FeeReasonTransformer
   */
  public static toEntity(graphql: FeeReasonGraphQL): FeeReasonEntity {
    switch (graphql) {
      case FeeReasonGraphQL.InsufficientFunds:
        return FeeReasonEntity.InsufficientFunds
      case FeeReasonGraphQL.FundingAccountClosed:
        return FeeReasonEntity.FundingAccountClosed
      case FeeReasonGraphQL.FundingDispute:
        return FeeReasonEntity.FundingDispute
      case FeeReasonGraphQL.VirtualCardDispute:
        return FeeReasonEntity.VirtualCardDispute
      case FeeReasonGraphQL.ReclaimAbandonedTransaction:
        return FeeReasonEntity.ReclaimAbandonedTransaction
    }
  }

  /**
   * Transform a FeeReason Entity type to its GraphQL type.
   *
   * @static
   * @param {FeeReasonEntity} entity
   * @returns {FeeReasonGraphQL}
   * @memberof FeeReasonTransformer
   */
  public static toGraphQL(entity: FeeReasonEntity): FeeReasonGraphQL {
    switch (entity) {
      case FeeReasonEntity.InsufficientFunds:
        return FeeReasonGraphQL.InsufficientFunds
      case FeeReasonEntity.FundingAccountClosed:
        return FeeReasonGraphQL.FundingAccountClosed
      case FeeReasonEntity.FundingDispute:
        return FeeReasonGraphQL.FundingDispute
      case FeeReasonEntity.VirtualCardDispute:
        return FeeReasonGraphQL.VirtualCardDispute
      case FeeReasonEntity.ReclaimAbandonedTransaction:
        return FeeReasonGraphQL.ReclaimAbandonedTransaction
    }
  }
}
