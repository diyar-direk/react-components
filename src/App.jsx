import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRouter from "./router/router";

function App() {
  const queryclient = new QueryClient();
  return (
    <QueryClientProvider client={queryclient}>
      <AppRouter />
    </QueryClientProvider>
  );
}

export default App;
