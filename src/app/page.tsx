
import ButtonTestKeycloak from "@/components/ButtonTestKeycloak";
import { authOptions } from "@/lib/auth/next-auth-options";

import { getServerSession } from "next-auth";


export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
   <div>
       {!!session && <pre>{JSON.stringify(session, null, 2)}</pre>}
      {!!session }
      <ButtonTestKeycloak/>

   </div>
  );
}