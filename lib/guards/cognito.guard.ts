import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AbstractCognitoGuard } from 'nestjs-cognito';

@Injectable()
export class CognitoGuard extends AbstractCognitoGuard {
  public getRequest(context: ExecutionContext): any {
    const ctx = GqlExecutionContext.create(context).getContext();
    return ctx.req;
  }
}
