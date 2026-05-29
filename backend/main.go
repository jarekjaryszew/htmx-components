package main

import (
	"log/slog"
	"net/http"

	md "claw-destine.com/webcomp-htmx-example/middleware"
)

func main() {
	mux := http.NewServeMux()

	mux.Handle("/", http.FileServer(http.Dir("frontend/dist")))

	server := &http.Server{
		Addr:    ":3000",
		Handler: md.WithRequestLogging(mux),
	}

	slog.Info("Starting HTTP server", "address", server.Addr)
	if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		slog.Error("HTTP server stopped", "error", err)
	}
}
