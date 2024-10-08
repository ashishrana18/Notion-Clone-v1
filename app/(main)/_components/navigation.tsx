"use client";

import { ElementRef, useEffect, useRef, useState } from "react";
import {useMediaQuery} from "usehooks-ts";
import { usePathname,useParams,useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { MenuIcon,PlusCircle, Search,Settings ,ChevronsLeft ,Plus,Trash} from "lucide-react";
import { UserItem } from "./user-item";
import {useMutation,useQuery} from "convex/react";
import { api } from "@/convex/_generated/api";
import {toast} from "sonner";
import { Popover,PopoverTrigger,PopoverContent } from "@/components/ui/popover";

import { Item } from "./item";
import { DocumentList } from "./documentList";
import { TrashBox } from "./trash-box";
import { useSearch } from "@/hooks/useSearch";
import { useSettings } from "@/hooks/useSettings";
import { Navbar } from "./navbar";

export const Navigation = () => {
  const params=useParams();
  const router=useRouter();
  const pathname = usePathname();
  const search = useSearch();
  const settings = useSettings();
  const isMobile = useMediaQuery("(max-width:768px)");
  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  const create=useMutation(api.documents.create);
  const documents = useQuery(api.documents.get);

  useEffect(()=>{
    if(isMobile) collapse();
    else resetWidth();
  },[isMobile]);

  useEffect(()=>{
    if(isMobile) collapse();
  },[pathname,isMobile]);

  const handleMouseDown = (
    event:React.MouseEvent<HTMLDivElement,MouseEvent>
  )=>{
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current=true;
    document.addEventListener("mousemove",handleMouseMove);
    document.addEventListener("mouseup",handleMouseUp);
  };

  const handleMouseMove=(event:MouseEvent)=>{
    if(!isResizingRef.current) return;
    let newWidth=event.clientX;

    if(newWidth<240) newWidth=240;
    if(newWidth>480) newWidth=480;
    if(sidebarRef.current&&navbarRef.current){
        sidebarRef.current.style.width=`${newWidth}px`;
        navbarRef.current.style.paddingLeft=`${newWidth}px`;
        navbarRef.current.style.width=`calc(100%-${newWidth})}px`;
    }
  }

  const handleMouseUp=()=>{
    isResizingRef.current=false;
    document.removeEventListener("mousemove",handleMouseMove);
    document.removeEventListener("mouseup",handleMouseUp);
  }

  const resetWidth=()=>{
    if(sidebarRef.current&&navbarRef.current){
        setIsCollapsed(false);
        setIsResetting(true);

        sidebarRef.current.style.width=isMobile?"100%":"240px";
        navbarRef.current.style.paddingLeft=isMobile?"100%":"240px"; 
        navbarRef.current.style.width=isMobile?"0":"calc(100%-240px)";
        setTimeout(()=> setIsResetting(false),300);
    }
  }

  const collapse = ()=>{
    if(sidebarRef.current&&navbarRef.current){
        setIsCollapsed(true);
        setIsResetting(true);

        sidebarRef.current.style.width="0";
        navbarRef.current.style.paddingLeft="0";
        navbarRef.current.style.width="100%";
        setTimeout(()=> setIsResetting(false),300);
    }
  }

  const handleCreate = ()=>{
    const promise = create({title:"Untitled"})
      .then((documentId)=>router.push(`/documents/${documentId}`))

      toast.promise(promise,{
        loading:"Creating a new note...",
        success:"New note created!",
        error:"Failed to create a new note."
      })
  }

  return (
    <>
      <aside 
        ref={sidebarRef}
        className={cn("group/sidebar h-full bg-secondary overflow-y-auto relative flex flex-col w-60 z-[9999]",
        isResetting && "transition-all ease-in-out duration-300",
        isMobile && "w-0"
        )}
      >
        <div
          onClick={collapse}
          role="button"
          className={cn(
            "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 transition-opacity",
            "z-[10000]",
            isMobile ? "opacity-100" : "opacity-0 group-hover/sidebar:opacity-100"
          )}
        >
          <ChevronsLeft className="h-6 w-6" />
        </div>

        <div>
          <UserItem/>

          <Item onclick={search.onOpen} label="Search" icon={Search} isSearch />
          <Item onclick={settings.onOpen} label="Settings" icon={Settings} />
          <Item onclick={handleCreate} label="New Page" icon={PlusCircle} />

        </div>
        <div className="mt-4">
          {/* {documents?.map((document) => (
            <p key={document._id}>
              {document.title}
            </p>
          ))} */}
          <DocumentList/>
          <Item 
            onclick={handleCreate}
            label="Add a page"
            icon={Plus}
          />
          <Popover>
            <PopoverTrigger className="w-full mt-4">
              <Item label="Trash" icon={Trash} onclick={()=>{}}/>
            </PopoverTrigger>
            <PopoverContent side={isMobile?"bottom":"right"} className="p-0 w-72">
              <TrashBox/>
            </PopoverContent>
          </Popover>
        </div>
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100
                    transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0 "
        />
      </aside>
      <div
        ref={navbarRef}
        className={cn("absolute top-0 z-[9998] left-0 w-full",
        isResetting && "transition-all ease-in-out duration-300",
        isMobile && "left-0 w-100%"
        )}
       >
        {!!params.documentId ? (
          <Navbar isCollapsed={isCollapsed} onResetWidth={resetWidth}/>
        ) : (
          <nav className="bg-transparent px-4 py-3 w-full">
              {isCollapsed && <MenuIcon onClick={resetWidth} role="button" className="h-[28px] w-[28px] text-muted-foreground"/>}
          </nav>
        )}
      </div>
    </>
  );
};
