export interface POEditorLanguageListResponse {
    response: {
        status: string;
        code: string;
        message: string;
    };
    result: {
        languages: [
            {
                name: string;
                code: string;
                translations: number;
                percentage: number;
                updated: string;
            }
        ]
    };
}