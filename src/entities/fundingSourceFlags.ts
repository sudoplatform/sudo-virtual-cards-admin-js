/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Flags associated with funding sources.
 *
 * UNFUNDED - a funding source flagged as unfunded applies limited velocities across
 *            all of the user's funding sources.
 * REFRESH -  Funding source requires a provider-specific refresh.
 *
 * @enum FundingSourceFlags
 */
export enum FundingSourceFlags {
  Unfunded = 'UNFUNDED',
  Refresh = 'REFRESH',
}
