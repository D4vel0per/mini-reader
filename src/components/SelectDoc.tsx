import * as DPK from "expo-document-picker";
import { File } from "expo-file-system";
import { useState } from "react";
import { Button, Text, View } from "react-native";

export function DocumentSelector() {
    const [file, setFile] = useState<File | null>(null);

    const handleFileSelect = async () => {
        const result = await DPK.getDocumentAsync({
            copyToCacheDirectory: true,
            type: [
                "application/epub+zip"
            ]
        });
        if (result.canceled) return;

        const success = result as DPK.DocumentPickerSuccessResult

        setFile(new File(success.assets[0]?.uri!))
    };

    return (
        <View>
            <Text>Select a document</Text>
            <Text>Supported formats: </Text>
            <Button title="Select a File to display" onPress={handleFileSelect}></Button>
            {file && (<>
                <Text>File path: {file.uri}</Text>
                <Text>File name: {file.name}</Text>
                <Text>File size: {file.size} bytes</Text>
                <Text>File type: {file.type}</Text>
            </>)}
        </View>
    )
}
