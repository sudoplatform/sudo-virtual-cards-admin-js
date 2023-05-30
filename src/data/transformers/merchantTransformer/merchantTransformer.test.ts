/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { EntityDataFactory } from '../../../util/data-factory/entity'
import { GraphQLDataFactory } from '../../../util/data-factory/graphQl'
import { MerchantTransformer } from './merchantTransformer'

describe('MerchantTransformer tests', () => {
  it('should transform from entity to graphql', () => {
    expect(MerchantTransformer.toGraphQL(EntityDataFactory.merchant)).toEqual(
      GraphQLDataFactory.merchant,
    )
  })

  it('should transform from graphql to entity', () => {
    expect(MerchantTransformer.toEntity(GraphQLDataFactory.merchant)).toEqual(
      EntityDataFactory.merchant,
    )
  })
})
