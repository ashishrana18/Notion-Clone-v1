import Image from "next/image";

export const Heroes = ()=>{
    return(
        <div className="flex flex-col justify-center items-center max-w-5xl">
            <div className="flex items-center">
                <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px]
                      md:h-[500px] md:w-[500px]">
                    <Image 
                     src="/hero.png"
                     fill
                     className="object-contain dark:hidden"
                     alt="Documents"/>
                     <Image 
                     src="/hero'.png"
                     fill
                     className="object-contain hidden dark:block"
                     alt="Documents"/>
                </div>
            </div>
        </div>
    )
}