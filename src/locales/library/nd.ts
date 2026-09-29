import type { LibraryText } from "@/lib/library";

/*
 * Northern Ndebele translation of the crop health library
 * (src/lib/library.ts). NOT YET REVIEWED by a native speaking agronomist:
 * check every entry, especially spray safety and treatment steps, before
 * farmers rely on it. Active ingredients, product names and numbers stay as
 * in English. Lists must keep the same order and length as the English
 * library.
 */
const nd: LibraryText = {
  spraySafety:
    "Funda njalo ulandele okubhalwe emuthini. Gqoka amagilavu, isivalo somlomo lezembatho ezilemikhono emide. Ungafafazi nxa kulomoya kumbe emini ekutshiseni, ungasondeli ezindaweni zamanzi, njalo ugcine isikhathi esibhalwe emuthini phakathi kokufafaza lokuvuna.",

  symptoms: {
    chewed: "Amahlamvu adliweyo, alemigodi kumbe adabukileyo",
    frass: "Amasimba afana lomgubo wezigodo phakathi komumbu (whorl)",
    caterpillars: "Imibungu kumbe izibungu esilimweni",
    windowpane: "Izindawo ezidliweyo emahlamvini ezibonisa ngaphetsheya “njengamawindi”",
    insect_clusters: "Izinambuzane ezincane ezibuthene ngaphansi kwamahlamvu kumbe emahlumeni",
    sticky: "Amahlamvu anamathelayo kumbe alesikhunta esimnyama (sooty mould)",
    curled: "Amahlamvu agoqekileyo, asontekileyo kumbe agobileyo",
    yellow_lower: "Ukuphenduka kube ngokuphuzi kuqalisa emahlamvini amadala angaphansi",
    yellow_v: "Umbala ophuzi onjenge V kusukela esihlokweni sehlamvu kulandela umthambo ophakathi",
    purple: "Amahlamvu ansomi kumbe abomvu ezilimweni ezincane",
    edge_scorch: "Imiphetho yamahlamvu iba ngokuphuzi, ibe nsundu bese isoma",
    streaks: "Imidwa emincane ephuzi engahlanganiyo emahlamvini",
    stunted: "Isilimo sincane njalo asikhuli",
    mosaic: "Amahlamvu alamabala aluhlaza okhanyayo lomnyama axubeneyo (mosaic)",
    target_spots: "Amabala ansundu alamasongo anjengesitshengiso sokutshaya",
    grey_rectangles: "Amabala amade ampunga kumbe amdubu anjengezikwele ezinde phakathi kwemithambo",
    cigar_lesions: "Amabala amade anjengogwayi osongiweyo (cigar), aluhlaza ompunga kumbe amdubu",
    water_soaked: "Izindawo ezimnyama ezinjengezicwiliswe emanzini ezisabalala ngokuphangisa",
    white_mould: "Isikhunta esimhlophe esilezinwele ngaphansi kwamahlamvu ngesikhathi sezulu",
    round_spots: "Amabala amancane ayindilinga ansundu kumbe amnyama emahlamvini",
    rust_pustules: "Amaqhubu amancane alomgubo onjengokugqwala (rust) emahlamvini",
    mines: "Imigudu ekhanyayo egobagobayo kumbe amabala phakathi kwamahlamvu",
    fruit_holes: "Imigodi emincane ezithelweni kumbe emagwilini",
    wilting: "Isilimo siyabuna lanxa umhlabathi umanzi",
  },

  conditions: {
    "fall-armyworm": {
      name: "Fall Armyworm (imibungu edla umumbu)",
      urgency: "Yenza okuthile phakathi kwensuku ezi 1 kusiya ku 2 ukunciphisa ukulahlekelwa yisivuno",
      summary:
        "Umbungu odla phakathi komgodi womumbu (whorl) bese udla esikhwebwini. Imibungu emincane ikhwexa amahlamvu itshiye izindawo ezibonisa ngaphetsheya; emikhulu idla imigodi emikhulu itshiye amasimba afana lomgubo wezigodo. Nxa ingalawulwa, ingachitha isivuno esinengi.",
      firstSteps: [
        "Hlola izilimo ezi 10 ezindaweni ezi 5 ensimini yonke ukuze ubone ukuthi zingaki ezihlaselweyo",
        "Pitshiza amaqanda lemibungu emincane oyibonayo emgodini womumbu",
        "Nxa izilimo ezincane ezedlula 1 kwezi 5 zilimele, welapha insimu khathesi",
        "Hlola futhi ngemva kwensuku ezi 3",
      ],
      chemical: {
        application: "Fafaza uqondise emgodini wesilimo ngasinye, ekuseni kakhulu kumbe ntambama",
        timing:
          "Nxa ukulimala sekudlule izinga lokwelapha; phinda kuphela njengoba umuthi uvumela njalo utshintshanise izinhlobo zemithi",
      },
      organic: [
        {
          name: "Umlotha kumbe isihlabathi emgodini",
          how: "Faka umlotha ocolekileyo kumbe isihlabathi esomileyo emgodini womumbu ohlaselweyo ukuze ubulale njalo uxotshe imibungu emincane.",
        },
        {
          name: "Ukukhetha ngezandla",
          how: "Ensimini encane, susa njalo upitshize imibungu esemgodini womumbu ekuseni kakhulu lapho isebenza kakhulu.",
        },
        {
          name: "Umuthi weneem",
          how: "Cwilisa inhlanyelo kumbe amahlamvu eneem acholiweyo emanzini ubusuku bonke, uhluze, bese ufafaza emgodini womumbu.",
        },
      ],
      prevention: [
        "Hlanyela masinyane ekuqaleni kwezulu, ukuze izilimo zikhule zingakafiki isikhathi esilamabhabhathane amanengi",
        "Hlola insimu kanye ngeviki izilimo zisesezincane",
        "Hlanyela umumbu uhlangene lendumba",
        "Gcina insimu ingelalo utshani obugcina lesi sinambuzane",
      ],
    },
    "maize-streak": {
      name: "Isifo semidwa emumbwini (Maize Streak Virus)",
      urgency: "Kalikho ikhambi nxa sesihlaselwe; yenza khathesi ukuvikela izilimo eziphilileyo",
      summary:
        "Igciwane elisatshalaliswa yizinambuzane ezincane ezigxumayo (leafhoppers). Amahlamvu atshengisa imidwa emincane ephuzi engahlanganiyo elandela imithambo. Izilimo ezihlaselwa zisesezincane azikhuli njalo zithela izikhwebu ezincane kumbe zingatheli.",
      firstSteps: [
        "Hlwitha njalo utshise izilimo ezincane ezihlaselwe kakhulu",
        "Lawula izinambuzane ezigxumayo ensimini lotshanini oseduze",
        "Bhala uhlobo olulihlanyeleyo; khetha uhlobo olumelana lalesi sifo ngesikhathi esizayo",
      ],
      organic: [
        {
          name: "Ukuhlwitha izilimo ezihlaselweyo",
          how: "Susa izilimo ezihlaselweyo masinyane ukuze zingabi ngumthombo wegciwane elithwalwa yizinambuzane ezigxumayo.",
        },
      ],
      prevention: [
        "Hlanyela inhlanyelo yomumbu eqinisekisiweyo yohlobo olumelana lalesi sifo",
        "Ungahlanyeli sekwephuzile eduze kwamasimu omumbu osukhulile",
        "Gcina utshani obuzungeze insimu bufitshane",
      ],
    },
    "grey-leaf-spot": {
      name: "Amabala ampunga emahlamvini (Grey Leaf Spot)",
      urgency: "Welapha phakathi kweviki nxa amabala efika emahlamvini angaphezu kwesikhwebu",
      summary:
        "Isifo sesikhunta esithanda isimo sezulu esifudumeleyo lesilomswakama kanye lamasimu ahlanyelwa umumbu minyaka yonke. Amabala amade, amancane ampunga kumbe amdubu avela phakathi kwemithambo yamahlamvu, eqalisa emahlamvini angaphansi.",
      firstSteps: [
        "Hlola ukuthi amabala asefikile yini emahlamvini azungeze lalawo angaphezu kwesikhwebu",
        "Nxa kunjalo inhlamvu zingakagcwali, ukufafaza umuthi wesikhunta (fungicide) kuzasiza",
        "Hlela ukungahlanyeli umumbu kule nsimu ngesikhathi esizayo",
      ],
      chemical: {
        application: "Fafaza amahlamvu, uhlanganise ihlamvu elisesikhwebwini lalawo angaphezu kwalo",
        timing: "Ngesikhathi sokuphuma kwezimbali zomumbu (tasselling) nxa isifo sikhwela isilimo",
      },
      organic: [
        {
          name: "Ukuphatha amahlanga",
          how: "Ngemva kokuvuna, ngcwaba kumbe ususe amahlanga omumbu ahlaselweyo ukuze isikhunta singadluleli esikhathini esizayo.",
        },
      ],
      prevention: [
        "Tshintshanisa umumbu lezilimo ezinjengamazambane kumbe isoya",
        "Hlanyela uhlobo lwehaybridi olumelana lesifo",
        "Ungahlanyeli izilimo zixinane kakhulu okwenza amahlamvu ahlale emanzi",
      ],
    },
    "northern-leaf-blight": {
      name: "Ukutsha kwamahlamvu (Northern Leaf Blight)",
      urgency: "Qhubeka uhlola; welapha nxa sifika emahlamvini angaphezulu inhlamvu zingakagcwali",
      summary:
        "Isifo sesikhunta esenza amabala amade anjengogwayi osongiweyo, aluhlaza ompunga kusiya kumdubu, emahlamvini. Sisabalala ngesikhathi esiqandayo lesilezulu njalo singanciphisa ukugcwala kwenhlamvu nxa amahlamvu angaphezulu ehlaselwe.",
      firstSteps: [
        "Hlola ukuthi amabala asekhwele kangakanani esilimweni",
        "Fafaza umuthi wesikhunta nxa amahlamvu angaphezulu ehlaselwe izimbali zingakaphumi",
        "Ungahlanyeli umumbu kule nsimu ngesikhathi esizayo",
      ],
      chemical: {
        application: "Fafaza amahlamvu, uhlanganise wonke amahlamvu angaphezulu",
        timing: "Ezibonakalisweni zokuqala emahlamvini angaphezulu, izimbali zingakaphumi kumbe zisaphuma",
      },
      organic: [
        {
          name: "Ukuhlanza insimu",
          how: "Ngcwaba kumbe ususe amahlanga ngemva kokuvuna ukunciphisa isikhunta sesikhathi esizayo.",
        },
      ],
      prevention: [
        "Hlanyela amahaybridi amelana lesifo",
        "Tshintshanisa lezilimo ezinjengamazambane kumbe indumba",
        "Phatha kuhle amahlanga ngemva kokuvuna",
      ],
    },
    "nitrogen-deficiency": {
      name: "Ukuswela inayithrojeni (Nitrogen Deficiency)",
      urgency: "Faka umanyolo phakathi kweviki ukuze kusize kakhulu",
      summary:
        "Isilimo asitholi inayithrojeni eyeneleyo. Amahlamvu amadala angaphansi aqala ukuba ngokuphuzi okhanyayo; emumbwini umbala ophuzi wenza u V kusukela esihlokweni sehlamvu kulandela umthambo ophakathi. Ukukhula kuyephuza njalo isivuno siyehla.",
      firstSteps: [
        "Faka umanyolo olenayithrojeni onjenge AN kumbe iurea ngezinga elinconywa yisikhulu sezolimo",
        "Faka umanyolo nxa umhlabathi umanzi, eduze kwesilimo bese uwumbesa",
        "Hlakula insimu ukuze umanyolo uthathwe yizilimo, hatshi ukhula",
      ],
      organic: [
        {
          name: "Umquba lomquba obolileyo (compost)",
          how: "Xuba umquba obole kuhle kumbe icompost emhlabathini ungakahlanyeli njalo njengomanyolo wokwengeza.",
        },
        {
          name: "Ukutshintshanisa lezilimo ezakha umhlabathi",
          how: "Hlanyela amazambane, indumba kumbe isoya ngaphambi komumbu ukuze kutshiye inayithrojeni emhlabathini.",
        },
      ],
      prevention: [
        "Dabula inayithrojeni ibe yikufaka kabili kulokufaka kanye",
        "Hlola umhlabathi nxa kungenzeka njalo wengeze umquba ngesikhathi ngasinye",
        "Tshintshanisa amabele lezilimo ezinjengamazambane kumbe indumba",
      ],
    },
    "phosphorus-deficiency": {
      name: "Ukuswela ifosforasi (Phosphorus Deficiency)",
      urgency: "Lungisa ekuhlanyeleni okulandelayo; akukho okunengi okungenziwa sekwephuzile",
      summary:
        "Izilimo ezincane zitshengisa amahlamvu ansomi kumbe abomvu njalo zikhula kancane. Kujayelekile emhlabathini oqandayo, omanzi kumbe omuncu (acidic) lalapho kungafakwanga umanyolo wokuhlanyela.",
      firstSteps: [
        "Hlola ukuthi umanyolo wokuhlanyela wafakwa yini ekuhlanyeleni",
        "Hlela ukufaka umanyolo wokuhlanyela (isibonelo Compound D) ekuhlanyeleni okulandelayo",
        "Cabanga ngokufaka ilayimi nxa umhlabathi wakho umuncu",
      ],
      organic: [
        {
          name: "Umquba ekuhlanyeleni",
          how: "Faka umquba obole kuhle emigodini kumbe emiseleni yokuhlanyela ungakafaki inhlanyelo.",
        },
      ],
      prevention: [
        "Faka umanyolo wokuhlanyela ekuhlanyeleni",
        "Lungisa umhlabathi omuncu ngelayimi",
        "Engeza umquba kumbe icompost ngesikhathi ngasinye",
      ],
    },
    "potassium-deficiency": {
      name: "Ukuswela iphothasiyamu (Potassium Deficiency)",
      urgency: "Lungisa ekuhlanyeleni okulandelayo",
      summary:
        "Imiphetho yamahlamvu amadala iba ngokuphuzi, ibe nsundu bese isoma, kodwa phakathi kwehlamvu kuhlala kuluhlaza. Iziqu zingaba buthakathaka njalo izithelo zingabi zinhle.",
      firstSteps: [
        "Sebenzisa umanyolo wokuhlanyela olephothasiyamu (u K ku NPK) ekuhlanyeleni okulandelayo",
        "Buyisela amahlanga lomlotha emhlabathini",
      ],
      organic: [
        {
          name: "Umlotha wezigodo",
          how: "Chitha umlotha wezigodo, olephothasiyamu enengi, kancane bese uwuxuba lomhlabathi.",
        },
      ],
      prevention: [
        "Sebenzisa umanyolo wokuhlanyela we NPK olinganiselweyo",
        "Buyisela amahlanga ensimini",
      ],
    },
    "early-blight": {
      name: "Ibhlayithi yakuqala (Early Blight)",
      urgency: "Qalisa ukwelapha phakathi kwensuku ezimbalwa",
      summary:
        "Isifo sesikhunta esenza amabala ansundu alamasongo anjengesitshengiso, siqalisa emahlamvini amadala angaphansi aphenduka abe ngokuphuzi bese ewa. Sisabalala nxa kufudumele kulamazolo kumbe izulu.",
      firstSteps: [
        "Susa njalo utshise amahlamvu ahlaselweyo angaphansi kakhulu",
        "Fafaza umuthi wesikhunta ovikelayo, uhlanganise inhlangothi zombili zamahlamvu",
        "Chelela phansi kwesilimo, hatshi phezu kwamahlamvu",
      ],
      chemical: {
        application: "Fafaza amahlamvu, uhlanganise kuhle amahlamvu angaphansi",
        timing: "Emabaleni okuqala, bese uphinda ngesikhathi esibhalwe emuthini ngesikhathi sezulu",
      },
      organic: [
        {
          name: "Ukususa amahlamvu lokumbesa umhlabathi",
          how: "Susa amahlamvu angaphansi kakhulu bese umbesa umhlabathi (mulch) ukuze izulu lingachaphazeli isikhunta phezu kwezilimo.",
        },
        {
          name: "Umuthi we copper",
          how: "Imithi ele copper iyavunyelwa ezindleleni ezinengi zemvelo; landela okubhalwe emuthini.",
        },
      ],
      prevention: [
        "Tshintshanisa utamatisi lamagwili lezinye izilimo ezingahlobananga lawo okweminyaka ezi 2 kusiya ku 3",
        "Qinisa izilimo ngezigodo njalo uzihlukanise ukuze umoya udlule",
        "Chelela ngamaconsi kumbe emiseleni kulokuchelela phezulu",
      ],
    },
    "late-blight": {
      name: "Ibhlayithi yamuva (Late Blight)",
      urgency: "Yenza lamuhla; ingachitha insimu phakathi kwensuku ezimbalwa ngesikhathi sezulu",
      summary:
        "Isifo esisabalala ngokuphangisa ngesikhathi esiqandayo lesilezulu. Izindawo ezimnyama ezinjengezicwiliswe emanzini ziyavela emahlamvini lezingeni, kanengi kulesikhunta esimhlophe esilezinwele ngaphansi. Izithelo lamagwili kuyabola.",
      firstSteps: [
        "Susa njalo utshise izilimo ezihlaselweyo kude lensimu (ungazifaki kucompost)",
        "Fafaza ezinye izilimo ngomuthi wesikhunta ofaneleyo khathesi",
        "Qhubeka uhlola nsuku zonke nxa izulu lisana",
      ],
      chemical: {
        application: "Fafaza amahlamvu, uhlanganise konke kanye leziqu",
        timing: "Khathesi, bese uphinda ngezikhathi ezibhalwe emuthini ngesikhathi esiqandayo lesilezulu",
      },
      organic: [
        {
          name: "Tshabalalisa izilimo ezihlaselweyo",
          how: "Hlwitha, faka esakeni kumbe utshise izilimo ezihlaselweyo ukunciphisa ukusabalala kwezilimo eziphilileyo.",
        },
      ],
      prevention: [
        "Sebenzisa inhlanyelo yamagwili eqinisekisiweyo engelasifo",
        "Hlukanisa izilimo njalo uziqinise ngezigodo ukuze amahlamvu ome masinyane",
        "Ungachheleli phezu kwamahlamvu ntambama",
      ],
    },
    "tuta-absoluta": {
      name: "Imibungu egebha amahlamvu katamatisi (Tuta absoluta)",
      urgency: "Yenza phakathi kwensuku ezimbalwa; zanda ngokuphangisa kakhulu",
      summary:
        "Ibhabhathane elincane elilemibungu egebha imigudu phakathi kwamahlamvu katamatisi, itshiye amabala akhanyayo, njalo ibhobhoze izithelo, itshiye imigodi emincane. Ukuhlaselwa okukhulu kungachitha sonke isivuno sikatamatisi.",
      firstSteps: [
        "Khetha njalo utshise amahlamvu alemigudu lezithelo ezilimeleyo",
        "Beka imigibe ye pheromone kumbe yamanzi ukuze uhlole njalo ubambe amabhabhathane",
        "Fafaza umuthi wezinambuzane obhalisiweyo nxa ukulimala kusabalala",
      ],
      chemical: {
        application: "Fafaza amahlamvu; tshintshanisa izinhlobo zemithi ukuze izinambuzane zingayijwayeli",
        timing: "Nxa ubona imigudu okokuqala njalo amabhabhathane abanjwayo esanda",
      },
      organic: [
        {
          name: "Imigibe",
          how: "Sebenzisa imigibe ye pheromone, kumbe umganu wamanzi alensipho olesibane phezu kwawo ebusuku, ukubamba amabhabhathane amadala.",
        },
        {
          name: "Ukuhlanza",
          how: "Susa njalo ungcwabe kujule amahlamvu lezithelo ezihlaselweyo, kumbe uzivale esakeni zihlale elangeni.",
        },
      ],
      prevention: [
        "Qalisa ngezithombo ezihlanzekileyo ezingelazinambuzane",
        "Susa utamatisi omdala lezilimo ezimila zodwa masinyane ngemva kokuvuna",
        "Ungahlanyeli utamatisi eduze kwensimu ehlaselweyo",
      ],
    },
    aphids: {
      name: "Izinambuzane ezincane ezimunya ijusi (Aphids)",
      urgency: "Welapha phakathi kweviki, masinyane nxa izilimo zisesezincane",
      summary:
        "Izinambuzane ezincane ezilemizimba ethambileyo ezibuthana ngaphansi kwamahlamvu lemahlumeni amatsha, zimunya ijusi. Amahlamvu ayagoqeka njalo anamathela ngejusi elimnandi, elimilisa isikhunta esimnyama. Lezi zinambuzane zisabalalisa lamagciwane.",
      firstSteps: [
        "Hlola ngaphansi kwamahlamvu lemahlumeni",
        "Geza amaqembu amancane ngamanzi alamandla kumbe amanzi alensipho",
        "Fafaza umuthi wezinambuzane obhalisiweyo kuphela nxa amaqembu eqhubeka esabalala",
      ],
      chemical: {
        application: "Fafaza amahlamvu, ufinyelele ngaphansi kwamahlamvu",
        timing: "Nxa amaqembu esabalala; ungafafazi izilimo ezilezimbali nxa inyosi zisebenza",
      },
      organic: [
        {
          name: "Umuthi wensipho",
          how: "Xuba isipunu esikhulu esi 1 sensipho yamanzi ku litha e 1 yamanzi bese ufafaza ngaphansi kwamahlamvu.",
        },
        {
          name: "Umuthi wegalikhi lopelepele",
          how: "Cwilisa igalikhi lopelepele ochoboziweyo emanzini ubusuku bonke, uhluze, wengeze insipho encane bese ufafaza.",
        },
        {
          name: "Izitha zemvelo",
          how: "Izinambuzane ezibomvu ezilamachashaza (ladybirds) lama lacewings zidla ama aphids; ungasebenzisi imithi ebulala zonke izinambuzane.",
        },
      ],
      prevention: [
        "Ungafaki umanyolo wenayithrojeni omnengi kakhulu, owenza ukukhula okuthambileyo okuthandwa ngama aphids",
        "Susa ukhula olugcina ama aphids",
        "Hlanyela izimbali eduze ukuheha izitha zemvelo",
      ],
    },
    "diamondback-moth": {
      name: "Imibungu yekhabitshi (Diamondback Moth)",
      urgency: "Yenza phakathi kwensuku ezimbalwa",
      summary:
        "Isinambuzane esikhulu sekhabitshi lezinye izilimo ezifanana layo. Imibungu emincane eluhlaza idla ngaphansi kwamahlamvu itshiye “amawindi” abonisa ngaphetsheya, bese kuba yimigodi. Ukuhlaselwa okukhulu kuyachitha amakhanda ekhabitshi.",
      firstSteps: [
        "Hlola ngaphansi kwamahlamvu angaphandle ukuthi kulemibungu emincane eluhlaza yini",
        "Fafaza umuthi we Bt (Bacillus thuringiensis) kumbe omunye umuthi wezinambuzane obhalisiweyo",
        "Tshintshanisa izinhlobo zemithi; lesi sinambuzane sijwayela imithi masinyane",
      ],
      chemical: {
        application: "Fafaza ngaphansi kwamahlamvu ntambama",
        timing: "Imibungu isesemincane; phinda ngezikhathi ezibhalwe emuthini, utshintshanisa izinhlobo",
      },
      organic: [
        {
          name: "Umuthi we Bt",
          how: "I Bt yibhaktheriya yemvelo ehlasela imibungu kuphela njalo kayilangozi ebantwini lenyosini.",
        },
        {
          name: "Ukukhetha ngezandla",
          how: "Susa imibungu lamaqanda emasimini amancane ngemva kwensuku ezimbalwa.",
        },
      ],
      prevention: [
        "Ungahlanyeli ikhabitshi lezilimo ezifanana layo umnyaka wonke endaweni yinye",
        "Tshabalalisa okuseleyo kwezilimo ngemva kokuvuna",
        "Chelela phezulu ngesikhathi sokoma, kugeza imibungu emincane",
      ],
    },
    "groundnut-leaf-spot": {
      name: "Amabala emahlamvini amazambane (Groundnut Leaf Spot)",
      urgency: "Qalisa ukufafaza phakathi kweviki yamabala okuqala",
      summary:
        "I early leaf spot le late leaf spot yizifo zesikhunta ezenza amabala ayindilinga ansundu kusiya komnyama emahlamvini amazambane. Amahlamvu awa isikhathi singakafiki, okunciphisa isivuno samakhoba.",
      firstSteps: [
        "Qinisekisa amabala emahlamvini angaphansi ezilimweni ezinengi",
        "Qalisa ukufafaza umuthi wesikhunta uqhubeke ngezikhathi ezibhalwe emuthini",
        "Hlela ukungahlanyeli amazambane kule nsimu ngesikhathi esizayo",
      ],
      chemical: {
        application: "Fafaza amahlamvu, uhlanganise izilimo zonke",
        timing: "Kusukela emabaleni okuqala, bese ufafaza zonke insuku ezi 10 kusiya ku 14 ngesikhathi sezulu",
      },
      organic: [
        {
          name: "Ukutshintshanisa lokuhlanza",
          how: "Tshintshanisa lamabele njalo ususe amazambane amila wodwa.",
        },
      ],
      prevention: [
        "Tshintshanisa amazambane lomumbu kumbe amanye amabele",
        "Hlanyela izinhlobo ezimelana lesifo",
        "Hlanyela ngesikhathi esinconyiweyo",
      ],
    },
    "groundnut-rosette": {
      name: "Isifo serosethi samazambane (Groundnut Rosette)",
      urgency: "Kalikho ikhambi; susa izilimo ezihlaselweyo uvikele ezinye",
      summary:
        "Isifo segciwane esisatshalaliswa ngama aphids. Izilimo azikhuli kakhulu njalo zinjengesihlahlana esilamahlamvu amancane alamabala kumbe aphuzi. Izilimo ezincane ezihlaselweyo zithela amakhoba amalutshwana kumbe zingatheli.",
      firstSteps: [
        "Hlwitha njalo utshise izilimo ezihlaselweyo masinyane",
        "Lawula ama aphids ezilimweni eziseleyo",
        "Bhala izindawo ezihlaselweyo bese ukhetha uhlobo olumelana lesifo ngesikhathi esizayo",
      ],
      organic: [
        {
          name: "Ukuhlanyela masinyane zixinene",
          how: "Hlanyela masinyane ngokuxinana okunconyiweyo; ama aphids awathandi izilimo ezixinene ezigcweleyo.",
        },
      ],
      prevention: [
        "Hlanyela izinhlobo ezimelana lerosethi",
        "Hlanyela ekuqaleni kwesikhathi sokulima",
        "Sebenzisa ukuxinana okunconyiweyo",
      ],
    },
    "bean-rust": {
      name: "Ukugqwala kwendumba (Bean Rust)",
      urgency: "Welapha phakathi kweviki nxa kusabalala",
      summary:
        "Isifo sesikhunta esenza amaqhubu amancane alomgubo onjengokugqwala, kanengi ngaphansi kwamahlamvu. Ukuhlaselwa okukhulu kwenza amahlamvu abe ngokuphuzi bese ewa isikhathi singakafiki.",
      firstSteps: [
        "Hlola ngaphansi kwamahlamvu ukuthi kulomgubo onjengokugqwala osala emunweni yini",
        "Fafaza umuthi wesikhunta ofaneleyo nxa amahlamvu angaphezu kwamalutshwana ehlaselwe",
      ],
      chemical: {
        application: "Fafaza amahlamvu, uhlanganise inhlangothi zombili",
        timing: "Ezibonakalisweni zokuqala, bese uphinda ngezikhathi ezibhalwe emuthini",
      },
      organic: [
        {
          name: "Susa amahlamvu ahlaselweyo",
          how: "Khetha amahlamvu ahlaselwe kakhulu njalo ungasebenzi ezilimweni zisemanzi.",
        },
      ],
      prevention: [
        "Hlanyela izinhlobo ezimelana lesifo",
        "Tshintshanisa indumba lamabele",
        "Tshabalalisa okuseleyo kwezilimo ngemva kokuvuna",
      ],
    },
  },

  guides: {
    pfumvudza: {
      title: "Ukuhlanyela kwePfumvudza/Intwasa",
      summary:
        "Ukulima okuvikela umhlabathi ensimini encane: imigodi yokuhlanyela, ukumbesa umhlabathi lokungalimi ngamakhuba ukuze uthole okunengi endaweni encane langezulu elincane.",
      sections: [
        {
          heading: "Lungisa insimu",
          points: [
            "Susa ukhula ungalimi ngekhuba; tshiya amahlanga njengesembeso",
            "Maka imigqa ehlukene ngokungaba ngu 75 cm, lemigodi ehlukene ngokungaba ngu 60 cm emgqeni",
            "Mba imigodi yokuhlanyela engaba ngu 15 cm ububanzi, ubude lokujula izulu lingakani",
          ],
        },
        {
          heading: "Hlanyela",
          points: [
            "Faka umquba kumbe umanyolo wokuhlanyela emgodini ngamunye bese umbesa ngomhlabathi kancane",
            "Hlanyela ngemva kwezulu elihle, ngezinga lenhlanyelo elinconywa yi AGRITEX",
            "Mbesa umhlabathi phakathi kwemigodi ngotshani kumbe amahlanga",
          ],
        },
        {
          heading: "Nakekela izilimo",
          points: [
            "Gcina insimu ingelakhula, ikakhulu emavikini ayisithupha okuqala",
            "Faka umanyolo wenayithrojeni ngesikhathi esifaneleyo",
            "Hlola kanye ngeviki ukuthi kulezinambuzane ezinjenge fall armyworm yini",
          ],
        },
      ],
    },
    "crop-rotation": {
      title: "Ukutshintshanisa Izilimo",
      summary:
        "Ukutshintsha izilimo ensimini ngayinye ngesikhathi ngasinye kuvimba izinambuzane lezifo njalo kwenza izilimo ezinjengamazambane zakhe umhlabathi.",
      sections: [
        {
          heading: "Kungani utshintshanisa",
          points: [
            "Izifo ezinjengamabala ampunga emahlamvini ziyanda nxa umumbu ulandela umumbu",
            "Amazambane, indumba lesoya kwengeza inayithrojeni emhlabathini",
            "Impande ezilobude obutshiyeneyo zisebenzisa ukudla okusemazingeni atshiyeneyo omhlabathi",
          ],
        },
        {
          heading: "Uhlelo olulula",
          points: [
            "Isikhathi 1: umumbu (amabele)",
            "Isikhathi 2: amazambane, isoya kumbe indumba",
            "Isikhathi 3: imibhida kumbe amanye amabele, bese uphinda",
            "Ungahlanyeli utamatisi, amagwili lopelepele ensimini yinye okweminyaka ezi 2 kusiya ku 3",
          ],
        },
      ],
    },
    scouting: {
      title: "Ukuhlola Insimu Yakho",
      summary:
        "Ukuhamba ensimini kanye ngeviki kubamba izinambuzane lezifo masinyane, kusesilula njalo kungabizi ukukulawula.",
      sections: [
        {
          heading: "Indlela yokuhlola",
          points: [
            "Hamba ensimini ngendlela enjengo W ukuze ufike kuzo zonke izindawo",
            "Ima ezindaweni ezi 5 uhlole izilimo ezi 10 endaweni ngayinye",
            "Hlola emgodini womumbu, inhlangothi zombili zamahlamvu, iziqu lezithelo",
            "Bhala okutholayo ku KuraVisor ngokuhlola koDokotela Wezilimo",
          ],
        },
        {
          heading: "Khetha okumele ukwenze",
          points: [
            "Bala ukuthi zingaki izilimo ezihlaselweyo kwezi 50",
            "Yenza okuthile nxa ukulimala sekudlule izinga elinconyelwe lesi sinambuzane",
            "Hlola futhi ngemva kwensuku ezimbalwa ngemva kokwelapha ukubona ukuthi kusebenzile yini",
          ],
        },
      ],
    },
    "safe-spraying": {
      title: "Ukusebenzisa Imithi Ngokuphepha",
      summary: "Zivikele wena, imuli yakho labathengi bakho nxa usebenzisa imithi yezilimo.",
      sections: [
        {
          heading: "Ungakafafazi",
          points: [
            "Funda okubhalwe emuthini: isilimo, isinambuzane, izinga lesikhathi sokulinda ungakavuni",
            "Gqoka amagilavu, isivalo somlomo, amabhutsu lezembatho ezilemikhono emide",
            "Hlola ukuthi isifafazo sakho siyavuza yini bese usihlola ngamanzi",
          ],
        },
        {
          heading: "Nxa ufafaza",
          points: [
            "Fafaza ekuseni kumbe ntambama kuqanda njalo kungelamoya",
            "Ungadli, unganathi kumbe ungabhemi nxa uphatha imithi",
            "Gcina abantwana lezifuyo kude",
          ],
        },
        {
          heading: "Ngemva kokufafaza",
          points: [
            "Geza umzimba wakho njalo uwashe izembatho zakho zodwa",
            "Hlanza izitsha ezingelalutho kathathu njalo ungazisebenziseli ukudla kumbe amanzi",
            "Gcina imithi ivalelwe kude lokudla labantwana",
          ],
        },
      ],
    },
    "post-harvest": {
      title: "Ukuphatha Isivuno Ngemva Kokuvuna",
      summary:
        "Ukomisa kuhle, ukukhetha lokugcina kunciphisa ukulahlekelwa njalo kuvikela i aflatoxin, ubuthi obenziwa yisikhunta emumbwini lemazambaneni.",
      sections: [
        {
          heading: "Ukomisa lokukhetha",
          points: [
            "Omisa amabele kuhle ungakawagcini; kumele aqhekeke kuhle nxa uwaluma",
            "Omisa phezu kwamatende, hatshi emhlabathini",
            "Susa amabele lamakhoba alesikhunta, aqhekekileyo kumbe adliwe yizinambuzane",
          ],
        },
        {
          heading: "Ukugcina",
          points: [
            "Hlanza isiphala ususe amabele amadala isivuno esitsha singakafiki",
            "Sebenzisa amasaka angangeni moya (hermetic bags) kumbe amabele alashiweyo nxa kungenzeka",
            "Gcina amasaka engekho phansi, phezu kwamaphalethi njalo kude lemiduli",
            "Hlola amabele agciniweyo emavikini ambalwa ukuthi kulezinambuzane kumbe isikhunta yini",
          ],
        },
      ],
    },
  },

  tips: [
    "Hlola ngaphansi kwamahlamvu ukuthi kulamaqanda e fall armyworm yini. Ukuwasusa ngezandla masinyane kungavimba ukuhlaselwa okukhulu ngaphandle kwemithi.",
    "Dabula umanyolo wakho wenayithrojeni ube yikufaka kabili. Izilimo ziwusebenzisa kangcono njalo omncane ukhukhulwa lizulu elinengi.",
    "Hamba ensimini yakho ngendlela enjengo W kanye ngeviki. Ukuhlola izilimo ezi 50 kukunika umbono omuhle wensimu yonke.",
    "Tshintshanisa umumbu lamazambane kumbe isoya ukwengeza inayithrojeni lokuvimba izifo.",
    "Fafaza ekuseni kumbe ntambama kuqanda. Imithi isebenza kangcono njalo ayiphephulwa ngumoya nxa kungelamoya.",
    "Ukumbesa umhlabathi kugcina umswakama isikhathi eside njalo kuvimba izulu ukuchaphazela isikhunta emahlamvini angaphansi.",
    "Omisa amabele phezu kwetende, hatshi emhlabathini. Ahlala ehlanzekile njalo oma ngokulinganayo.",
    "Bhala yonke imali oyisebenzisayo, lanxa incane. Ukwazi intengo yakho ngekhilogremu kutshengisa ukuthi yiziphi izilimo ezibhadalayo.",
    "Ungahlanyeli utamatisi lamagwili ensimini yinye okweminyaka emibili kusiya kwemithathu ukunciphisa ibhlayithi.",
    "Hlanyela ekuqaleni kwezulu. Izilimo ezihlanyelwe kuqala kanengi azilinyazwa kakhulu yi fall armyworm.",
  ],
};

export default nd;
