/*
 * Copyright © 2026 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { UserCurrencyAmount } from '../../entities/userCurrencyAmount'

export interface RefundServiceFeeForVirtualCardRequest {
  /** ID of the fee to refund. */
  feeId: string
  /** Amount to refund. Must be less than or equal to the fee amount. */
  amount: UserCurrencyAmount
}
