import { forwardRef } from "react";
import Link from "next/link";
import {
  HomeIcon,
  UserGroupIcon,
  ChatBubbleLeftEllipsisIcon,
  InboxStackIcon,
  CalendarDaysIcon,
  MapIcon,
  Cog6ToothIcon,
  ChartPieIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/router";

const SideBar = forwardRef(({ showNav }, ref) => {
  const router = useRouter();

  return (
    <div ref={ref} className="fixed w-56 h-full bg-slate-700 shadow-sm">
      <div className="flex justify-center mt-6 mb-6">
        <picture>
          <img
            className="w-48 h-auto"
            src="https://res.cloudinary.com/du9dasmxo/image/upload/v1686452824/tradecus/Imagen_de_WhatsApp_2023-06-10_a_las_21.59.54_dgsv1x.jpg"
            alt="Logo de la compañia"
          />
        </picture>
      </div>

      <div className="flex flex-col">
        <Link href="/">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/"
                ? "bg-white text-slate-700"
                : "text-gray-400 hover:bg-slate-200 hover:text-slate-500"
            }`}
          >
            <div className="mr-2">
              <HomeIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Panel Principal</p>
            </div>
          </div>
        </Link>
        <Link href="/reservas/">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/reservas"
                ? "bg-white text-slate-700"
                : "text-gray-400 hover:bg-slate-200 hover:text-slate-500"
            }`}
          >
            <div className="mr-2">
              <CalendarDaysIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Reservas</p>
            </div>
          </div>
        </Link>
        <Link href="/tours/">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/tours"
                ? "bg-white text-slate-700"
                : "text-gray-400 hover:bg-slate-200 hover:text-slate-500"
            }`}
          >
            <div className="mr-2">
              <MapIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Tours</p>
            </div>
          </div>
        </Link>
        <Link href="/Contacts/">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/Contacts"
                ? "bg-white text-slate-700"
                : "text-gray-400 hover:bg-slate-200 hover:text-slate-500"
            }`}
          >
            <div className="mr-2">
              <InboxStackIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Contacto</p>
            </div>
          </div>
        </Link>
        <Link href="/Reviews/">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/Reviews"
                ? "bg-white text-slate-700"
                : "text-gray-400 hover:bg-slate-200 hover:text-slate-500"
            }`}
          >
            <div className="mr-2">
              <ChatBubbleLeftEllipsisIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Reseñas</p>
            </div>
          </div>
        </Link>
        <Link href="/reportes/">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/reportes"
                ? "bg-white text-slate-700"
                : "text-gray-400 hover:bg-slate-200 hover:text-slate-500"
            }`}
          >
            <div className="mr-2">
              <ChartPieIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Reportes</p>
            </div>
          </div>
        </Link>
        <Link href="/Users/">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/User"
                ? "bg-white text-slate-700"
                : "text-gray-400 hover:bg-slate-200 hover:text-slate-500"
            }`}
          >
            <div className="mr-2">
              <UserGroupIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Usuarios</p>
            </div>
          </div>
        </Link>
        <Link href="/configuracion/">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/configuracion"
                ? "bg-white text-slate-700"
                : "text-gray-400 hover:bg-slate-200 hover:text-slate-500"
            }`}
          >
            <div className="mr-2">
              <Cog6ToothIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Configuración</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
});

SideBar.displayName = "SideBar";

export default SideBar;
