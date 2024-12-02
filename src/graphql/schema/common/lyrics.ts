export const LyricsType = `
    type LyricsData {
        id: Int
        plainLyrics: String
        syncedLyrics: String
    }

    type Lyrics {
        available: Boolean!
        locked: Boolean!
        data: LyricsData
    }
`;
