import { connect } from '@planetscale/database'


const config = {
    host: DB_HOST,
    username: DB_USER,
    password: DB_PASS
}

export const create_user = async (req: Request): Response =>  {
    try{
        const body: any = await req.json();
        const conn = connect(config)
        let results = ""
        if (Object.keys(body).length === 0){
            results = "Request is empty"
            return new Response(
                JSON.stringify({
                    name : body.name,
                    email : body.email,
                    results: results,
                    operation : 'create user',
                }), {
                headers: { 'content-type': 'application/json' }
            })
        } else {
            const results = await conn.execute('INSERT INTO users_details (NAME, email) VALUES (?, ?)', [body.name, body.email])
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
