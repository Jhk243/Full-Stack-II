// -----------------------------------------
// Mock JWT Authentication Utility
// -----------------------------------------

// Generate a mock JWT token
// Generate a mock JWT token
export function generateToken(username) {

  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  let role = "Viewer";

  if (username === "admin") {

    role = "Admin";

  } else if (username === "editor") {

    role = "Editor";

  }

  const payload = {
    username,
    role,
    issuedAt: new Date().toLocaleString(),
  };

  const encode = (obj) =>
    btoa(JSON.stringify(obj));

  const signature = "MOCK_SIGNATURE";

  return `${encode(header)}.${encode(payload)}.${signature}`;

}

// Decode a mock JWT token
export function decodeToken(token) {

  try {

    const parts = token.split(".");

    if (parts.length !== 3) {

      return null;

    }

    return JSON.parse(
      atob(parts[1])
    );

  } catch {

    return null;

  }

}

// Check if a token exists
export function isAuthenticated() {

  return localStorage.getItem("jwtToken") !== null;

}

// Save token
export function saveToken(token) {

  localStorage.setItem(
    "jwtToken",
    token
  );

}

// Get token
export function getToken() {

  return localStorage.getItem(
    "jwtToken"
  );

}

// Logout
export function logout() {

  localStorage.removeItem(
    "jwtToken"
  );

}