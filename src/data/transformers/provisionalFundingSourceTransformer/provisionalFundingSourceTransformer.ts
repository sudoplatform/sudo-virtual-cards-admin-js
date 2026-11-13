/*
 * Copyright © 2026 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ProvisionalFundingSource as ProvisionalFundingSourceGraphQL } from '../../../gen/graphqlTypes'
import { ProvisionalFundingSource as ProvisionalFundingSourceEntity } from '../../../entities/provisionalFundingSource'
import { CardTypeTransformer } from '../cardTypeTransformer'
import { FundingSourceTypeTransformer } from '../fundingSourceTypeTransformer'
import { ProvisionalFundingSourceStateTransformer } from '../provisionalFundingSourceStateTransformer'
import { StateReasonTransformer } from '../stateReasonTransformer'

/**
 * Utility transformer class, responsible for transforming between
 * `ProvisionalFundingSource` Entity and GraphQL types.
 *
 * @export
 * @class ProvisionalFundingSourceTransformer
 */
export class ProvisionalFundingSourceTransformer {
  /**
   * Transform a `ProvisionalFundingSource` GraphQL type to its Entity type.
   *
   * @static
   * @param {ProvisionalFundingSourceGraphQL} graphql
   * @returns {ProvisionalFundingSourceEntity}
   * @memberof ProvisionalFundingSourceTransformer
   */
  public static toEntity(
    graphql: ProvisionalFundingSourceGraphQL,
  ): ProvisionalFundingSourceEntity {
    return {
      id: graphql.id,
      owner: graphql.owner,
      version: graphql.version,
      createdAt: new Date(graphql.createdAtEpochMs),
      updatedAt: new Date(graphql.updatedAtEpochMs),
      state: ProvisionalFundingSourceStateTransformer.toEntity(graphql.state),
      stateReason: StateReasonTransformer.toEntity(graphql.stateReason),
      type: FundingSourceTypeTransformer.toEntity(graphql.type),
      providerName: graphql.providerName,
      currency: graphql.currency,
      last4: graphql.last4 ?? undefined,
      cardType: graphql.cardType
        ? CardTypeTransformer.toEntity(graphql.cardType)
        : undefined,
    }
  }

  /**
   * Transform a `ProvisionalFundingSource` Entity type to its GraphQL type.
   *
   * @static
   * @param {ProvisionalFundingSourceEntity} entity
   * @returns {ProvisionalFundingSourceGraphQL}
   * @memberof ProvisionalFundingSourceTransformer
   */
  public static toGraphQL(
    entity: ProvisionalFundingSourceEntity,
  ): ProvisionalFundingSourceGraphQL {
    return {
      __typename: 'ProvisionalFundingSource',
      id: entity.id,
      owner: entity.owner,
      version: entity.version,
      createdAtEpochMs: entity.createdAt.getTime(),
      updatedAtEpochMs: entity.updatedAt.getTime(),
      state: ProvisionalFundingSourceStateTransformer.toGraphQL(entity.state),
      stateReason: StateReasonTransformer.toGraphQL(entity.stateReason),
      type: FundingSourceTypeTransformer.toGraphQL(entity.type),
      providerName: entity.providerName,
      currency: entity.currency,
      last4: entity.last4,
      cardType: entity.cardType
        ? CardTypeTransformer.toGraphQL(entity.cardType)
        : undefined,
    }
  }
}
