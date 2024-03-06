/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { BankAccountType } from './bankAccountType'
import { CommonObject } from './commonObject'
import { FundingSourceState } from './fundingSourceState'
import { SignedAuthorizationText } from './signedAuthorizationText'
import { FundingSourceFlags } from './fundingSourceFlags'

/**
 * Domain-level representation of an admin Bank Account Funding Source.
 *
 * @export
 * @interface BankAccountFundingSource
 */
export interface BankAccountFundingSource extends CommonObject {
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
   */
  fingerprint: string
  /**
   * Last 4 digits of bank account number.
   */
  last4: string
  /**
   * Bank account type.
   */
  bankAccountType: BankAccountType
  /**
   * The signed authorization providing authority to transact on the bank account.
   */
  authorization: SignedAuthorizationText
}
