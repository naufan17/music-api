const Playlists = [
    {
        playlist_id: "IDPL_20001",
        title: 'Top Song',
        song: [    
            {
                song_id: "IDVD_10001",
                title: "As It Was",
                artists: ["Harry Styles"],
                album: "Harry's House",
                duration: "2:54",
                url: "http://play",
                playCount: 10000000
            },
            {
                song_id: "IDVD_10002",
                title: "Heat Waves",
                artists: ["Glass Animals"],
                album: "Dreamland",
                duration: "3:44",
                url: "http://play",
                playCount: 5000000
            }
        ]
    },
    {
        playlist_id: "IDPL_20002",
        title: 'Top Global',
        song: [    
            {
                song_id: "IDVD_10007",
                title: "Montero (Call Me by Your Name)",
                artists: ["Lil Nas X"],
                album: "Montero",
                duration: "2:13",
                url: "http://play",
                playCount: 300000
            },
            {
                song_id: "IDVD_10008",
                title: "We Don't Talk About Bruno",
                artists: ["Encanto Cast"],
                album: "Encanto",
                duration: "3:07",
                url: "http://play",
                playCount: 200000
            },
            {
                song_id: "IDVD_10009",
                title: "Bad Habits",
                artists: ["Ed Sheeran"],
                album: "= (Equals)",
                duration: "3:52",
                url: "http://play",
                playCount: 100000
            }
        ]
    }
];

module.exports = { playlists: Playlists };