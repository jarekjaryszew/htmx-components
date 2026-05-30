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
	mux.Handle("/tasks", TaskListHandler{})
	mux.Handle("/calendar", CalendarHandler{})

	server := &http.Server{
		Addr:    ":3000",
		Handler: md.WithRequestLogging(mux),
	}

	slog.Info("Starting HTTP server", "address", server.Addr)
	if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		slog.Error("HTTP server stopped", "error", err)
	}
}

type EmptyHandler struct {
}

func (e EmptyHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	io.WriteString(w, "")
}

type TaskListHandler struct {
}

func (tl TaskListHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	io.WriteString(w, "<my-tasks-view></my-tasks-view>")
}

type CalendarHandler struct {
}

func (c CalendarHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	io.WriteString(w, "<h1>Calendar</h1>")
}
