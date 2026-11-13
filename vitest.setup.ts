/*
 * Copyright © 2023 Anonyome Labs, Inc. All rights reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// Node 22 provides native `fetch`, `crypto` (WebCrypto), `TextEncoder` and
// `TextDecoder`, so the previous isomorphic-fetch / isomorphic-webcrypto /
// node-fetch polyfills used under the jsdom Jest environment are no longer
// required.

import { afterEach, vi } from 'vitest'

afterEach(() => {
  vi.clearAllMocks()
})
