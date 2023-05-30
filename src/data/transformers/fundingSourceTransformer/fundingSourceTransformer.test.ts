/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServiceError } from '@sudoplatform/sudo-common'
import { EntityDataFactory } from '../../../util/data-factory/entity'
import { GraphQLDataFactory } from '../../../util/data-factory/graphQl'
import { FundingSourceTransformer } from './fundingSourceTransformer'

describe('FundingSourceTransformer tests', () => {
  it('should throw `ServiceError` when transforming unrecognized entity to graphql', () => {
    let caughtError
    const expectedError = new ServiceError(
      'Unrecognized funding source entity type.',
    )

    try {
      FundingSourceTransformer.toGraphQL({} as any)
    } catch (error) {
      caughtError = error
    }

    expect(caughtError).toEqual(expectedError)
  })

  it('should throw `ServiceError` when transforming unrecognized graphql to entity', () => {
    let caughtError
    const expectedError = new ServiceError(
      'Unrecognized funding source graphql type.',
    )

    try {
      FundingSourceTransformer.toEntity({} as any)
    } catch (error) {
      caughtError = error
    }

    expect(caughtError).toEqual(expectedError)
  })

  describe('BankAccountFundingSource', () => {
    it('should transform from entity to graphql', () => {
      expect(
        FundingSourceTransformer.toGraphQL(
          EntityDataFactory.bankAccountFundingSource,
        ),
      ).toEqual(GraphQLDataFactory.bankAccountFundingSource)
    })

    it('should transform from graphql to entity', () => {
      expect(
        FundingSourceTransformer.toEntity(
          GraphQLDataFactory.bankAccountFundingSource,
        ),
      ).toEqual(EntityDataFactory.bankAccountFundingSource)
    })
  })

  describe('CreditCardFundingSource', () => {
    it('should transform from entity to graphql', () => {
      expect(
        FundingSourceTransformer.toGraphQL(
          EntityDataFactory.creditCardFundingSource,
        ),
      ).toEqual(GraphQLDataFactory.creditCardFundingSource)
    })

    it('should transform from graphql to entity', () => {
      expect(
        FundingSourceTransformer.toEntity(
          GraphQLDataFactory.creditCardFundingSource,
        ),
      ).toEqual(EntityDataFactory.creditCardFundingSource)
    })
  })
})
