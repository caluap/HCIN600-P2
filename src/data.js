/*

Random Poem Order: 2, 1, 4, 3

Imgs: 
00 2a1
01 2b2
02 2a3
03 2b4
04 1a1
05 1b2
06 1b3
07 4b1
08 4a2
09 4a3
10 4a4
11 3b1
12 3a2
13 3b3
14 3b4

Vids:
00 2b1 https://youtu.be/9wcRp6Ar7vQ
01 2a2 https://youtu.be/0ZRyLU6v8fg
02 2a3 https://youtu.be/ELe_KKWG92Y
03 2a4 https://youtu.be/46Ba0D9PoNk
04 1a1 https://youtu.be/7LsxvFoJPhQ
05 1b2 https://youtu.be/rcN5TFeZ_-k
06 1a3 https://youtu.be/bB4Aiw0k9A0
07 4a1 https://youtu.be/tCiBmoQJTtU
08 4b2 https://youtu.be/9iXBX1DpTLA
09 4a3 https://youtu.be/_SFJs-MPnew
10 4b4 https://youtu.be/RyhANc5xPmo
11 3a1 https://youtu.be/JZ49M_QJb1Y
12 3b2 https://youtu.be/8KhT2435nqQ
13 3a3 https://youtu.be/ytnBCcmcgPs
14 3a4 https://youtu.be/05uZrADPzPQ

*/
let soundsPath = "./assets/static/sounds",
  imgPath = "./assets/static/img/test_images/";
export var testData = {
  questions: [
    {
      stanzaCode: "01-p2-1",
      videoId: "vowylgLbmXs",
      imageUrl: require(imgPath + "00.png"),
      AudioAUrl: require(`${soundsPath}/Poema-2a_01.mp3`),
      AudioBUrl: require(`${soundsPath}/Poema-2b_01.mp3`),
      videoCode: "b",
      imgCode: "a",
    },
    {
      stanzaCode: "02-p2-2",
      videoId: "cnP_ptQlTwo",
      imageUrl: require(imgPath + "01.png"),
      AudioAUrl: require(`${soundsPath}/Poema-2a_02.mp3`),
      AudioBUrl: require(`${soundsPath}/Poema-2b_02.mp3`),
      videoCode: "a",
      imgCode: "b",
    },
    {
      stanzaCode: "03-p2-3",
      videoId: "uj0OFVhKPHA",
      imageUrl: require(imgPath + "02.png"),
      AudioAUrl: require(`${soundsPath}/Poema-2a_03.mp3`),
      AudioBUrl: require(`${soundsPath}/Poema-2b_03.mp3`),
      videoCode: "a",
      imgCode: "a",
    },
    {
      stanzaCode: "04-p2-4",
      videoId: "F3LKMYsr3QU",
      imageUrl: require(imgPath + "03.png"),
      AudioAUrl: require(`${soundsPath}/Poema-2a_04.mp3`),
      AudioBUrl: require(`${soundsPath}/Poema-2b_04.mp3`),
      videoCode: "a",
      imgCode: "b",
    },
    {
      stanzaCode: "05-p1-1",
      videoId: "7LsxvFoJPhQ",
      imageUrl: require(imgPath + "04.png"),
      AudioAUrl: require(`${soundsPath}/Poema-1a_01.mp3`),
      AudioBUrl: require(`${soundsPath}/Poema-1b_01.mp3`),
      videoCode: "a",
      imgCode: "a",
    },
    {
      stanzaCode: "06-p1-2",
      videoId: "rcN5TFeZ_-k",
      imageUrl: require(imgPath + "05.png"),
      AudioAUrl: require(`${soundsPath}/Poema-1a_02.mp3`),
      AudioBUrl: require(`${soundsPath}/Poema-1b_02.mp3`),
      videoCode: "b",
      imgCode: "b",
    },
    {
      stanzaCode: "07-p1-3",
      videoId: "bB4Aiw0k9A0",
      imageUrl: require(imgPath + "06.png"),
      AudioAUrl: require(`${soundsPath}/Poema-1a_03.mp3`),
      AudioBUrl: require(`${soundsPath}/Poema-1b_03.mp3`),
      videoCode: "a",
      imgCode: "b",
    },
    {
      stanzaCode: "08-p4-1",
      videoId: "-4j-mXkORaE",
      imageUrl: require(imgPath + "07.png"),
      AudioAUrl: require(`${soundsPath}/Poema-4a_01.mp3`),
      AudioBUrl: require(`${soundsPath}/Poema-4b_01.mp3`),
      videoCode: "a",
      imgCode: "b",
    },
    {
      stanzaCode: "09-p4-2",
      videoId: "Uimi_eZ9-dY",
      imageUrl: require(imgPath + "08.png"),
      AudioAUrl: require(`${soundsPath}/Poema-4a_02.mp3`),
      AudioBUrl: require(`${soundsPath}/Poema-4b_02.mp3`),
      videoCode: "b",
      imgCode: "a",
    },
    {
      stanzaCode: "10-p4-3",
      videoId: "Xx4LaNgAQ_k",
      imageUrl: require(imgPath + "09.png"),
      AudioAUrl: require(`${soundsPath}/Poema-4a_03.mp3`),
      AudioBUrl: require(`${soundsPath}/Poema-4b_03.mp3`),
      videoCode: "a",
      imgCode: "a",
    },
    {
      stanzaCode: "11-p4-4",
      videoId: "CmgVzQLnPyI",
      imageUrl: require(imgPath + "10.png"),
      AudioAUrl: require(`${soundsPath}/Poema-4a_04.mp3`),
      AudioBUrl: require(`${soundsPath}/Poema-4b_04.mp3`),
      videoCode: "b",
      imgCode: "a",
    },
    {
      stanzaCode: "12-p3-1",
      videoId: "vTaaukE1YI4",
      imageUrl: require(imgPath + "11.png"),
      AudioAUrl: require(`${soundsPath}/Poema-3a_01.mp3`),
      AudioBUrl: require(`${soundsPath}/Poema-3b_01.mp3`),
      videoCode: "a",
      imgCode: "b",
    },
    {
      stanzaCode: "13-p3-2",
      videoId: "SAUsdCjNqlM",
      imageUrl: require(imgPath + "12.png"),
      AudioAUrl: require(`${soundsPath}/Poema-3a_02.mp3`),
      AudioBUrl: require(`${soundsPath}/Poema-3b_02.mp3`),
      videoCode: "b",
      imgCode: "a",
    },
    {
      stanzaCode: "14-p3-3",
      videoId: "Eubv-f1qIA8",
      imageUrl: require(imgPath + "13.png"),
      AudioAUrl: require(`${soundsPath}/Poema-3a_03.mp3`),
      AudioBUrl: require(`${soundsPath}/Poema-3b_03.mp3`),
      videoCode: "a",
      imgCode: "b",
    },
    {
      stanzaCode: "p3-4",
      videoId: "VMndLfrapa4",
      imageUrl: require(imgPath + "14.png"),
      AudioAUrl: require(`${soundsPath}/Poema-3a_04.mp3`),
      AudioBUrl: require(`${soundsPath}/Poema-3b_04.mp3`),
      videoCode: "a",
      imgCode: "b",
    },
  ],
};
