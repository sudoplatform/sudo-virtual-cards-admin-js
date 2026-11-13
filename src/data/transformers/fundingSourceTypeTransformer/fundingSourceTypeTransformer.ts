/*
 * Copyright © 2026 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { FundingSourceType as FundingSourceTypeGraphQL } from '../../../gen/graphqlTypes'
import { FundingSourceType as FundingSourceTypeEntity } from '../../../entities/fundingSourceType'

/**
 * Utility transformer class, responsible for transforming between
 * `FundingSourceType` GraphQL and Entity types.
 *
 * @export
 * @class FundingSourceTypeTransformer
 */
export class FundingSourceTypeTransformer {
  /**
   * Transform a FundingSourceType GraphQL type to its Entity type.
   *
   * @static
   * @param {FundingSourceTypeGraphQL} graphql
   * @returns {FundingSourceTypeEntity}
   * @memberof FundingSourceTypeTransformer
   */
  public static toEntity(
    graphql: FundingSourceTypeGraphQL,
  ): FundingSourceTypeEntity {
    switch (graphql) {
      case FundingSourceTypeGraphQL.CreditCard:
        return FundingSourceTypeEntity.CreditCard
      case FundingSourceTypeGraphQL.BankAccount:
        return FundingSourceTypeEntity.BankAccount
    }
  }

  /**
   * Transform a FundingSourceType Entity type to its GraphQL type.
   *
   * @static
   * @param {FundingSourceTypeEntity} entity
   * @returns {FundingSourceTypeGraphQL}
   * @memberof FundingSourceTypeTransformer
   */
  public static toGraphQL(
    entity: FundingSourceTypeEntity,
  ): FundingSourceTypeGraphQL {
    switch (entity) {
      case FundingSourceTypeEntity.CreditCard:
        return FundingSourceTypeGraphQL.CreditCard
      case FundingSourceTypeEntity.BankAccount:
        return FundingSourceTypeGraphQL.BankAccount
    }
  }
}
