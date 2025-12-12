import React from "react";
import ReactDOM from "react-dom/client";
import store from "./store/store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/routes";
import { Toaster } from "sonner";

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: { retry: 2 },
    queries: { retry: 2 },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes} />
        <Toaster position="top-center" richColors />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
