/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { EntityDataFactory } from '../../../util/data-factory/entity'
import { GraphQLDataFactory } from '../../../util/data-factory/graphQl'
import { TransactionConnectionTransformer } from '../transactionConnectionTransformer'

describe('TransactionConnectionTransformer tests', () => {
  it('should transform from entity to graphql', () => {
    expect(
      TransactionConnectionTransformer.toGraphQL(
        EntityDataFactory.transactionConnection,
      ),
    ).toEqual(GraphQLDataFactory.transactionConnection)
  })

  it('should transform from graphql to entity', () => {
    expect(
      TransactionConnectionTransformer.toEntity(
        GraphQLDataFactory.transactionConnection,
      ),
    ).toEqual(EntityDataFactory.transactionConnection)
  })
})
