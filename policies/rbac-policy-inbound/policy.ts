import { HttpProblems, ZuploContext, ZuploRequest } from "@zuplo/runtime";

interface PolicyOptions {
  allowedRoles: string[];
}

export default async function (
  request: ZuploRequest,
  context: ZuploContext,
  options: PolicyOptions,
  policyName: string,
) {
  // Check that an authenticated user is set
  // NOTE: This policy requires an authentication policy to run before
  if (!request.user) {
    context.log.error(
      "User isn't authenticated. A authorization policy must come before the RBAC policy.",
    );
    return HttpProblems.unauthorized(request, context);
  }

  // Check that the user has roles
  if (!request.user.data.roles) {
    context.log.error("The user isn't assigned any roles.");
    return HttpProblems.unauthorized(request, context);
  }

  // Check that the user has one of the allowed roles
  if (
    !options.allowedRoles.some((allowedRole) =>
      request.user?.data.roles.includes(allowedRole),
    )
  ) {
    context.log.error(
      `The user '${request.user.sub}' isn't authorized to perform this action.`,
    );
    return HttpProblems.forbidden(request, context);
  }

  // If they made it here, they are authorized
  return request;
}
