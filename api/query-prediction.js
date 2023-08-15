import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
  try {
    const username = request.query.username;

    if (!username) throw new Error('Username is required');

    const result = await sql`
      SELECT P1, P2, P3, P4, P5, P6, P7, P8, P9, P10
      FROM gridlock_predictions
      WHERE Username = ${username};
    `;

    return response.status(200).json(result);
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
