/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Transaction as TransactionGraphQL,
  TransactionType as TransactionTypeGraphQL,
} from '../../../gen/graphqlTypes'
import { Transaction as TransactionEntity } from '../../../entities/transaction'
import { TransactionType as TransactionTypeEntity } from '../../../entities/transactionType'
import { FeeReasonTransformer } from '../feeReasonTransformer'
import { MerchantTransformer } from '../merchantTransformer'
import { TransactionDetailTransformer } from '../transactionDetailTransformer'

/**
 * Utility transformer class, responsible for transforming between
 * `Transaction` Entity and GraphQL types.
 *
 * @export
 * @class TransactionTransformer
 */
export class TransactionTransformer {
  /**
   * Transform a `Transaction` GraphQL type to its Entity type.
   *
   * @static
   * @param {TransactionGraphQL} graphql
   * @returns {TransactionEntity}
   * @memberof TransactionTransformer
   */
  public static toEntity(graphql: TransactionGraphQL): TransactionEntity {
    return {
      id: graphql.id,
      owner: graphql.owner,
      createdAt: new Date(graphql.createdAtEpochMs),
      updatedAt: new Date(graphql.updatedAtEpochMs),
      type: TransactionTransformer.toEntityTransactionType(graphql.type),
      transactedAt: new Date(parseInt(graphql.transactedAtEpochMs)),
      billedAmount: graphql.billedAmount,
      transactedAmount: graphql.transactedAmount,
      merchant: graphql.merchant
        ? MerchantTransformer.toEntity(graphql.merchant)
        : undefined,
      declineReason: graphql.declineReason ?? undefined,
      feeReason: graphql.feeReason
        ? FeeReasonTransformer.toEntity(graphql.feeReason)
        : undefined,
      causeId: graphql.causeId ?? undefined,
      feeId: graphql.feeId ?? undefined,
      detail: graphql.detail
        ? graphql.detail.map((detail) =>
            TransactionDetailTransformer.toEntity(detail),
          )
        : undefined,
    }
  }

  /**
   * Transform a `Transaction` Entity type to its GraphQL type.
   *
   * @static
   * @param {TransactionEntity} entity
   * @returns {TransactionGraphQL}
   * @memberof TransactionTransformer
   */
  public static toGraphQL(entity: TransactionEntity): TransactionGraphQL {
    return {
      __typename: 'Transaction',
      id: entity.id,
      owner: entity.owner,
      createdAtEpochMs: entity.createdAt.getTime(),
      updatedAtEpochMs: entity.updatedAt.getTime(),
      type: TransactionTransformer.toGraphQLTransactionType(entity.type),
      transactedAtEpochMs: entity.transactedAt.getTime().toString(),
      billedAmount: entity.billedAmount,
      transactedAmount: entity.transactedAmount,
      merchant: entity.merchant
        ? MerchantTransformer.toGraphQL(entity.merchant)
        : undefined,
      declineReason: entity.declineReason ?? undefined,
      feeReason: entity.feeReason
        ? FeeReasonTransformer.toGraphQL(entity.feeReason)
        : undefined,
      causeId: entity.causeId,
      feeId: entity.feeId,
      detail: entity.detail
        ? entity.detail.map((detail) =>
            TransactionDetailTransformer.toGraphQL(detail),
          )
        : undefined,
    }
  }

  /**
   * Transform a `TransactionType` GraphQL type to its Entity type.
   *
   * @static
   * @param {TransactionTypeGraphQL} graphql
   * @returns {TransactionTypeEntity}
   * @memberof TransactionTransformer
   */
  private static toEntityTransactionType(
    graphql: TransactionTypeGraphQL,
  ): TransactionTypeEntity {
    switch (graphql) {
      case TransactionTypeGraphQL.Pending:
        return TransactionTypeEntity.Pending
      case TransactionTypeGraphQL.Reversal:
        return TransactionTypeEntity.Reversal
      case TransactionTypeGraphQL.Decline:
        return TransactionTypeEntity.Decline
      case TransactionTypeGraphQL.Complete:
        return TransactionTypeEntity.Complete
      case TransactionTypeGraphQL.Refund:
        return TransactionTypeEntity.Refund
      case TransactionTypeGraphQL.Chargeback:
        return TransactionTypeEntity.Chargeback
      case TransactionTypeGraphQL.Fee:
        return TransactionTypeEntity.Fee
      case TransactionTypeGraphQL.FeeRefund:
        return TransactionTypeEntity.FeeRefund
    }
  }

  /**
   * Transform a `TransactionType` Entity type to its GraphQL type.
   *
   * @static
   * @param {TransactionTypeEntity} entity
   * @returns {TransactionTypeGraphQL}
   * @memberof TransactionTransformer
   */
  private static toGraphQLTransactionType(
    entity: TransactionTypeEntity,
  ): TransactionTypeGraphQL {
    switch (entity) {
      case TransactionTypeEntity.Pending:
        return TransactionTypeGraphQL.Pending
      case TransactionTypeEntity.Reversal:
        return TransactionTypeGraphQL.Reversal
      case TransactionTypeEntity.Decline:
        return TransactionTypeGraphQL.Decline
      case TransactionTypeEntity.Complete:
        return TransactionTypeGraphQL.Complete
      case TransactionTypeEntity.Refund:
        return TransactionTypeGraphQL.Refund
      case TransactionTypeEntity.Chargeback:
        return TransactionTypeGraphQL.Chargeback
      case TransactionTypeEntity.Fee:
        return TransactionTypeGraphQL.Fee
      case TransactionTypeEntity.FeeRefund:
        return TransactionTypeGraphQL.FeeRefund
    }
  }
}
