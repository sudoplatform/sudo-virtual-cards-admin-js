/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { FundingSourceFlagsTransformer } from './fundingSourceFlagsTransformer'
import { FundingSourceFlags as FundingSourceFlagsEntity } from '../../../entities/fundingSourceFlags'
import { FundingSourceFlags as FundingSourceFlagsGraphQL } from '../../../gen/graphqlTypes'

describe('FundingSourceFlagsTransformer tests', () => {
  it.each`
    entity                                 | graphQL
    ${[FundingSourceFlagsEntity.Unfunded]} | ${[FundingSourceFlagsGraphQL.Unfunded]}
    ${[FundingSourceFlagsEntity.Refresh]}  | ${[FundingSourceFlagsGraphQL.Refresh]}
  `(
    'should transform entity ($entity) to graphQL ($graphQL)',
    ({ entity, graphQL }) => {
      expect(FundingSourceFlagsTransformer.toGraphQL(entity)).toStrictEqual(
        graphQL,
      )
    },
  )

  it.each`
    graphQL                                 | entity
    ${[FundingSourceFlagsGraphQL.Unfunded]} | ${[FundingSourceFlagsEntity.Unfunded]}
    ${[FundingSourceFlagsGraphQL.Refresh]}  | ${[FundingSourceFlagsEntity.Refresh]}
  `(
    'should transform graphQL ($graphQL) to entity ($entity)',
    ({ graphQL, entity }) => {
      expect(FundingSourceFlagsTransformer.toEntity(graphQL)).toStrictEqual(
        entity,
      )
    },
  )
})
