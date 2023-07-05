import { useState } from "react";
import { Box, Button } from "@mui/material";
import axios, { isAxiosError } from "axios";

import "./App.css";

function App() {
  const [errorText, setErrorText] = useState<string>("");

  const fetchFile = () => {
    setErrorText("");

    axios
      .get(`http://localhost:8081/nitro-protocol.pdf`, {
        responseType: "blob", // This lets us download the file
        headers: {
          Accept: "*/*", // TODO: Do we need to specify this?
        },
      })

      .then((result) => {
        // This will prompt the browser to download the file
        const blob = result.data;
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = "fetched-file-from-ipfs";
        a.click();
        a.remove();
        window.URL.revokeObjectURL(blobUrl);
      })
      .catch((e) => {
        if (isAxiosError(e)) {
          setErrorText(`${e.message}: ${e.response?.statusText}`);
        } else {
          setErrorText(JSON.stringify(e));
        }
      });
  };

  return (
    <Box>
      <Button onClick={fetchFile}>Fetch</Button>
      <Box>{errorText}</Box>
    </Box>
  );
}

export default App;
