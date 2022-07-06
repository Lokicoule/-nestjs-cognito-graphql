import { CognitoIdentityProvider } from '@aws-sdk/client-cognito-identity-provider';
import { Test } from '@nestjs/testing';
import {
  CognitoModuleOptions,
  CognitoModuleOptionsFactory,
  COGNITO_INSTANCE_TOKEN,
} from 'nestjs-cognito';
import { CognitoGraphQLModule } from './cognito-graphql.module';

describe('CognitoGraphQLModule', () => {
  describe('register', () => {
    it('should provide the cognito identity provider', async () => {
      const module = await Test.createTestingModule({
        imports: [
          CognitoGraphQLModule.register({
            region: 'us-east-1',
            credentials: {
              accessKeyId: 'accessKey',
              secretAccessKey: 'secretAccessKey',
            },
            UserPoolId: 'UserPoolId',
          }),
        ],
      }).compile();

      const cognito = module.get<CognitoIdentityProvider>(
        COGNITO_INSTANCE_TOKEN,
      );
      expect(cognito).toBeDefined();
    });
  });

  describe('registerAsync', () => {
    describe('when the `useFactory` option is used', () => {
      it('should provide the cognito identity provider', async () => {
        const module = await Test.createTestingModule({
          imports: [
            CognitoGraphQLModule.registerAsync({
              useFactory: () => ({
                region: 'us-east-1',
                credentials: {
                  accessKeyId: 'accessKey',
                  secretAccessKey: 'secretAccessKey',
                },
                UserPoolId: 'UserPoolId',
              }),
            }),
          ],
        }).compile();

        const cognito = module.get<CognitoIdentityProvider>(
          COGNITO_INSTANCE_TOKEN,
        );
        expect(cognito).toBeDefined();
      });
    });

    describe('when the `useClass` option is used', () => {
      it('should provide cognito identity provider', async () => {
        const module = await Test.createTestingModule({
          imports: [
            CognitoGraphQLModule.registerAsync({
              useClass: class TestService
                implements CognitoModuleOptionsFactory
              {
                createCognitoModuleOptions(): CognitoModuleOptions {
                  return {
                    region: 'us-east-1',
                    credentials: {
                      accessKeyId: 'accessKey',
                      secretAccessKey: 'secretAccessKey',
                    },
                    UserPoolId: 'UserPoolId',
                  };
                }
              },
            }),
          ],
        }).compile();

        const cognito = module.get<CognitoIdentityProvider>(
          COGNITO_INSTANCE_TOKEN,
        );
        expect(cognito).toBeDefined();
      });
    });
  });
});
