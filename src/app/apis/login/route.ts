import { NextRequest } from "next/server";
import jsonData from '../../../lib/db.json';
import jwt from 'jsonwebtoken';

export const dynamic = 'force-static';

export async function POST(request: NextRequest) {
    try {
        const jwtSecretKey = process.env.JWT_SECRET;

        const res = await request.json();
        const {email, password} = res;

        const user = jsonData.users.find((user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password);
        
        let tokenData = {
            signInTime: Date.now(),
            email
        }

        const token = jwt.sign(tokenData, jwtSecretKey);

        if (user) {
            return Response.json({message: 'success', token, id: user.id});
        }

        return Response.json({error: 'Invalid Credentials'}, {status: 401});
    } catch (e) {
        return Response.json({error: e});
    }
}
