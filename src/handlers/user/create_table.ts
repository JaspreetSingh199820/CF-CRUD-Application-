import { connect } from '@planetscale/database'


const config = {
    host: DB_HOST,
    username: DB_USER,
    password: DB_PASS
}

export const create_table = async (req: Request): Response =>  {
    const conn = connect(config)
    const use_database = await conn.execute("USE demo;")
    const results = await conn.execute("CREATE TABLE users_details(ID INT(20) AUTO_INCREMENT, NAME VARCHAR (20) NOT NULL, email  VARCHAR(2000), PRIMARY KEY (ID))")
    console.log(use_database)
    console.log(results)

    return new Response(
        JSON.stringify({
            method: req.method,
            operation: 'Table Created'
        }), {
        headers: { 'content-type': 'application/json' }
    })
}
