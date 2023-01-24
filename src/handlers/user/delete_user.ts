import { connect } from '@planetscale/database'

const config = {
    host: DB_HOST,
    username: DB_USER,
    password: DB_PASS
}

// DELETE FROM table_name WHERE condition;
export const delete_user = async (req: Request): Response => {
    try {
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
        } else {
            const results = await conn.execute(`DELETE FROM users_details WHERE email=?;`,[body.email])

            return new Response(
                JSON.stringify({
                    results:results,
                    operation: 'delete user',
                }), {
                headers: { 'content-type': 'application/json' }
            })
        }
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
