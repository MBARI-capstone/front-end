import { ReactNode } from 'react'


type NavigationProps = {
  children?: ReactNode
}

const Navigation: React.FC<NavigationProps> = ({ children }) => {
  return (
    <main className="overflow-hidden min-h-screen  bg-blue-100 flex flex-col  items-start sm:py-10">
      <div className="h-max mx-auto flex flex-col items-center">
        <div className="relative py-16 bg-gradient-to-br from-sky-50 to-gray-200">
          <div className="relative container m-auto px-6 text-gray-500 md:px-12 xl:px-40">
            <div className="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12">
              <div className="rounded-xl bg-white shadow-xl">
                <div className="p-6 sm:p-16">
                  <div className="align-middle">
                    <h2 className="mb-2 text-2xl text-center text-cyan-900 font-bold custom-font ">
                      Navigation
                    </h2>
                  </div>

                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Navigation
