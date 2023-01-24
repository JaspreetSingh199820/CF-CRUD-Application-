import { Router } from 'itty-router'
const router = Router()

/* -----routes import----- */
import { routes } from './routes/routes'


routes(router)
router.all("*", () => new Response("404, not found!", { status: 404 }))
addEventListener('fetch', (event: any) => {
  event.respondWith(router.handle(event.request))
})
