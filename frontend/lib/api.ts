const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://lumina-market-backend-production.up.railway.app/api";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error || `API Request failed with status ${response.status}`,
    );
  }
  return response.json();
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const config = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  return handleResponse<T>(response);
}

export const api = {
  // Strategies
  strategies: {
    /**
     * Analyze a natural language strategy prompt
     */
    analyze: async (prompt: string) => {
      return request<{ success: boolean; data: any; message: string }>(
        "/strategies/analyze",
        {
          method: "POST",
          body: JSON.stringify({ prompt }),
        },
      );
    },

    /**
     * Create a new strategy in the marketplace
     */
    create: async (strategyData: any) => {
      return request<{ success: boolean; data: any; message: string }>(
        "/strategies",
        {
          method: "POST",
          body: JSON.stringify(strategyData),
        },
      );
    },

    /**
     * List all available strategies
     */
    list: async () => {
      return request<{ success: boolean; data: any[]; count: number }>(
        "/strategies",
      );
    },

    /**
     * Get a specific strategy by ID
     */
    get: async (id: string) => {
      return request<{ success: boolean; data: any }>(`/strategies/${id}`);
    },
  },

  // Execution
  execution: {
    /**
     * Trigger the AI Agent to run a strategy for a user
     */
    run: async (strategyId: string, userAddress: string) => {
      return request<{
        status: "executed" | "skipped";
        message: string;
        executionLogs?: any[];
        evaluation?: any[];
      }>("/execution/run", {
        method: "POST",
        body: JSON.stringify({ strategyId, userAddress }),
      });
    },
  },

  // AI Agent Management
  aiAgent: {
    /**
     * Get AI Agent status
     */
    status: async () => {
      return request<{ success: boolean; data: any; message: string }>("/ai-agent/status");
    },

    /**
     * Start AI Agent
     */
    start: async () => {
      return request<{ success: boolean; message: string }>("/ai-agent/start", {
        method: "POST",
      });
    },

    /**
     * Stop AI Agent
     */
    stop: async () => {
      return request<{ success: boolean; message: string }>("/ai-agent/stop", {
        method: "POST",
      });
    },
  },

  // Health check
  health: async () => {
    return request<{ status: string; message: string }>("/health");
  },
};
