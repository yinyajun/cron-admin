package cron_admin

import (
	"io/fs"
	"net/http"

	"github.com/yinyajun/cron-admin/ui"
)

func UIHandler() http.Handler {
	staticFS, _ := fs.Sub(ui.StaticFiles, "dist")
	return http.FileServer(http.FS(staticFS))
}
