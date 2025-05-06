import { Request } from "@/utils/request";
import { useEffect, useState } from "react";

export const useQuery = (
  endpoint: string,
  updater?: string | number | boolean,
) => {
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Request.get(endpoint)
      .then((res) => {
        if (res) setData(res.data.resource);
      })
      .catch((e) => setError(e));
  }, [endpoint, setData, setError, updater]);

  return { data, setData, error, setError };
};
