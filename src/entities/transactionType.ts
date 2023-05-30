/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export enum TransactionType {
  Chargeback = 'CHARGEBACK',
  Complete = 'COMPLETE',
  Decline = 'DECLINE',
  Pending = 'PENDING',
  Refund = 'REFUND',
  Reversal = 'REVERSAL',
}
