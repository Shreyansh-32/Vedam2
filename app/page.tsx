import { authOptions } from "@/lib/auth/options";
import {getServerSession} from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div>
      {JSON.stringify(session)}
    </div>
  );
}
