/*import type {
    Decoration,
    DecorationActivatedEvent,
    DecorationGroup,
    File,
    SelectionAction,
    SelectionActionEvent
} from 'react-native-readium';

import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { RefObject, useEffect, useRef, useState } from "react";
import { Button, Text, TextInput } from 'react-native';
import { ReadiumView } from "react-native-readium";

interface ReaderProps {
    uri: string;
    userTint: string;
    username: string;
}

function fromDecorations(groups: DecorationGroup[], key: string) {
    const data = groups.filter(e => e.name === key)

    return data.length ? data[0].decorations : undefined
}

interface DecorationOverrideExtra extends Record<string, string> {
    text: string;
    username: string;
}

interface DecorationOverride extends Decoration {
    extras: DecorationOverrideExtra
}

export default function Reader({ uri, userTint, username }: ReaderProps) {
    const [ file] = useState<File>({
        url: uri,
    });

    const sheet = useRef<BottomSheet>(null)

    const [ decorations, setDecorations ] = useState<DecorationGroup[]>([
        { name: "comments", decorations: [] }
    ]);

    const [ actions, setActions ] = useState<SelectionAction[]>([
        { id: "comment", label: 'Comment' }
    ])

    const [ showCommentMenu, setShowCommentMenu ] = useState(false)

    const [ commentEditingId, setCommentEditingId ] = useState<string|null>(null)

    const [ commentSelected, setCommentSelected ] = useState<DecorationOverrideExtra|null>(null)

    useEffect(() => {
        const comments = fromDecorations(decorations, "comments")

        if (!comments) return;

        setActions([
            { id: "comment", label: 'Comment' }
        ])
    }, [ decorations ])

    const onSelection = (e: SelectionActionEvent) => {
        const commentDecoration: DecorationOverride = {
            id: `comment-${Date.now()}`,
            locator: e.locator,
            style: {
                type: "highlight",
                tint: userTint
            },
            extras: {
                text: "",
                username: username
            }
        }

        setCommentEditingId(commentDecoration.id)

        setShowCommentMenu(true)

        sheet.current?.expand()

        
    }

    const editCommentById = (id: string, text: string) => { // Look for the specific comment using its id and change the text.
        setDecorations(prev => prev.map(group => {
            if (group.name !== "comments") return group

            group.decorations = group.decorations.map(e => {
                if (e.id === id && e.extras) {
                    e.extras.text = text
                    sheet.current?.close()
                }

                return e
            })

            return group
        }))

    }

    const onCommentPressed = ({ decoration }: DecorationActivatedEvent) => {
        const comment = decoration as DecorationOverride
        setCommentSelected(comment.extras)
        sheet.current?.expand()
    }

    return (
        <>
        <ReadiumView 
        file={file}
        preferences={{}} 
        selectionActions={actions}
        decorations={decorations}
        onSelectionAction={onSelection}
        onDecorationActivated={onCommentPressed}
        />
        <BottomSheet 
        ref={sheet}
        enableDynamicSizing={false}
        onClose={() => {
            setCommentSelected(null)
            setCommentEditingId(null)  //Cleanup
            setShowCommentMenu(false)
        }}
        >
            <BottomSheetView>
                { 
                showCommentMenu && commentEditingId ? 
                <WriteCommentMenu submitAction={editCommentById} commentId={commentEditingId} /> :
                commentSelected &&
                <ReadComment sheetRef={sheet} selectedComment={commentSelected} />
                
                }
            </BottomSheetView>
        </BottomSheet>
        </>
    )
}

interface WriteCommentMenuProps {
    submitAction: (id: string, text: string) => void,
    commentId: string
}

function WriteCommentMenu ({ submitAction, commentId }: WriteCommentMenuProps) {
    const [ commentText, setCommentText ] = useState("")
    return (<>
    <Text>Write a Comment:</Text>
    <TextInput value={commentText} onChangeText={text => setCommentText(text)}/>
    <Button title="Submit" onPress={() => submitAction(commentId, commentText)}/>
    </>)
}

interface ReadCommentProps {
    sheetRef: RefObject<BottomSheetMethods|null>,
    selectedComment: DecorationOverrideExtra
}

function ReadComment ({ sheetRef, selectedComment }: ReadCommentProps) {
    return (<>
    <Button title="Close" onPress={() => sheetRef.current?.close()}/>
    <Text style={{fontWeight: "bold"}}>{selectedComment.username}</Text>
    <Text>{selectedComment.text}</Text>
    </>)
}*/