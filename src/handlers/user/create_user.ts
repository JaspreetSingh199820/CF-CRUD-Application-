import { connect } from '@planetscale/database'


const config = {
    host: DB_HOST,
    username: DB_USER,
    password: DB_PASS
}

export const create_user = async (req: Request): Response =>  {
    const body: any = await req.json();
    const conn = connect(config)
    const results = await conn.execute('INSERT INTO users_details (NAME, email) VALUES (?, ?)', [body.name, body.email])
    console.log(results)
    return new Response(
        JSON.stringify({
            name : body.name,
            email : body.email,
            results: results,
            operation : 'create user',
        }), {
        headers: { 'content-type': 'application/json' }
    })
}
