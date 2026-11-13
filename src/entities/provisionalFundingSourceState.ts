/*
 * Copyright © 2026 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * State of a provisional funding source.
 *
 * @enum ProvisionalFundingSourceState
 */
export enum ProvisionalFundingSourceState {
  /** Provisional funding source setup has commenced. */
  Provisioning = 'PROVISIONING',
  /** Provisional funding source setup is pending review. */
  Pending = 'PENDING',
  /** Provisional funding source setup has progressed and is ready for completion. */
  Provisioned = 'PROVISIONED',
  /** Provisional funding source setup is complete. */
  Completed = 'COMPLETED',
  /** Provisional funding source is in a failed state. */
  Failed = 'FAILED',
}
