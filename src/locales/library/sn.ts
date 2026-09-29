import type { LibraryText } from "@/lib/library";

/*
 * Shona translation of the crop health library (src/lib/library.ts).
 * NOT YET REVIEWED by a native speaking agronomist: check every entry,
 * especially spray safety and treatment steps, before farmers rely on it.
 * Active ingredients, product names and numbers stay as in English.
 * Lists must keep the same order and length as the English library.
 */
const sn: LibraryText = {
  spraySafety:
    "Verenga uye utevere zvakanyorwa pamushonga. Pfeka magirovhosi, chivharamuromo nehembe dzine maoko marefu. Usapfapfaidza kuchinge kune mhepo kana masikati kuchipisa, usaswedera kunzvimbo dzemvura, uye chengeta nguva yakanyorwa pamushonga pakati pekupfapfaidza nekukohwa.",

  symptoms: {
    chewed: "Mashizha akadyiwa, ane maburi kana akabvaruka",
    frass: "Tsvina yakaita sehupfu hwematanda pakati pechibage (whorl)",
    caterpillars: "Honye kana makonye pachirimwa",
    windowpane: "Nzvimbo dzakadyiwa pamashizha dzinoonekera mhiri se“mahwindo”",
    insect_clusters: "Tupuka tudiki twakaungana pasi pemashizha kana pamabukira",
    sticky: "Mashizha anonamatira kana ane howa hutema (sooty mould)",
    curled: "Mashizha akapetana, akamonyoroka kana akakombama",
    yellow_lower: "Kuita yero kunotanga pamashizha ekare ari pasi",
    yellow_v: "Yero yakaita V kubva pamuromo weshizha ichitevedza tsinga yepakati",
    purple: "Mashizha epepuru kana matsvuku pazvirimwa zvidiki",
    edge_scorch: "Mipendero yemashizha inoita yero, yozoita bhurauni yooma",
    streaks: "Mitsetse mitete yeyero isina kubatana pamashizha",
    stunted: "Chirimwa chidiki uye chakaguma kukura",
    mosaic: "Mashizha ane mavara egirinhi yakajeka neyakasviba akasanganiswa (mosaic)",
    target_spots: "Mavara ebhurauni ane marin'i akaita sechinangwa chekupfura",
    grey_rectangles: "Mavara marefu egirei kana eshava akaita sezvikwere zvakareba pakati petsinga",
    cigar_lesions: "Mavara marefu akaita sechidhanda chefodya (cigar), egirinhi rakachena kana eshava",
    water_soaked: "Nzvimbo dzakasviba dzinoita sedzakanyura mumvura dzinokurumidza kupararira",
    white_mould: "Howa huchena hune mvere pasi pemashizha munguva yekunaya",
    round_spots: "Mavara madiki akatenderera ebhurauni kana matema pamashizha",
    rust_pustules: "Mapundu madiki ane hupfu hwakaita sengura (rust) pamashizha",
    mines: "Migero yakachenuruka inomonereka kana mavara mukati memashizha",
    fruit_holes: "Maburi madiki muchibereko kana mumbatatisi",
    wilting: "Chirimwa chinosvava kunyangwe ivhu rakanyorova",
  },

  conditions: {
    "fall-armyworm": {
      name: "Fall Armyworm (honye dzinodya chibage)",
      urgency: "Ita chimwe chinhu mukati memazuva 1 kusvika 2 kuderedza kurasikirwa negoho",
      summary:
        "Honye inodya mukati mehuro yechibage (whorl) yozodya pamuguri. Honye diki dzinokwenya mashizha dzichisiya nzvimbo dzinoonekera mhiri; honye huru dzinodya maburi makuru dzichisiya tsvina yakaita sehupfu hwematanda. Kana isina kudzivirirwa, inogona kuparadza goho rakawanda.",
      firstSteps: [
        "Tarisa zvirimwa 10 munzvimbo 5 mumunda wese kuti uone kuti zvingani zvakabatwa",
        "Pwanya mazai nehonye diki dzaunoona muhuro yechibage",
        "Kana zvirimwa zvidiki zvinopfuura 1 pa 5 zvakakuvadzwa, rapa munda izvozvi",
        "Tarisa zvakare mushure memazuva 3",
      ],
      chemical: {
        application: "Pfapfaidza uchinanga muhuro yechirimwa chimwe nechimwe, mangwanani kana masikati ave kuvira",
        timing:
          "Kana kukuvadzwa kwapfuura mwero wekuti urape; dzokorora chete sezvinobvumirwa pamushonga uye chinjanisa mhando dzemishonga",
      },
      organic: [
        {
          name: "Dota kana jecha muhuro",
          how: "Isa dota rakatsetseka kana jecha rakaoma muhuro yechibage chakabatwa kuti uuraye nekudzinga honye diki.",
        },
        {
          name: "Kunhonga nemaoko",
          how: "Pamunda mudiki, bvisa uye upwanye honye dziri muhuro yechibage mangwanani chaiwo padzinenge dzichishanda zvikuru.",
        },
        {
          name: "Muto weneem",
          how: "Nyika mhodzi kana mashizha eneem akapwanyiwa mumvura usiku hwese, sefa, wopfapfaidza muhuro yechibage.",
        },
      ],
      prevention: [
        "Dyara nekukurumidza pakutanga kwemvura, kuti zvirimwa zvikure zvisati zvasvika nguva ine zvipfukuto zvakawanda",
        "Tarisa munda kamwe pavhiki zvirimwa zvichiri zvidiki",
        "Sanganisa chibage nebhinzi kana nyemba",
        "Chengeta munda usina huswa hunochengeta chipembenene ichi",
      ],
    },
    "maize-streak": {
      name: "Chirwere chemitsetse pachibage (Maize Streak Virus)",
      urgency: "Hapana mushonga kana chabatwa; ita izvozvi kuchengetedza zvirimwa zvakanaka",
      summary:
        "Hutachiona hunoparadzirwa netupuka tudiki tunosvetuka (leafhoppers). Mashizha anoratidza mitsetse mitete yeyero isina kubatana ichitevedza tsinga. Zvirimwa zvinobatwa zvichiri zvidiki zvinoguma kukura uye zvinobereka miguri midiki kana kusabereka.",
      firstSteps: [
        "Dzura uye uparadze zvirimwa zvidiki zvakabatwa zvakanyanya",
        "Dzivirira tupuka tunosvetuka mumunda nemuhuswa huri pedyo",
        "Nyora mhando yawakadyara; sarudza mhando inoshinga chirwere ichi mwaka unotevera",
      ],
      organic: [
        {
          name: "Kudzura zvirimwa zvakabatwa",
          how: "Bvisa zvirimwa zvakabatwa nekukurumidza kuti zvisava kwainobva hutachiona hunotakurwa netupuka tunosvetuka.",
        },
      ],
      prevention: [
        "Dyara mhodzi yechibage yakasimbiswa yemhando inoshinga chirwere ichi",
        "Usadyara nguva yapfuura pedyo neminda yechibage chakura",
        "Chengeta huswa hwakapoteredza munda hwakapfupika",
      ],
    },
    "grey-leaf-spot": {
      name: "Mavara egirei pamashizha (Grey Leaf Spot)",
      urgency: "Rapa mukati mevhiki kana mavara asvika pamashizha ari pamusoro pemuguri",
      summary:
        "Chirwere chehowa chinofarira kunze kunodziya kune unyoro uye minda inodyarwa chibage gore negore. Mavara marefu, akatetepa egirei kana eshava anoonekwa pakati petsinga dzemashizha, achitanga pamashizha ari pasi.",
      firstSteps: [
        "Tarisa kana mavara asvika pamashizha akapoteredza nepamusoro pemuguri",
        "Kana zvaitika zviyo zvisati zvazara, kupfapfaidza mushonga wehowa (fungicide) kunobatsira",
        "Ronga kusadyara chibage mumunda uyu mwaka unotevera",
      ],
      chemical: {
        application: "Pfapfaidza mashizha, uchifukidza shizha riri pamuguri nemashizha ari pamusoro paro",
        timing: "Pakubuda kwemaruva echibage (tasselling) kana chirwere chichikwira chirimwa",
      },
      organic: [
        {
          name: "Kubata mashanga",
          how: "Mushure mekukohwa, viga kana kubvisa mashanga echibage akabatwa kuti howa husaendere kumwaka unotevera.",
        },
      ],
      prevention: [
        "Chinjanisa chibage nezvirimwa zvakaita senzungu kana soya",
        "Dyara haibhiridhi inoshinga chirwere",
        "Usadyara zvakanyanya kupindirana zvinoita kuti mashizha agare akanyorova",
      ],
    },
    "northern-leaf-blight": {
      name: "Kupiswa kwemashizha (Northern Leaf Blight)",
      urgency: "Ramba uchitarisa; rapa kana chasvika pamashizha ari kumusoro zviyo zvisati zvazara",
      summary:
        "Chirwere chehowa chinokonzera mavara marefu akaita sechidhanda chefodya, egirinhi rakachena kusvika kushava, pamashizha. Chinopararira munguva inotonhora ine mvura uye chinogona kuderedza kuzara kwezviyo kana mashizha ari kumusoro abatwa.",
      firstSteps: [
        "Tarisa kuti mavara akwira zvakadii pachirimwa",
        "Pfapfaidza mushonga wehowa kana mashizha ari kumusoro abatwa maruva echibage asati abuda",
        "Usadyara chibage munda uyu mwaka unotevera",
      ],
      chemical: {
        application: "Pfapfaidza mashizha, uchifukidza mashizha ese ari kumusoro",
        timing: "Pazviratidzo zvekutanga pamashizha ari kumusoro, maruva asati abuda kana pavanobuda",
      },
      organic: [
        {
          name: "Kuchenesa munda",
          how: "Viga kana kubvisa mashanga mushure mekukohwa kuderedza howa hwemwaka unotevera.",
        },
      ],
      prevention: [
        "Dyara haibhiridhi dzinoshinga chirwere",
        "Chinjanisa nezvirimwa zvakaita senzungu kana bhinzi",
        "Bata mashanga zvakanaka mushure mekukohwa",
      ],
    },
    "nitrogen-deficiency": {
      name: "Kushaya naitirojeni (Nitrogen Deficiency)",
      urgency: "Kandira fetiraiza mukati mevhiki kuti zvibatsire zvakanyanya",
      summary:
        "Chirimwa hachisi kuwana naitirojeni yakakwana. Mashizha ekare ari pasi anotanga kuita yero yakachenuruka; pachibage yero inoita V kubva pamuromo weshizha ichitevedza tsinga yepakati. Kukura kunononoka uye goho rinodzikira.",
      firstSteps: [
        "Kandira fetiraiza ine naitirojeni yakaita seAN kana urea nemwero unokurudzirwa nemukuru wezvekurima",
        "Isa fetiraiza ivhu richinyorova, pedyo nechirimwa wofukidza",
        "Sakura munda kuti fetiraiza iwanikwe nezvirimwa, kwete huswa",
      ],
      organic: [
        {
          name: "Mupfudze nekomposti",
          how: "Sanganisa mupfudze wakaora zvakanaka kana komposti muvhu usati wadyara uye semupfudze wekukandira.",
        },
        {
          name: "Kuchinjanisa nezvirimwa zvinovaka ivhu",
          how: "Dyara nzungu, bhinzi kana soya chibage chisati chadyarwa kuti zvisiye naitirojeni muvhu.",
        },
      ],
      prevention: [
        "Govanisa naitirojeni kaviri pane kuikandira kamwe chete",
        "Edza ivhu pazvinokwanisika uye wedzera mupfudze mwaka wega wega",
        "Chinjanisa zviyo nezvirimwa zvakaita senzungu kana bhinzi",
      ],
    },
    "phosphorus-deficiency": {
      name: "Kushaya fosiforasi (Phosphorus Deficiency)",
      urgency: "Gadzirisa pakudyara kunotevera; hapana zvakawanda zvinoitwa mwaka wapfuura nepakati",
      summary:
        "Zvirimwa zvidiki zvinoratidza mashizha epepuru kana matsvuku uye zvinokura zvishoma nezvishoma. Zvinowanzoitika muvhu rinotonhora, rakanyorova kana rine asidhi uye pasina fetiraiza yekudyara.",
      firstSteps: [
        "Tarisa kana fetiraiza yekudyara yakaiswa pakudyara",
        "Ronga kuisa fetiraiza yekudyara (semuenzaniso Compound D) pakudyara mwaka unotevera",
        "Funga kuisa raimu kana ivhu rako rine asidhi",
      ],
      organic: [
        {
          name: "Mupfudze pakudyara",
          how: "Isa mupfudze wakaora zvakanaka mumakomba kana mumitsetse yekudyara usati waisa mhodzi.",
        },
      ],
      prevention: [
        "Isa fetiraiza yekudyara pakudyara",
        "Gadzirisa ivhu rine asidhi neraimu",
        "Wedzera mupfudze kana komposti mwaka wega wega",
      ],
    },
    "potassium-deficiency": {
      name: "Kushaya potashiyamu (Potassium Deficiency)",
      urgency: "Gadzirisa pakudyara kunotevera",
      summary:
        "Mipendero yemashizha ekare inoita yero, yozoita bhurauni yooma, asi pakati peshizha panoramba pakasvibira. Madzinde anogona kuva asina simba uye michero isina kunaka.",
      firstSteps: [
        "Shandisa fetiraiza yekudyara ine potashiyamu (K iri muNPK) pakudyara kunotevera",
        "Dzosera mashanga nedota muvhu",
      ],
      organic: [
        {
          name: "Dota remiti",
          how: "Paradzira dota remiti, rine potashiyamu yakawanda, zvishoma wosanganisa nevhu.",
        },
      ],
      prevention: [
        "Shandisa fetiraiza yekudyara yeNPK yakaenzana",
        "Dzosera mashanga mumunda",
      ],
    },
    "early-blight": {
      name: "Bhiraiti yekutanga (Early Blight)",
      urgency: "Tanga kurapa mukati memazuva mashoma",
      summary:
        "Chirwere chehowa chinoita mavara ebhurauni ane marin'i akaita sechinangwa, chichitanga pamashizha ekare ari pasi anozoita yero woduruka. Chinopararira kunze kuchidziya kune dova kana mvura.",
      firstSteps: [
        "Bvisa uye uparadze mashizha akabatwa ari pasi zvakanyanya",
        "Pfapfaidza mushonga wehowa unodzivirira, uchifukidza mativi ese emashizha",
        "Diridza pasi pechirimwa, kwete pamusoro pemashizha",
      ],
      chemical: {
        application: "Pfapfaidza mashizha, uchifukidza zvakanaka mashizha ari pasi",
        timing: "Pamavara ekutanga, wozodzokorora nenguva yakanyorwa pamushonga munguva yemvura",
      },
      organic: [
        {
          name: "Kubvisa mashizha nekufukidza ivhu",
          how: "Bvisa mashizha ari pasi zvakanyanya wofukidza ivhu (mulch) kuti mvura isarovera howa kumusoro pazvirimwa.",
        },
        {
          name: "Mushonga wecopper",
          how: "Mishonga ine copper inobvumirwa munzira zhinji dzechisikigo; tevera zvakanyorwa pamushonga.",
        },
      ],
      prevention: [
        "Chinjanisa madomasi nembatatisi nezvimwe zvirimwa zvisina hukama nazvo kwemakore 2 kusvika 3",
        "Simbisa zvirimwa nematanda uye uzviparadzanise kuti mhepo ipfuure",
        "Diridza nemadonhwe kana mumigero pane kudiridza pamusoro",
      ],
    },
    "late-blight": {
      name: "Bhiraiti yekupedzisira (Late Blight)",
      urgency: "Ita nhasi; inogona kuparadza munda mukati memazuva mashoma munguva yemvura",
      summary:
        "Chirwere chinopararira nekukurumidza munguva inotonhora ine mvura. Nzvimbo dzakasviba dzinoita sedzakanyura mumvura dzinoonekwa pamashizha nemadzinde, kazhinji dziine howa huchena hune mvere pasi. Michero nembatatisi zvinoora.",
      firstSteps: [
        "Bvisa uye uparadze zvirimwa zvakabatwa kure nemunda (usazviisa mukomposti)",
        "Pfapfaidza zvimwe zvirimwa nemushonga wehowa wakakodzera izvozvi",
        "Ramba uchitarisa zuva nezuva kana kuchiri kunaya",
      ],
      chemical: {
        application: "Pfapfaidza mashizha, uchifukidza zvese kusanganisira madzinde",
        timing: "Izvozvi, wozodzokorora nenguva dzakanyorwa pamushonga munguva inotonhora ine mvura",
      },
      organic: [
        {
          name: "Paradza zvirimwa zvakabatwa",
          how: "Dzura, isa mubhegi kana kupisa zvirimwa zvakabatwa kudzikisa kupararira kuzvirimwa zvakanaka.",
        },
      ],
      prevention: [
        "Shandisa mhodzi dzembatatisi dzakasimbiswa dzisina chirwere",
        "Paradzanisa zvirimwa uye uzvisimbise nematanda kuti mashizha aome nekukurumidza",
        "Usadiridza pamusoro pemashizha manheru",
      ],
    },
    "tuta-absoluta": {
      name: "Honye dzinochera mashizha emadomasi (Tuta absoluta)",
      urgency: "Ita mukati memazuva mashoma; dzinowanda nekukurumidza zvikuru",
      summary:
        "Chipfukuto chidiki chine honye dzinochera migero mukati memashizha emadomasi, dzichisiya mavara akachenuruka, uye dzinoboora michero, dzichisiya maburi madiki. Kurwiswa kwakanyanya kunogona kuparadza goho rese remadomasi.",
      firstSteps: [
        "Nhonga uye uparadze mashizha ane migero nemichero yakakuvadzwa",
        "Isa misungo yefeoromoni (pheromone) kana yemvura kuti utarise nekubata zvipfukuto",
        "Pfapfaidza mushonga wezvipembenene wakanyoreswa kana kukuvadzwa kuchipararira",
      ],
      chemical: {
        application: "Pfapfaidza mashizha; chinjanisa mhando dzemishonga kuti zvipembenene zvisazvishinga",
        timing: "Paunotanga kuona migero uye zvipfukuto zvinobatwa zvichiwanda",
      },
      organic: [
        {
          name: "Misungo",
          how: "Shandisa misungo yefeoromoni, kana dhishi remvura ine sipo rine mwenje pamusoro paro usiku, kubata zvipfukuto zvakura.",
        },
        {
          name: "Kuchenesa",
          how: "Bvisa uye uviga pasi zvakadzika mashizha nemichero zvakabatwa, kana kuzvisunga mubhegi zvichigara muzuva.",
        },
      ],
      prevention: [
        "Tanga nembande dzakachena dzisina zvipembenene",
        "Bvisa madomasi ekare nezvirimwa zvakazvimera zvega nekukurumidza mushure mekukohwa",
        "Usadyara madomasi pedyo nemunda wakabatwa",
      ],
    },
    aphids: {
      name: "Tupukanana tunosveta muto (Aphids)",
      urgency: "Rapa mukati mevhiki, nekukurumidza kana zvirimwa zvichiri zvidiki",
      summary:
        "Tupuka tudiki tune miviri yakapfava tunoungana pasi pemashizha nepamabukira matsva, tuchisveta muto. Mashizha anopetana uye anonamatira nemuto unotapira, unomera howa hutema. Tupuka utwu tunoparadzirawo hutachiona.",
      firstSteps: [
        "Tarisa pasi pemashizha nepamabukira",
        "Geza mapoka madiki nemvura ine simba kana mvura ine sipo",
        "Pfapfaidza mushonga wezvipembenene wakanyoreswa chete kana mapoka achiramba achipararira",
      ],
      chemical: {
        application: "Pfapfaidza mashizha, uchisvika pasi pemashizha",
        timing:
          "Kana mapoka achipararira; usapfapfaidza zvirimwa zvine maruva kana nyuchi dzichishanda",
      },
      organic: [
        {
          name: "Mushonga wesipo",
          how: "Sanganisa chipunu chikuru 1 chesipo yemvura mulita 1 remvura wopfapfaidza pasi pemashizha.",
        },
        {
          name: "Mushonga wegariki nemhiripiri",
          how: "Nyika gariki nemhiripiri zvakapwanyiwa mumvura usiku hwese, sefa, isa sipo shoma wopfapfaidza.",
        },
        {
          name: "Vavengi vechisikigo",
          how: "Tupuka tutsvuku twemadonhwe (ladybirds) nema lacewings tunodya aphids; usashandisa mishonga inouraya zvipembenene zvese.",
        },
      ],
      prevention: [
        "Usakandira fetiraiza yenaitirojeni yakawandisa, inounza kukura kwakapfava kunodiwa neaphids",
        "Bvisa huswa hunochengeta aphids",
        "Dyara maruva pedyo kukwezva vavengi vechisikigo",
      ],
    },
    "diamondback-moth": {
      name: "Honye dzekabichi (Diamondback Moth)",
      urgency: "Ita mukati memazuva mashoma",
      summary:
        "Chipembenene chikuru chekabichi nezvimwe zvirimwa zvakafanana nayo. Honye diki dzegirinhi dzinodya pasi pemashizha dzichisiya “mahwindo” anoonekera mhiri, wozova maburi. Kurwiswa kwakanyanya kunoparadza misoro yekabichi.",
      firstSteps: [
        "Tarisa pasi pemashizha ekunze kana paine honye diki dzegirinhi",
        "Pfapfaidza mushonga weBt (Bacillus thuringiensis) kana mumwe mushonga wezvipembenene wakanyoreswa",
        "Chinjanisa mhando dzemishonga; chipembenene ichi chinokurumidza kushinga mishonga",
      ],
      chemical: {
        application: "Pfapfaidza pasi pemashizha masikati ave kuvira",
        timing: "Honye dzichiri diki; dzokorora nenguva dzakanyorwa pamushonga, uchichinjanisa mhando",
      },
      organic: [
        {
          name: "Mushonga weBt",
          how: "Bt ibhakitiriya rechisikigo rinokanganisa honye chete uye harina njodzi kuvanhu nenyuchi.",
        },
        {
          name: "Kunhonga nemaoko",
          how: "Bvisa honye nemazai paminda midiki mazuva mashoma ega ega.",
        },
      ],
      prevention: [
        "Usadyara kabichi nezvirimwa zvakafanana nayo gore rese panzvimbo imwe chete",
        "Paradza zvasara zvezvirimwa mushure mekukohwa",
        "Diridza pamusoro munguva yekuoma, zvinogeza honye diki",
      ],
    },
    "groundnut-leaf-spot": {
      name: "Mavara pamashizha enzungu (Groundnut Leaf Spot)",
      urgency: "Tanga kupfapfaidza mukati mevhiki yemavara ekutanga",
      summary:
        "Early leaf spot ne late leaf spot zvirwere zvehowa zvinoita mavara akatenderera ebhurauni kusvika kutema pamashizha enzungu. Mashizha anoduruka nguva isati yakwana, zvichideredza goho remakoko.",
      firstSteps: [
        "Simbisa kuti mavara ari pamashizha ari pasi pazvirimwa zvakawanda",
        "Tanga kupfapfaidza mushonga wehowa uye uenderere nenguva dzakanyorwa pamushonga",
        "Ronga kusadyara nzungu mumunda uyu mwaka unotevera",
      ],
      chemical: {
        application: "Pfapfaidza mashizha, uchifukidza zvirimwa zvese",
        timing: "Kubva pamavara ekutanga, wozopfapfaidza mazuva 10 kusvika 14 ega ega munguva yemvura",
      },
      organic: [
        {
          name: "Kuchinjanisa nekuchenesa",
          how: "Chinjanisa nezviyo uye bvisa nzungu dzinozvimera dzega.",
        },
      ],
      prevention: [
        "Chinjanisa nzungu nechibage kana zvimwe zviyo",
        "Dyara mhando dzinoshinga chirwere",
        "Dyara panguva inokurudzirwa",
      ],
    },
    "groundnut-rosette": {
      name: "Chirwere cherozeti chenzungu (Groundnut Rosette)",
      urgency: "Hapana mushonga; bvisa zvirimwa zvakabatwa uye dzivirira zvimwe",
      summary:
        "Chirwere chehutachiona chinoparadzirwa neaphids. Zvirimwa zvinoguma kukura zvakanyanya uye zvinoita sechihuni chine mashizha madiki ane mavara kana yero. Zvirimwa zvidiki zvakabatwa zvinobereka makoko mashoma kana kusabereka.",
      firstSteps: [
        "Dzura uye uparadze zvirimwa zvakabatwa nekukurumidza",
        "Dzivirira aphids pazvirimwa zvasara",
        "Nyora nzvimbo dzakabatwa uye sarudza mhando inoshinga chirwere mwaka unotevera",
      ],
      organic: [
        {
          name: "Kudyara nekukurumidza zvakapindirana",
          how: "Dyara nekukurumidza nekupindirana kunokurudzirwa; aphids hadzifariri zvirimwa zvakapindirana zvakazara.",
        },
      ],
      prevention: [
        "Dyara mhando dzinoshinga rozeti",
        "Dyara pakutanga kwemwaka",
        "Shandisa kupindirana kunokurudzirwa",
      ],
    },
    "bean-rust": {
      name: "Ngura yebhinzi (Bean Rust)",
      urgency: "Rapa mukati mevhiki kana ichipararira",
      summary:
        "Chirwere chehowa chinoita mapundu madiki ane hupfu hweruvara rwengura, kazhinji pasi pemashizha. Kubatwa kwakanyanya kunoita kuti mashizha aite yero woduruka nguva isati yakwana.",
      firstSteps: [
        "Tarisa pasi pemashizha kana paine hupfu hwengura hunobuda pamunwe",
        "Pfapfaidza mushonga wehowa wakakodzera kana mashizha anopfuura mashoma abatwa",
      ],
      chemical: {
        application: "Pfapfaidza mashizha, uchifukidza mativi ese",
        timing: "Pazviratidzo zvekutanga, wozodzokorora nenguva dzakanyorwa pamushonga",
      },
      organic: [
        {
          name: "Bvisa mashizha akabatwa",
          how: "Nhonga mashizha akanyanya kubatwa uye usashande muzvirimwa zvakanyorova.",
        },
      ],
      prevention: [
        "Dyara mhando dzinoshinga chirwere",
        "Chinjanisa bhinzi nezviyo",
        "Paradza zvasara zvezvirimwa mushure mekukohwa",
      ],
    },
  },

  guides: {
    pfumvudza: {
      title: "Kudyara kwePfumvudza/Intwasa",
      summary:
        "Kurima kunochengetedza ivhu pamunda mudiki: makomba ekudyara, kufukidza ivhu uye kusarima nemagejo kuti uwane zvakawanda kubva kunzvimbo diki nemvura shoma.",
      sections: [
        {
          heading: "Gadzirira munda",
          points: [
            "Bvisa huswa usingarime nejeko; siya mashanga sechifukidzo",
            "Maka mitsetse ingangoita 75 cm kupatsana, nemakomba anenge 60 cm kupatsana mumutsetse",
            "Chera makomba ekudyara anenge 15 cm paupamhi, kureba nekudzika mvura isati yanaya",
          ],
        },
        {
          heading: "Dyara",
          points: [
            "Isa mupfudze kana fetiraiza yekudyara mugomba rimwe nerimwe wofukidza nevhu zvishoma",
            "Dyara mushure memvura yakanaka, nemwero wemhodzi unokurudzirwa naAGRITEX",
            "Fukidza ivhu pakati pemakomba nehuswa kana mashanga",
          ],
        },
        {
          heading: "Chengeta zvirimwa",
          points: [
            "Chengeta munda usina huswa, zvikuru kwemavhiki matanhatu ekutanga",
            "Kandira fetiraiza yenaitirojeni panguva yakakodzera",
            "Tarisa kamwe pavhiki kana paine zvipembenene zvakaita sefall armyworm",
          ],
        },
      ],
    },
    "crop-rotation": {
      title: "Kuchinjanisa Zvirimwa",
      summary:
        "Kuchinja zvirimwa mumunda wega wega mwaka wega wega kunodzivirira zvipembenene nezvirwere uye kunoita kuti zvirimwa zvakaita senzungu zvivake ivhu.",
      sections: [
        {
          heading: "Nei uchichinjanisa",
          points: [
            "Zvirwere zvakaita semavara egirei pamashizha zvinowanda kana chibage chichitevera chibage",
            "Nzungu, bhinzi nesoya zvinowedzera naitirojeni muvhu",
            "Midzi yakasiyana kureba inoshandisa chikafu chiri pamadanho akasiyana evhu",
          ],
        },
        {
          heading: "Hurongwa huri nyore",
          points: [
            "Mwaka 1: chibage (zviyo)",
            "Mwaka 2: nzungu, soya kana bhinzi",
            "Mwaka 3: muriwo kana zvimwe zviyo, wozodzokorora",
            "Usadyara madomasi, mbatatisi nemhiripiri munda mumwe chete kwemakore 2 kusvika 3",
          ],
        },
      ],
    },
    scouting: {
      title: "Kutarisa Munda Wako",
      summary:
        "Kufamba mumunda kamwe pavhiki kunobata zvipembenene nezvirwere nekukurumidza, pazvichiri nyore uye zvisingadhuri kudzivirira.",
      sections: [
        {
          heading: "Matarisiro",
          points: [
            "Famba mumunda wakaita sevara W kuti usvike kumativi ese",
            "Mira panzvimbo 5 wotarisa zvirimwa 10 panzvimbo imwe neimwe",
            "Tarisa muhuro, mativi ese emashizha, madzinde nemichero",
            "Nyora zvaunowana muKuraVisor nekutarisa kweChiremba weZvirimwa",
          ],
        },
        {
          heading: "Sarudza zvekuita",
          points: [
            "Verenga kuti zvirimwa zvingani pa50 zvakabatwa",
            "Ita chimwe chinhu kana kukuvadzwa kwapfuura mwero unokurudzirwa chipembenene ichocho",
            "Tarisa zvakare mazuva mashoma mushure mekurapa kuona kana zvashanda",
          ],
        },
      ],
    },
    "safe-spraying": {
      title: "Kushandisa Mishonga Zvakachengeteka",
      summary: "Zvidzivirire iwe, mhuri yako nevatengi vako paunoshandisa mishonga yezvirimwa.",
      sections: [
        {
          heading: "Usati wapfapfaidza",
          points: [
            "Verenga zvakanyorwa pamushonga: chirimwa, chipembenene, mwero nenguva yekumirira usati wakohwa",
            "Pfeka magirovhosi, chivharamuromo, bhutsu nehembe dzine maoko marefu",
            "Tarisa kana chipfapfaidzo chako chichidonha wochiedza nemvura",
          ],
        },
        {
          heading: "Uchipfapfaidza",
          points: [
            "Pfapfaidza mangwanani kana manheru kuchitonhora uye pasina mhepo",
            "Usadya, kunwa kana kuputa uchibata mishonga",
            "Chengeta vana nemhuka kure",
          ],
        },
        {
          heading: "Mushure mekupfapfaidza",
          points: [
            "Geza muviri wako uye usuke hembe dzako dzega",
            "Suka midziyo isina chinhu katatu uye usamboishandisa pakudya kana mvura",
            "Chengeta mishonga yakakiyirwa kure nezvokudya nevana",
          ],
        },
      ],
    },
    "post-harvest": {
      title: "Kubata Goho Mushure Mekukohwa",
      summary:
        "Kuomesa zvakanaka, kusarudza nekuchengeta kunoderedza kurasikirwa uye kunodzivirira aflatoxin, muchetura unogadzirwa nehowa pachibage nenzungu.",
      sections: [
        {
          heading: "Kuomesa nekusarudza",
          points: [
            "Omesa zviyo zvakanaka usati wazvichengeta; zvinofanira kutsemuka zvakanaka kana zvarumwa",
            "Omesa pamachira, kwete pavhu",
            "Bvisa zviyo nemakoko ane howa, akatsemuka kana akadyiwa nezvipembenene",
          ],
        },
        {
          heading: "Kuchengeta",
          points: [
            "Chenesa dura wobvisa zviyo zvekare goho idzva risati rasvika",
            "Shandisa mabhegi asingapindi mhepo (hermetic bags) kana zviyo zvakarapwa pazvinokwanisika",
            "Chengeta mabhegi asiri pasi, pamapareti uye kure nemadziro",
            "Tarisa zviyo zvakachengetwa mavhiki mashoma ega ega kana paine zvipembenene kana howa",
          ],
        },
      ],
    },
  },

  tips: [
    "Tarisa pasi pemashizha kana paine mazai efall armyworm. Kuabvisa nemaoko nekukurumidza kunogona kudzivirira kurwiswa kukuru pasina mishonga.",
    "Govanisa fetiraiza yako yenaitirojeni kaviri. Zvirimwa zvinoishandisa zviri nani uye shoma inokukurwa nemvura zhinji.",
    "Famba mumunda wako wakaita sevara W kamwe pavhiki. Kutarisa zvirimwa 50 kunokupa pfungwa yakanaka yemunda wese.",
    "Chinjanisa chibage nenzungu kana soya kuwedzera naitirojeni nekudzivirira zvirwere.",
    "Pfapfaidza mangwanani kana manheru kuchitonhora. Mishonga inoshanda zviri nani uye haiparadzirwi nemhepo kana pasina mhepo.",
    "Kufukidza ivhu kunochengeta unyoro kwenguva refu uye kunodzivirira mvura kurovera howa kumashizha ari pasi.",
    "Omesa zviyo pamachira, kwete pavhu. Zvinoramba zvakachena uye zvinooma zvakaenzana.",
    "Nyora mari yese yaunoshandisa, kunyange shoma. Kuziva mutengo wako pakirogiramu kunoratidza kuti zvirimwa zvipi zvinobhadhara.",
    "Usadyara madomasi nembatatisi munda mumwe chete kwemakore maviri kusvika matatu kuderedza bhiraiti.",
    "Dyara pakutanga kwemvura. Zvirimwa zvinotanga kudyarwa kazhinji hazvikuvadzwe zvakanyanya nefall armyworm.",
  ],
};

export default sn;
