/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * State of funding sources.
 *
 * Funding sources go through a 2 stage creation process after which they enter
 * an Active state. User's may deactivate them to prevent new charges occurring
 * on that funding source e.g. when changing credit cards or bank accounts to be used
 * for funding virtual card transactions.
 *
 * Once Inactive, they cannot be made Active again.
 *
 * @enum FundingSourceState
 */
export enum FundingSourceState {
  Active = 'ACTIVE', // Funding source has completed setup and is active
  Inactive = 'INACTIVE', // Funding source is inactive
}
