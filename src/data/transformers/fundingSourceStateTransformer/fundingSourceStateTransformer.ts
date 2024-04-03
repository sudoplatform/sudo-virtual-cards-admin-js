/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { FundingSourceState as FundingSourceStateEntity } from '../../../entities/fundingSourceState'
import { FundingSourceState as FundingSourceStateGraphQL } from '../../../gen/graphqlTypes'

/**
 * Utility transformer class, responsible for transforming between
 * `FundingSourceState` GraphQL and Entity types.
 *
 * @export
 * @class FundingSourceStateTransformer
 */
export class FundingSourceStateTransformer {
  /**
   * Transform a `FundingSourceState` GraphQL type to its Entity type.
   *
   * @static
   * @param {FundingSourceStateGraphQL} graphql
   * @returns {FundingSourceStateEntity}
   * @memberof FundingSourceStateTransformer
   */
  public static toEntity(
    graphql: FundingSourceStateGraphQL,
  ): FundingSourceStateEntity {
    switch (graphql) {
      case FundingSourceStateGraphQL.Active:
        return FundingSourceStateEntity.Active
      case FundingSourceStateGraphQL.Inactive:
        return FundingSourceStateEntity.Inactive
    }
  }

  /**
   * Transform a `FundingSourceState` Entity type to its GraphQL type.
   *
   * @static
   * @param {FundingSourceStateEntity} entity
   * @returns {FundingSourceStateGraphQL}
   * @memberof FundingSourceStateTransformer
   */
  public static toGraphQL(
    entity: FundingSourceStateEntity,
  ): FundingSourceStateGraphQL {
    switch (entity) {
      case FundingSourceStateEntity.Active:
        return FundingSourceStateGraphQL.Active
      case FundingSourceStateEntity.Inactive:
        return FundingSourceStateGraphQL.Inactive
    }
  }
}
