import { sql } from '@vercel/postgres';
 
export default async function handler(request, response) {
  try {
    const result =
      await sql`
      CREATE TABLE gridlock_accounts ( 
        First_name varchar(30), 
        Second_name varchar(30), 
        Username varchar(30), 
        Email varchar(50), 
        Phone_number varchar(15), 
        Password varchar(30) );`;
    return response.status(200).json({ result });
  } catch (error) {
    return response.status(500).json({ error });
  }
}