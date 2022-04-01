import { useEffect, useState } from "react";
import {
  gitRequest,
  IGetUserReposRequest,
  IGetUserReposSearchRequest,
} from "./Requests";
import { IGetUserRequest } from "./Requests";
import "./App.scss";
import { RootStateOrAny, useSelector } from "react-redux";

function MainPage() {
  let initialValue = useSelector(
    (state: RootStateOrAny) => state.request.initialRequest
  );
  const [searchValue, setSearchValue] = useState<string | any>(initialValue);
  const [searchBufferValue, setSearchBufferValue] = useState<string>();
  const [searchUserRepos, setSearchUserRepos] =
    useState<IGetUserReposSearchRequest>();
  const [userReposSearchValue, setUserReposSearchValue] = useState<string>();
  const [userReposSearchBufferValue, setUserReposSearchBufferValue] =
    useState<string>();
  const [userResponse, setUserResponse] = useState<IGetUserRequest>();
  const [userReposResponse, setUserReposResponse] = useState<
    IGetUserReposRequest[]
  >([]);
  const [windowActive, setWindowActive] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const { data: userResponse } = await gitRequest.getUser(searchValue);
      setUserResponse(userResponse);
      console.log(userResponse);
    })();
  }, [searchValue]);

  useEffect(() => {
    (async () => {
      const { data: userReposResponse } = await gitRequest.getUserRepos(
        searchValue
      );
      setUserReposResponse(userReposResponse);
      console.log(userReposResponse);
    })();
  }, [windowActive === true]);

  useEffect(() => {
    (async () => {
      setSearchUserRepos(Object);
      const { data: searchUserRepos } = await gitRequest.getUserReposByRequest(
        searchValue,
        userReposSearchValue
      );
      setSearchUserRepos(searchUserRepos);
      console.log(searchUserRepos);
    })();
  }, [userReposSearchValue]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="search-container">
          <input
            type="text"
            onChange={(e) => {
              setWindowActive(false);
              setSearchBufferValue(e.target.value.trim());
            }}
          />
          <button
            onClick={() => {
              setSearchValue(searchBufferValue);
            }}
          >
            search
          </button>
        </div>
        <p> your request is {searchValue}</p>
        <div className="result_container">
          <img src={userResponse?.avatar_url} alt="#" />
          <h3>{userResponse?.login}</h3>
          <a
            href="#"
            onClick={() => {
              setWindowActive(true);
            }}
          >
            Repos
          </a>
        </div>
        {windowActive && (
          <div className="profile_container">
            <div className="profile_container_nav">
              <a
                href="#"
                onClick={() => {
                  setWindowActive(false);
                }}
              >
                Close
              </a>
            </div>
            <div className="profile_container_info">
              <div className="profile_container_info_img">
                <img src={userResponse?.avatar_url} alt="#" />
              </div>
              <div className="profile_container_info_text">
                <h3>{userResponse?.login}</h3>
                <p>
                  {userResponse?.email === null
                    ? "No email available"
                    : userResponse?.email}
                </p>
                <p>
                  {userResponse?.location === null
                    ? "No location available"
                    : userResponse?.location}
                </p>
                <p>{userResponse?.created_at}</p>
                <p>{userResponse?.followers} followers</p>
                <p>Following {userResponse?.following}</p>
                <p> {userResponse?.bio}</p>
              </div>
            </div>
            <div className="profile_container_repos">
              <input
                type="text"
                onChange={(e) => {
                  setUserReposSearchBufferValue(e.target.value.trim());
                }}
              />
              <button
                onClick={() => {
                  setUserReposSearchValue(userReposSearchBufferValue);
                }}
              >
                Search
              </button>
              <div className="repos_container">
                {!userReposSearchValue &&
                  userReposResponse?.map((item, index) => (
                    <div key={index} className="repo">
                      {item.name}
                      <div className="repo_info">
                        <p>{item.forks} Forks</p>
                        <a href={item.html_url}>Repo Link</a>
                      </div>
                    </div>
                  ))}
                {userReposSearchValue && searchUserRepos?.name && (
                  <div className="repo">
                    {searchUserRepos?.name}
                    <div className="repo_info">
                      <p>{searchUserRepos?.forks} Forks</p>
                      <a href={searchUserRepos?.html_url}>Repo Link</a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default MainPage;
