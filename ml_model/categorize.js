export function categorizeContent(text) {
  // Placeholder function for categorizing text using an ML model
  // Load and use your ML model here

  // Example categorized output
  return {
    "News": text.includes("news"),
    "Sports": text.includes("sports"),
    "Entertainment": text.includes("entertainment"),
    // Add more categories as needed
  };
}