import { LoaderFunctionArgs } from "@remix-run/node";
import { eventStream } from "remix-utils/sse/server";
import { db } from "~/db/db.server";
import { emitter } from "~/utils/emitter.server";

export async function loader({ request }: LoaderFunctionArgs) {
  return eventStream(request.signal, (send) => {
    // const interval = setInterval(() => {
    //   send({
    //     data: String(Date.now()),
    //   });
    // }, 2000);

    // return () => {
    //   clearInterval(interval);

    // };

    const handle = async (message: string) => {
      const data = await db.code.findFirst();

      send({
        data: data?.code || "",
      });
    };
    emitter.addListener("message", handle);

    return () => {
      emitter.removeListener("message", handle);
    };
  });
}
