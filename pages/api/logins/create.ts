// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const username = req.url?.search("username")
    const password = req.url?.search("password")
    const url = req.url?.search("url")

    if (!username || !password || !url) {
      res.status(400).json({ msg: [username, password, url] })
    }

    const headers: { [token: string]: string } = {};

    if (req.headers.cookie) {
      headers.cookie = req.headers.cookie;
    }

    await fetch("http://localhost:3000/logins/create", {
      method: "POST",
      body: req.body,
      headers
    }).then(() => res.status(201).json({ msg: "Created" }))
  }
}
