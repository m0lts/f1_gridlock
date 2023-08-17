import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  try {
    if (request.method === "POST") {
      const {
        firstName,
        secondName,
        username,
        email,
        phoneNumber,
        password,
      } = request.body;

      // Store the data in relevant variables
      // const storedFirstName = firstName;
      // const storedSecondName = secondName;
      // const storedUsername = username;
      // const storedEmail = email;
      // const storedPhoneNumber = phoneNumber;
      // const storedPassword = password;


    // ADD BACKEND FORM VALIDATION BELOW- see old php code for example? change code to JS and copy?
    // if (!username || !p1 || !p2 || !p3 || !p4 || !p5 || !p6 ||!p7 || !p8 || !p9 || !p10 ) throw new Error('All inputs required');

    await sql`INSERT INTO gridlock_accounts (First_name, Second_name, Username, Email, Phone_number, Password) VALUES (${firstName}, ${secondName}, ${username}, ${email}, ${phoneNumber}, ${password});`;
  
    return response.status(200).json({ message: "Prediction submitted successfully." });}
} catch (error) {
    return response.status(500).json({ error });
  }

}