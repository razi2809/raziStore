import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (url: string) => {
  const [data, setData] = useState<any>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // If no URL is provided, exit the function early.

    if (!url) return;
    async function getData() {
      setLoading(true);
      try {
        // Attempt to get the data from the provided URL.

        let res = await axios.get(url);
        // If successful, update the data state.
        setError(null);
        setData(res.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          // Correctly use the caught error (err) instead of the state error

          setError(err);
        } else {
          // If it's not an AxiosError, it could be an error with setting up the request
          setError(
            new Error("An error occurred while setting up the request.")
          );
        }
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [url]);
  return { data, error, loading };
};

export default useFetch;
