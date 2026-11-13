/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  mapGraphQLToClientError,
  VersionMismatchError,
} from '@sudoplatform/sudo-common'
import { CardNotFoundError, UnknownTimeZoneError } from '../../../global/error'
import { GraphQLError } from 'graphql'

export class ErrorTransformer {
  static toClientError(
    error:
      { errorType: string; errorInfo?: string; message: string } | GraphQLError,
  ): Error {
    const errorType = 'errorType' in error ? error.errorType : error.message
    switch (errorType) {
      case 'DynamoDB:ConditionalCheckFailedException':
        return new VersionMismatchError()
      case 'sudoplatform.UnknownTimeZoneError':
        return new UnknownTimeZoneError(error.message)
      case 'sudoplatform.virtual-cards.CardNotFoundError':
        return new CardNotFoundError(error.message)
      default:
        return mapGraphQLToClientError(error)
    }
  }
}
