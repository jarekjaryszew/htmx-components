package main

import (
	"io"
	"log/slog"
	"net/http"

	md "claw-destine.com/webcomp-htmx-example/middleware"
)

func main() {
	mux := http.NewServeMux()

	mux.Handle("/", http.FileServer(http.Dir("frontend/dist")))
	mux.Handle("/tasks", TaskList{})
	mux.Handle("/calendar", Calendar{})

	server := &http.Server{
		Addr:    ":3000",
		Handler: md.WithRequestLogging(mux),
	}

	slog.Info("Starting HTTP server", "address", server.Addr)
	if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		slog.Error("HTTP server stopped", "error", err)
	}
}

type TaskList struct {
}

func (tl TaskList) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	io.WriteString(w, "<h1>Tasks</h1>")
}

type Calendar struct {
}

func (c Calendar) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	io.WriteString(w, "<h1>Calendar</h1>")
}
