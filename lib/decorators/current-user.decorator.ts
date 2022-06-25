import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { CognitoUser, COGNITO_USER_CONTEXT_PROPERTY } from 'nestjs-cognito';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): CognitoUser => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req[COGNITO_USER_CONTEXT_PROPERTY];
  },
);
