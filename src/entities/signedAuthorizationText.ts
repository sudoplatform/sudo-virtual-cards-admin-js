import { Agreement } from './agreement'

export interface SignedAuthorizationText
  extends Pick<Agreement, 'content' | 'contentType' | 'language'> {
  data: string
  signature: string
  algorithm: string
  keyId: string
}
