import axios from "axios";
import dotenv from "dotenv"

dotenv.config()
export async function fetchExternalJobs() {
  const response = await axios.get(
    "https://sarkari-result.p.rapidapi.com/jobs/",
    {
      headers: {
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
        "X-RapidAPI-Host": process.env.RAPIDAPI_HOST,
      },
    }
  );

  return response.data;
}
