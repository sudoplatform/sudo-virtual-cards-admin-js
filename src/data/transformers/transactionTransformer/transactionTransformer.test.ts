/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TransactionType as TransactionTypeEntity } from '../../../entities/transactionType'
import { TransactionType as TransactionTypeGraphQL } from '../../../gen/graphqlTypes'
import { EntityDataFactory } from '../../../util/data-factory/entity'
import { GraphQLDataFactory } from '../../../util/data-factory/graphQl'
import { TransactionTransformer } from './transactionTransformer'

describe('TransactionTransformer tests', () => {
  it('should transform from entity to graphql', () => {
    expect(
      TransactionTransformer.toGraphQL(EntityDataFactory.transaction),
    ).toEqual(GraphQLDataFactory.transaction)
  })

  it('should transform from graphql to entity', () => {
    expect(
      TransactionTransformer.toEntity(GraphQLDataFactory.transaction),
    ).toEqual(EntityDataFactory.transaction)
  })

  it.each`
    entity                              | graphQL
    ${TransactionTypeEntity.Chargeback} | ${TransactionTypeGraphQL.Chargeback}
    ${TransactionTypeEntity.Complete}   | ${TransactionTypeGraphQL.Complete}
    ${TransactionTypeEntity.Decline}    | ${TransactionTypeGraphQL.Decline}
    ${TransactionTypeEntity.Pending}    | ${TransactionTypeGraphQL.Pending}
    ${TransactionTypeEntity.Refund}     | ${TransactionTypeGraphQL.Refund}
    ${TransactionTypeEntity.Reversal}   | ${TransactionTypeGraphQL.Reversal}
  `(
    'should transform entity ($entity) to graphQL ($graphQL)',
    ({ entity, graphQL }) => {
      expect(
        TransactionTransformer['toGraphQLTransactionType'](entity),
      ).toStrictEqual(graphQL)
    },
  )

  it.each`
    graphQL                              | entity
    ${TransactionTypeGraphQL.Chargeback} | ${TransactionTypeEntity.Chargeback}
    ${TransactionTypeGraphQL.Complete}   | ${TransactionTypeEntity.Complete}
    ${TransactionTypeGraphQL.Decline}    | ${TransactionTypeEntity.Decline}
    ${TransactionTypeGraphQL.Pending}    | ${TransactionTypeEntity.Pending}
    ${TransactionTypeGraphQL.Refund}     | ${TransactionTypeEntity.Refund}
    ${TransactionTypeGraphQL.Reversal}   | ${TransactionTypeEntity.Reversal}
  `(
    'should transform graphQL ($graphQL) to entity ($entity)',
    ({ graphQL, entity }) => {
      expect(
        TransactionTransformer['toEntityTransactionType'](graphQL),
      ).toStrictEqual(entity)
    },
  )
})
