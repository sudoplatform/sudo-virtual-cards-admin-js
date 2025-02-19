/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Domain-level representation of a Card type.
 *
 * @interface CardType
 */
export enum CardType {
  Credit = 'CREDIT',
  Debit = 'DEBIT',
  Prepaid = 'PREPAID',
  Other = 'OTHER',
}
