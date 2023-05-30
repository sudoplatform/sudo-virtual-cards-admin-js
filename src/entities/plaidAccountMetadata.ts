/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PlaidAccountMetadata {
  /**
   * ID of the bank account.
   */
  accountId: string
  /**
   * Bank account subtype. E.g. checking, saving etc.
   */
  subtype?: string
}
