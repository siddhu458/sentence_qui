// src/utils/api.js
export const fetchQuestions = async () => {
  try {
    const res = await fetch('http://localhost:3001/data');
    if (!res.ok) throw new Error("Failed to fetch /data");
    const json = await res.json();
    return json.questions || json.data?.questions || [];
  } catch (error) {
    console.error("Error fetching questions:", error.message);
    return [];
  }
};
