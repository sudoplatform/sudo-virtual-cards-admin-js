/*
 * Copyright © 2026 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface DeleteVirtualCardsDataRequest {
  /** ID of the owner whose virtual cards data should be deleted. */
  owner: string
  /** Type of deletion to perform. */
  deletionType: string
  /** Optional date since which the owner must have been inactive. */
  inactiveSince?: Date
}
