/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CreditCardNetwork as CreditCardNetworkEntity } from '../../../entities/creditCardNetwork'
import { CreditCardNetwork as CreditCardNetworkGraphQL } from '../../../gen/graphqlTypes'

/**
 * Utility transformer class, responsible for transforming between
 * `CreditCardNetwork` GraphQL and Entity types.
 *
 * @export
 * @class CreditCardNetworkTransformer
 */
export class CreditCardNetworkTransformer {
  /**
   * Transform a `CreditCardNetwork` GraphQL type to its Entity type.
   *
   * @static
   * @param {CreditCardNetworkGraphQL} graphql
   * @returns {CreditCardNetworkEntity}
   * @memberof CreditCardNetworkTransformer
   */
  public static toEntity(
    graphql: CreditCardNetworkGraphQL,
  ): CreditCardNetworkEntity {
    switch (graphql) {
      case CreditCardNetworkGraphQL.Amex:
        return CreditCardNetworkEntity.Amex
      case CreditCardNetworkGraphQL.Diners:
        return CreditCardNetworkEntity.Diners
      case CreditCardNetworkGraphQL.Discover:
        return CreditCardNetworkEntity.Discover
      case CreditCardNetworkGraphQL.Jcb:
        return CreditCardNetworkEntity.JCB
      case CreditCardNetworkGraphQL.Mastercard:
        return CreditCardNetworkEntity.MasterCard
      case CreditCardNetworkGraphQL.Unionpay:
        return CreditCardNetworkEntity.UnionPay
      case CreditCardNetworkGraphQL.Visa:
        return CreditCardNetworkEntity.Visa
      case CreditCardNetworkGraphQL.Other:
        return CreditCardNetworkEntity.Other
    }
  }

  /**
   * Transform a `CreditCardNetwork` Entity type to its GraphQL type.
   *
   * @static
   * @param {CreditCardNetworkEntity} entity
   * @returns {CreditCardNetworkGraphQL}
   * @memberof CreditCardNetworkTransformer
   */
  public static toGraphQL(
    entity: CreditCardNetworkEntity,
  ): CreditCardNetworkGraphQL {
    switch (entity) {
      case CreditCardNetworkEntity.Amex:
        return CreditCardNetworkGraphQL.Amex
      case CreditCardNetworkEntity.Diners:
        return CreditCardNetworkGraphQL.Diners
      case CreditCardNetworkEntity.Discover:
        return CreditCardNetworkGraphQL.Discover
      case CreditCardNetworkEntity.JCB:
        return CreditCardNetworkGraphQL.Jcb
      case CreditCardNetworkEntity.MasterCard:
        return CreditCardNetworkGraphQL.Mastercard
      case CreditCardNetworkEntity.UnionPay:
        return CreditCardNetworkGraphQL.Unionpay
      case CreditCardNetworkEntity.Visa:
        return CreditCardNetworkGraphQL.Visa
      case CreditCardNetworkEntity.Other:
        return CreditCardNetworkGraphQL.Other
    }
  }
}
