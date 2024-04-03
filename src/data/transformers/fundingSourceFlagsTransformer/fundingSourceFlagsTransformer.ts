/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { FundingSourceFlags as FundingSourceFlagsEntity } from '../../../entities/fundingSourceFlags'
import { FundingSourceFlags as FundingSourceFlagsGraphQL } from '../../../gen/graphqlTypes'

/**
 * Utility transformer class, responsible for transforming between
 * `FundingSourceFlags` GraphQL and Entity types.
 *
 * @export
 * @class FundingSourceFlagsTransformer
 */
export class FundingSourceFlagsTransformer {
  /**
   * Transform a `FundingSourceFlags` GraphQL type to its Entity type.
   *
   * @static
   * @param {FundingSourceFlagsGraphQL} input
   * @returns {FundingSourceFlagsEntity}
   * @memberof FundingSourceFlagsTransformer
   */
  public static toEntity(
    input: FundingSourceFlagsGraphQL[],
  ): FundingSourceFlagsEntity[] {
    return input.map((f) => {
      switch (f) {
        case FundingSourceFlagsGraphQL.Unfunded:
          return FundingSourceFlagsEntity.Unfunded
        case FundingSourceFlagsGraphQL.Refresh:
          return FundingSourceFlagsEntity.Refresh
      }
    })
  }

  /**
   * Transform a `FundingSourceFlags` Entity type to its GraphQL type.
   *
   * @static
   * @param {FundingSourceFlagsEntity} entity
   * @returns {FundingSourceFlagsGraphQL}
   * @memberof FundingSourceFlagsTransformer
   */
  public static toGraphQL(
    entity: FundingSourceFlagsEntity[],
  ): FundingSourceFlagsGraphQL[] {
    return entity.map((f) => {
      switch (f) {
        case FundingSourceFlagsEntity.Unfunded:
          return FundingSourceFlagsGraphQL.Unfunded
        case FundingSourceFlagsEntity.Refresh:
          return FundingSourceFlagsGraphQL.Refresh
      }
    })
  }
}
