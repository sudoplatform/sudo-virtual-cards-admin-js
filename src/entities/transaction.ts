/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Merchant } from './merchant'
import { TransactionDetail } from './transactionDetail'
import { TransactionType } from './transactionType'
import { UserCurrencyAmount } from './userCurrencyAmount'

export interface Transaction {
  /**
   * ID of the object.
   */
  id: string
  /**
   * ID of the user which owns the object.
   */
  owner: string
  /**
   * Time when object was created.
   */
  createdAt: Date
  /**
   * Time when object was last updated.
   */
  updatedAt: Date
  /**
   * Type of this transaction.
   */
  type: TransactionType
  /**
   * Time at which transaction occurred.
   */
  transactedAt: Date
  /**
   * Amount of this transaction as billed to the card in
   * the card's denominated currency.
   */
  billedAmount: UserCurrencyAmount
  /**
   * Amount of this transaction as charged by the merchant
   * in the merchant's currency.
   */
  transactedAmount: UserCurrencyAmount
  /**
   * Details excluding the name of the merchant.
   */
  merchant: Merchant
  /**
   * Decline reason if transaction of type DECLINE.
   */
  declineReason?: string
  /**
   * List of details about this transaction depending on
   * transaction type.
   * Pending, complete and refund transactions will always
   * have detail.
   * Decline will have detail if an attempt was made to
   * charge the funding source.
   */
  detail?: TransactionDetail[]
}
