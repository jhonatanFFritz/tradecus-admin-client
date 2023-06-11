import { Fragment } from "react";
import { signOut } from "next-auth/react";
import {
  Bars3CenterLeftIcon,
  PencilIcon,
  ChevronDownIcon,
  CreditCardIcon,
  Cog8ToothIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { BellIcon, CheckIcon } from "@heroicons/react/24/outline";
import { Menu, Transition, Popover } from "@headlessui/react";
import Link from "next/link";

export default function TopBar({ session, showNav, setShowNav }) {
  const router = useRouter();

  function handleSignOut() {
    signOut({ callbackUrl: "/login" });
  }

  return (
    <div>
      <div
        className={`fixed w-full h-16 flex justify-between items-center transition-all duration-[400ms] ${
          showNav ? "pl-56" : ""
        }`}
      >
        <div className="pl-4 md:pl-16">
          <Bars3CenterLeftIcon
            className="h-8 w-8 text-gray-700 cursor-pointer"
            onClick={() => setShowNav(!showNav)}
          />
        </div>
        <div className="flex items-center pr-4 md:pr-16">
          <Popover className="relative">
            <Popover.Button className="outline-none mr-5 md:mr-8 cursor-pointer text-gray-700">
              <BellIcon className="h-6 w-6" />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform scale-95"
              enterTo="transform scale-100"
              leave="transition ease-in duration=75"
              leaveFrom="transform scale-100"
              leaveTo="transform scale-95"
            >
              <Popover.Panel className="absolute -right-16 sm:right-4 z-50 mt-2 bg-white shadow-sm rounded max-w-xs sm:max-w-sm w-screen">
                {/* Resto del código */}
              </Popover.Panel>
            </Transition>
          </Popover>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-full justify-center items-center">
                <picture>
                  <img
                    src={session ? session.user.image : "/man-smiling.jpg"}
                    className="rounded-full h-8 md:mr-4 border-2 border-white shadow-sm"
                    alt="profile picture"
                  />
                </picture>

                <span className="hidden md:block font-medium text-gray-700">
                  {session ? session.user.name : "Usuario"}
                </span>
                <ChevronDownIcon className="ml-2 h-4 w-4 text-gray-700" />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform scale-95"
              enterTo="transform scale-100"
              leave="transition ease-in duration=75"
              leaveFrom="transform scale-100"
              leaveTo="transform scale-95"
            >
              <Menu.Items className="absolute right-0 w-56 z-50 mt-2 origin-top-right bg-white rounded shadow-sm">
                <div className="p-1">
                  <Menu.Item>
                    <Link
                      href="#"
                      className="flex hover:bg-indigo-700 hover:text-white text-gray-700 rounded p-2 text-sm group transition-colors items-center"
                    >
                      <PencilIcon className="h-4 w-4 mr-2" />
                      Edit
                    </Link>
                  </Menu.Item>

                  <Menu.Item>
                    <Link
                      href="#"
                      className="flex hover:bg-indigo-700 hover:text-white text-gray-700 rounded p-2 text-sm group transition-colors items-center"
                    >
                      <Cog8ToothIcon className="h-4 w-4 mr-2" />
                      Settings
                    </Link>
                  </Menu.Item>

                  <Menu.Item>
                    <button
                      className=" w-full flex hover:bg-rose-700 hover:text-white text-gray-700 rounded p-2 text-sm group transition-colors items-center"
                      onClick={handleSignOut}
                    >
                      <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2" />
                      Cerrar sesión
                    </button>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
}
