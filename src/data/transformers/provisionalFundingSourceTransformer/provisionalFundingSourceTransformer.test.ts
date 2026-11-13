/*
 * Copyright © 2026 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ProvisionalFundingSourceTransformer } from './provisionalFundingSourceTransformer'
import { EntityDataFactory } from '../../../util/data-factory/entity'
import { GraphQLDataFactory } from '../../../util/data-factory/graphQl'

describe('ProvisionalFundingSourceTransformer tests', () => {
  it('should transform from graphQL to entity', () => {
    expect(
      ProvisionalFundingSourceTransformer.toEntity(
        GraphQLDataFactory.provisionalFundingSource,
      ),
    ).toStrictEqual(EntityDataFactory.provisionalFundingSource)
  })

  it('should transform from entity to graphQL', () => {
    expect(
      ProvisionalFundingSourceTransformer.toGraphQL(
        EntityDataFactory.provisionalFundingSource,
      ),
    ).toStrictEqual(GraphQLDataFactory.provisionalFundingSource)
  })

  it('should omit optional card details when not present', () => {
    const graphQL = {
      ...GraphQLDataFactory.provisionalFundingSource,
      last4: null,
      cardType: null,
    }
    const entity = ProvisionalFundingSourceTransformer.toEntity(graphQL)
    expect(entity.last4).toBeUndefined()
    expect(entity.cardType).toBeUndefined()
  })
})
