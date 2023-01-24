import { connect } from '@planetscale/database'


const config = {
    host: DB_HOST,
    username: DB_USER,
    password: DB_PASS
}


export const create_database = async (req: Request): Response =>  {
    const conn = connect(config)
    const results = await conn.execute("CREATE DATABASE users; ")
    console.log(results)

    return new Response(
        JSON.stringify({
            operation: 'Table Created'
        }), {
        headers: { 'content-type': 'application/json' }
    })
}
