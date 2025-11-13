import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
          <h1 className="text-4xl font-bold text-blue-600">
            Tailwind 4 is working
          </h1>
        </div>
      </main>
    </div>
  );
}
