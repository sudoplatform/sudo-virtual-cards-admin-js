/*
 * Copyright © 2026 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { FeeReasonTransformer } from './feeReasonTransformer'
import { FeeReason as FeeReasonEntity } from '../../../entities/feeReason'
import { FeeReason as FeeReasonGraphQL } from '../../../gen/graphqlTypes'

describe('FeeReasonTransformer tests', () => {
  it.each`
    entity                                         | graphQL
    ${FeeReasonEntity.InsufficientFunds}           | ${FeeReasonGraphQL.InsufficientFunds}
    ${FeeReasonEntity.FundingAccountClosed}        | ${FeeReasonGraphQL.FundingAccountClosed}
    ${FeeReasonEntity.FundingDispute}              | ${FeeReasonGraphQL.FundingDispute}
    ${FeeReasonEntity.VirtualCardDispute}          | ${FeeReasonGraphQL.VirtualCardDispute}
    ${FeeReasonEntity.ReclaimAbandonedTransaction} | ${FeeReasonGraphQL.ReclaimAbandonedTransaction}
  `(
    'should transform entity ($entity) to graphQL ($graphQL)',
    ({ entity, graphQL }) => {
      expect(FeeReasonTransformer.toGraphQL(entity)).toStrictEqual(graphQL)
    },
  )

  it.each`
    graphQL                                         | entity
    ${FeeReasonGraphQL.InsufficientFunds}           | ${FeeReasonEntity.InsufficientFunds}
    ${FeeReasonGraphQL.FundingAccountClosed}        | ${FeeReasonEntity.FundingAccountClosed}
    ${FeeReasonGraphQL.FundingDispute}              | ${FeeReasonEntity.FundingDispute}
    ${FeeReasonGraphQL.VirtualCardDispute}          | ${FeeReasonEntity.VirtualCardDispute}
    ${FeeReasonGraphQL.ReclaimAbandonedTransaction} | ${FeeReasonEntity.ReclaimAbandonedTransaction}
  `(
    'should transform graphQL ($graphQL) to entity ($entity)',
    ({ graphQL, entity }) => {
      expect(FeeReasonTransformer.toEntity(graphQL)).toStrictEqual(entity)
    },
  )
})
