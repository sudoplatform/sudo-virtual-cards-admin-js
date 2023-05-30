/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { EntityDataFactory } from '../../../util/data-factory/entity'
import { GraphQLDataFactory } from '../../../util/data-factory/graphQl'
import { SignedAuthorizationTextTransformer } from './signedAuthorizationTextTransformer'

describe('SignedAuthorizationTextTransformer tests', () => {
  it('should transform from entity to graphql', () => {
    expect(
      SignedAuthorizationTextTransformer.toGraphQL(
        EntityDataFactory.signedAuthorizationText,
      ),
    ).toEqual(GraphQLDataFactory.signedAuthorizationText)
  })

  it('should transform from graphql to entity', () => {
    expect(
      SignedAuthorizationTextTransformer.toEntity(
        GraphQLDataFactory.signedAuthorizationText,
      ),
    ).toEqual(EntityDataFactory.signedAuthorizationText)
  })
})
