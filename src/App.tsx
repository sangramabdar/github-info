import { useEffect, useState } from "react";
import InputField from "./components/InputField";
import { getGithubUserInfoByNameService } from "./services/githubUsers";
import UserCard from "./components/UserCard";
import { InfinitySpin } from "react-loader-spinner";
import Loader from "./components/Loader";

interface UserInfo {
  name: string;
  userName: string;
  avatarUrl: string;
  publicRepos: number;
  publicGists: number;
  createdAt: string;
}

function App() {
  const [userName, setUserName] = useState<string>("");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [finalUserName, setFinalUserName] = useState("");

  const handleUserName = (e: any) => {
    setUserName(e.target.value);

    if (!e.target.value) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

  const getGithubUserInfo = async () => {
    setTimeout(async () => {
      const { data, error, statusCode } = await getGithubUserInfoByNameService(
        userName
      );

      setDisabled(false);
      setLoading(false);

      if (error) {
        setError(error);
        setUserInfo(null);
      } else {
        setUserInfo(() => ({
          avatarUrl: data.avatar_url,
          userName: data.login,
          name: data.name,
          publicGists: data.public_gists,
          publicRepos: data.public_repos,
          createdAt: data.created_at.substring(0, 10),
        }));
        setError("");
      }
    }, 1000);
  };

  const handleSubmit = () => {
    setUserInfo(null);
    setError("");
    setLoading(true);
    setDisabled(true);
    setFinalUserName(userName);
  };

  useEffect(() => {
    if (!finalUserName) return;

    getGithubUserInfo();
  }, [finalUserName]);

  return (
    <div className="bg-white h-screen">
      <section className="flex items-center justify-center">
        <InputField onChange={handleUserName} />
        <button
          className={`bg-violet-500 rounded-lg p-1 px-2 m-2 ${
            disabled ? "opacity-[0.5]" : "opacity"
          }`}
          onClick={handleSubmit}
          disabled={disabled}
        >
          submit
        </button>
      </section>
      <section className="bg-gray-100 w-[500px] h-[400px] m-auto flex items-center justify-center">
        {loading && <Loader />}
        {userInfo && <UserCard {...userInfo} />}
        {error && <div className="font-bold text-2xl">{error}</div>}
      </section>
    </div>
  );
}

export default App;
