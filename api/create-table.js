import { sql } from '@vercel/postgres';
 
export default async function handler(request, response) {
  try {
    const result =
      await sql`
      CREATE TABLE gridlock_points ( 
        Username varchar(30), 
        R1 int, 
        R2 int, 
        R3 int, 
        R4 int, 
        R5 int, 
        R6 int, 
        R7 int, 
        R8 int, 
        R9 int, 
        R10 int, 
        R11 int, 
        R12 int, 
        R13 int, 
        R14 int, 
        R15 int, 
        R16 int, 
        R17 int, 
        R18 int, 
        R19 int, 
        R20 int, 
        R21 int, 
        R22 int, 
        R23 int, 
        R24 int, 
        TotalPoints int
        );`
    return response.status(200).json({ result });
  } catch (error) {
    return response.status(500).json({ error });
  }
}