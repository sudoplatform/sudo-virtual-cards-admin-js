/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AppSyncError,
  mapGraphQLToClientError,
  VersionMismatchError,
} from '@sudoplatform/sudo-common'
import { CardNotFoundError, UnknownTimeZoneError } from '../../../global/error'

export class ErrorTransformer {
  static toClientError(error: AppSyncError): Error {
    switch (error.errorType) {
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
