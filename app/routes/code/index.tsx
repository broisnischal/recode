import { Editor, DiffEditor } from "@monaco-editor/react";
import { useState } from "react";
import { LivePreview, LiveProvider } from "react-live";

export default function Code() {
  const defaultCode = `
    import { Button } from "~/components/ui/button";

export default function Profile() {
    return (
        <div>
            <h1>Profile</h1>
            <Button>
                Sign Up
            </Button>
        </div>
    );
}`;
  const [code, setCode] = useState(defaultCode || "");
  function handleOnChange(value?: string) {
    console.log("value", value);
    setCode(value || "");
  }
  return (
    <div className="bg-white h-screen ">
      <Editor
        className="h-screen"
        defaultLanguage="javascript"
        defaultValue={code.trim()}
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
      <div>
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
      </div>
    </div>
  );
}
