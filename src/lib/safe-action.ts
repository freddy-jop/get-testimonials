import { currentUser } from "@/auth/current-user";
import { createSafeActionClient } from "next-safe-action";

export class ActionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ActionError";
  }
}

const handleReturnedServerError = (error: Error) => {
  if (error instanceof ActionError) {
    return error.message;
  }
  return "An unexpected error occurred";
};

export const action = createSafeActionClient({
  handleReturnedServerError: handleReturnedServerError,
});

export const userAction = action.use(async ({ next }) => {
  const user = await currentUser();

  if (!user) {
    throw new ActionError("You must be logged in");
  }

  return next({ ctx: { user } });
});
