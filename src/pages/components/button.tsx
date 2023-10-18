import Link from 'next/link';

interface buttonProps {
    hrefLink: string;
    buttonName: string;
}

const Button = ({hrefLink, buttonName}: buttonProps) => {
    return (
      <Link
        href={`${hrefLink}`}
        className="inline-block group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
      >
      <div className="flex items-center justify-center h-full">
        <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
          {buttonName}
        </span>
      </div>
    </Link>
    )
}
export default Button;
