import * as React from "react";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLocation
} from "remix";
import type { LinksFunction } from "remix";

import deleteMeRemixStyles from "~/styles/demos/remix.css";
import globalStylesUrl from "~/styles/global.css";
import darkStylesUrl from "~/styles/dark.css";

/**
 * The `links` export is a function that returns an array of objects that map to
 * the attributes for an HTML `<link>` element. These will load `<link>` tags on
 * every route in the app, but individual routes can include their own links
 * that are automatically unloaded when a user navigates away from the route.
 *
 * https://remix.run/api/app#links
 */
export let links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: globalStylesUrl },
    {
      rel: "stylesheet",
      href: darkStylesUrl,
      media: "(prefers-color-scheme: dark)"
    },
    { rel: "stylesheet", href: deleteMeRemixStyles }
  ];
};

/**
 * The root module's default export is a component that renders the current
 * route via the `<Outlet />` component. Think of this as the global layout
 * component for your app.
 */
export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

function Document({
  children,
  title
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <RouteChangeAnnouncement />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="remix-app">
      <header className="remix-app__header">
        <div className="container remix-app__header-content">
          <Link to="/" title="Remix" className="remix-app__header-home-link">
            <RemixLogo />
          </Link>
          <nav aria-label="Main navigation" className="remix-app__header-nav">
            <ul>
              <li>
                <Link to="/">首页</Link>
              </li>
              <li>
                <Link to="/resume">简历</Link>
              </li>
              <li>
                <a href="https://github.com/tychio">GitHub</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div className="remix-app__main">
        <div className="container remix-app__main-content">{children}</div>
      </div>
      <footer className="remix-app__footer">
        <div className="container remix-app__footer-content">
          <p>&copy; Zhengzheng Zhang</p>
        </div>
      </footer>
    </div>
  );
}

export function CatchBoundary() {
  let caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </p>
      );
      break;
    case 404:
      message = (
        <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      );
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout>
        <h1>
          {caught.status}: {caught.statusText}
        </h1>
        {message}
      </Layout>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <Document title="Error!">
      <Layout>
        <div>
          <h1>There was an error</h1>
          <p>{error.message}</p>
          <hr />
          <p>
            Hey, developer, you should replace this with what you want your
            users to see.
          </p>
        </div>
      </Layout>
    </Document>
  );
}

function RemixLogo(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg version="1.1" viewBox="0.0 0.0 800.0 800.0" fill="none" stroke="none" stroke-linecap="square" stroke-miterlimit="10" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
      <clipPath id="p.0">
        <path d="m0 0l324.0 0l0 312.0l-324.0 0l0 -312.0z" clip-rule="nonzero"/>
      </clipPath>
      <g clip-path="url(#p.0)">
        <path fill="#000000" fill-opacity="0.0" d="m0 0l324.0 0l0 312.0l-324.0 0z" fill-rule="evenodd"/>
        <path fill="#000000" fill-opacity="0.0" d="m394.0 -24.0l-464.0 0l0 261.7953l464.0 0z" fill-rule="evenodd"/>
        <path fill="#000000" d="m215.96289 44.578125l-87.015625 124.40625l54.296875 0q12.5 0 19.1875 -5.46875q6.6875 -5.46875 11.859375 -22.15625l3.234375 0.578125l-6.25 35.0625l-107.8125 0l0 -3.609375l84.953125 -120.90625l-42.375 0q-10.546875 0 -15.296875 2.296875q-4.734375 2.296875 -7.21875 6.640625q-2.484375 4.34375 -4.546875 16.265625l-3.703125 0l2.734375 -33.109375l97.953125 0z" fill-rule="nonzero"/>
        <path fill="#000000" fill-opacity="0.0" d="m28.207373 234.43564l121.826775 -210.89764l226.70865 130.92914l-121.82677 210.89764z" fill-rule="evenodd"/>
        <path fill="#000000" d="m175.499 116.55651l64.205765 137.56464l27.159286 -47.01619q6.2525024 -10.823883 4.8618774 -19.34964q-1.3906555 -8.525742 -13.254395 -21.349731l2.1184692 -2.511551l27.236511 22.947083l-53.92781 93.355896l-3.1255798 -1.8050842l-62.206573 -134.0283l-21.195969 36.692917q-5.275543 9.132645 -5.662491 14.394409q-0.37913513 5.24823 2.1397095 9.571838q2.5188293 4.3236084 11.81105 12.071808l-1.8523102 3.2065735l-27.303696 -18.926102l48.996155 -84.818565z" fill-rule="nonzero"/>
        <path fill="#000000" fill-opacity="0.0" d="m155.87401 10.818897l134.77165 232.72441l-226.51968 131.24411l-134.77165 -232.72443z" fill-rule="evenodd"/>
        <path fill="#000000" d="m190.96486 208.25879l-151.25041 -12.932449l27.210217 46.98674q6.264221 10.817093 14.3474655 13.86261q8.083244 3.0455322 25.114075 -0.84477234l1.120636 3.0887604l-33.470245 12.169189l-54.028923 -93.29744l3.123043 -1.8094788l147.18842 12.902283l-21.235703 -36.669952q-5.285446 -9.126923 -9.653244 -12.0859375q-4.359955 -2.9454803 -9.363449 -2.9177551q-5.003479 0.027740479 -16.352577 4.2196655l-1.8557816 -3.2045746l30.018478 -14.23233l49.088013 84.76544z" fill-rule="nonzero"/>
      </g>
    </svg>
  );
}

/**
 * Provides an alert for screen reader users when the route changes.
 */
const RouteChangeAnnouncement = React.memo(() => {
  let [hydrated, setHydrated] = React.useState(false);
  let [innerHtml, setInnerHtml] = React.useState("");
  let location = useLocation();

  React.useEffect(() => {
    setHydrated(true);
  }, []);

  let firstRenderRef = React.useRef(true);
  React.useEffect(() => {
    // Skip the first render because we don't want an announcement on the
    // initial page load.
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }

    let pageTitle = location.pathname === "/" ? "Home page" : document.title;
    setInnerHtml(`Navigated to ${pageTitle}`);
  }, [location.pathname]);

  // Render nothing on the server. The live region provides no value unless
  // scripts are loaded and the browser takes over normal routing.
  if (!hydrated) {
    return null;
  }

  return (
    <div
      aria-live="assertive"
      aria-atomic
      id="route-change-region"
      style={{
        border: "0",
        clipPath: "inset(100%)",
        clip: "rect(0 0 0 0)",
        height: "1px",
        margin: "-1px",
        overflow: "hidden",
        padding: "0",
        position: "absolute",
        width: "1px",
        whiteSpace: "nowrap",
        wordWrap: "normal"
      }}
    >
      {innerHtml}
    </div>
  );
});
