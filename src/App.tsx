import {
  Outlet,
  RouterProvider,
  Link,
  Router,
  Route,
  RootRoute,
  useParams,
  useSearch,
} from "@tanstack/react-router";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

const rootRoute = new RootRoute({
  component: () => (
    <>
      <div>
        <Link to="/">Home</Link>{" "}
        <Link
          to="/about/$userId"
          params={{
            userId: "123",
          }}
          search={{}}
        >
          About
        </Link>
      </div>
      <hr />
      <Outlet />
    </>
  ),
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: function Index() {
    return (
      <div>
        <h3>Welcome Home!</h3>
      </div>
    );
  },
});

const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/about/$userId",
  validateSearch: (): {
    hello?: string;
  } => {
    return {
      hello: "world",
    };
  },
  component: () => {
    const { userId } = useParams({ from: aboutRoute.id });
    const d = useSearch({ from: aboutRoute.id });

    console.log(d);

    return <div>Hello from About! {userId}</div>;
  },
});

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute]);

const router = new Router({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <RouterProvider router={router} />
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
