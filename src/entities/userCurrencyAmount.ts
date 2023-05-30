/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface UserCurrencyAmount {
  /**
   * Currency of currency amount.
   */
  currency: string
  /**
   * Amount of currency amount in currency's decimal unit.
   */
  amount: number
}
