import ButtonTestKeycloak from "@/components/ButtonTestKeycloak";
import AuthSync from "@/components/AuthSync";
import AuthStatus from "@/components/AuthStatus";
import { authOptions } from "@/lib/auth/next-auth-options";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div className="p-6">
      <AuthSync />
      <h1 className="mb-4 text-2xl font-bold">NextAuth + Redux Integration</h1>

      <AuthStatus />

      {!!session && (
        <div className="mt-4">
          <h3 className="font-bold">NextAuth Session:</h3>
          <pre className="p-4 overflow-auto text-sm text-green-400 bg-black rounded">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>
      )}

      <div className="mt-4">
        <ButtonTestKeycloak />
      </div>
    </div>
  );
}
