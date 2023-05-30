/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CardState } from './cardState'
import { TransactionConnection } from './transactionConnection'

/**
 * Domain-level representation of a TransactionResponse.
 *
 * @export
 * @interface TransactionResponse
 */
export interface TransactionResponse {
  /**
   * ID of card data is returned for.
   */
  id: string
  /**
   * State of virtual card which define issued, failed
   * and closed states of virtual cards.
   */
  cardState: CardState
  /**
   * Last 4 digits of card number.
   */
  last4: string
  /**
   * List of paginated transactions.
   */
  transactions: TransactionConnection
}
