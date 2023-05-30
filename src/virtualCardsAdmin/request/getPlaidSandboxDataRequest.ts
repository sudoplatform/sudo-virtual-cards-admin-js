/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Input containing information required to get sandbox data needed to complete bank account
 * funding source provisioning in a sandbox context from Plaid.
 *
 * @property {string} institutionId Identifier of the sandbox institution to retrieve data.
 * @property {string} username The username linked to a custom sandbox user account.
 */
export interface GetPlaidSandboxDataRequest {
  institutionId: string
  username: string
}
