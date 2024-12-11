import { NextRequest } from "next/server";
import fs from 'fs';
import path from 'path';
import jsonData from '../../../lib/db.json';

export const dynamic = 'force-static';

export async function GET(request: NextRequest) {
    try {
        const data = fs.readFileSync(path.resolve(__dirname, "../../../../../src/lib/db.json"), 'utf-8');

        const {posts, users} = JSON.parse(data);

        const userPosts = posts.map((post) => {
            const user = users.find((user) => user.id === post.authorId);
            post.author = user.email;

            return post;
        })

        return Response.json(userPosts);
    } catch (e) {
        return Response.json({error: e});
    }
}

export async function POST(request: NextRequest) {
    try {        
        const res = await request.json();

        const {content, id} = res;

        const post = {
            content: content,
            authorId: id,
            createdAt: new Date().toISOString().split('T')[0]
        };

        jsonData.posts.push(post);

        fs.writeFileSync(path.resolve(__dirname, "../../../../../src/lib/db.json"), JSON.stringify(jsonData));

        return Response.json({message: 'success' });
    } catch (e) {
        return Response.json({error: e});
    }
}