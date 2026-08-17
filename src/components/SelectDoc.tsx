import * as DPK from "expo-document-picker";
import { useState } from "react";
import { Button, Text, View } from "react-native";
import Reader from "./Reader";

export function DocumentSelector() {
    const [uri, setURI] = useState<string | null>(null);

    const handleFileSelect = async () => {
        const result = await DPK.getDocumentAsync({
            copyToCacheDirectory: true,
            type: [
                "application/epub+zip"
            ]
        });
        if (result.canceled) return;

        const success = result as DPK.DocumentPickerSuccessResult

        setURI(success.assets[0].uri)
    };

    return (
        <View style={{ backgroundColor: "blue", flex: 1}}>
            <Text>Select a document</Text>
            <Text>Supported formats: epub</Text>
            <Button title="Select a File to display" onPress={handleFileSelect}></Button>
            {uri && (
                <Reader uri={uri} userTint="#F54927" username="admin"/>
            )}
        </View>
    )
}
