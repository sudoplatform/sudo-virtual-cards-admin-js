/*
 * Copyright © 2026 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { FeeReason } from '../../entities/feeReason'
import { UserCurrencyAmount } from '../../entities/userCurrencyAmount'

export interface ChargeServiceFeeForVirtualCardRequest {
  /** Reason the fee is being charged. */
  feeReason: FeeReason
  /** Raw transaction ID of the debit or credit causing the fee. */
  causeId: string
  /** Amount of the fee to charge. */
  amount: UserCurrencyAmount
}
