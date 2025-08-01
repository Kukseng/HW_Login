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
      <h1 className="text-2xl font-bold mb-4">NextAuth + Redux Integration</h1>

      <AuthStatus />

      {!!session && (
        <div className="mt-4">
          <h3 className="font-bold">NextAuth Session:</h3>
          <pre className="bg-black text-green-400 p-4 rounded text-sm overflow-auto">
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
