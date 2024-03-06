/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Flags associated with funding sources.
 *
 * UNFUNDED - a funding source flagged as unfunded prevents the user from transacting
 *            on any of their funding sources.
 *
 * @export
 * @enum FundingSourceFlags
 */
export enum FundingSourceFlags {
  Unfunded = 'UNFUNDED', // Funding source is unfunded and restricted velocities apply
}
