/*
 * Copyright © 2026 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Reason a service fee was charged against a virtual card.
 */
export enum FeeReason {
  InsufficientFunds = 'INSUFFICIENT_FUNDS',
  FundingAccountClosed = 'FUNDING_ACCOUNT_CLOSED',
  FundingDispute = 'FUNDING_DISPUTE',
  VirtualCardDispute = 'VIRTUAL_CARD_DISPUTE',
  ReclaimAbandonedTransaction = 'RECLAIM_ABANDONED_TRANSACTION',
}
