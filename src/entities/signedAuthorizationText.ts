/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Agreement } from './agreement'

export interface SignedAuthorizationText
  extends Pick<Agreement, 'content' | 'contentType' | 'language'> {
  data: string
  signature: string
  algorithm: string
  keyId: string
}
