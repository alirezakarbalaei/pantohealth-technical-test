import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useStations } from "./useStations";
import { ReactNode } from "react";

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useStations", () => {
  it("should fetch stations data", async () => {
    const { result } = renderHook(() => useStations(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeDefined();
    expect(Array.isArray(result.current.data)).toBe(true);
  });

  it("should handle loading state", () => {
    const { result } = renderHook(() => useStations(), { wrapper });
    expect(result.current.isLoading).toBe(true);
  });

  it("should handle error state", async () => {
    // Mock fetch to reject
    global.fetch = jest.fn(() =>
      Promise.reject(new Error("Failed to fetch"))
    );

    const { result } = renderHook(() => useStations(), { wrapper });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toBeDefined();
  });
});