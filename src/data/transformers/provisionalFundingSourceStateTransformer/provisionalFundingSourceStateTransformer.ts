/*
 * Copyright © 2026 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ProvisionalFundingSourceState as ProvisionalFundingSourceStateGraphQL } from '../../../gen/graphqlTypes'
import { ProvisionalFundingSourceState as ProvisionalFundingSourceStateEntity } from '../../../entities/provisionalFundingSourceState'

/**
 * Utility transformer class, responsible for transforming between
 * `ProvisionalFundingSourceState` GraphQL and Entity types.
 *
 * @export
 * @class ProvisionalFundingSourceStateTransformer
 */
export class ProvisionalFundingSourceStateTransformer {
  /**
   * Transform a ProvisionalFundingSourceState GraphQL type to its Entity type.
   *
   * @static
   * @param {ProvisionalFundingSourceStateGraphQL} graphql
   * @returns {ProvisionalFundingSourceStateEntity}
   * @memberof ProvisionalFundingSourceStateTransformer
   */
  public static toEntity(
    graphql: ProvisionalFundingSourceStateGraphQL,
  ): ProvisionalFundingSourceStateEntity {
    switch (graphql) {
      case ProvisionalFundingSourceStateGraphQL.Provisioning:
        return ProvisionalFundingSourceStateEntity.Provisioning
      case ProvisionalFundingSourceStateGraphQL.Pending:
        return ProvisionalFundingSourceStateEntity.Pending
      case ProvisionalFundingSourceStateGraphQL.Provisioned:
        return ProvisionalFundingSourceStateEntity.Provisioned
      case ProvisionalFundingSourceStateGraphQL.Completed:
        return ProvisionalFundingSourceStateEntity.Completed
      case ProvisionalFundingSourceStateGraphQL.Failed:
        return ProvisionalFundingSourceStateEntity.Failed
    }
  }

  /**
   * Transform a ProvisionalFundingSourceState Entity type to its GraphQL type.
   *
   * @static
   * @param {ProvisionalFundingSourceStateEntity} entity
   * @returns {ProvisionalFundingSourceStateGraphQL}
   * @memberof ProvisionalFundingSourceStateTransformer
   */
  public static toGraphQL(
    entity: ProvisionalFundingSourceStateEntity,
  ): ProvisionalFundingSourceStateGraphQL {
    switch (entity) {
      case ProvisionalFundingSourceStateEntity.Provisioning:
        return ProvisionalFundingSourceStateGraphQL.Provisioning
      case ProvisionalFundingSourceStateEntity.Pending:
        return ProvisionalFundingSourceStateGraphQL.Pending
      case ProvisionalFundingSourceStateEntity.Provisioned:
        return ProvisionalFundingSourceStateGraphQL.Provisioned
      case ProvisionalFundingSourceStateEntity.Completed:
        return ProvisionalFundingSourceStateGraphQL.Completed
      case ProvisionalFundingSourceStateEntity.Failed:
        return ProvisionalFundingSourceStateGraphQL.Failed
    }
  }
}
