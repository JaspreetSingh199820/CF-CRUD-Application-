import { Router } from "itty-router"
import { create_database } from '../handlers/user/create_database'
import { create_table } from '../handlers/user/create_table'
import { create_user } from '../handlers/user/create_user'
import { get_users } from '../handlers/user/get_users'
import { specific_user } from '../handlers/user/specific_user'
import { update_user } from '../handlers/user/update_user'
import { delete_user } from '../handlers/user/delete_user'


export function routes(router: Router<Request, {}>) {
  return (
    router
      .post("/create_database", create_database)
      .post("/create_table", create_table)
      .get("/get_users", get_users)
      .post("/create_user", create_user)
      .post("/read_user", specific_user)
      .post("/update_user", update_user)
      .post("/delete_user", delete_user)
  )
}