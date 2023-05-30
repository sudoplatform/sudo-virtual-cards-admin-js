/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { PlaidAccountMetadata } from '../../entities/plaidAccountMetadata'

export interface GetPlaidSandboxDataResponse {
  accountMetadata: PlaidAccountMetadata[]
  publicToken: string
}
