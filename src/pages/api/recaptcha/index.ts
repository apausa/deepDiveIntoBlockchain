import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { method, body } = req;
  const { SECRET_KEY } = process.env;

  if (method === 'POST') {
    try {
      let data: Response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${SECRET_KEY}&response=${body.token}`,
      });

      data = await data.json();
      res.status(201).json({ success: true, data });
    } catch (error) {
      res.status(400).json({ success: false, error });
    }
  }
}
