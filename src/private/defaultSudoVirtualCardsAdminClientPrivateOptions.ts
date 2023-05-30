/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AdminApiClient } from '../adminApiClient'
import { DefaultSudoVirtualCardsAdminClientOptions } from '../virtualCardsAdmin/virtualCardsAdminClient'

export interface DefaultSudoVirtualCardsAdminClientPrivateOptions
  extends DefaultSudoVirtualCardsAdminClientOptions {
  adminApiClient?: AdminApiClient
}
