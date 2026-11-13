/*
 * Copyright © 2026 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { StateReason as StateReasonGraphQL } from '../../../gen/graphqlTypes'
import { StateReason as StateReasonEntity } from '../../../entities/stateReason'

/**
 * Utility transformer class, responsible for transforming between
 * `StateReason` GraphQL and Entity types.
 *
 * @export
 * @class StateReasonTransformer
 */
export class StateReasonTransformer {
  /**
   * Transform a StateReason GraphQL type to its Entity type.
   *
   * @static
   * @param {StateReasonGraphQL} graphql
   * @returns {StateReasonEntity}
   * @memberof StateReasonTransformer
   */
  public static toEntity(graphql: StateReasonGraphQL): StateReasonEntity {
    switch (graphql) {
      case StateReasonGraphQL.User:
        return StateReasonEntity.User
      case StateReasonGraphQL.Admin:
        return StateReasonEntity.Admin
      case StateReasonGraphQL.Entitlement:
        return StateReasonEntity.Entitlement
      case StateReasonGraphQL.Locked:
        return StateReasonEntity.Locked
      case StateReasonGraphQL.Unlocked:
        return StateReasonEntity.Unlocked
      case StateReasonGraphQL.Suspicious:
        return StateReasonEntity.Suspicious
      case StateReasonGraphQL.Processing:
        return StateReasonEntity.Processing
      case StateReasonGraphQL.Deletion:
        return StateReasonEntity.Deletion
      case StateReasonGraphQL.Unknown:
        return StateReasonEntity.Unknown
    }
  }

  /**
   * Transform a StateReason Entity type to its GraphQL type.
   *
   * @static
   * @param {StateReasonEntity} entity
   * @returns {StateReasonGraphQL}
   * @memberof StateReasonTransformer
   */
  public static toGraphQL(entity: StateReasonEntity): StateReasonGraphQL {
    switch (entity) {
      case StateReasonEntity.User:
        return StateReasonGraphQL.User
      case StateReasonEntity.Admin:
        return StateReasonGraphQL.Admin
      case StateReasonEntity.Entitlement:
        return StateReasonGraphQL.Entitlement
      case StateReasonEntity.Locked:
        return StateReasonGraphQL.Locked
      case StateReasonEntity.Unlocked:
        return StateReasonGraphQL.Unlocked
      case StateReasonEntity.Suspicious:
        return StateReasonGraphQL.Suspicious
      case StateReasonEntity.Processing:
        return StateReasonGraphQL.Processing
      case StateReasonEntity.Deletion:
        return StateReasonGraphQL.Deletion
      case StateReasonEntity.Unknown:
        return StateReasonGraphQL.Unknown
    }
  }
}
