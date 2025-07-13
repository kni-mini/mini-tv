import Image from 'next/image';
import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="text-primary-foreground flex size-6 items-center justify-center">
              <Image src="/logo.png" alt="logo" width={24} height={24} />
            </div>
            Mini Announcements
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">{children}</div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/auth/mini.png"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          width={1000}
          height={1000}
        />
      </div>
    </div>
  );
}
