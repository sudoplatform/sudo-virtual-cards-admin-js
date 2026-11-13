/*
 * Copyright © 2026 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { StateReasonTransformer } from './stateReasonTransformer'
import { StateReason as StateReasonEntity } from '../../../entities/stateReason'
import { StateReason as StateReasonGraphQL } from '../../../gen/graphqlTypes'

describe('StateReasonTransformer tests', () => {
  it.each`
    entity                           | graphQL
    ${StateReasonEntity.User}        | ${StateReasonGraphQL.User}
    ${StateReasonEntity.Admin}       | ${StateReasonGraphQL.Admin}
    ${StateReasonEntity.Entitlement} | ${StateReasonGraphQL.Entitlement}
    ${StateReasonEntity.Locked}      | ${StateReasonGraphQL.Locked}
    ${StateReasonEntity.Unlocked}    | ${StateReasonGraphQL.Unlocked}
    ${StateReasonEntity.Suspicious}  | ${StateReasonGraphQL.Suspicious}
    ${StateReasonEntity.Processing}  | ${StateReasonGraphQL.Processing}
    ${StateReasonEntity.Deletion}    | ${StateReasonGraphQL.Deletion}
    ${StateReasonEntity.Unknown}     | ${StateReasonGraphQL.Unknown}
  `(
    'should transform entity ($entity) to graphQL ($graphQL)',
    ({ entity, graphQL }) => {
      expect(StateReasonTransformer.toGraphQL(entity)).toStrictEqual(graphQL)
    },
  )

  it.each`
    graphQL                           | entity
    ${StateReasonGraphQL.User}        | ${StateReasonEntity.User}
    ${StateReasonGraphQL.Admin}       | ${StateReasonEntity.Admin}
    ${StateReasonGraphQL.Entitlement} | ${StateReasonEntity.Entitlement}
    ${StateReasonGraphQL.Locked}      | ${StateReasonEntity.Locked}
    ${StateReasonGraphQL.Unlocked}    | ${StateReasonEntity.Unlocked}
    ${StateReasonGraphQL.Suspicious}  | ${StateReasonEntity.Suspicious}
    ${StateReasonGraphQL.Processing}  | ${StateReasonEntity.Processing}
    ${StateReasonGraphQL.Deletion}    | ${StateReasonEntity.Deletion}
    ${StateReasonGraphQL.Unknown}     | ${StateReasonEntity.Unknown}
  `(
    'should transform graphQL ($graphQL) to entity ($entity)',
    ({ graphQL, entity }) => {
      expect(StateReasonTransformer.toEntity(graphQL)).toStrictEqual(entity)
    },
  )
})
