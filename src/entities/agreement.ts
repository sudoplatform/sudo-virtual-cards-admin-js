export interface Agreement {
  /**
   * The content of the agreement.
   */
  content: string
  /**
   * The content type (MIME type) of the agreement.
   */
  contentType: string
  /**
   * The algorithm used to calculate the hash of the agreement.
   */
  hashAlgorithm: 'SHA-256'
  /**
   * The base64 encoded hash of the content calculated using the algorithm
   * specified in {@link hashAlgorithm}.
   */
  hash: string
  /**
   * The RFC 5646 language tag.
   */
  language: string
}
