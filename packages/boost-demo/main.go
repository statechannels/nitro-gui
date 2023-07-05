package main

import (
	"bytes"
	"io"
	"log"
	"net/http"
	"time"
)

func main() {

	resp, err := http.Get("http://magmo.com/nitro-protocol.pdf")
	if err != nil {
		panic(err)
	}

	file, err := io.ReadAll(resp.Body)
	if err != nil {
		panic(err)
	}

	http.HandleFunc("/nitro-protocol.pdf", func(w http.ResponseWriter, r *http.Request) {
		http.ServeContent(w, r, "nitro-protocol.pdf", time.Now(), io.NewSectionReader(bytes.NewReader(file), 0, int64(len(file))))
	})

	log.Fatal(http.ListenAndServe(":8081", nil))

}
