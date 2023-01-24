import { connect } from '@planetscale/database'

const config = {
    host: DB_HOST,
    username: DB_USER,
    password: DB_PASS
}

export const update_user = async (req: Request): Response => {
    const body: any = await req.json();
    const conn = connect(config)
    console.log(body)
    let results: any  = ""
    if(body.hasOwnProperty("update_email")){
        results = await conn.execute('UPDATE users_details SET NAME = ?, email = ? WHERE (email = ?)', [body.name, body.update_email, body.current_email])
    } else {
        results = await conn.execute('UPDATE users_details SET NAME = ?WHERE (email = ?)', [body.name, body.current_email])
    }

    return new Response(
        JSON.stringify({
            results: results,
            operation: 'update user',
        }), {
        headers: { 'content-type': 'application/json' }
    })
}
