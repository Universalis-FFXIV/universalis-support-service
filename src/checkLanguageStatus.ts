import bent from "bent"
import { POEditorLanguageListResponse } from "./types/POEditorLanguageListResponse";

const { poeditor_token, po_editor_id } = require("../config.json");

const poeditor = bent("https://api.poeditor.com/v2", "buffer")

/** Returns an object of language completion values, with percentage outputs. */
export function checkLanguageStatus(fn: (languageList: { [key: string]: number } | null) => void) {
    poeditor("/languages/list", {
        api_token: poeditor_token,
        id: po_editor_id,
    }).then(res => {
        const data: POEditorLanguageListResponse = JSON.parse(res.toString());

        const out = {};
        for (const languageInfo of data.result.languages) {
            out[languageInfo.name] = languageInfo.percentage;
        }
        fn(out);
    });
}
