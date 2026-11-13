/*
 * Copyright © 2026 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ProvisionalFundingSourceStateTransformer } from './provisionalFundingSourceStateTransformer'
import { ProvisionalFundingSourceState as ProvisionalFundingSourceStateEntity } from '../../../entities/provisionalFundingSourceState'
import { ProvisionalFundingSourceState as ProvisionalFundingSourceStateGraphQL } from '../../../gen/graphqlTypes'

describe('ProvisionalFundingSourceStateTransformer tests', () => {
  it.each`
    entity                                              | graphQL
    ${ProvisionalFundingSourceStateEntity.Provisioning} | ${ProvisionalFundingSourceStateGraphQL.Provisioning}
    ${ProvisionalFundingSourceStateEntity.Pending}      | ${ProvisionalFundingSourceStateGraphQL.Pending}
    ${ProvisionalFundingSourceStateEntity.Provisioned}  | ${ProvisionalFundingSourceStateGraphQL.Provisioned}
    ${ProvisionalFundingSourceStateEntity.Completed}    | ${ProvisionalFundingSourceStateGraphQL.Completed}
    ${ProvisionalFundingSourceStateEntity.Failed}       | ${ProvisionalFundingSourceStateGraphQL.Failed}
  `(
    'should transform entity ($entity) to graphQL ($graphQL)',
    ({ entity, graphQL }) => {
      expect(
        ProvisionalFundingSourceStateTransformer.toGraphQL(entity),
      ).toStrictEqual(graphQL)
    },
  )

  it.each`
    graphQL                                              | entity
    ${ProvisionalFundingSourceStateGraphQL.Provisioning} | ${ProvisionalFundingSourceStateEntity.Provisioning}
    ${ProvisionalFundingSourceStateGraphQL.Pending}      | ${ProvisionalFundingSourceStateEntity.Pending}
    ${ProvisionalFundingSourceStateGraphQL.Provisioned}  | ${ProvisionalFundingSourceStateEntity.Provisioned}
    ${ProvisionalFundingSourceStateGraphQL.Completed}    | ${ProvisionalFundingSourceStateEntity.Completed}
    ${ProvisionalFundingSourceStateGraphQL.Failed}       | ${ProvisionalFundingSourceStateEntity.Failed}
  `(
    'should transform graphQL ($graphQL) to entity ($entity)',
    ({ graphQL, entity }) => {
      expect(
        ProvisionalFundingSourceStateTransformer.toEntity(graphQL),
      ).toStrictEqual(entity)
    },
  )
})
