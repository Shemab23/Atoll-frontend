import Link from "next/link";

export default function page() {
  const publics = [
    "/",
    "discussions/post1234",
    "about",
    "guidelines",
    "privacy",
    "topics/keza",
  ];
  return (
    <div className="flex flex-1 w-full h-full justify-between items-center flex-col gap-4">
      <h1>explore page</h1>
      <div className="flex flex-row md:w-80% w-full gap-4 ">
        {publics.map((page, i) => (
          <Link
            href={page}
            key={i}
            className="border-2 border-amber-400 bg-blue-300 p-2"
          >
            {page}
          </Link>
        ))}
      </div>
    </div>
  );
}
