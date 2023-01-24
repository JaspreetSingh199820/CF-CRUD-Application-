import { connect } from '@planetscale/database'

const config = {
    host: DB_HOST,
    username: DB_USER,
    password: DB_PASS
}

export const get_users = async (req: Request): Response => {
    try{
        const conn = connect(config)
        const results = await conn.execute('SELECT * FROM users_details')

        return new Response(
            JSON.stringify({
                result: results.rows,
                operation: "Show Users"
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
