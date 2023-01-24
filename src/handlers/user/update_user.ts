import { connect } from '@planetscale/database'

const config = {
    host: DB_HOST,
    username: DB_USER,
    password: DB_PASS
}

export const update_user = async (req: Request): Response => {
    try {
        let body: any = await req.json();
        const conn = connect(config)
        let results: any  = ""
        if (Object.keys(body).length === 0){
            results = "Request is empty"
        } else if(body.hasOwnProperty("update_email") == true && body.hasOwnProperty("name") == true){
            results = await conn.execute('UPDATE users_details SET NAME = ?, email = ? WHERE (email = ?)', [body.name, body.update_email, body.current_email])
        } else if(body.hasOwnProperty("update_email") == true && body.hasOwnProperty("name") == false) { 
            results = await conn.execute('UPDATE users_details SET email = ? WHERE (email = ?)', [body.update_email, body.current_email])
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
    } catch {
        return new Response(
            JSON.stringify({
                error: "Something wrong happend. Please try again later.",
                operation: "Get User"
            }), {
            headers: { 'content-type': 'application/json' }
        })
    }
}
