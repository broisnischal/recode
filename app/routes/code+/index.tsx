import { Editor, DiffEditor } from "@monaco-editor/react";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useResolvedPath,
  useRevalidator,
  useSubmit,
} from "@remix-run/react";
import { useEffect, useState } from "react";
import { db } from "~/db/db.server";
import { useEventSource } from "remix-utils/sse/react";
import { emitter } from "~/utils/emitter.server";

// import { LivePreview, LiveProvider } from "react-live";

export async function loader({ request }: LoaderFunctionArgs) {
  const code = await db.code.findFirst();

  return code;
}

export async function action({ request }: ActionFunctionArgs) {
  const formdata = await request.formData();

  const code = formdata.get("code") as string;

  console.log(code);

  const firstcode = await db.code.findFirst();

  await db.code.update({
    where: {
      id: firstcode?.id,
    },
    data: {
      code,
    },
  });

  const updatedCode = await db.code.findFirst();
  emitter.emit("message");

  return updatedCode;
}

export default function Code() {
  const defaultCode = useLoaderData<typeof loader>();
  const updatedCode = useActionData<typeof action>();
  const path = useResolvedPath("./stream");
  const submit = useSubmit();

  const [code, setCode] = useState(
    updatedCode?.code || defaultCode?.code || ""
  );
  function handleOnChange(value?: string) {
    // setCode(value || "");

    console.log(value);

    submit({ code: value || "" }, { method: "post" });
  }

  const data = useEventSource(path.pathname);
  const { revalidate } = useRevalidator();

  useEffect(() => {
    if (data) {
      revalidate();
      // setCode(updatedCode?.code || "");
    }
  }, [data]);

  useEffect(() => {
    if (updatedCode) {
      revalidate();
      console.log(updatedCode?.code);
      setCode(updatedCode?.code || "");
    }
  }, [updatedCode]);

  return (
    <div className="bg-white h-screen flex ">
      <div className="flex-1">
        <Editor
          className="h-screen"
          defaultLanguage="javascript"
          defaultValue={data as string}
          value={data as string}
          theme="vs-dark"
          options={{
            fontSize: 20,
            minimap: {
              enabled: true,
            },
            contextmenu: false,
          }}
          onChange={handleOnChange}
        />
      </div>

      {/* <div className="flex-1"> */}
      {/* {JSON.stringify(data)} */}
      {/* <DiffEditor
          theme="vs-dark"
          className="h-screen w-full"
          original={defaultCode}
          modified="console.log('hello')"
          options={{
            fontSize: 20,
            minimap: {
              enabled: true,
            },
            contextmenu: false,
          }}
        /> */}

      {/* <LiveProvider code={code}>
            <LivePreview />
          </LiveProvider> */}
      {/* </div> */}
    </div>
  );
}
