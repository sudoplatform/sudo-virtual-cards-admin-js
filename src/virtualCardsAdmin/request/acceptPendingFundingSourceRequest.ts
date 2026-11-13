/*
 * Copyright © 2026 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AcceptPendingFundingSourceRequest {
  /** ID of the pending funding source to accept. */
  id: string
  /** Optional identity options to apply to the accepted funding source. */
  identityOptions?: {
    fingerprint?: string
  }
  /**
   * Optional flag to indicate whether to automatically update cards that have
   * an inactive funding source with the new funding source. Defaults to true
   * on the service.
   */
  updateCardFundingSource?: boolean
}
