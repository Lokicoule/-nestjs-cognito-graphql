import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AbstractCognitoGuard } from 'nestjs-cognito';

@Injectable()
export class CognitoGuard extends AbstractCognitoGuard {
  /**
   * Get the request from the context
   * @param {ExecutionContext} context - The context
   * @returns {Request} - The request
   * @memberof CognitoGuard
   */
  public getRequest(context: ExecutionContext): any {
    const ctx = GqlExecutionContext.create(context).getContext();
    return ctx.req;
  }
}
