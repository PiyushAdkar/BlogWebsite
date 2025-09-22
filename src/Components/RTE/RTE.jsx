import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import {Controller} from 'react-hook-form'
import "../RTE/RTE.css"

export default function RTE({name, control, label, defaultValue = ''})
{
    return(
        <div className="rte-container">
            {label && <label>{label}</label>}

            <Controller
            name = { name || "Content" }
            control = {control}
            defaultValue={defaultValue}
            render= {({field}) => (
                <Editor
                apiKey="pyigh2psstozld3scjdwi3gksh90p7kfii32inhrrnfhy2a9" 
                init=
                    {{
                        min_height: 200,
                        max_height: 500,
                        width: "100%",
                        menubar: true,
                        plugins: [
                                    'autoresize',
                                    'searchreplace',
                                    'visualblocks',
                                    'code',
                                    'fullscreen',
                                    'insertdatetime',
                                    'media',
                                    'table',
                                    'help',
                                    'wordcount'
                                    ],
                        toolbar:
                        "undo redo | formatselect | " +
                        "bold italic underline | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help",
                    }}
                    value={field.value} 
                onEditorChange={field.onChange}
                />
            )}/>
        </div>
    )
}