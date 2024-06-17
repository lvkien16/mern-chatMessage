import { useState } from "react";

export default function UseRefreshPage() {
  const [refresh, setRefresh] = useState(false);

  const refreshPage = () => {
    setRefresh((prevRefresh) => !prevRefresh);
  };

  return { refreshPage, refresh };
}
