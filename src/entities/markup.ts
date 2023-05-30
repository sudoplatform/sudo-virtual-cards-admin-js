/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Representation of a markup formula.
 */
export interface Markup {
  /**
   * Floating point percentage amount applied in calculating
   * total markup multiple by 1000. For example: 2990 for 2.99%.
   * 1/1000th of a percent is the smallest granularity that can be
   * represented.
   */
  percent: number
  /**
   * Flat amount applied in calculating total markup in minor currency
   * unit of billed currency in containing transaction detail.
   * e.g. 31 for $0.31
   */
  flat: number
  /**
   * The minimum charge that will be made to the funding source. For example,
   * if a small charge of $0.10 were made with a 2.99%+$0.31 fee formula
   * then the resultant fee would be $0.31 cents resulting in an expected
   * funding source charge of $0.41 cents. If minCharge is set and more
   * than this amount then the minCharge will be charged instead.
   */
  minCharge?: number
}
