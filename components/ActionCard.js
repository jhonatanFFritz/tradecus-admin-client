import Link from "next/link";
import { useRouter } from "next/router";
function ActionCard({ title, url}) {
  const router = useRouter();
  return (
    <div>
      
      <Link href={url}>
          <div
            className=" w-fit px-4  py-2 rounded text-center cursor-pointer flex items-center border-2 border-slate-700 text-slate-700 hover:text-white hover:bg-slate-700"
            
          >
            
            <div>
              <p className="font-bold">{title}</p>
            </div>
          </div>
        </Link>
    </div>
  );
}

export default ActionCard;
