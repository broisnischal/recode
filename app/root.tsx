import styles from "./tailwind.css";

import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useMatches,
} from "@remix-run/react";
import ProgessBar from "./components/global-progess";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function App() {
  const matches = useMatches();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ProgessBar />
        <header>
          <ol style={{ listStyle: "none" }} className="flex gap-2 ">
            {matches
              .filter((match) => match.handle && match.handle)
              .map((match, index) => (
                <li
                  key={index}
                  className="before:content-['/'] first:before:content-[''] "
                >
                  {/* @ts-expect-error */}
                  {match.handle.breadcrumb(match)}
                </li>
              ))}
          </ol>
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
