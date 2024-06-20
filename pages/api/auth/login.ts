// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { resolve } from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const username = req.url?.search("username")
    const password = req.url?.search("password")

    if (!username || !password) {
      res.status(400).json({ msg: [username, password] })
    }

    await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      body: req.body
    }).then((res) => res.json())
      .then((data) => {
        res.setHeader('Set-Cookie', `token=${data.data.token}; path=/; httpOnly`)
        res.status(200).end()
      })
  }
}
