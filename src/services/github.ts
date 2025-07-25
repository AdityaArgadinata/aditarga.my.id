import axios from 'axios';

import { GITHUB_ACCOUNTS } from '@/common/constant/github';

const GITHUB_USER_ENDPOINT = 'https://api.github.com/graphql';

const GITHUB_USER_QUERY = `query($username: String!) {
  user(login: $username) {
    contributionsCollection {
      contributionCalendar {
        colors
        totalContributions
        months {
          firstDay
          name
          totalWeeks
        }
        weeks {
          contributionDays {
            color
            contributionCount
            date
          }
          firstDay
        }
      }
    }
  }
}`;

export const fetchGithubData = async (
  username: string,
  token: string | undefined,
) => {
  // If no token provided, return empty data instead of making API call
  if (!token || token === 'undefined') {
    return {
      status: 200,
      data: {
        contributionsCollection: {
          contributionCalendar: {
            colors: [],
            totalContributions: 0,
            months: [],
            weeks: [],
          },
        },
      },
    };
  }

  try {
    const response = await axios.post(
      GITHUB_USER_ENDPOINT,
      {
        query: GITHUB_USER_QUERY,
        variables: {
          username: username,
        },
      },
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      },
    );

    const status: number = response.status;
    const responseJson = response.data;

    if (status > 400) {
      return { status, data: {} };
    }

    return { status, data: responseJson.data.user };
  } catch (error) {
    // Silent handling for production
    return {
      status: 500,
      data: {
        contributionsCollection: {
          contributionCalendar: {
            colors: [],
            totalContributions: 0,
            months: [],
            weeks: [],
          },
        },
      },
    };
  }
};

export const getGithubUser = async (type: string) => {
  const account = GITHUB_ACCOUNTS.find(
    (account) => account?.type === type && account?.is_active,
  );

  if (!account) {
    throw new Error('Invalid user type');
  }

  const { username, token } = account;
  return await fetchGithubData(username, token);
};
