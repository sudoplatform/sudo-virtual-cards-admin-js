/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CardState as CardStateEntity } from '../../../entities'
import { TransactionResponse as TransactionResponseEntity } from '../../../entities/transactionResponse'
import {
  CardState as CardStateGraphQL,
  TransactionResponse as TransactionResponseGraphQL,
} from '../../../gen/graphqlTypes'
import { EntityDataFactory } from '../../../util/data-factory/entity'
import { GraphQLDataFactory } from '../../../util/data-factory/graphQl'
import { TransactionResponseTransformer } from './transactionResponseTransformer'

const id = 'mock-id'
const last4 = '1234'

export const defaultTransactionResponseEntity: TransactionResponseEntity = {
  id,
  cardState: CardStateEntity.Issued,
  last4,
  transactions: EntityDataFactory.transactionConnection,
}

export const defaultTransactionResponseGraphQL: TransactionResponseGraphQL = {
  __typename: 'TransactionResponse',
  id,
  cardState: CardStateGraphQL.Issued,
  last4,
  transactions: GraphQLDataFactory.transactionConnection,
}

describe('TransactionResponseTransformer tests', () => {
  it('should transform from entity to graphql', () => {
    expect(
      TransactionResponseTransformer.toGraphQL(
        defaultTransactionResponseEntity,
      ),
    ).toEqual(defaultTransactionResponseGraphQL)
  })

  it('should transform from graphql to entity', () => {
    expect(
      TransactionResponseTransformer.toEntity(
        defaultTransactionResponseGraphQL,
      ),
    ).toEqual(defaultTransactionResponseEntity)
  })
})
