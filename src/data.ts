import { Destination, Hotel, Testimonial } from "./types";

export const DESTINATIONS: Destination[] = [
  // ================= ASIA (15 COUNTRIES) =================
  {
    id: "jp-01",
    name: "Jepang",
    continent: "Asia",
    cities: ["Tokyo", "Kyoto", "Osaka"],
    touristSpots: [
      "Shibuya Crossing & Meiji Shrine (Tokyo)",
      "Kuil Emas Kinkaku-ji & Fushimi Inari-taisha (Kyoto)",
      "Kastil Osaka & Distrik Dotonbori (Osaka)",
      "Tur Eksklusif Gunung Fuji & Danau Kawaguchi"
    ],
    pricePerPerson: 35000000,
    description: "Perpaduan harmonis antara kemutakhiran teknologi modern di Tokyo dengan ketenangan kuil bersejarah abad pertengahan di Kyoto. Sangat cocok untuk perjalanan dinas sekaligus rekreasi budaya.",
    thumbnail: "https://plus.unsplash.com/premium_photo-1661964177687-57387c2cbd14?",
    benefits: [
      "Tiket Kereta Peluru Shinkansen kelas reserved (Green Car)",
      "Pemandu wisata dwibahasa (Indonesia - Jepang) bersertifikasi",
      "Akses eksklusif VIP Lounge di Bandara Haneda / Narita",
      "Layanan internet 4G/5G portabel tak terbatas (Pocket Wifi)",
      "Sesi ramah tamah (networking) dengan pakar bisnis lokal",
      "Bagasi eksekutif gratis up to 30 Kg"
    ]
  },
  {
    id: "sg-01",
    name: "Singapura",
    continent: "Asia",
    cities: ["Marina Bay", "Sentosa Island", "Changi Sector"],
    touristSpots: [
      "Gardens by the Bay & Cloud Forest Dome",
      "Marina Bay Sands SkyPark Observation Deck",
      "Universal Studios Singapore VIP Experience",
      "Jewel Changi Airport Canopy Park"
    ],
    pricePerPerson: 18500000,
    description: "Hub bisnis global Asia Tenggara. Nikmati kepraktisan mobilitas tingkat tinggi, taman-taman futuristik megah, dan fasilitas konferensi berkelas dunia di sela-sela perjalanan bisnis Anda.",
    thumbnail: "https://images.unsplash.com/photo-1565967511849-76a60a516170?",
    benefits: [
      "Penjemputan bandara privat menggunakan Mercedes-Benz S-Class",
      "Makan malam bisnis eksklusif di Restoran Berbintang Michelin",
      "Tiket VIP jalur cepat (Fast-Track) bebas antre di seluruh atraksi utama",
      "Asuransi perjalanan bisnis premium lengkap",
      "Konsumsi premium (catering halal/vegetarian berstandar internasional)",
      "Akses ruang rapat khusus di pusat bisnis Downtown Singapura"
    ]
  },
  {
    id: "kr-01",
    name: "Korea Selatan",
    continent: "Asia",
    cities: ["Seoul", "Busan", "Jeju Island"],
    touristSpots: [
      "Istana Dinasti Joseon Gyeongbokgung (Seoul)",
      "Menara Namsan N Seoul Tower & Distrik Myeongdong",
      "Pantai Haeundae & Desa Budaya Gamcheon (Busan)",
      "Gunung Hallasan & Seongsan Ilchulbong (Jeju)"
    ],
    pricePerPerson: 28000005,
    description: "Rasakan gelombang K-Culture berpadu dengan infrastruktur teknologi termutakhir dunia di Seoul. Nikmati hidangan khas hanu BBQ premium dan pemandangan laut selatan yang sangat mengagumkan.",
    thumbnail: "https://images.unsplash.com/photo-1619179834700-7a886aac80cc?",
    benefits: [
      "Sewa Hanbok sutra kustom kelas premium untuk sesi foto privat",
      "Sim Card 5G lokal unlimited dengan kuota kecepatan penuh",
      "Pemandu wisata profesional berbahasa Indonesia",
      "Akomodasi hotel bintang 5 dengan akses fasilitas spa relaksasi",
      "Makan malam Korean BBQ otentik tersertifikasi halal",
      "Layanan pemesanan taksi korporat privat selama 24 jam"
    ]
  },
  {
    id: "cn-01",
    name: "Tiongkok",
    continent: "Asia",
    cities: ["Beijing", "Shanghai", "Shenzhen"],
    touristSpots: [
      "Tembok Besar Tiongkok (Great Wall Mutianyu VIP Access)",
      "The Bund & Shanghai Tower Observation Deck",
      "Kawasan Bisnis & Inovasi Teknologi Futian (Shenzhen)",
      "Kota Terlarang Forbidden City (Beijing)"
    ],
    pricePerPerson: 29500000,
    description: "Pusat manufaktur dan perdagangan dunia yang memesona. Menghubungkan sejarah dinasti agung ribuan tahun dengan pesatnya kemajuan kota futuristik Shanghai dan Shenzhen.",
    thumbnail: "https://images.unsplash.com/photo-1529921879218-f99546d03a9d?",
    benefits: [
      "Pemandu lokal bersertifikasi korporat bahasa Indonesia",
      "Akses bebas antre & fast-track Tembok Besar",
      "Undangan seminar networking bersama inkubator teknologi Shanghai",
      "Hotel bintang 5 premium strategis dekat pusat konvensi",
      "Bagasi ekstra 35kg untuk kemudahan sampel bisnis",
      "Akses VIP Lounge premium di Bandara Internasional Capital Beijing"
    ]
  },
  {
    id: "th-01",
    name: "Thailand",
    continent: "Asia",
    cities: ["Bangkok", "Phuket", "Chiang Mai"],
    touristSpots: [
      "Grand Palace & Kuil Wat Arun (Bangkok)",
      "Kepulauan Phi Phi & Kepulauan Similan (Phuket)",
      "Kawasan Seni Tradisional & Kuil Wat Phra That Doi Suthep",
      "Pelayaran Makan Malam Romantis di Sungai Chao Phraya"
    ],
    pricePerPerson: 16000000,
    description: "Negeri Gajah Putih yang kaya budaya, pantai tropis memukau, dan wisata kuliner eksotis. Destinasi MICE favorit Asia Tenggara dengan biaya yang sangat efisien bagi rombongan kantor.",
    thumbnail: "https://images.unsplash.com/photo-1528181304800-259b08848526?",
    benefits: [
      "Pelayaran makan malam privat mewah di Sungai Chao Phraya",
      "VIP Fast-Track Imigrasi di Bandara Suvarnabhumi Airport",
      "Transportasi komersial ber-AC dingin sepanjang tur",
      "Makan pagi dan siang menu otentik Thailand bersertifikat halal",
      "Sesi spa relaksasi tradisional Thailand selama 2 jam",
      "Bebas biaya sim card internet internet lokal"
    ]
  },
  {
    id: "id-01",
    name: "Indonesia",
    continent: "Asia",
    cities: ["Bali", "Labuan Bajo", "Yogyakarta", "Jakarta"],
    touristSpots: [
      "Ubud, Pura Luhur Uluwatu & Eksotisme Nusa Dua (Bali)",
      "Taman Nasional Komodo & Pink Beach (Labuan Bajo)",
      "Candi Borobudur & Keraton Ngayogyakarta (Yogyakarta)",
      "Monumen Nasional & Kompleks Sudirman Central Business"
    ],
    pricePerPerson: 15000000,
    description: "Destinasi kebanggaan Nusantara. Menawarkan kemegahan gugusan kepulauan tropis terbaik, kekayaan warisan budaya luhur, serta fasilitas resor tingkat kepala negara kelas dunia.",
    thumbnail: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=600&auto=format&fit=crop",
    benefits: [
      "Sewa kapal layar Phinisi privat premium eksklusif di Labuan Bajo",
      "Penjemputan Alphard khusus protokol VIP eksekutif",
      "Akomodasi Hotel Bintang 5 atau Resor Pantai Mewah Nusa Dua",
      "Layanan asisten perjalanan pribadi handal 24 jam",
      "Jamuan makan malam premium fine dining tepi pantai",
      "Tiket pesawat domestik kelas Bisnis (opsional)"
    ]
  },
  {
    id: "my-01",
    name: "Malaysia",
    continent: "Asia",
    cities: ["Kuala Lumpur", "Penang", "Langkawi"],
    touristSpots: [
      "Menara Kembar Petronas KLCC (Akses Skybridge VIP)",
      "Kota Tua Warisan Budaya UNESCO Georgetown (Penang)",
      "Kereta Gantung Langkawi Cable Car & Sky Bridge",
      "Genting Highlands Premium Outlets & Theme Park"
    ],
    pricePerPerson: 12000000,
    description: "Tetangga dekat bernuansa Melayu Modern yang menawarkan tata kelola bisnis rapi, pusat perbelanjaan kelas atas di Kuala Lumpur, serta surga kuliner legendaris di Penang.",
    thumbnail: "https://images.unsplash.com/photo-1566914447826-bf04e54bf1be?q",
    benefits: [
      "Akses privat jalur VIP Skybridge Menara Kembar Petronas",
      "Kuliner warisan otentik eksklusif di Penang",
      "Transportasi bus eksekutif korporat ber-AC dingin dan wifi gratis",
      "Akomodasi hotel bintang 5 terbaik di pusat kota Jalur Bintang",
      "Gratis asuransi kesehatan senilai US$ 25,000",
      "Sim card unlimited internet berkecepatan tinggi"
    ]
  },
  {
    id: "vn-01",
    name: "Vietnam",
    continent: "Asia",
    cities: ["Hanoi", "Ho Chi Minh", "Da Nang"],
    touristSpots: [
      "Teluk Halong Bay Cruise (Kapal Pesiar Bintang 5)",
      "Kota Kuno Bersejarah Hoi An & Sun World Ba Na Hills",
      "Terowongan Cu Chi & Distrik Kolonial Perancis Ho Chi Minh",
      "Danau Hoan Kiem Kota Hanoi yang Asri"
    ],
    pricePerPerson: 14500000,
    description: "Sinergi eksotis perpaduan arsitektur bernuansa kolonial Prancis kuno, bentang alam Halong Bay yang magis, serta perkembangan pesat kawasan industri ekspor baru Asia.",
    thumbnail: "https://images.unsplash.com/photo-1555921015-5532091f6026?",
    benefits: [
      "Menginap semalam di kapal pesiar mewah bintang 5 Halong Bay",
      "Pemandu lokal bersertifikat fasih bahasa Indonesia",
      "Akses bebas antre kereta gantung Ba Na Hills (Jembatan Tangan Emas)",
      "Layanan makan menu komparatif khas Vietnam dan Seafood segar",
      "Konfigurasi antar jemput lobi hotel bandara privat"
    ]
  },
  {
    id: "sa-01",
    name: "Arab Saudi",
    continent: "Asia",
    cities: ["Riyadh", "Jeddah", "Makkah", "Madinah"],
    touristSpots: [
      "Kawasan Bersejarah Diriyah (Riyadh UNESCO Heritage Site)",
      "Menara Jeddah Tower & Kawasan Laut Merah Al-Balad",
      "Situs Arsitektur Hegra di Al-Ula",
      "Ziarah Masjidil Haram (Makkah) & Masjid Nabawi (Madinah)"
    ],
    pricePerPerson: 42000000,
    description: "Eksplorasi visi futuristik padang pasir Arab Saudi yang spektakuler. Menghubungkan Riyadh modern, warisan bersejarah Al-Ula, ziarah suci spiritual, hingga pesisir Laut Merah.",
    thumbnail: "https://images.unsplash.com/photo-1667454872134-c25973237138?",
    benefits: [
      "Layanan pengurusan visa elektronik pariwisata super cepat",
      "Akomodasi hotel bintang 5 tepat di depan area tempat ibadah",
      "Bus VIP eksekutif Mercedes Benz dengan rest area pribadi",
      "Pemandu Ustaz/Muthawwif berpengalaman luas dan lokal guide",
      "Makan tiga kali sehari dengan menu masakan Indonesia & Arab",
      "Transportasi kereta cepat Haramain High Speed Railway (First Class)"
    ]
  },
  {
    id: "in-01",
    name: "India",
    continent: "Asia",
    cities: ["New Delhi", "Agra", "Mumbai"],
    touristSpots: [
      "Monumen Cinta Abadi Taj Mahal (Agra)",
      "Benteng Amber Fort (Jaipur Pink City)",
      "Gerbang Gateway of India & Distrik Industri Bollywood (Mumbai)",
      "Kuil Lotus & Gerbang India Gate (New Delhi)"
    ],
    pricePerPerson: 21000000,
    description: "Keragaman kontras budaya yang sangat kaya, arsitektur megah Taj Mahal yang mendunia, serta dinamisnya pusat bisnis digital di Mumbai dan Delhi.",
    thumbnail: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=600&auto=format&fit=crop",
    benefits: [
      "Akses prioritas bebas antrean tiket VIP Taj Mahal",
      "Sopir pribadi dan pemandu korporat lokal tersertifikasi",
      "Akomodasi menginap di istana hotel mewah bintang 5",
      "Layanan sanitasi air mineral botolan premium tak terbatas",
      "Makan malam romantis otentik India kari rempah halal"
    ]
  },
  {
    id: "ae-01",
    name: "Uni Emirat Arab",
    continent: "Asia",
    cities: ["Dubai", "Abu Dhabi"],
    touristSpots: [
      "Gedung Tertinggi Dunia Burj Khalifa (Akses VIP At The Top SKY L148)",
      "Masjid Agung Sheikh Zayed Grand Mosque (Abu Dhabi)",
      "Museum Masa Depan Museum of the Future",
      "Desert Safari Premium dengan Makan Malam Kemah Bintang 5"
    ],
    pricePerPerson: 38000500,
    description: "Pusat inovasi termegah dunia. Menyajikan pengalaman arsitektur pencakar langit yang menembus awan, pulau buatan megah, dan gaya hidup jetset ultra modern.",
    thumbnail: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=600&auto=format&fit=crop",
    benefits: [
      "Akses VIP Lounge eksklusif lantai 148 Burj Khalifa",
      "Desert Safari privat dengan menara mobil 4x4 Land Cruiser terbaru",
      "Penjemputan helikopter udara atau super-car (opsional)",
      "Menginap di hotel bintang 5 premium di pusat kota Dubai",
      "Asisten lokal berbahasa Indonesia handal selama perjalanan",
      "Tiket masuk terpadu terusan seluruh atraksi utama"
    ]
  },
  {
    id: "tr-01",
    name: "Turki",
    continent: "Asia",
    cities: ["Istanbul", "Cappadocia", "Pamukkale"],
    touristSpots: [
      "Situs Sejarah Hagia Sophia & Istana Topkapi (Istanbul)",
      "Penerbangan Balon Udara Panas Fajar Hari (Cappadocia)",
      "Pemandian Air Hangat Kuno Terasering Travertine (Pamukkale)",
      "Menyusuri Selat Bosphorus Cruise privat menghubungkan Asia-Eropa"
    ],
    pricePerPerson: 27000000,
    description: "Pertemuan budaya magis benua Asia dan Eropa. Nikmati pesona keindahan bentang alam prasejarah Cappadocia dari ketinggian balon udara hangat yang menakjubkan.",
    thumbnail: "https://plus.unsplash.com/premium_photo-1661963652315-d5a9d26637dd?",
    benefits: [
      "Penerbangan balon udara premium Cappadocia bergaransi asuransi",
      "Kapal pesiar privat eksklusif menyusuri Selat Bosphorus",
      "Akomodasi hotel batu gua mewah bintang 5 (Cave Hotel)",
      "Layanan makan buffet bervariasi dengan menu kuliner Turki otentik",
      "Penjemputan di bandara VIP dan transportasi privat ber-AC",
      "Pemandu lokal bersertifikat ramah berbahasa Indonesia"
    ]
  },
  {
    id: "mv-01",
    name: "Maladewa",
    continent: "Asia",
    cities: ["Male Atoll", "Maafushi", "Resort Islands"],
    touristSpots: [
      "Bungalow Terapung Mewah di Tengah Atol Karang Air Jernih",
      "Snorkeling Berenang Bersama Hiu Paus & Penyu Laut",
      "Piknik Eksklusif di Pulau Berpasir Putih Sunyi",
      "Makan Malam Unik di Restoran Bawah Laut Kaca"
    ],
    pricePerPerson: 48000000,
    description: "Surga tropis terindah di dunia dengan atol karang berkilauan. Sempurna untuk liburan privat kelas atas pimpinan korporat yang membutuhkan relaksasi pikiran total.",
    thumbnail: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=600&auto=format&fit=crop",
    benefits: [
      "Transportasi Speedboat VIP atau Seaplane (pesawat air) pulang-pergi",
      "Akomodasi overwater villa terapung bintang 5 mewah mewah",
      "Layanan All-inclusive (makan pagi, siang, malam, & minuman premium)",
      "Pemandu bersertifikat selam internasional eksklusif",
      "Peralatan snorkeling premium gratis",
      "Sesi foto menggunakan drone udara profesional gratis"
    ]
  },
  {
    id: "qa-01",
    name: "Qatar",
    continent: "Asia",
    cities: ["Doha", "The Pearl", "Lusail"],
    touristSpots: [
      "Museum Seni Islam Souq Waqif Tradisional (Doha)",
      "Kawasan Modern Terpadu The Pearl-Qatar Luxury Island",
      "Stadion Lusail Iconic Stadium & Sirkuit Al-Khor",
      "Desert Safari Laut Dalam Inland Sea Khor Al-Adaid"
    ],
    pricePerPerson: 39000000,
    description: "Kemegahan Timur Tengah yang mutakhir berbalut seni kontemporer kelas dunia. Hub singgah dan tujuan olahraga serta MICE internasional terkemuka di Semenanjung Arab.",
    thumbnail: "https://images.unsplash.com/photo-1700901742651-6b353164caf3?",
    benefits: [
      "Dukungan VIP Meet & Assist Al-Maha di Bandara Hamad",
      "Menginap di hotel bintang 5 bernuansa arsitektur arab kontemporer",
      "Tur privat safari gurun pasir berujung pantai laut dalam",
      "Sopir pribadi korporat professional berbahasa Inggris-Indonesia",
      "Akses eksklusif pusat perbelanjaan Galeries Lafayette Doha"
    ]
  },
  {
    id: "hk-01",
    name: "Hong Kong",
    continent: "Asia",
    cities: ["Kowloon", "Hong Kong Island", "Lantau Island"],
    touristSpots: [
      "Puncak Victoria Peak (Menggunakan Peak Tram Jalur Cepat VIP)",
      "Hong Kong Disneyland VIP Experience Tour",
      "Kawasan Belanja Terpadu Tsim Sha Tsui & Causeway Bay",
      "Patung Budha Raksasa Tian Tan Buddha di Pulau Lantau"
    ],
    pricePerPerson: 22000000,
    description: "Wajah metropolis pencakar langit yang padat dengan ritme bisnis super cepat. Tempat ideal untuk merger bisnis regional serta surga belanja barang bermerek bebas bea.",
    thumbnail: "https://images.unsplash.com/photo-1542189412744-bfabf27522ee?",
    benefits: [
      "Grup Fast-pass antrean Peak Tram & Disneyland Hong Kong",
      "Tiket pelayaran kapal kayu tradisional Star Ferry malam hari",
      "Kartu Octopus terisi saldo gratis senilai HKD 300",
      "Pemandu wisata fasih berbahasa Indonesia yang bersertifikat",
      "Layanan asisten pengantaran paket belanja ke lobi hotel"
    ]
  },

  // ================= EROPA (15 COUNTRIES) =================
  {
    id: "fr-01",
    name: "Prancis",
    continent: "Eropa",
    cities: ["Paris", "Nice", "Lyon"],
    touristSpots: [
      "Menara Eiffel & Pelayaran Romantis Sungai Seine",
      "Museum Seni Terbesar Dunia Louvre (Akses Prioritas)",
      "Destinasi Pantai French Riviera & Monako (Nice)",
      "Katedral Bersejarah Basilika Notre-Dame de Fourvière (Lyon)"
    ],
    pricePerPerson: 55000000,
    description: "Jantung mode, seni kuliner haute cuisine, dan pemandangan estetik Eropa. Menawarkan pengalaman luar biasa baik untuk kolaborasi bisnis internasional maupun petualangan relaksasi berkelas tinggi.",
    thumbnail: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600&auto=format&fit=crop",
    benefits: [
      "Tiket akses langsung bebas antre (Museum Louvre & Menara Eiffel)",
      "Pelayaran privat eksklusif di Sungai Seine dengan jamuan hidangan premium",
      "Akomodasi hotel butik bintang 5 bergaya arsitektur klasik Paris",
      "Layanan asisten perjalanan pribadi (Concierge 24/7)",
      "Transportasi antarkota menggunakan kereta cepat TGV First Class",
      "Penerjemah profesional korporat (opsional)"
    ]
  },
  {
    id: "ch-01",
    name: "Swiss",
    continent: "Eropa",
    cities: ["Zurich", "Geneva", "Zermatt (Matterhorn)"],
    touristSpots: [
      "Kawasan Sejarah Danau Zurich & Kota Tua (Zurich)",
      "Kantor PBB & Jet d'Eau de Genève (Geneva)",
      "Gunung Ikonik Matterhorn & Kereta Gantung Bebas Polusi (Zermatt)",
      "Jungfraujoch 'Top of Europe' puncak es abadi"
    ],
    pricePerPerson: 68000000,
    description: "Swiss menyajikan panorama alam pegunungan terindah di dunia bersandingan dengan pusat perbankan global. Nikmati udara murni tanpa polusi di lereng Alps Swiss yang menawan.",
    thumbnail: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=600&auto=format&fit=crop",
    benefits: [
      "First Class Swiss Travel Pass untuk akses seluruh transportasi kereta api",
      "Menginap di puncak Resort Spa Pegunungan Mewah Bintang 5 bergaya Alpine",
      "Tur privat berpemandu lokal ahli sejarah geografi pegunungan",
      "Makan malam fondue keju otentik & cokelat gourmet Swiss tak terbatas",
      "Asuransi cedera olahraga dan evakuasi medis darurat terlengkap",
      "Kendaraan jemputan Tesla privat dari bandara ke seluruh lokasi hotel"
    ]
  },
  {
    id: "it-01",
    name: "Italia",
    continent: "Eropa",
    cities: ["Roma", "Florence", "Venesia"],
    touristSpots: [
      "Colosseum Raksasa & Museum Vatikan (Roma)",
      "Arsitektur Duomo Santa Maria del Fiore (Florence)",
      "Gondola privat menjelajahi Kanal Kota Terapung (Venesia)",
      "Piazza San Marco dengan pemandangan sore hari yang memesona"
    ],
    pricePerPerson: 52000000,
    description: "Warisan Kekaisaran Romawi yang legendaris, seni Renaisans yang mengagumkan di Florence, serta keromantisan Venesia. Destinasi impian yang menyuntikkan inspirasi tak terbatas untuk bisnis kreatif dan relaksasi.",
    thumbnail: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=600&auto=format&fit=crop",
    benefits: [
      "Tiket masuk prioritas instan untuk Vatikan, Colosseum, dan Uffizi Gallery",
      "Private gondola ride di Venesia dengan penyanyi serenade tradisional",
      "Private Masterclass: Membuat pizza korporat dan pasta segar bersama koki Italia",
      "Supir profesional pribadi Mercedes-Benz ber-AC dingin sepanjang tur",
      "Semua retribusi kota dan bea masuk situs budaya sudah terbayar penuh",
      "Akomodasi hotel bersejarah bintang 5 di pusat kota Roma lama"
    ]
  },
  {
    id: "gb-01",
    name: "Inggris",
    continent: "Eropa",
    cities: ["London", "Oxford", "Edinburgh"],
    touristSpots: [
      "Menara Jam Big Ben & Istana Buckingham Palace Royal Tour",
      "University of Oxford Historic Campus & Library (Oxford)",
      "Kastil Megah Edinburgh Castle di Atas Bukit Batu (Edinburgh)",
      "London Eye Ferris Wheel (Kabin Kelas VIP dengan Champagne)"
    ],
    pricePerPerson: 59500000,
    description: "Pusat finansial legendaris Eropa. Menghadirkan wibawa monarki Britania Raya, keagungan kota akademisi Oxford, serta pesona kastil abad pertengahan Skotlandia.",
    thumbnail: "https://images.unsplash.com/photo-1488747279002-c8523379faaa?q",
    benefits: [
      "Tiket VIP London Eye bebas antre dengan kabin privat eksklusif",
      "Kartu transportasi Oyster Card First Class tak terbatas",
      "Akses tur berpemandu pribadi di dalam Istana Buckingham",
      "Hotel kemitraan bintang 5 legendaris di pusat kota London",
      "Asuransi perjalanan internasional premium dan pembantu visa Inggris"
    ]
  },
  {
    id: "de-01",
    name: "Jerman",
    continent: "Eropa",
    cities: ["Berlin", "Munich", "Frankfurt"],
    touristSpots: [
      "Gerbang Bersejarah Brandenburg Gate & Gedung Reichstag (Berlin)",
      "Kastil Dongeng Kerajaan Neuschwanstein (Bavaria-Munich)",
      "Kawasan Bisnis Bank Sentral Eropa & Kota Tua Romerberg (Frankfurt)",
      "Museum Mercedes-Benz & Porsche (Stuttgart)"
    ],
    pricePerPerson: 49000000,
    description: "Raksasa ekonomi dan engineering otomotif Eropa. Kombinasi sempurna tata kota disiplin, pusat industri global Frankfurt, serta keindahan kastil dongeng pegunungan Alpen Bavaria.",
    thumbnail: "https://images.unsplash.com/photo-1618259278412-2819cbdea4dc?",
    benefits: [
      "VIP Fast-admission ticket untuk Museum Otomotif Stuttgart mewah",
      "Sewa mobil sports BMW / Mercedes-Benz di Autobahn (opsional)",
      "Akomodasi korporat bintang 5 teratas dekat stasiun kereta api utama",
      "Makan malam sosis bratwurst otentik & kuliner khas Jerman halal terkurasi",
      "Tiket Kereta Cepat DB ICE First Class antarkota"
    ]
  },
  {
    id: "es-01",
    name: "Spanyol",
    continent: "Eropa",
    cities: ["Madrid", "Barcelona", "Seville"],
    touristSpots: [
      "Istana Negera Royal Palace & Museum Seni Prado (Madrid)",
      "Gereja Megah Katedral La Sagrada Familia & Park Guell (Barcelona)",
      "Istana Arsitektur Islam Andalusia Royal Alcazar (Seville)",
      "Stadion Sepak Bola Santiago Bernabeu & Spotify Camp Nou VIP Tour"
    ],
    pricePerPerson: 47500000,
    description: "Perayaan gairah kehidupan yang kaya di bawah sinar matahari Mediterania Barat. Memukau melalui keindahan seni arsitektur Antoni Gaudi, kuliner tapas, dan sejarah kolosal.",
    thumbnail: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?q=80&w=600&auto=format&fit=crop",
    benefits: [
      "Tiket VIP Box Premium nonton langsung pertandingan La Liga (opsional)",
      "Private Flamenco Dance Masterclass & Dinner di Seville",
      "Akses masuk tanpa antre Sagrada Familia dan Istana Madrid",
      "Sopir pribadi dan pemandu korporat lokal tersertifikasi",
      "Menginap di Parador (istana kerajaan kuno yang disulap menjadi hotel mewah)"
    ]
  },
  {
    id: "nl-01",
    name: "Belanda",
    continent: "Eropa",
    cities: ["Amsterdam", "Rotterdam", "Keukenhof"],
    touristSpots: [
      "Menyusuri Kanal Air dengan Kapal Kayu Klasik (Amsterdam)",
      "Taman Bunga Tulip Terbesar Dunia Keukenhof (Musim Semi)",
      "Kincir Angin Sejarah Zaanse Schans & Desa Tradisional Volendam",
      "Arsitektur Futuristik Cube Houses & Pelabuhan Megah Rotterdam"
    ],
    pricePerPerson: 46000000,
    description: "Negeri kincir angin dengan tata kelola air terbaik dunia. Menyajikan keromantisan kanal sepeda Amsterdam, ladang bunga tulip Keukenhof berwarna-warni, serta pelabuhan logistik termodern di Rotterdam.",
    thumbnail: "https://plus.unsplash.com/premium_photo-1661931625680-cd916bc75340?",
    benefits: [
      "Private luxury boat canal cruise di Amsterdam dengan hidangan keju gourmet",
      "Tiket akses langsung bebas antre Fast-track Taman Keukenhof",
      "Sesi foto kostum baju tradisional Belanda orisinil di Volendam",
      "Layanan sewa sepeda listrik premium sepanjang hari",
      "Hotel butik bintang 5 di sepanjang lingkaran kanal utama"
    ]
  },
  {
    id: "at-01",
    name: "Austria",
    continent: "Eropa",
    cities: ["Vienna", "Salzburg", "Hallstatt"],
    touristSpots: [
      "Istana Schönbrunn Palace & Menonton Konser Simfoni Klasik (Vienna)",
      "Kota Kelahiran Komponis Legendaris Mozart (Salzburg)",
      "Desa Danau Alpen Terindah Dunia Hallstatt (Gondola View)",
      "Gedung Opera Austria Vienna State Opera VIP Admission"
    ],
    pricePerPerson: 51050000,
    description: "Pusat seni musik klasik dunia abad ke-18. Menawarkan kemegahan kekaisaran Habsburg di Wina, keindahan danau Alpen Hallstatt, hingga pegunungan bersalju Salzburg yang magis.",
    thumbnail: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?q=80&w=600&auto=format&fit=crop",
    benefits: [
      "Tiket barisan depan Konser Musik Simfoni Klasik Mozart/Strauss di Wina",
      "Ekskursi tur privat menggunakan kapal pesiar khusus di Danau Hallstatt",
      "Tiket VIP masuk Istana Schönbrunn tanpa harus mengantre",
      "Pemandu ahli sejarah arsitektur Eropa berbahasa Indonesia",
      "Makan malam premium di restoran tertua bersejarah di Salzburg"
    ]
  },
  {
    id: "gr-01",
    name: "Yunani",
    continent: "Eropa",
    cities: ["Athens", "Santorini", "Mykonos"],
    touristSpots: [
      "Situs Kuil Kuno Parthenon & Acropolis (Athens)",
      "Pemandangan Kubah Biru Senja Hari di Tebing Oia (Santorini)",
      "Pantai Cantik Laut Aegea & Kincir Angin Klasik (Mykonos)",
      "Pelayaran privat dengan Kapal Catamaran mengitari Gunung Berapi"
    ],
    pricePerPerson: 54000000,
    description: "Tempat lahirnya demokrasi dan mitologi kuno dewa-dewi dunia. Menyajikan perpaduan magis reruntuhan kuil pualam Athena berumur 2.500 tahun dengan keindahan pesisir Santorini yang legendaris.",
    thumbnail: "https://plus.unsplash.com/premium_photo-1661964149725-fbf14eabd38c?",
    benefits: [
      "Pelayaran matahari terbenam privat dengan Kapal Catamaran di Santorini",
      "Pemandu privat arkeologi bersertifikat internasional (Yunani-RI)",
      "Akomodasi hotel resort tebing bintang 5 dengan kolam renang privat",
      "Penerbangan domestik eksekutif internal Athena - Santorini PP",
      "Makan makanan Mediterania sehat minyak zaitun organik otentik"
    ]
  },
  {
    id: "no-01",
    name: "Norwegia",
    continent: "Eropa",
    cities: ["Oslo", "Bergen", "Tromso"],
    touristSpots: [
      "Berburu Aurora Borealis Cahaya Utara di Tromso Wilderness",
      "Sognefjord - Fjord Terpanjang dan Terdalam di Dunia (Bergen)",
      "Museum Kapal Viking Modern & Istana Negara (Oslo)",
      "Kereta Gunung Bersejarah Flam Railway Scenic Train"
    ],
    pricePerPerson: 65000000,
    description: "Keajaiban lanskap fjord hasil pahatan es zaman purba yang megah, serta petualangan menyaksikan tarian langit magis Aurora Borealis di malam hari Kutub Utara.",
    thumbnail: "https://images.unsplash.com/photo-1517904518766-16c4f3ab0293?",
    benefits: [
      "Tur malam berburu Aurora Borealis privat menggunakan bus hangat berfasilitas toilet",
      "Sajian minuman cokelat hangat premium dan fotografer profesional di Kutub Utara",
      "Tiket First Class Kereta Api Panorama Alam Legendaris Flam Railway",
      "Menginap di hotel butik bintang 5 tepi fjord dengan sauna pemanas alam",
      "Asuransi evakuasi helikopter cuaca ekstrem terlengkap"
    ]
  },
  {
    id: "is-01",
    name: "Islandia",
    continent: "Eropa",
    cities: ["Reykjavik", "Akureyri", "Vila Vik"],
    touristSpots: [
      "Pemandian Air Panas Alami Penuh Mineral Blue Lagoon Spa",
      "Situs Raksasa Geyser, Air Terjun Gullfoss & Taman Nasional Thingvellir",
      "Pantai Pasir Hitam Misterius Reynisfjara Black Sand Beach",
      "Gua Es Kristal Alami di Gletser Vatnajokull"
    ],
    pricePerPerson: 72000000,
    description: "Tanah Es dan Api. Islandia menawarkan pemandangan magis kutub utara seperti permukaan bulan, gunung berapi aktif, gletser purba membeku, serta kolam air panas geothermal alami.",
    thumbnail: "https://images.unsplash.com/photo-1660005490330-dcb50ddadfb3?",
    benefits: [
      "Akses Premium VIP Lounge dan spa termal di resort Blue Lagoon",
      "Armada mobil Jeep Monster 4x4 privat tangguh bersupir ahli es",
      "Tiket VIP masuk menjelajah gua es kristal Vatnajökull",
      "Setelan pakaian musim dingin khusus kutub ultra-hangat premium",
      "Makan malam sup lobster dan steak domba otentik Islandia"
    ]
  },
  {
    id: "se-01",
    name: "Swedia",
    continent: "Eropa",
    cities: ["Stockholm", "Gothenburg", "Kiruna"],
    touristSpots: [
      "Kota Tua Abad Pertengahan Gamla Stan & Istana Kerajaan (Stockholm)",
      "Museum Kapal Perang Abad ke-17 Vasa Museum Access",
      "Hotel Es Pertama Dunia Icehotel (Kiruna Suku Sami)",
      "Kanal Air Stockholm Archipelago Cruise privat"
    ],
    pricePerPerson: 58000000,
    description: "Pelopor gaya hidup modern minimalis 'Lagom' dan inovasi global. Swedia menyajikan indahnya arsitektur Stockholm terapung, serta pengalaman menginap unik di hotel es Kutub Utara.",
    thumbnail: "https://images.unsplash.com/photo-1579359565489-8e65439e6d1c?",
    benefits: [
      "Menginap semalam di ruang hangat berbalut es alami Icehotel Kiruna",
      "Pelayaran makan malam privat keliling kepulauan Stockholm",
      "Kartu VIP bebas masuk seluruh museum bersejarah Stockholm",
      "Sesi ramah tamah Fika (kopi & kue tradisional) bersama delegasi lokal",
      "Transportasi kereta malam privat kompartemen ber-AC"
    ]
  },
  {
    id: "be-01",
    name: "Belgia",
    continent: "Eropa",
    cities: ["Brussels", "Bruges", "Ghent"],
    touristSpots: [
      "Alun-alun Terindah Eropa Grand Place & Patung Manneken Pis (Brussels)",
      "Kota Abad Pertengahan Romantis Berjaringan Kanal Air (Bruges)",
      "Kastil Gravensteen & Menara Lonceng Ghent Belfry (Ghent)",
      "Kunjungan Eksklusif Pabrik Cokelat Premium Belgia"
    ],
    pricePerPerson: 44000000,
    description: "Ibu kota diplomatik Uni Eropa dengan kedaulatan arsitektur gotik yang megah, surga bagi pecinta cokelat cokelat gourmet kelas dunia, and bir warisan tradisional tak tertandingi.",
    thumbnail: "https://images.unsplash.com/photo-1601993305512-a73859a41ec2?",
    benefits: [
      "Private Masterclass: Membuat cokelat praline mewah bersama Chef Belgia",
      "Akses jalur cepat VIP masuk Museum Seni Kerajaan Belgia",
      "Makan siang menu kerang 'moules-frites' otentik legendaris",
      "Transportasi antarkota VIP Mercedes S-Class ber-AC dingin",
      "Menginap di hotel bintang 5 bersejarah di kawasan Grand Place"
    ]
  },
  {
    id: "pt-01",
    name: "Portugal",
    continent: "Eropa",
    cities: ["Lisbon", "Porto", "Sintra"],
    touristSpots: [
      "Menara Sejarah Belem Tower & Biara Paripurna Jeronimos (Lisbon)",
      "Jembatan Besi Ikonik Dom Luis I & Gudang Anggur Sungai Douro (Porto)",
      "Istana Dongeng Berwarna-warni Pena Palace di Atas Bukit (Sintra)",
      "Kawasan Pantai Bertebing Emas di Algarve Coast Tour"
    ],
    pricePerPerson: 43500000,
    description: "Kehangatan sejarah penjelajah samudera di tepi samudra Atlantik. Portugal bersinar melalui pemandangan ubin keramik biru putih (azulejos), musik sendu Fado, serta kuliner tart telur legendaris.",
    thumbnail: "https://images.unsplash.com/photo-1558102400-72da9fdbecae?",
    benefits: [
      "Tiket VIP akses langsung tanpa antre Istana Pena di Sintra",
      "Makan malam privat ditemani pertunjukan eksklusif musik tradisional Fado",
      "Private pasteis de nata (kue tart telur) making workshop",
      "Supir profesional pribadi Mercedes-Benz ber-AC dingin sepanjang tur",
      "Dukungan asisten perjalanan lokal berbahasa Indonesia handal"
    ]
  },
  {
    id: "fi-01",
    name: "Finlandia",
    continent: "Eropa",
    cities: ["Helsinki", "Rovaniemi (Santa Claus)", "Levi"],
    touristSpots: [
      "Desa Sinterklas Resmi Santa Claus Village & Garis Batas Arktik",
      "Katedral Putih Helsinki Cathedral & Gereja Batu Temppeliaukio",
      "Pengalaman Naik Kereta Luncur Rusa Kutub & Anjing Husky (Levi)",
      "Menginap di Bungalow Atap Kaca Menyaksikan Bintang (Glass Igloo)"
    ],
    pricePerPerson: 62050000,
    description: "Negara paling bahagia di dunia dengan lanskap hutan pinus bersalju yang menyejukkan hati. Rasakan keajaiban tinggal di Glass Igloo beratapkan kaca bening bertabur bintang Kutub Utara.",
    thumbnail: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=600&auto=format&fit=crop",
    benefits: [
      "Menginap 2 malam di Glass Igloo Bintang 5 eksklusif berpemanas lantai",
      "Sesi privat bertemu Sinterklas di dalam Rovaniemi Arctic Circle",
      "Ekskursi naik kereta luncur salju ditarik anjing Husky asli",
      "Pengalaman relaksasi sauna asap tradisional Finlandia di tepi danau es",
      "Semua retribusi masuk situs taman nasional kutub utara telah terbayar"
    ]
  }
];

export const HOTELS: Hotel[] = [
  {
    id: "h-tokyo",
    name: "Palace Hotel Tokyo",
    country: "Jepang",
    city: "Tokyo",
    stars: 5,
    pricePerNight: 4200000,
    description: "Hotel mewah berkelas tinggi yang menghadap langsung ke Taman Kekaisaran Tokyo. Dilengkapi dengan pusat kebugaran mutakhir dan ruang konferensi eksekutif elit.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop",
    amenities: ["Spa Kesehatan", "Ruang Rapat", "Wifi Super Cepat", "Makan Pagi Internasional", "Akses Gym 24 Jam", "Parkir Valet"]
  },
  {
    id: "h-singapore",
    name: "Marina Bay Sands Luxury",
    country: "Singapura",
    city: "Marina Bay",
    stars: 5,
    pricePerNight: 7500000,
    description: "Tempat menginap paling ikonik di Asia Tenggara. Nikmati kolam renang infinity rooftop terbesar di dunia dengan pemandangan kota pencakar langit Singapura yang spektakuler.",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=600&auto=format&fit=crop",
    amenities: ["Rooftop Infinity Pool", "Kasino & Pusat Gadget", "Pusat Bisnis Korporat", "Kamar Mandi Marmer Premium", "Pemandangan Laut & Kota"]
  },
  {
    id: "h-seoul",
    name: "The Ritz-Carlton Seoul",
    country: "Korea Selatan",
    city: "Seoul",
    stars: 5,
    pricePerNight: 3800000,
    description: "Menyajikan kemewahan mutlak khas Ritz-Carlton di jantung Gangnam, Seoul. Lokasi ideal untuk menjamu mitra bisnis lokal Anda secara representatif.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop",
    amenities: ["Restoran Berbintang Michelin", "Akses Lounge VIP", "Kamar Kedap Suara", "Stasiun Pengisian Daya Mobil Listrik", "Layanan Pramutamu Khusus"]
  },
  {
    id: "h-savoy",
    name: "The Savoy Hotel London",
    country: "Inggris",
    city: "London",
    stars: 5,
    pricePerNight: 8200000,
    description: "Hotel legendaris termegah di tepian Sungai Thames sejak 1900-an. Memiliki pelayan pribadi (Butler 24 jam) dan teh sore khas Royal British Tea yang mendunia.",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=600&auto=format&fit=crop",
    amenities: ["Pelayan Pribadi 24 Jam", "Akses Royal British Tea", "Sopir Antar Jemput Klasik", "Kamar Kedap Suara", "Pusat Kebugaran Bintang 5"]
  },
  {
    id: "h-paris",
    name: "Hotel Plaza Athénée Paris",
    country: "Prancis",
    city: "Paris",
    stars: 5,
    pricePerNight: 9500000,
    description: "Simbol kemewahan legendaris Paris sejak 1913. Berlokasi di Avenue Montaigne dengan pemandangan langsung ke Menara Eiffel dari balkon kamar eksklusif Anda.",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=600&auto=format&fit=crop",
    amenities: ["Balkon Menghadap Eiffel", "Spa Dior Institute", "Bar Anggur Antik", "Supir Rolls-Royce Privat", "Layanan Setrika Jas Kilat"]
  },
  {
    id: "h-zurich",
    name: "The Dolder Grand Zurich",
    country: "Swiss",
    city: "Zurich",
    stars: 5,
    pricePerNight: 8900000,
    description: "Berada megah di lereng perbukitan Zurich dengan spa seluas 4.000 meter persegi. Menyeimbangkan ketenangan alami pegunungan dengan kenyamanan teknologi modern.",
    image: "https://images.unsplash.com/photo-1521783593447-5702b8991419?q=80&w=600&auto=format&fit=crop",
    amenities: ["Spa Termal Alps", "Kolam Air Hangat Luar Ruang", "Koleksi Seni Eksklusif Dunia", "Layanan Helikopter (Opsional)", "Restoran Dua Bintang Michelin"]
  },
  {
    id: "h-venice",
    name: "Hotel Danieli Luxury Palace",
    country: "Italia",
    city: "Venesia",
    stars: 5,
    pricePerNight: 6400000,
    description: "Istana kuno megah peninggalan abad ke-14 yang disulap menjadi hotel mewah termegah di Venesia. Hanya beberapa langkah dari Basilika San Marco.",
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=600&auto=format&fit=crop",
    amenities: ["Dermaga Air Privat", "Gaya Arsitektur Gothik Kuno", "Restoran Rooftop Terrazza Danieli", "Lunas Retribusi Kanal", "Antar Jemput Speedboat Air"]
  },
  {
    id: "h-mulia",
    name: "The Mulia Resort Nusa Dua",
    country: "Indonesia",
    city: "Bali",
    stars: 5,
    pricePerNight: 5500000,
    description: "Resor pantai ultra-mewah bintang 5 di kawasan nusa dua bali yang meraih predikat salah satu kolam renang pinggir pantai tercantik di dunia.",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=600&auto=format&fit=crop",
    amenities: ["Pantai Privat Nusa Dua", "Mulia Executive Lounge", "Kolam Renang Mewah Oceanfront", "Makan Malam Buffet Internasional", "Spa Premium Relaksasi"]
  },
  {
    id: "h-armani",
    name: "Armani Hotel Dubai",
    country: "Uni Emirat Arab",
    city: "Dubai",
    stars: 5,
    pricePerNight: 9100000,
    description: "Hotel mewah bertema modern minimalis rancangan desainer dunia Giorgio Armani langsung di dalam struktur megah gedung tertinggi dunia Burj Khalifa.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop",
    amenities: ["Kamar Terintegrasi Burj Khalifa", "Restoran Armani Ristorante", "Akses Mall Terbesar Dubai Mall", "Kolam Air Panas Relaksasi", "Sopir Bentley Privat"]
  },
  {
    id: "h-bangkok",
    name: "Mandarin Oriental Bangkok",
    country: "Thailand",
    city: "Bangkok",
    stars: 5,
    pricePerNight: 4500000,
    description: "Warisan kemewahan sejati berumur lebih dari satu abad di bantaran sungai bersejarah Chao Phraya. Menyajikan keramahan khas Siam tak tanding.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop",
    amenities: ["Pemandangan Sungai Chao Phraya", "Spa Klasik Terakreditasi", "Akses Shuttle Boat Klasik", "Makan Siang Halal Otentik", "Gym & Lapangan Tenis Privat"]
  },
  {
    id: "h-peninsula",
    name: "The Peninsula Hong Kong",
    country: "Hong Kong",
    city: "Kowloon",
    stars: 5,
    pricePerNight: 6800000,
    description: "Dikenal luas sebagai 'Grande Dame of the Far East'. Menyajikan kemegahan klasik dipadupadankan armada Rolls-Royce Phantom legendaris berwarna hijau khas Peninsula.",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=600&auto=format&fit=crop",
    amenities: ["Armada Rolls-Royce Phantom Privat", "Kolam Renang Bergaya Roma Kuno", "Helipad Atap Gedung", "Akses Teh Sore Legendaris", "Pusat Rapat Bisnis Elit"]
  },
  {
    id: "h-kempinski",
    name: "Ciragan Palace Kempinski Istanbul",
    country: "Turki",
    city: "Istanbul",
    stars: 5,
    pricePerNight: 6900000,
    description: "Satu-satunya Istana Kekaisaran Ottoman kuno yang disulap menjadi hotel mewah bintang 5 tepat di tepi garis perairan Selat Bosphorus yang menawan.",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=600&auto=format&fit=crop",
    amenities: ["Infinitiy Pool Tepi Selat Bosphorus", "Kubah Istana Sejarah Ottoman", "Jamuan Makan Malam Kenegaraan", "Dermaga Helikopter Pribadi", "Layanan Pijat Hammam Turki"]
  },
  {
    id: "h-berlin",
    name: "Hotel Adlon Kempinski Berlin",
    country: "Jerman",
    city: "Berlin",
    stars: 5,
    pricePerNight: 5200000,
    description: "Hotel paling legendaris di Jerman, terletak tepat di samping Gerbang Brandenburg yang ikonik. Pusat pertemuan diplomatik dan politik dunia kelas atas.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop",
    amenities: ["Pemandangan Gerbang Brandenburg", "Restoran Dua Bintang Michelin", "Akses Lounge Konsuler", "Kolam Renang Hangat Indoor", "Layanan Pramutamu Kelas Atas"]
  },
  {
    id: "h-barcelona",
    name: "W Barcelona Luxury Sail",
    country: "Spanyol",
    city: "Barcelona",
    stars: 5,
    pricePerNight: 5800000,
    description: "Membentuk siluet layar kapal raksasa yang menakjubkan di sepanjang Pantai Barceloneta. Menawarkan panorama laut Mediterania terbentang tanpa batas yang modern.",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=600&auto=format&fit=crop",
    amenities: ["Infinity Pool Tepi Pantai", "Rooftop Edge Bar Cocktails", "Lantai Kamar Jendela Penuh", "Akses Langsung Pantai Barceloneta", "Kualitas Spa Pemurni Kulit"]
  },
  {
    id: "h-amsterdam",
    name: "Hotel de l'Europe Amsterdam",
    country: "Belanda",
    city: "Amsterdam",
    stars: 5,
    pricePerNight: 5900000,
    description: "Kemewahan klasik sejati di sepanjang tepian Sungai Amstel berarsitektur megah semenjak abad ke-19. Pusat sejarah budaya Amsterdam terdekat.",
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=600&auto=format&fit=crop",
    amenities: ["Dermaga Perahu Privat Sungai", "Terapi Kulit Guerlain Spa", "Restoran Berbintang Flore", "Koneksi Wifi Korporat Prima", "Layanan Pramutamu 24 Jam"]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Ir. H. Ronald Sitorus",
    role: "Direktur Utama",
    company: "PT Integra Digital Nusantara",
    text: "Gogo Tour mengurus seluruh rangkaian perjalanan bisnis keliling Swiss dan Prancis dengan sempurna. Layanan First Class Swiss Rail Pass benar-benar mempermudah akses perjalanan kami, dan pemandu lokal mereka sangat menguasai tata cara adat istiadat Eropa.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop"
  },
  {
    name: "Dian Sastrowardoyo",
    role: "VP of Business Development",
    company: "Marva Creative Studio",
    text: "Pemesanan hotel dan paket tur Singapura-Jepang lewat Gogo Tour sangat praktis. Layanan penjemputan Mercedes S-Class bandara di Marina Bay sungguh luar biasa memberikan impresi premium untuk mitra korporasi kami. Sangat direkomendasikan!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop"
  },
  {
    name: "Budi Santoso",
    role: "CEO & Co-founder",
    company: "Nusantara FinTek",
    text: "Sebagai traveler bisnis yang membutuhkan fleksibilitas tinggi, fitur asisten perjalanan 24/7 milik Gogo Tour sangat menolong saat kami harus memundurkan jadwal rapat di Seoul secara mendadak. Rescheduling hotel dapat tuntas kurang dari 1 jam!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop"
  }
];

export const formatRupiah = (value: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};
