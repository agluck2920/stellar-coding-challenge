import { NextRequest } from "next/server";
import fs from 'fs';
import path from 'path';
import jsonData from '../../../lib/db.json';
import jwt from 'jsonwebtoken';

export const dynamic = 'force-static';

export async function POST(request: NextRequest) {
    try {
        const jwtSecretKey = process.env.JWT_SECRET;
        
        const res = await request.json();
        const {email, id} = res;

        jsonData.users.push(res);

        fs.writeFileSync(path.resolve(__dirname, "../../../../../src/lib/db.json"), JSON.stringify(jsonData));

        let tokenData = {
            signInTime: Date.now(),
            email
        };

        const token = jwt.sign(tokenData, jwtSecretKey);

        return Response.json({message: 'success', token, id: id});
    } catch (e) {
        return Response.json({error: e});
    }
}