package admin

import (
	"embed"
	"io/fs"
	"net/http"
)

//go:embed ui/dist/*
var files embed.FS

func UIHandler() http.Handler {
	staticFS, _ := fs.Sub(files, "ui/dist")
	return http.FileServer(http.FS(staticFS))
}
