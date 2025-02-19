/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonObject } from './commonObject'
import { FundingSourceState } from './fundingSourceState'
import { CreditCardNetwork } from './creditCardNetwork'
import { CardType } from './cardType'
import { FundingSourceFlags } from './fundingSourceFlags'

/**
 * Domain-level representation of an admin Credit Card Funding Source.
 *
 * @interface CreditCardFundingSource
 */
export interface CreditCardFundingSource extends CommonObject {
  /**
   * Current state of funding source.
   */
  state: FundingSourceState
  /**
   * Any flags which apply to this funding source.
   */
  flags: FundingSourceFlags[]
  /**
   * Currency that funding source is denominated in.
   */
  currency: string
  /**
   * Contains the unique fingerprint of a funding source.
   *
   * This is calculated on creation of the funding source (completeFundingSource).
   * Fingerprint is intentionally obfuscated from the user and client and will
   * be null if it is received/retrieved by any means that is NOT from the data
   * source itself.
   *
   * @type {string}
   */
  fingerprint: string
  /**
   * Last 4 digits of a user's credit card.
   */
  last4: string
  /**
   * Card network of a funding source.
   */
  network: CreditCardNetwork
  /**
   * Card type.
   */
  cardType: CardType
}
