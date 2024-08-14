
import { Inter } from "next/font/google";
import { Notes } from "@/components/Notes";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <div>
        <h1 className="text-center text-6xl font-bold">Notes App</h1>
      </div>
      <Notes/>
    </div>
  );
}
