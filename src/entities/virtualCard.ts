/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CardState } from './cardState'
import { CommonObject } from './commonObject'
import { Owner } from './owner'

/**
 * Domain-level representation of a VirtualCard type.
 *
 * @interface VirtualCard
 */
export interface VirtualCard extends CommonObject {
  /**
   * Public key encryption algorithm specifier. See Sudo Platform
   * documentation for set of allowed values.
   */
  algorithm: string
  /**
   * Client generated key ID for the public key.
   */
  keyId: string
  /**
   * Client generated key ring ID for the public key ring used
   * for sealing this card and transactions information for this
   * card.
   */
  keyRingId: string
  /**
   * Array of owner Ids that are extracted from the owner proofs
   * to tie a virtual card to a Sudo.
   */
  owners: Owner[]
  /**
   * ID of funding source that will be used to fund activity on
   * the card.
   */
  fundingSourceId: string
  /**
   * A representation of the currency of the virtual card
   * (i.e. USD, CAD, AUD).
   */
  currency: string
  /**
   * State of virtual card which define incomplete, provisioning
   * and expiry processing of # virtual cards.
   */
  state: CardState
  /**
   * Date of which the virtual card will no longer be valid in
   * system.
   */
  activeTo: Date
  /**
   * Date the card was cancelled.
   */
  cancelledAt?: Date
  /**
   * Last 4 digits of card number.
   */
  last4: string
}
