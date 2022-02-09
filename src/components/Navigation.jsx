/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { authenticatedUser, cartsStore } from '../store'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Navigation() {
    const [ auth ] = useRecoilState(authenticatedUser)
    const history = useNavigate();
    const setAuth = useSetRecoilState(authenticatedUser);
    const aNumberOfCarts = useRecoilValue(cartsStore);
    const navigation = [
        { name: 'Dashboard', to: '/dashboard', current: true },
        { name: 'Series', to: '/series', current: false },
    ]
    const navigation2 = [
        { name: 'Login', to: '/login', current: true },
        { name: 'Register', to: '/register', current: false },
    ]

    const logout = async() => {
        await axios.post('logout')
        setAuth({
            authenticated: false,
            user: []
        })
        history('/login')
    }
    return (
        <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
                <>
                    <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="relative flex items-center justify-between h-16">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XIcon className="block w-6 h-6" aria-hidden="true" />
                                    ) : (
                                        <MenuIcon className="block w-6 h-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                                <div className="flex items-center flex-shrink-0">
                                    <img
                                        className="block w-auto h-8 lg:hidden"
                                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                                        alt="Workflow"
                                    />
                                    <p className="hidden w-auto h-8 text-xl font-semibold text-white lg:block">
                                        Screencast
                                    </p>
                                </div>
                                <div className="hidden sm:block sm:ml-6">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                to={item.to}
                                                className={classNames(
                                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'px-3 py-2 rounded-md text-sm font-medium'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                                {auth.isAuthenticated ? (
                                    <div className="hidden sm:block sm:ml-6">
                                        <div className="flex items-center space-x-4">
                                            <Link
                                                to='/your-carts'
                                                className={classNames(
                                                    'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'px-3 py-2 rounded-md text-sm font-medium group'
                                                )}
                                                aria-current={undefined}
                                            >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="inline w-5 h-5 text-gray-300 group-hover:bg-gray-700 group-hover:text-white " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                                    </svg>
                                                    <div className='inline p-1 text-xs text-white bg-indigo-700 rounded-lg'>
                                                        {aNumberOfCarts.length}
                                                    </div>
                                            </Link>
                                            <Link
                                                key={auth.user.name}
                                                to='#'
                                                className={classNames(
                                                    'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'px-3 py-2 rounded-md text-sm font-medium'
                                                )}
                                                aria-current={undefined}
                                            >
                                                {auth.user.name}
                                            </Link>
                                        </div>
                                    </div>
                                )
                                :
                                (
                                <div className="hidden sm:block sm:ml-6">
                                    <div className="flex space-x-4">
                                        {navigation2.map((item) => (
                                            <Link
                                                key={item.name}
                                                to={item.to}
                                                className={classNames(
                                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'px-3 py-2 rounded-md text-sm font-medium'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                                )
                                
                                }
                                
                            </div>
                            {auth.isAuthenticated ? (
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                    <button
                                        type="button"
                                        className="p-1 text-gray-400 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                    >
                                        <span className="sr-only">View notifications</span>
                                        <BellIcon className="w-6 h-6" aria-hidden="true" />
                                    </button>

                                    {/* Profile dropdown */}
                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <Menu.Button className="flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                                <span className="sr-only">Open user menu</span>
                                                <img
                                                    className="w-8 h-8 rounded-full"
                                                src="https://scontent.fcgk4-2.fna.fbcdn.net/v/t39.30808-6/273025906_1629583024045711_4825007667243491012_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeEHMqdKsZ6zLThjBogvSWYfiit_BCE8P_qKK38EITw_-kXUqR8vUmF0tktms34ERG9CrrO_31isA_lw2Ga-qqLw&_nc_ohc=ffqtHtzsBm4AX_LyWtH&_nc_zt=23&_nc_ht=scontent.fcgk4-2.fna&oh=00_AT96lObx3-11odub0IcfTip2gmPYhZdJHNaXo6kk_7UkEQ&oe=62030CB8"
                                                    alt=""
                                                />
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            href="#"
                                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                        >
                                                            Your Profile
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            href="#"
                                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                        >
                                                            Settings
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            onClick={logout}
                                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                        >
                                                            Sign out
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            )
                            :
                            ''
                            }
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block px-3 py-2 rounded-md text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}
