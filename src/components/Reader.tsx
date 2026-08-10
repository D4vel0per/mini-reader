import type {
    File,
    SelectionAction
} from 'react-native-readium';

import { useState } from "react";
import { ReadiumView } from "react-native-readium";

interface ReaderProps {
    uri: string;
}

const actions: SelectionAction[] = [
    { id: "comment", label: 'Comment' }
]

export default function Reader({uri}: ReaderProps) {
    const [ file] = useState<File>({
        url: uri,
    });

    return (
        <ReadiumView 
        file={file} 
        preferences={{}} 
        />
    )
}