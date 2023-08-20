import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
    try {
        if (request.method === "POST") {
            const { email, password } = request.body;
      
            // Fetch user data from the database based on the provided email
            const userQuery = await sql`SELECT * FROM gridlock_accounts WHERE email = ${email}`;
            const userEmail = userQuery.rows[0].email;
            const userPassword = userQuery.rows[0].password;
            const userFirstName = userQuery.rows[0].first_name;
            const userSecondName = userQuery.rows[0].second_name;
            const userUsername = userQuery.rows[0].username;


      
            if (!userEmail) {
              return response.status(401).json({ message: "Invalid email or password." });
            }

            if (userPassword !== password) {
                return response.status(401).json({ message: "Invalid email or password." });
            }

            return response.status(200).json({ userEmail, userPassword, userFirstName, userSecondName, userUsername });
          } else {
            return response.status(405).json({ message: "Method not allowed." });
          }
  } catch (error) {
      return response.status(500).json({ message: "Invalid email or password." });
    }
  }