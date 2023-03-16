package main

import (
	"net/http"

	"github.com/yinyajun/cron-admin"
)

func main() {
	http.Handle("/", cron_admin.UIHandler())
	http.ListenAndServe(":8004", nil)
}
