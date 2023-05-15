/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

class VirtualCardsAdminError extends Error {
  constructor(msg?: string) {
    super(msg)
    this.name = this.constructor.name
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

export class UnknownTimeZoneError extends VirtualCardsAdminError {
  constructor(msg?: string) {
    super(msg)
  }
}

export class CardNotFoundError extends VirtualCardsAdminError {
  constructor(msg?: string) {
    super(msg)
  }
}
