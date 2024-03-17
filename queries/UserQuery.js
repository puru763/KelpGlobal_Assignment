const pool = require("../connectDB/ConnectDB");

const addUsers_query = async (JSONData) => {
  try {
    const usersData = JSONData;
    let insertData =
      "INSERT INTO public.users (name, age, address, additional_info) VALUES ";
    usersData.forEach((user) => {
      const name = JSON.stringify({
        firstName: user.firstName,
        lastName: user.lastName,
      });
      const address = JSON.stringify({
        line1: user.line1,
        line2: user.line2,
        city: user.city,
        state: user.state,
      });
      const additional_info = JSON.stringify({ gender: user.gender });
      insertData += `(
              '${name}'::jsonb,
              ${user.age},
              '${address}'::jsonb,
              '${additional_info}'::jsonb
            ), `;
    });

    insertData = insertData.slice(0, -2); 
    const response = await pool.query(insertData);
    return response.rows;
  } catch (error) {
    console.log(error);
  }
};

const getAgeDistribution_query = async () => {
  try {
    const response = await pool.query(
      `WITH age_categories AS (
                SELECT 
                    CASE 
                        WHEN age < 20 THEN 'less than 20'
                        WHEN age >= 20 AND age <= 40 THEN '20-40'
                        WHEN age > 40 AND age <= 60 THEN '40-60'
                        ELSE 'greater than 60'
                    END AS category
                FROM 
                    users
            )
            SELECT 
                category,
                COUNT(*) AS count,
                ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) AS percentage
            FROM 
                age_categories
            GROUP BY 
                category
            ORDER BY 
                category;`
    );
    return response.rows;
  } catch (error) {
    console.log(error);
  }
};
module.exports = { addUsers_query, getAgeDistribution_query };
