import { sql } from '@vercel/postgres';
 
export default async function handler(request, response) {
  try {
    const result =
      await sql`
      CREATE TABLE gridlock_predictions ( 
        Username varchar(50), 
        P1 varchar(20), 
        P2 varchar(20), 
        P3 varchar(20), 
        P4 varchar(20), 
        P5 varchar(20), 
        P6 varchar(20), 
        P7 varchar(20), 
        P8 varchar(20), 
        P9 varchar(20), 
        P10 varchar(20) );`;
    return response.status(200).json({ result });
  } catch (error) {
    return response.status(500).json({ error });
  }
}