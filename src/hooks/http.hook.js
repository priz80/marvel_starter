import { useState, useCallback } from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [process, setProcess] = useState("waiting");

  const request = useCallback(
    async (
      url,
      method = "GET",
      body = null,
      headers = null,
    ) => {
      setLoading(true);
      setProcess("loading");

      try {
        const options = { method };
        if (body) options.body = body;
        if (headers) options.headers = headers;

        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        }

        const data = await response.json();

        setLoading(false);
        setProcess("confirmed");
        return data;
      } catch (e) {
        setLoading(false);
        setError(e.message);
        setProcess("error");
        throw e;
      }
    },
    [],
  );

  const clearError = useCallback(() => {
    setError(null);
    setProcess("waiting");
  }, []);

  return { loading, request, error, clearError, process };
};
