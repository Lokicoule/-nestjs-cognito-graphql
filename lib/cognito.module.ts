import { DynamicModule, Module } from '@nestjs/common';
import {
  CognitoModule,
  CognitoModuleAsyncOptions,
  CognitoModuleOptions,
  CognitoService,
} from 'nestjs-cognito';
import { CognitoGuard } from './guards/cognito.guard';

@Module({
  providers: [CognitoGuard, CognitoService],
  exports: [CognitoGuard, CognitoService],
})
export class CognitoGraphQLModule {
  static register(config: CognitoModuleOptions): DynamicModule {
    return {
      module: CognitoGraphQLModule,
      imports: [CognitoModule.register(config)],
    };
  }

  static registerAsync(options: CognitoModuleAsyncOptions): DynamicModule {
    return {
      module: CognitoGraphQLModule,
      imports: [
        ...(options.imports || []),
        CognitoModule.registerAsync(options),
      ],
      providers: [...(options.extraProviders || [])],
    };
  }
}
