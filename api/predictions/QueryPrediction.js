import { sql } from '@vercel/postgres';

// WILL HAVE TO EDIT WHEN PROPER QUERIES ARE NEEDED

export default async function handler(request, response) {

  

  try {
    const queryParams = request.query;
    const username = queryParams.username;
    const round = queryParams.round;

    if (!username) throw new Error('Username is required');
    if (!round) throw new Error('Round number is required');


    const result = await sql`
      SELECT P1, P2, P3, P4, P5, P6, P7, P8, P9, P10
      FROM gridlock_predictions
      WHERE Username = ${username}
      AND Round = ${round};
    `;
    return response.status(200).json(result);
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
