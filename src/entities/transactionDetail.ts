/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CreditCardNetwork } from './creditCardNetwork'
import { Markup } from './markup'
import { UserCurrencyAmount } from './userCurrencyAmount'

/**
 * Domain-level representation of an TransactionDetail.
 *
 * Depending on transaction type will detail
 * things like fees, real credit card transaction details etc.
 *
 * @export
 * @interface TransactionDetail
 */
export interface TransactionDetail {
  /**
   * Amount merchant charged virtual card.
   */
  virtualCardAmount: UserCurrencyAmount
  /**
   * Markup formula applied to billedAmount.
   */
  markup: Markup
  /**
   * Amount of the service fee applied to the transacted amount.
   */
  serviceFee: UserCurrencyAmount
  /**
   * ID of funding source that funded this item.
   */
  fundingSourceId: string
  /**
   * Amount charged or refunded to the funding source.
   */
  fundingSourceAmount: UserCurrencyAmount
  /**
   * Last 4 digits of a user's credit card.
   */
  fundingSourceLast4: string
  /**
   * Card network of a funding source.
   */
  fundingSourceNetwork: CreditCardNetwork
}
