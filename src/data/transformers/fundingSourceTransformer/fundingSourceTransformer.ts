/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServiceError } from '@sudoplatform/sudo-common'
import { FundingSource as FundingSourceEntity } from '../../../entities/fundingSource'
import { FundingSource as FundingSourceGraphQL } from '../../../gen/graphqlTypes'
import { BankAccountFundingSourceTransformer } from '../bankAccountFundingSourceTransformer'
import { CreditCardFundingSourceTransformer } from '../creditCardFundingSourceTransformer'

/**
 * Utility transformer class, responsible for transforming between
 * `FundingSource` GraphQL and Entity types.
 *
 * @export
 * @class FundingSourceTransformer
 */
export class FundingSourceTransformer {
  /**
   * Transform a `FundingSource` GraphQL type to its Entity type.
   *
   * @static
   * @param {FundingSourceGraphQL} graphql
   * @returns {FundingSourceEntity}
   * @memberof FundingSourceTransformer
   */
  public static toEntity(graphql: FundingSourceGraphQL): FundingSourceEntity {
    switch (graphql.__typename) {
      case 'CreditCardFundingSource':
        return CreditCardFundingSourceTransformer.toEntity(graphql)
      case 'BankAccountFundingSource':
        return BankAccountFundingSourceTransformer.toEntity(graphql)
    }

    throw new ServiceError('Unrecognized funding source graphql type.')
  }

  /**
   * Transform a `FundingSource` Entity type to its GraphQL type.
   *
   * @static
   * @param {FundingSourceEntity} entity
   * @returns {FundingSourceGraphQL}
   * @memberof FundingSourceTransformer
   */
  public static toGraphQL(entity: FundingSourceEntity): FundingSourceGraphQL {
    if ('cardType' in entity) {
      return CreditCardFundingSourceTransformer.toGraphQL(entity)
    }
    if ('bankAccountType' in entity) {
      return BankAccountFundingSourceTransformer.toGraphQL(entity)
    }

    throw new ServiceError('Unrecognized funding source entity type.')
  }
}
