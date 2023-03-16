package cron_admin

import (
	"embed"
	"net/http"
)

import "html/template"

//go:embed ui/dist/*
var dist embed.FS

func UIHandlerFunc() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		tmpl, _ := template.New("index.html").
			ParseFS(dist, "ui/dist/index.html")
		tmpl.Execute(w, nil)
	}
}
