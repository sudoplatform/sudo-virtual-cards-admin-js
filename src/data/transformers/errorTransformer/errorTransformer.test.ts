/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  IllegalArgumentError,
  ServiceError,
  VersionMismatchError,
} from '@sudoplatform/sudo-common'
import { v4 } from 'uuid'
import { CardNotFoundError } from '../../../global/error'
import { ErrorTransformer } from './errorTransformer'

class InstanceUnderTest extends ErrorTransformer {}

describe('ErrorTransformer tests', () => {
  const errorMsg = v4()

  it.each`
    appSyncErrorType                                  | expectedErrorType
    ${'DynamoDB:ConditionalCheckFailedException'}
    ${new VersionMismatchError()}
    ${'sudoplatform.InvalidArgumentError'}
    ${new IllegalArgumentError()}
    ${'sudoplatform.ServiceError'}
    ${new ServiceError(errorMsg)}
    ${'sudoplatform.virtual-cards.CardNotFoundError'}
    ${new CardNotFoundError(errorMsg)}
  `(
    'converts $appSyncErrorType to $expectedErrorType',
    ({ appSyncErrorType, expectedErrorType }) => {
      const error = { errorType: appSyncErrorType, message: errorMsg } as any
      expect(InstanceUnderTest.toClientError(error)).toStrictEqual(
        expectedErrorType,
      )
    },
  )
})
