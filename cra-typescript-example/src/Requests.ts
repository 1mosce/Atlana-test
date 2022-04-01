import axios, { AxiosResponse } from "axios";

export interface IGetUserRequest {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string | undefined;
  company: string | undefined;
  blog: string | undefined;
  location: string | undefined;
  email: string | undefined;
  hireable: string | undefined;
  bio: string | undefined;
  twitter_username: string | undefined;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface IGetUserReposRequest {
  name: string;
  forks: number;
  html_url: string;
}

export interface IGetUserReposSearchRequest {
  name: string;
  forks: number;
  html_url: string;
}

let token = "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";

export class gitRequest {
  static async getUser(
    slug: string | undefined
  ): Promise<AxiosResponse<IGetUserRequest>> {
    return axios({
      method: "get",
      url: `https://api.github.com/users/${slug}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  static async getUserRepos(
    slug: string | undefined
  ): Promise<AxiosResponse<IGetUserReposRequest[]>> {
    return axios({
      method: "get",
      url: `https://api.github.com/users/${slug}/repos`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
  static async getUserReposByRequest(
    slug: string | undefined,
    query: string | undefined
  ): Promise<AxiosResponse<IGetUserReposSearchRequest>> {
    return axios({
      method: "get",
      url: `https://api.github.com/repos/${slug}/${query}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }
}
