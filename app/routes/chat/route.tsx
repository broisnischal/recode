import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { chat, model } from "./model";
import { Input } from "~/components/ui/input";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { Button } from "~/components/ui/button";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Skeleton } from "~/components/ui/skeleton";
export async function loader() {
  try {
    const history = await chat.getHistory();
    return { history };
  } catch (error) {
    console.error("Failed to load chat history:", error);
    return { history: [], error: "Failed to load chat history." };
  }
}

export async function action({ request }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const message = formData.get("message");
    const result = await chat.sendMessage(message as string);
    return json({ ok: true, result });
  } catch (error) {
    console.error("Failed to send message:", error);
    return json({ ok: false, error: "Failed to send message." });
  }
}

export default function Chat() {
  const navigation = useNavigation();
  const ismessaging = navigation.formData?.get("intent") === "chatting";

  const { history } = useLoaderData<typeof loader>();

  const message = useActionData<typeof action>();
  const formref = useRef<HTMLFormElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (message?.ok) {
      formref.current?.reset();
      const scrollElement = scrollRef.current;
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
        scrollElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  }, [message]);

  const [displayedMessage, setDisplayedMessage] = useState("");

  return (
    <div className="max-w-[calc(100vw-10rem)] mx-auto my-[2rem] leading-loose flex flex-col gap-5">
      <h1 className="text-3xl">Broisnischal's AI</h1>

      {history.length > 0 ? (
        <div ref={scrollRef} className="h-[calc(70vh)] overflow-y-scroll">
          <div className="flex flex-col gap-5 p-5">
            {/* {message.error && <p className="text-red-500">{message.error}</p>} */}

            {history.map((item) => (
              <div className={`${item.role !== "user" ? "" : "underline"} `}>
                {item.parts.map((part) => {
                  return (
                    <Markdown
                      children={part.text}
                      components={{
                        code({ node, inline, className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || "");
                          return !inline && match ? (
                            <SyntaxHighlighter
                              children={String(children).replace(/\n$/, "")}
                              language={match[1]}
                              {...props}
                            />
                          ) : (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          );
                        },
                      }}
                    ></Markdown>
                    // <p className=" p-1 rounded-sm">{}</p>;
                  );
                })}
              </div>
            ))}
          </div>
          {ismessaging && <Skeleton className="w-full h-10" />}
        </div>
      ) : (
        <Skeleton className="w-full h-40 grid place-content-center">
          <h2>Welcome to the chat app.</h2>
        </Skeleton>
      )}

      <Form className="flex gap-3" method="POST" ref={formref}>
        <input type="hidden" name="intent" value={"chatting"} />
        <Input placeholder="Type a message" name="message" />
        <Button disabled={ismessaging}>
          {ismessaging ? "..." : "Message"}
        </Button>
      </Form>
    </div>
  );
}
