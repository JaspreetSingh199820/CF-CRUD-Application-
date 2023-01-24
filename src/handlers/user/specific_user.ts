import { connect } from '@planetscale/database'

const config = {
    host: DB_HOST,
    username: DB_USER,
    password: DB_PASS
}

export const specific_user = async (req: Request): Response => {
    try{
        const body: any = await req.json();
        const conn = connect(config)
        let results = ""
        if (Object.keys(body).length === 0){
            results = "Request is empty"
            return new Response(
                JSON.stringify({
                    results: results,
                    operation : 'create user',
                }), {
                headers: { 'content-type': 'application/json' }
            })
        } else if (body.hasOwnProperty("email")) {
            const results = await conn.execute('SELECT * FROM users_details WHERE EMAIL = ?', [body.email])
            return new Response(
                JSON.stringify({
                    result: results.rows,
                    operation: "Get User"
                }), {
                headers: { 'content-type': 'application/json' }
            })
        } else {
            return new Response(
                JSON.stringify({
                    result: "Please Enter 'email' key in the body",
                    operation: "Get User"
                }), {
                headers: { 'content-type': 'application/json' }
            })
        }
    } catch(err) {
        return new Response(
            JSON.stringify({
                error: "Something wrong happend. Please try again later.",
                operation: "Get User"
            }), {
            headers: { 'content-type': 'application/json' }
        })
    }
}
