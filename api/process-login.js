import { sql } from "@vercel/postgres";

function comparePasswords(enteredPassword, storedPassword) {
    return enteredPassword === storedPassword;
  }

export default async function handler(request, response) {
    try {
        if (request.method === "POST") {
            const { email, password } = request.body;
      
            // Fetch user data from the database based on the provided email
            const userQuery = await sql`SELECT Password FROM gridlock_accounts WHERE email = ${email}`;
            const user = userQuery.rows[0].password;
      
            // if (!user) {
            //   return response.status(401).json({ message: "Invalid email or password." });
            // }

            // // Compare the provided password with the hashed password from the database
            // const isPasswordMatch = comparePasswords(password, user.password); // Implement comparePasswords function
      
            // if (!isPasswordMatch) {
            //   return response.status(401).json({ message: "Invalid email or password." });
            // }
            return response.status(200).json({ user });
          } else {
            return response.status(405).json({ message: "Method not allowed." });
          }
  } catch (error) {
      return response.status(500).json({ error });
    }
  
  }