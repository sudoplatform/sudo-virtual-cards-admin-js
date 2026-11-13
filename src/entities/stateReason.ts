/*
 * Copyright © 2026 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Reason for the current state of an object such as a virtual card
 * or provisional funding source.
 */
export enum StateReason {
  User = 'USER',
  Admin = 'ADMIN',
  Entitlement = 'ENTITLEMENT',
  Locked = 'LOCKED',
  Unlocked = 'UNLOCKED',
  Suspicious = 'SUSPICIOUS',
  Processing = 'PROCESSING',
  Deletion = 'DELETION',
  Unknown = 'UNKNOWN',
}
