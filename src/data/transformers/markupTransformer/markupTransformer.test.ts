/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { EntityDataFactory } from '../../../util/data-factory/entity'
import { GraphQLDataFactory } from '../../../util/data-factory/graphQl'
import { MarkupTransformer } from '../markupTransformer'

describe('MarkupTransformer tests', () => {
  it('should transform from entity to graphql', () => {
    expect(MarkupTransformer.toGraphQL(EntityDataFactory.markup)).toEqual(
      GraphQLDataFactory.markup,
    )
  })

  it('should transform from graphql to entity', () => {
    expect(MarkupTransformer.toEntity(GraphQLDataFactory.markup)).toEqual(
      EntityDataFactory.markup,
    )
  })
})
