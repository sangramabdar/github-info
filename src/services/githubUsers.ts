const BASE_GITHUB_USER_URL = "https://api.github.com/users";

interface Result {
  data?: any;
  error?: string;
  statusCode?: number;
}

async function getGithubUserInfoByNameService(userName: string) {
  const result: Result = {};
  const url = BASE_GITHUB_USER_URL + "/" + userName;
  const response = await fetch(url);
  const data = await response.json();

  if (response.status >= 400) {
    result.statusCode = response.status;
    result.data = null;

    if (data.message.includes("API")) {
      result.error = "API rate limit exceeded";
    } else {
      result.error = "User not found";
    }
  } else {
    result.error = "";
    result.statusCode = response.status;
    result.data = data;
  }

  return result;
}

export { getGithubUserInfoByNameService };
