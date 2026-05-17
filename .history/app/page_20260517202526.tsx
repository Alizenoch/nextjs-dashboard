import Image from "next/image";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        <Image
          src="/hero-desktop.png"
          alt="Screenshots of the dashboard project showing desktop and mobile versions"
          width={1000}
          height={760}
          className="hidden md:block"
        />
        <Image
          src="/hero-mobile.png"
          alt="Screenshot of the dashboard project on mobile"
          width={560}
          height={620}
          className="block md:hidden"
        />
      </div>
    </main>
  );
}
