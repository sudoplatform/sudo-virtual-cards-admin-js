/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { EntityDataFactory } from '../../../util/data-factory/entity'
import { GraphQLDataFactory } from '../../../util/data-factory/graphQl'
import { TransactionDetailTransformer } from './transactionDetailTransformer'

describe('TransactionDetailTransformer tests', () => {
  it('should transform from entity to graphql', () => {
    expect(
      TransactionDetailTransformer.toGraphQL(
        EntityDataFactory.transactionDetail,
      ),
    ).toEqual(GraphQLDataFactory.transactionDetail)
  })

  it('should transform from graphql to entity', () => {
    expect(
      TransactionDetailTransformer.toEntity(
        GraphQLDataFactory.transactionDetail,
      ),
    ).toEqual(EntityDataFactory.transactionDetail)
  })
})
