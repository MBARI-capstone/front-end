import Image from "next/image"

const Statement = () => {
  return (
    <div className="h-max mx-auto flex flex-col items-center">
        <Image
          className="mx-auto"
          src="/MBARI Logo.png"
          alt="MBARI logo"
          width={500}
          height={500}
        />
      </div> 
  )
}
export default Statement
