/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { EntityDataFactory } from '../../../util/data-factory/entity'
import { GraphQLDataFactory } from '../../../util/data-factory/graphQl'
import { VirtualCardTransformer } from './virtualCardTransformer'

describe('VirtualCardTransformer tests', () => {
  it('should transform entity to graphql', () => {
    expect(
      VirtualCardTransformer.toGraphQL(EntityDataFactory.virtualCards),
    ).toEqual(GraphQLDataFactory.virtualCards)
  })

  it('should transform graphql to entity', () => {
    expect(
      VirtualCardTransformer.toEntity(GraphQLDataFactory.virtualCards),
    ).toEqual(EntityDataFactory.virtualCards)
  })
})
