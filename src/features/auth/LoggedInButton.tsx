import { baseAuth } from "@/auth/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LoggedInDropdown } from "./LoggedInDropdown";
import { SignInButton } from "./SignInButton";

export type LoggedInButtonProps = {};

export const LoggedInButton = async (props: LoggedInButtonProps) => {
  const session = await baseAuth();
  if (!session?.user) {
    return <SignInButton />;
  }
  return (
    <LoggedInDropdown>
      <Button variant="outline" size="sm">
        <Avatar className="size-6">
          <AvatarFallback>{session.user.name}</AvatarFallback>
          {session.user.image ? (
            <AvatarImage
              src={session.user.image}
              alt={`${session.user.name ?? "-"}'s profile picture`}
            />
          ) : null}
        </Avatar>
      </Button>
    </LoggedInDropdown>
  );
};
