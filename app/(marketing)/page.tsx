import { Heading } from "./_components/heading";
import { Heroes } from "./_components/heroes";
import { Footer } from "./_components/footer";

const MarketingPage = () => {
  return ( 
    <div className="min-h-screen flex flex-col dark:bg-[#1F1F1F]">
        <div className="flex flex-col items-center justify-center 
            md:justify-start text-center gap-y-8 flex-1 pb-10 px-6 m-auto">
              <Heading/>
              <Heroes/>
         </div>
         <Footer/>
    </div>
   );
}
 
export default MarketingPage;