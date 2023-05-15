import { SignedAuthorizationTextTransformer } from './signedAuthorizationTextTransformer'
import { SignedAuthorizationText as SignedAuthorizationTextEntity } from '../../../entities/signedAuthorizationText'
import { SignedAuthorizationText as SignedAuthorizationTextGraphQL } from '../../../gen/graphqlTypes'

const content = 'mock-content'
const contentType = 'mock-content-type'
const language = 'english'
const data = 'mock-data'
const signature = 'mock-signature'
const algorithm = 'sha256'
const keyId = 'mock-key-id'

export const defaultSignedAuthorizationTextEntity: SignedAuthorizationTextEntity =
  {
    content,
    contentType,
    language,
    data,
    signature,
    algorithm,
    keyId,
  }

export const defaultSignedAuthorizationTextGraphQL: SignedAuthorizationTextGraphQL =
  {
    __typename: 'SignedAuthorizationText',
    content,
    contentType,
    language,
    data,
    signature,
    algorithm,
    keyId,
  }

describe('SignedAuthorizationTextTransformer tests', () => {
  it('should transform from entity to graphql', () => {
    expect(
      SignedAuthorizationTextTransformer.toGraphQL(
        defaultSignedAuthorizationTextEntity,
      ),
    ).toEqual(defaultSignedAuthorizationTextGraphQL)
  })

  it('should transform from graphql to entity', () => {
    expect(
      SignedAuthorizationTextTransformer.toEntity(
        defaultSignedAuthorizationTextGraphQL,
      ),
    ).toEqual(defaultSignedAuthorizationTextEntity)
  })
})
