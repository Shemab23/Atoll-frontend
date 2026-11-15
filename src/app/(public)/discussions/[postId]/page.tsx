import { Suspense } from "react";
import Link from "next/link";

async function DiscussionTitle({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  return <h1>discussion page of id {postId}</h1>;
}

export default function DiscussionPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const publics = [
    "/",
    "/about",
    "/explore",
    "/guidelines",
    "/privacy",
    "/topics/keza",
  ];

  return (
    <div className="flex flex-1 w-full h-full justify-between items-center flex-col gap-4">
      <Suspense
        fallback={
          <div className="h-7 w-48 animate-pulse bg-amber-500 rounded " />
        }
      >
        <DiscussionTitle params={params} />
      </Suspense>

      <div className="flex flex-wrap flex-row md:w-[80%] w-full gap-4">
        {publics.map((path, i) => (
          <Link
            href={path}
            key={i}
            className="border-2 border-amber-400 bg-blue-300 p-2"
          >
            {path}
          </Link>
        ))}
      </div>
    </div>
  );
}
