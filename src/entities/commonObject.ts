/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CommonObject {
  /**
   * ID of the object.
   */
  id: string
  /**
   * ID of the user which owns the object.
   */
  owner: string
  /**
   * Update version of the object.
   */
  version: number
  /**
   * Date when object was created.
   */
  createdAt: Date
  /**
   * Date when object was last updated.
   */
  updatedAt: Date
}
