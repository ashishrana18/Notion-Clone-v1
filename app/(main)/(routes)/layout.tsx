"use client"
import { useConvexAuth } from "convex/react";
import { Spinner } from "@/components/spinner";
import { Navigation } from "../_components/navigation";
import { redirect } from "@/node_modules/next/navigation";
import { SearchCommand } from "@/components/search-command";

const MainLayout=({
    children
}:{
    children: React.ReactNode;
})=>{
    const {isAuthenticated,isLoading}=useConvexAuth();

    if(isLoading){
        return(
            <div className="h-screen flex items-center justify-center">
                <Spinner size="lg"/>
            </div>
        );
    }

    // console.log(isAuthenticated);
    if(!isAuthenticated){
        return redirect("/");
    }
    return(
        <div className="h-screen flex dark:bg-[#1F1F1F]">
            <Navigation/>
            <main className="h-full flex-1 overflow-y-auto">
                <SearchCommand/>
                {children}
            </main>
        </div>
    );
}

export default MainLayout;