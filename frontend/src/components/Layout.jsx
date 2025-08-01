import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useAuth } from '../context/AuthContext'
import { Link, useLocation } from 'react-router-dom'
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  BookOpenIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Courses', href: '/courses', icon: BookOpenIcon },
]

const userNavigation = [
  { name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon },
  { name: 'Profile', href: '/profile', icon: UserIcon },
]

const adminNavigation = [
  { name: 'Admin Dashboard', href: '/admin', icon: ChartBarIcon },
  { name: 'User Management', href: '/admin/users', icon: UserGroupIcon },
]

const instructorNavigation = [
  { name: 'Create Course', href: '/courses/create', icon: BookOpenIcon },
]

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout, isAdmin, isInstructor } = useAuth()
  const location = useLocation()

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                  <div className="flex h-16 shrink-0 items-center">
                    <Link to="/" className="text-2xl font-bold text-primary-600">
                      LMS
                    </Link>
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {navigation.map((item) => (
                            <li key={item.name}>
                              <Link
                                to={item.href}
                                className={`
                                  group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold
                                  ${location.pathname === item.href
                                    ? 'bg-primary-50 text-primary-600'
                                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                                  }
                                `}
                              >
                                <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                      {user && (
                        <>
                          <li>
                            <div className="text-xs font-semibold leading-6 text-gray-400">
                              Your Account
                            </div>
                            <ul role="list" className="-mx-2 mt-2 space-y-1">
                              {userNavigation.map((item) => (
                                <li key={item.name}>
                                  <Link
                                    to={item.href}
                                    className={`
                                      group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold
                                      ${location.pathname === item.href
                                        ? 'bg-primary-50 text-primary-600'
                                        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                                      }
                                    `}
                                  >
                                    <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                    {item.name}
                                  </Link>
                                </li>
                              ))}
                              {isInstructor() && instructorNavigation.map((item) => (
                                <li key={item.name}>
                                  <Link
                                    to={item.href}
                                    className={`
                                      group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold
                                      ${location.pathname === item.href
                                        ? 'bg-primary-50 text-primary-600'
                                        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                                      }
                                    `}
                                  >
                                    <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                    {item.name}
                                  </Link>
                                </li>
                              ))}
                              {isAdmin() && adminNavigation.map((item) => (
                                <li key={item.name}>
                                  <Link
                                    to={item.href}
                                    className={`
                                      group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold
                                      ${location.pathname === item.href
                                        ? 'bg-primary-50 text-primary-600'
                                        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                                      }
                                    `}
                                  >
                                    <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                    {item.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </li>
                          <li className="mt-auto">
                            <button
                              onClick={handleLogout}
                              className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                            >
                              <ArrowRightOnRectangleIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
                              Logout
                            </button>
                          </li>
                        </>
                      )}
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <Link to="/" className="text-2xl font-bold text-primary-600">
              LMS
            </Link>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className={`
                          group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold
                          ${location.pathname === item.href
                            ? 'bg-primary-50 text-primary-600'
                            : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                          }
                        `}
                      >
                        <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {user && (
                <>
                  <li>
                    <div className="text-xs font-semibold leading-6 text-gray-400">
                      Your Account
                    </div>
                    <ul role="list" className="-mx-2 mt-2 space-y-1">
                      {userNavigation.map((item) => (
                        <li key={item.name}>
                          <Link
                            to={item.href}
                            className={`
                              group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold
                              ${location.pathname === item.href
                                ? 'bg-primary-50 text-primary-600'
                                : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                              }
                            `}
                          >
                            <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                            {item.name}
                          </Link>
                        </li>
                      ))}
                      {isInstructor() && instructorNavigation.map((item) => (
                        <li key={item.name}>
                          <Link
                            to={item.href}
                            className={`
                              group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold
                              ${location.pathname === item.href
                                ? 'bg-primary-50 text-primary-600'
                                : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                              }
                            `}
                          >
                            <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                            {item.name}
                          </Link>
                        </li>
                      ))}
                      {isAdmin() && adminNavigation.map((item) => (
                        <li key={item.name}>
                          <Link
                            to={item.href}
                            className={`
                              group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold
                              ${location.pathname === item.href
                                ? 'bg-primary-50 text-primary-600'
                                : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                              }
                            `}
                          >
                            <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li className="mt-auto">
                    <button
                      onClick={handleLogout}
                      className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                    >
                      <ArrowRightOnRectangleIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1"></div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {user ? (
                <div className="flex items-center gap-x-4">
                  <span className="text-sm font-medium text-gray-700">
                    {user.firstName} {user.lastName}
                  </span>
                  <span className="badge badge-primary capitalize">
                    {user.role}
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-x-4">
                  <Link to="/login" className="btn-outline btn-sm">
                    Login
                  </Link>
                  <Link to="/register" className="btn-primary btn-sm">
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
} 