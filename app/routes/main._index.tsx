import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { sleep } from "~/lib/utils";

export async function loader() {
  await sleep(4000);
  return null;
}

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full h-16 flex items-center justify-between px-4 bg-white dark:bg-gray-800 ">
        <Link
          className="flex items-center gap-2 font-semibold text-lg"
          to={"/"}
        >
          <span>CodeReview</span>
        </Link>
        <div className="flex items-center gap-4">
          <form className="relative">
            <Input
              className="pl-10 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
              placeholder="Search code reviews..."
              type="search"
            />
          </form>

          <Avatar className="h-9 w-9">
            <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
            <AvatarFallback>JP</AvatarFallback>
          </Avatar>
        </div>
      </header>
    </div>
  );
}
