import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const Logo = () => {
  return (
    <div className="hidden md:flex items-center gap-x-2">
      <Image src="/notion.png" height="32" width="32" alt="Logo" />
      <p className={cn("font-bold", font.className)}>Notion</p>
      {/* <p className="font-sans font-semibold">Notion</p> */}
    </div>
  );
};
