import {
  CanActivate,
  ExecutionContext,
  Injectable,
  mixin,
  Type,
} from '@nestjs/common';
import { AuthorizationOptions, memoize, User } from 'nestjs-cognito';
import { AuthenticationGuard } from '../authentication/authentication.guard';

const createAuthorizationGuard = (
  options?: AuthorizationOptions,
): Type<CanActivate> => {
  @Injectable()
  class AuthorizationGuardMixin
    extends AuthenticationGuard
    implements CanActivate
  {
    /**
     * @param context - The execution context
     * @returns {boolean} - True if the user has roles which respect the options
     * @memberof AuthorizationGuard
     */
    public async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const request = this.getRequest(context);
      const user: User = await this.cognitoService.getUserGroups(
        this.getAuthenticatedUser(request),
      );

      return this.validatorService.validate(user, options);
    }
  }

  return mixin(AuthorizationGuardMixin);
};

export const AuthorizationGuard = memoize(createAuthorizationGuard);
