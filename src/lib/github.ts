
const GITHUB_USERNAME = "slouowzee";

interface GitHubLanguage {
  name: string;
  color: string;
}

interface GitHubRepo {
  name: string;
  description: string;
  url: string;
  stargazerCount: number;
  homepageUrl?: string;
  languages?: {
    nodes: GitHubLanguage[];
  };
}

export async function getPinnedRepos() {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    console.warn("GITHUB_TOKEN is missing in .env.local");
    return [];
  }

  const query = `
    query {
      user(login: "${GITHUB_USERNAME}") {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              description
              url
              stargazerCount
              languages(first: 3, orderBy: {field: SIZE, direction: DESC}) {
                nodes {
                  name
                  color
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 60 }, // Cache for 1 minute
    });

    const json = await res.json();
    
    if (json.errors) {
      console.error("GitHub GraphQL errors:", json.errors);
      return [];
    }

    const pinnedNodes = json.data?.user?.pinnedItems?.nodes || [];

    return pinnedNodes.map((repo: GitHubRepo) => ({
        title: repo.name,
        description: repo.description,
        link: repo.url,
        tags: repo.languages?.nodes?.map((l: GitHubLanguage) => l.name) || [],
        featured: true, // They are pinned, so featured
        stars: repo.stargazerCount
    }));

  } catch (error) {
    console.error("Error fetching pinned repos:", error);
    return [];
  }
}

export async function getPublicRepos() {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    console.warn("GITHUB_TOKEN is missing in .env.local");
    return [];
  }

  const query = `
    query {
      user(login: "${GITHUB_USERNAME}") {
        repositories(first: 100, privacy: PUBLIC, orderBy: {field: STARGAZERS, direction: DESC}) {
          nodes {
            name
            description
            url
            stargazerCount
            homepageUrl
            languages(first: 3, orderBy: {field: SIZE, direction: DESC}) {
              nodes {
                name
                color
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 60 },
    });

    const json = await res.json();
    
    if (json.errors) {
      console.error("GitHub GraphQL errors:", json.errors);
      return [];
    }

    const repos = json.data?.user?.repositories?.nodes || [];

    return repos.map((repo: GitHubRepo) => ({
        title: repo.name,
        description: repo.description,
        link: repo.url,
        homepage: repo.homepageUrl,
        tags: repo.languages?.nodes?.map((l: GitHubLanguage) => l.name) || [],
        featured: false,
        stars: repo.stargazerCount
    }));

  } catch (error) {
    console.error("Error fetching public repos:", error);
    return [];
  }
}
