/*
 * Copyright © 2026 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AssignFundingSourceToVirtualCardRequest {
  /**
   * ID of the owner (sub) of both the virtual card and the funding source.
   * The request is rejected if either does not belong to this owner.
   */
  owner: string
  /** ID of the virtual card to assign the funding source to. The card must be in the ISSUED state. */
  cardId: string
  /**
   * ID of the funding source to assign. The funding source must be ACTIVE and
   * have the same currency as the virtual card.
   */
  fundingSourceId: string
}
