/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { VirtualCard as VirtualCardGraphQL } from '../../../gen/graphqlTypes'
import { VirtualCard as VirtualCardEntity } from '../../../entities/virtualCard'
import { OwnerTransformer } from '../ownerTransformer'

/**
 * Utility transformer class, responsible for transforming between
 * `VirtualCard` Entity and GraphQL types.
 *
 * @export
 * @class VirtualCardTransformer
 */
export class VirtualCardTransformer {
  /**
   * Transform a `VirtualCard` GraphQL type to its Entity type.
   *
   * @static
   * @param {VirtualCardGraphQL} graphql
   * @returns {VirtualCardEntity}
   * @memberof VirtualCardTransformer
   */
  public static toEntity(graphql: VirtualCardGraphQL): VirtualCardEntity {
    return {
      id: graphql.id,
      owner: graphql.owner,
      version: graphql.version,
      createdAt: new Date(graphql.createdAtEpochMs),
      updatedAt: new Date(graphql.updatedAtEpochMs),
      algorithm: graphql.algorithm,
      keyId: graphql.keyId,
      keyRingId: graphql.keyRingId,
      owners: graphql.owners.map((owner) => OwnerTransformer.toEntity(owner)),
      fundingSourceId: graphql.fundingSourceId,
      currency: graphql.currency,
      state: graphql.state,
      activeTo: new Date(graphql.activeToEpochMs),
      cancelledAt: graphql.cancelledAtEpochMs
        ? new Date(graphql.cancelledAtEpochMs)
        : undefined,
      last4: graphql.last4,
    }
  }

  /**
   * Transform a `VirtualCard` Entity type to its GraphQL type.
   *
   * @static
   * @param {VirtualCardEntity} entity
   * @returns {VirtualCardGraphQL}
   * @memberof VirtualCardTransformer
   */
  public static toGraphQL(entity: VirtualCardEntity): VirtualCardGraphQL {
    return {
      __typename: 'VirtualCard',
      id: entity.id,
      owner: entity.owner,
      version: entity.version,
      createdAtEpochMs: entity.createdAt.getTime(),
      updatedAtEpochMs: entity.updatedAt.getTime(),
      algorithm: entity.algorithm,
      keyId: entity.keyId,
      keyRingId: entity.keyRingId,
      owners: entity.owners.map((owner) => OwnerTransformer.toGraphQL(owner)),
      fundingSourceId: entity.fundingSourceId,
      currency: entity.currency,
      state: entity.state,
      activeToEpochMs: entity.activeTo.getTime(),
      cancelledAtEpochMs: entity.cancelledAt?.getTime(),
      last4: entity.last4,
    }
  }
}
