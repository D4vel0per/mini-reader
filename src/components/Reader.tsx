import type {
    Decoration,
    DecorationActivatedEvent,
    DecorationGroup,
    File,
    SelectionAction,
    SelectionActionEvent
} from 'react-native-readium';

import { useEffect, useState } from "react";
import { Text, View } from 'react-native';
import { ReadiumView } from "react-native-readium";

interface ReaderProps {
    uri: string;
    userTint: string;
    username: string;
}

interface CommentProps {
    text: string
    username: string
}

function Comment ({ text, username }: CommentProps) {
    return (
        <View>
            <Text>{username} - { text }</Text>
        </View>
    )
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
    const [ decorations, setDecorations ] = useState<DecorationGroup[]>([
        { name: "comments", decorations: [] }
    ]);

    const [ actions, setActions ] = useState<SelectionAction[]>([
        { id: "comment", label: 'Comment' }
    ])

    const [ showComments, setShowComments ] = useState(false)

    useEffect(() => {
        const comments = fromDecorations(decorations, "comments")

        if (!comments) return;

        setActions([
            { id: "comment", label: 'Comment' },
            { id: "lookup", label: `Look up ${comments.length} comments` }
        ])
    }, [ decorations ])

    const onSelection = (e: SelectionActionEvent) => {
        console.log("Action id: ", e.actionId)

        if (e.actionId === "lookup") {
            setShowComments(true)
            return
        }

        const commentDecoration: DecorationOverride = {
            id: `comment-${Date.now()}`,
            locator: e.locator,
            style: {
                type: "highlight",
                tint: userTint
            },
            extras: {
                text: e.selectedText,
                username: "admin"
            }
        }

        setDecorations(prev => prev.map(
            dec => dec.name !== "comments" ? dec
            : { ...dec, decorations: [ ...dec.decorations, commentDecoration ] }
        ))
    }

    const onCommentPressed = ({ decoration }: DecorationActivatedEvent) => {
        console.log('Comment pressed')
        console.log("Selected text: ", decoration.extras?.text)
        console.log("Username: ", decoration.extras?.username)
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
        {
            showComments &&
            <View style={{position: 'absolute', flexDirection: 'column'}}>
                { fromDecorations(decorations, "comments")?.map(e => {
                    const comment = e as DecorationOverride
                    return <Comment text={comment.extras.text} username={comment.extras.username}/>
                }) }
            </View>
        }
        </>
        
    )
}