import { useSession,signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'

type Props = {}

const Settings = (props: Props) => {
    const { data: session } = useSession()
    const router = useRouter()

    const logout = async()=>{
        await router.push('/');
        await signOut();
    }
    if (session) {
        return (
            <>
                <header>
                    <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                        <div className="sm:flex sm:items-center sm:justify-between">
                            <div className="text-center sm:text-left">
                                <div className="sm:flex sm:gap-4 flex justify-between items-center">
                                    <div className='h-9 w-9 my-4'>
                                        {session?.user?.image && (
                                            <Image
                                                className="h-full w-full rounded-full object-cover object-center"
                                                src={session.user.image}
                                                alt=""
                                                width={100}
                                                height={100}
                                            />
                                        )}
                                    </div>
                                    <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{session?.user?.name}</h1>
                                </div>
                                <p className="px-14 mt-1.5 text-sm text-gray-500">{session?.user?.email}</p>
                            </div>
                                <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
                                    <button
                                        className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-200 px-5 py-3 text-red-500 transition hover:bg-gray-50 hover:text-green-600 hover:border-green-600 focus:outline-none focus:ring"
                                        onClick={logout}
                                    >
                                        <span className="text-sm font-medium"> Logout</span>

                                    </button>
                                </div>
                        </div>
                    </div>
                </header>
            </>
        )
    }
}

export default Settings