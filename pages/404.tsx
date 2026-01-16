import Link from 'next/link';
import React from 'react';

export default function Page() {
  return (
    <div className="bg-noise h-screen w-screen bg-black">
      <div className="mx-auto flex h-full max-w-[1440px] flex-col items-center justify-center gap-4 text-white">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-2xl font-bold">Page not found</p>
        <Link className="rounded-md border border-white p-4" href="/">
          Go back to home
        </Link>
      </div>
    </div>
  );
}
