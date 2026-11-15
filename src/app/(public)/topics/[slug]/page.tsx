import { Suspense } from "react";
import Link from "next/link";

async function TotpicTitle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <h1>topic page of name {slug} nk</h1>;
}

export default function TopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const publics = [
    "/",
    "/about",
    "/explore",
    "/guidelines",
    "/privacy",
    "/discussions/post1234",
  ];

  return (
    <div className="flex flex-1 w-full h-full justify-between items-center flex-col gap-4">
      <Suspense
        fallback={
          <div className="h-7 w-48 animate-pulse bg-amber-500 rounded " />
        }
      >
        <TotpicTitle params={params} />
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
