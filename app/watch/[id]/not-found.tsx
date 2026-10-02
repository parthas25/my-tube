import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid min-h-[60vh] place-items-center px-6 text-center">
      <div>
        <h1 className="text-2xl font-bold">That video wandered off</h1>
        <p className="mt-2 text-sm text-muted">
          It is not in the MeowTube catalog.
        </p>
        <Link
          href="/"
          className="mt-4 inline-flex h-10 items-center rounded-full bg-meow px-4 text-sm font-semibold text-white"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
