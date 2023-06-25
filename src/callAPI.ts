// import fetcher from "@modules/fetcher";
import fetcher from "./modules/fetcher";

const callAPI = async () => {
  try {
    const res = await fetcher.get("https://jsonplaceholder.typicode.com/todos/1");
    console.log("🚀 ~ file: callAPI.ts:7 ~ callAPI ~ res:", res.status);
  } catch (error) {
    console.log("🚀 ~ file: callAPI.ts:9 ~ callAPI ~ error:", error);
  }
};

export default callAPI;
