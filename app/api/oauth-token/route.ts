import { NextResponse } from 'next/server'
import axios from 'axios';
export async function POST(request: Request) {
    try {
        const post_data = {
            username: process.env.OAUTH_USER_NAME,
            password: process.env.OAUTH_PASSWORD,
            grant_type: process.env.OAUTH_GRANT_TYPE,
            client_id: process.env.OAUTH_CLIENT_ID,
            client_secret: process.env.OAUTH_CLIENT_SECRET
        };

        const response = await axios.post(`${process.env.API_END_POINT}/v6/oauth/access-token`, post_data, {
            headers: { 'Content-Type': 'application/json' }
        });
        response.data.success = true;
        return new NextResponse(JSON.stringify(response.data), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error: any) {
        const error_response = {
            status: false,
            error: error.message,
        };
        return new NextResponse(JSON.stringify(error_response), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
