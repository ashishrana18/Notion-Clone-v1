"use client"

import {BlockNoteEditor,PartialBlock} from "@blocknote/core";
import {useCreateBlockNote} from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useTheme } from "next-themes";

import { useEdgeStore } from "@/lib/edgestore";
import { useEffect } from "react";

interface EditorProps{
    onChange:(value:string)=>void;
    initialContent?:string;
    editable?:boolean;
};

const Editor = ({
    onChange,initialContent,editable=true,
}:EditorProps)=>{

    const {resolvedTheme} = useTheme();
    const {edgestore} = useEdgeStore();

    const handleUpload = async(file:File)=>{
        const response=await edgestore.publicFiles.upload({file});

        return response.url;
    }

    const editor:BlockNoteEditor = useCreateBlockNote({
        initialContent : initialContent ? JSON.parse(initialContent) as PartialBlock[] : undefined,
        uploadFile:handleUpload,
        // onEditorContentChange:(editor: { document: any; })=>{
        //     onChange(JSON.stringify(editor.document, null, 2));
        // }
    })

    useEffect(() => {
        if (editable !== undefined) {
            editor.isEditable = editable;
        }
    }, [editable, editor]);

    editor.onChange(() => {
        onChange(JSON.stringify(editor.document, null, 2));
    });

    return(
        <div>
            <BlockNoteView editor={editor} theme={resolvedTheme === "dark" ? "dark" : "light"} editable={editable}/>
        </div>
    );
}

export default Editor;