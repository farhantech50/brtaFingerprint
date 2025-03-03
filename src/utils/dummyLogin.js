const getUserData = (username) => {
  let data;

  if (username === "farhan") {
    data = {
      name: "Farhan",
      role: "super-admin",
      accessToken:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE3NDEwMzQwOTQsImV4cCI6MTc3MjU3MDM2NCwiYXVkIjoiIiwic3ViIjoiIiwidXNlclJvbGUiOiJzdXBlci1hZG1pbiIsInVzZXJJZCI6IjEyMzQ1NiJ9.BrKLlpWq_AINjgYjTls97pXNSMLfKfeNr4GqbY5KF8g",
    };
  } else if (username === "asif") {
    data = {
      name: "Asif",
      role: "circle-admin",
      accessToken:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE3NDEwMzQwOTQsImV4cCI6MTc3MjU3MDM2NCwiYXVkIjoiIiwic3ViIjoiIiwidXNlclJvbGUiOiJjaXJjbGUtYWRtaW4iLCJ1c2VySWQiOiIxMjM0NTcifQ.D8iZ2icFK1pG45MwvhBqBGAIesttD01vYxYnk_3bWNs",
    };
  } else if (username === "rafi") {
    data = {
      name: "Rafi",
      role: "operator",
      accessToken:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE3NDEwMzQwOTQsImV4cCI6MTc3MjU3MDM2NCwiYXVkIjoiIiwic3ViIjoiIiwidXNlclJvbGUiOiJvcGVyYXRvciIsInVzZXJJZCI6IjEyMzQ1OCJ9.TdlTwVnsjklWcO4Kueinzp7YY-bTfUbXzV8J_Lc7ra4",
    };
  } else {
    data = null;
  }

  return data;
};

export default getUserData;
