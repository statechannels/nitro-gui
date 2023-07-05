import { useState } from "react";
import { Box, Button } from "@mui/material";
import axios, { isAxiosError } from "axios";

import "./App.css";

function App() {
  const numChunks = 100;
  const length = 403507;

  const [gotChunks, setGotChunks] = useState(new Array(numChunks).fill(false));

  function setChunkGot(index: number) {
    const gotChunksCopy = [...gotChunks];
    gotChunksCopy[index] = true;
    setGotChunks(gotChunksCopy);
  }

  const [errorText, setErrorText] = useState<string>("");

  async function getChunk(index: number, file: Int8Array[]) {
    if (index >= numChunks) {
      throw Error;
    }
    const chunkSize = Math.floor(length / numChunks);
    const startByte = index * chunkSize;
    const endByte = Math.min(length, (index + 1) * chunkSize);
    const range = "bytes=" + startByte + "-" + endByte;

    try {
      const result = await axios.get(
        `http://localhost:8081/nitro-protocol.pdf`,
        {
          responseType: "blob", // This lets us download the file
          headers: {
            Accept: "*/*", // TODO: Do we need to specify this?
            Range: range,
          },
        }
      );
      setChunkGot(index);
      file[index] = result.data;
    } catch {
      (e: any) => {
        if (isAxiosError(e)) {
          setErrorText(`${e.message}: ${e.response?.statusText}`);
        } else {
          setErrorText(JSON.stringify(e));
        }
      };
    }
  }

  function compileFile(file: Int8Array[]): File {
    const f = new File(file, "nitro-protocol.pdf");
    return f;
  }

  function triggerCompleteFileDownload(file: Int8Array[]) {
    const fileUrl = URL.createObjectURL(compileFile(file));
    const a = document.createElement("a");
    a.href = fileUrl;
    a.download = "nitro-protocol.pdf";
    a.click();
    a.remove();
    window.URL.revokeObjectURL(fileUrl);
  }

  const fetchFile = async () => {
    setErrorText("");
    const file = new Array<Int8Array>(numChunks);
    for (let i = 0; i < numChunks; i++) {
      await getChunk(i, file);
    }

    triggerCompleteFileDownload(file);
  };

  return (
    <Box>
      {gotChunks.map((c) => (c ? "X" : "_"))}
      <Button onClick={fetchFile}>Fetch</Button>
      <Box>{errorText}</Box>
    </Box>
  );
}

export default App;
