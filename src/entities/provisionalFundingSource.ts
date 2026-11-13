/*
 * Copyright © 2026 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CardType } from './cardType'
import { CommonObject } from './commonObject'
import { FundingSourceType } from './fundingSourceType'
import { ProvisionalFundingSourceState } from './provisionalFundingSourceState'
import { StateReason } from './stateReason'

/**
 * Domain-level representation of a ProvisionalFundingSource type.
 *
 * Excludes sensitive provisioning/completion material and only exposes
 * attributes useful for administrative listing and deletion decisions.
 *
 * @interface ProvisionalFundingSource
 */
export interface ProvisionalFundingSource extends CommonObject {
  /**
   * State of this provisional funding source.
   */
  state: ProvisionalFundingSourceState
  /**
   * Reason for the state of this provisional funding source.
   */
  stateReason: StateReason
  /**
   * Type of the funding source being provisioned.
   */
  type: FundingSourceType
  /**
   * Name of the funding source provider.
   */
  providerName: string
  /**
   * Currency of this provisional funding source.
   */
  currency: string
  /**
   * Last four digits of the card after setup completes or fails, if known.
   */
  last4?: string
  /**
   * Type of card, if known.
   */
  cardType?: CardType
}
