import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AbstractGuard } from 'nestjs-cognito';

@Injectable()
export class AuthenticationGuard extends AbstractGuard {
  /**
   * Get the request from the context
   * @param {ExecutionContext} context - The context
   * @returns {Request} - The request
   * @memberof AuthenticationGuard
   */
  public getRequest(context: ExecutionContext): any {
    const ctx = GqlExecutionContext.create(context).getContext();
    return ctx.req;
  }
}
