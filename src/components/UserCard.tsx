import React from "react";

interface UserCardProps {
  name: string;
  userName: string;
  avatarUrl: string;
  publicRepos: number;
  publicGists: number;
  createdAt: string;
}

function UserInfoRow({
  title,
  data,
}: React.PropsWithChildren<{ title: string; data: any }>) {
  return (
    <div className="flex space-x-3">
      <span className="font-bold">{title}</span>
      <span>:</span>
      <span>{data}</span>
    </div>
  );
}

function UserCard({
  avatarUrl,
  createdAt,
  name,
  publicGists,
  publicRepos,
  userName,
}: React.PropsWithChildren<UserCardProps>) {
  return (
    <div className="w-[500px] m-auto flex flex-col justify-start items-start rounded-lg p-5 space-y-5">
      <img src={avatarUrl} className="object-cover w-20 h-20" />
      <UserInfoRow title="UserName" data={userName} />
      <UserInfoRow title="Name" data={name} />
      <UserInfoRow title="No. of public repos" data={publicRepos} />
      <UserInfoRow title="No. of public gists" data={publicGists} />
      <UserInfoRow title="Profile created at" data={createdAt} />
    </div>
  );
}

export default UserCard;
