import { useEffect, useState } from "react";

export default function useDebounce(value, delay) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(
    _ => {
      const handler = setTimeout(_ => setDebounceValue(value), delay);
      return _ => clearTimeout(handler);
    },
    [value]
  );

  return debounceValue;
}
