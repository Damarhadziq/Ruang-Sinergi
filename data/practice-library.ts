export type PracticeQuestion =
  | {
      id: string;
      kind: "choice" | "visual" | "true-false";
      label: string;
      prompt: string;
      options: string[];
      answer: number;
      explanation: string;
      image?: string;
    }
  | {
      id: string;
      kind: "sequence";
      label: string;
      prompt: string;
      items: string[];
      answer: string[];
      explanation: string;
    };

export interface PracticeExercise {
  slug: string;
  title: string;
  description: string;
  format: string;
  duration: number;
  xp: number;
  questions: PracticeQuestion[];
}

export interface PracticeDepartment {
  slug: string;
  name: string;
  shortName: string;
  summary: string;
  icon: "code" | "heart" | "sport" | "dance" | "electric" | "auto";
  accent: string;
  soft: string;
  image: string;
  exercises: PracticeExercise[];
}

const images = {
  code: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
  counseling: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
  sport: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1200&q=80",
  dance: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80",
  electric: "https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?auto=format&fit=crop&w=1200&q=80",
  auto: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1200&q=80",
};

export const practiceDepartments: PracticeDepartment[] = [
  {
    slug: "informatika",
    name: "Pendidikan Informatika",
    shortName: "Informatika",
    summary: "Logika, algoritma, pemrograman, dan kebiasaan digital yang aman.",
    icon: "code",
    accent: "#246fe8",
    soft: "#eaf3ff",
    image: images.code,
    exercises: [
      {
        slug: "algoritma-sehari-hari",
        title: "Algoritma sehari-hari",
        description: "Uji kemampuan menyusun instruksi yang jelas dan terurut.",
        format: "Pilihan + susun urutan",
        duration: 5,
        xp: 100,
        questions: [
          { id: "i-a-1", kind: "choice", label: "Pilihan cepat", prompt: "Ciri algoritma yang dapat digunakan orang lain dengan hasil konsisten adalah...", options: ["Langkahnya jelas dan terurut", "Hanya dipahami pembuatnya", "Selalu memakai kode", "Tidak perlu diuji"], answer: 0, explanation: "Algoritma perlu jelas, terurut, dan dapat diuji ulang." },
          { id: "i-a-2", kind: "sequence", label: "Susun langkah", prompt: "Susun alur membuat teh hangat.", items: ["Tuang air", "Selesai", "Panaskan air", "Siapkan teh"], answer: ["Panaskan air", "Siapkan teh", "Tuang air", "Selesai"], explanation: "Urutan dimulai dari menyiapkan kebutuhan hingga hasil akhirnya siap." },
          { id: "i-a-3", kind: "true-false", label: "Benar atau salah", prompt: "Instruksi 'tambahkan secukupnya' sudah cukup terukur untuk sebuah algoritma.", options: ["Benar", "Salah"], answer: 1, explanation: "Instruksi perlu menggunakan ukuran atau kondisi yang dapat diperiksa." },
        ],
      },
      {
        slug: "keamanan-digital",
        title: "Detektif keamanan digital",
        description: "Kenali password kuat, phishing, dan kebiasaan menjaga akun.",
        format: "Skenario singkat",
        duration: 4,
        xp: 90,
        questions: [
          { id: "i-k-1", kind: "choice", label: "Skenario", prompt: "Kamu menerima pesan yang meminta kode OTP dengan alasan verifikasi akun. Apa tindakan terbaik?", options: ["Kirim agar akun tidak diblokir", "Abaikan dan cek melalui kanal resmi", "Teruskan ke teman", "Balas dengan password"], answer: 1, explanation: "Kode OTP bersifat rahasia. Verifikasi informasi melalui kanal resmi." },
          { id: "i-k-2", kind: "choice", label: "Pilihan cepat", prompt: "Password yang paling kuat adalah...", options: ["sekolah123", "Damar2009", "B!ru-Langit_47#", "password"], answer: 2, explanation: "Gunakan kombinasi panjang, unik, dan tidak mudah ditebak." },
          { id: "i-k-3", kind: "true-false", label: "Benar atau salah", prompt: "Satu password yang kuat aman digunakan untuk semua akun.", options: ["Benar", "Salah"], answer: 1, explanation: "Setiap akun sebaiknya memiliki password unik agar kebocoran tidak menyebar." },
        ],
      },
    ],
  },
  {
    slug: "bimbingan-konseling",
    name: "Bimbingan & Konseling",
    shortName: "Bimbingan Konseling",
    summary: "Kenali diri, latih komunikasi, dan buat keputusan yang lebih sehat.",
    icon: "heart",
    accent: "#347fe7",
    soft: "#edf5ff",
    image: images.counseling,
    exercises: [
      {
        slug: "mengenal-potensi",
        title: "Peta kekuatan diriku",
        description: "Temukan pola kekuatan dari pengalaman dan kebiasaan sehari-hari.",
        format: "Refleksi pilihan",
        duration: 4,
        xp: 85,
        questions: [
          { id: "b-p-1", kind: "choice", label: "Refleksi", prompt: "Petunjuk paling kuat bahwa sebuah aktivitas merupakan kekuatanmu adalah...", options: ["Kamu tekun dan terus ingin memperbaikinya", "Aktivitas itu sedang populer", "Temanmu memilihnya", "Aktivitas itu selalu mudah"], answer: 0, explanation: "Kekuatan sering terlihat dari ketekunan, proses belajar, dan pola yang berulang." },
          { id: "b-p-2", kind: "sequence", label: "Susun rencana", prompt: "Susun proses mengembangkan satu kekuatan diri.", items: ["Minta umpan balik", "Pilih kekuatan", "Catat kemajuan", "Buat target kecil"], answer: ["Pilih kekuatan", "Buat target kecil", "Minta umpan balik", "Catat kemajuan"], explanation: "Mulai dari kekuatan yang dipilih, buat target, cari umpan balik, lalu catat kemajuan." },
          { id: "b-p-3", kind: "true-false", label: "Benar atau salah", prompt: "Potensi hanya dapat dilihat dari prestasi besar.", options: ["Benar", "Salah"], answer: 1, explanation: "Potensi juga terlihat dari kebiasaan, minat, dan cara menghadapi tantangan." },
        ],
      },
      {
        slug: "komunikasi-positif",
        title: "Komunikasi tanpa drama",
        description: "Berlatih mendengar, menyampaikan pendapat, dan merespons konflik.",
        format: "Skenario percakapan",
        duration: 5,
        xp: 95,
        questions: [
          { id: "b-k-1", kind: "choice", label: "Skenario", prompt: "Teman satu tim terlambat menyelesaikan tugas. Respons paling asertif adalah...", options: ["Kamu memang selalu merepotkan", "Aku perlu bagianmu hari ini. Ada kendala yang bisa kita selesaikan?", "Diam dan mengerjakan semuanya", "Keluar dari kelompok"], answer: 1, explanation: "Komunikasi asertif menyampaikan kebutuhan dengan jelas tanpa menyerang orang lain." },
          { id: "b-k-2", kind: "choice", label: "Mendengar aktif", prompt: "Saat teman bercerita, tindakan yang menunjukkan kamu mendengarkan adalah...", options: ["Memotong dengan cerita sendiri", "Merangkum kembali inti ceritanya", "Melihat ponsel", "Langsung memberi penilaian"], answer: 1, explanation: "Merangkum membantu memastikan kita memahami pesan dengan benar." },
          { id: "b-k-3", kind: "true-false", label: "Benar atau salah", prompt: "Mengatakan tidak dengan sopan merupakan bagian dari komunikasi asertif.", options: ["Benar", "Salah"], answer: 0, explanation: "Asertif berarti menghargai kebutuhan diri sekaligus tetap menghormati orang lain." },
        ],
      },
    ],
  },
  {
    slug: "keolahragaan",
    name: "Keolahragaan",
    shortName: "Keolahragaan",
    summary: "Gerak aman, kebugaran, pemanasan, dan pengambilan keputusan saat latihan.",
    icon: "sport",
    accent: "#198fda",
    soft: "#e8f7ff",
    image: images.sport,
    exercises: [
      {
        slug: "pemanasan-aman",
        title: "Pemanasan anti cedera",
        description: "Kenali urutan pemanasan dan sinyal tubuh yang perlu diperhatikan.",
        format: "Visual + urutan",
        duration: 5,
        xp: 100,
        questions: [
          { id: "o-p-1", kind: "visual", label: "Amati gambar", prompt: "Tujuan utama pemanasan sebelum olahraga adalah...", image: images.sport, options: ["Membuat tubuh cepat lelah", "Menyiapkan sendi dan suhu tubuh", "Menggantikan latihan utama", "Menghilangkan kebutuhan istirahat"], answer: 1, explanation: "Pemanasan menyiapkan tubuh secara bertahap sebelum aktivitas utama." },
          { id: "o-p-2", kind: "sequence", label: "Susun gerakan", prompt: "Susun pemanasan dari intensitas ringan menuju lebih aktif.", items: ["High knees ringan", "Jalan di tempat", "Rotasi bahu", "Lunge bergantian"], answer: ["Jalan di tempat", "Rotasi bahu", "Lunge bergantian", "High knees ringan"], explanation: "Mulai dari aktivitas ringan, mobilisasi sendi, lalu gerakan yang semakin aktif." },
          { id: "o-p-3", kind: "choice", label: "Keputusan cepat", prompt: "Jika muncul nyeri tajam saat pemanasan, kamu sebaiknya...", options: ["Terus bergerak", "Berhenti dan evaluasi kondisi", "Menambah kecepatan", "Menahan napas"], answer: 1, explanation: "Nyeri tajam merupakan sinyal untuk menghentikan gerakan dan memeriksa kondisi." },
        ],
      },
      {
        slug: "kebugaran-dasar",
        title: "Cek kebugaran dasar",
        description: "Pahami intensitas, pemulihan, dan kebiasaan latihan yang seimbang.",
        format: "Pilihan cepat",
        duration: 4,
        xp: 85,
        questions: [
          { id: "o-k-1", kind: "choice", label: "Pilihan cepat", prompt: "Tanda intensitas latihan sedang yang paling mudah diamati adalah...", options: ["Tidak dapat berbicara sama sekali", "Masih dapat berbicara dalam kalimat pendek", "Tidak berkeringat sama sekali", "Muncul nyeri tajam"], answer: 1, explanation: "Talk test dapat membantu memperkirakan intensitas latihan sedang." },
          { id: "o-k-2", kind: "true-false", label: "Benar atau salah", prompt: "Hari pemulihan membantu tubuh beradaptasi setelah latihan.", options: ["Benar", "Salah"], answer: 0, explanation: "Pemulihan merupakan bagian penting dari program latihan yang sehat." },
          { id: "o-k-3", kind: "choice", label: "Kebiasaan", prompt: "Setelah latihan, pilihan terbaik adalah...", options: ["Berhenti mendadak", "Pendinginan dan minum secukupnya", "Tidak makan seharian", "Langsung latihan berat lagi"], answer: 1, explanation: "Pendinginan dan hidrasi membantu tubuh kembali ke kondisi normal." },
        ],
      },
    ],
  },
  {
    slug: "seni-tari",
    name: "Seni Tari",
    shortName: "Seni Tari",
    summary: "Irama, kualitas gerak, ekspresi, dan evaluasi pertunjukan.",
    icon: "dance",
    accent: "#3e7ce8",
    soft: "#eef3ff",
    image: images.dance,
    exercises: [
      {
        slug: "irama-dan-gerak",
        title: "Tangkap irama, jaga gerak",
        description: "Latih hubungan hitungan, koordinasi, dan perpindahan gerak.",
        format: "Visual + urutan",
        duration: 5,
        xp: 100,
        questions: [
          { id: "t-i-1", kind: "visual", label: "Amati gerak", prompt: "Kualitas yang paling penting agar perpindahan tari terlihat mengalir adalah...", image: images.dance, options: ["Tenaga terputus-putus", "Kesinambungan tenaga dan irama", "Gerakan selalu cepat", "Pandangan selalu ke bawah"], answer: 1, explanation: "Kesinambungan tenaga dan ketepatan irama membuat perpindahan terlihat mengalir." },
          { id: "t-i-2", kind: "sequence", label: "Susun latihan", prompt: "Susun latihan koordinasi dari sederhana menuju lengkap.", items: ["Tambahkan ekspresi", "Latih tangan", "Gabungkan kaki", "Ikuti hitungan"], answer: ["Ikuti hitungan", "Latih tangan", "Gabungkan kaki", "Tambahkan ekspresi"], explanation: "Koordinasi dibangun bertahap sebelum menambahkan ekspresi." },
          { id: "t-i-3", kind: "true-false", label: "Benar atau salah", prompt: "Menghafal urutan saja sudah cukup untuk menghasilkan kualitas gerak yang baik.", options: ["Benar", "Salah"], answer: 1, explanation: "Kualitas gerak juga dipengaruhi tenaga, irama, postur, dan ekspresi." },
        ],
      },
      {
        slug: "evaluasi-penampilan",
        title: "Jadi juri penampilanmu",
        description: "Belajar mengevaluasi rekaman latihan secara objektif dan suportif.",
        format: "Studi kasus",
        duration: 4,
        xp: 90,
        questions: [
          { id: "t-e-1", kind: "choice", label: "Evaluasi", prompt: "Catatan evaluasi yang paling membantu adalah...", options: ["Gerakmu jelek", "Perpindahan pada hitungan 5 perlu lebih stabil", "Ulangi semuanya", "Kurang bagus"], answer: 1, explanation: "Umpan balik yang spesifik lebih mudah digunakan untuk memperbaiki latihan." },
          { id: "t-e-2", kind: "choice", label: "Observasi", prompt: "Saat menonton rekaman, aspek pertama yang dapat diperiksa adalah...", options: ["Jumlah penonton", "Ketepatan gerak terhadap hitungan", "Harga kostum", "Durasi unggahan"], answer: 1, explanation: "Ketepatan terhadap hitungan menjadi dasar sebelum menilai ekspresi dan detail lain." },
          { id: "t-e-3", kind: "true-false", label: "Benar atau salah", prompt: "Merekam latihan dapat membantu melihat detail yang terlewat saat menari.", options: ["Benar", "Salah"], answer: 0, explanation: "Rekaman memberi sudut pandang berbeda untuk mengevaluasi gerak." },
        ],
      },
    ],
  },
  {
    slug: "teknik-elektro",
    name: "Teknik Elektro",
    shortName: "Teknik Elektro",
    summary: "Rangkaian, komponen, pengukuran, dan budaya kerja yang aman.",
    icon: "electric",
    accent: "#126fc5",
    soft: "#e7f3ff",
    image: images.electric,
    exercises: [
      {
        slug: "rangkaian-dasar",
        title: "Misi rangkaian dasar",
        description: "Telusuri jalur arus dan pahami fungsi sakelar serta beban.",
        format: "Visual + logika",
        duration: 5,
        xp: 105,
        questions: [
          { id: "e-r-1", kind: "visual", label: "Amati rangkaian", prompt: "Sebelum memeriksa rangkaian seperti pada gambar, tindakan pertama adalah...", image: images.electric, options: ["Memastikan sumber daya dimatikan", "Menyentuh kabel", "Mengganti komponen bertegangan", "Melepas alat pelindung"], answer: 0, explanation: "Sumber daya harus dimatikan sebelum pemeriksaan dilakukan." },
          { id: "e-r-2", kind: "true-false", label: "Benar atau salah", prompt: "Sakelar terbuka membuat lampu tetap dialiri arus.", options: ["Benar", "Salah"], answer: 1, explanation: "Sakelar terbuka memutus jalur arus sehingga lampu padam." },
          { id: "e-r-3", kind: "sequence", label: "Susun pemeriksaan", prompt: "Susun urutan membaca diagram rangkaian.", items: ["Temukan beban", "Identifikasi sumber", "Periksa jalur kembali", "Ikuti penghantar"], answer: ["Identifikasi sumber", "Ikuti penghantar", "Temukan beban", "Periksa jalur kembali"], explanation: "Mulai dari sumber, ikuti jalur, temukan beban, lalu pastikan jalur kembali." },
        ],
      },
      {
        slug: "keselamatan-listrik",
        title: "Zona aman kelistrikan",
        description: "Pilih tindakan aman sebelum menggunakan alat dan melakukan pengukuran.",
        format: "Skenario keselamatan",
        duration: 4,
        xp: 95,
        questions: [
          { id: "e-k-1", kind: "choice", label: "Skenario", prompt: "Kamu menemukan isolasi kabel terkelupas. Apa tindakan terbaik?", options: ["Gunakan sebentar", "Matikan sumber dan laporkan", "Pegang dengan tangan basah", "Tutup dengan kertas"], answer: 1, explanation: "Peralatan rusak harus dipisahkan dari sumber dan dilaporkan." },
          { id: "e-k-2", kind: "choice", label: "Alat ukur", prompt: "Sebelum mengukur tegangan, pastikan...", options: ["Rentang alat sesuai", "Probe rusak", "Tangan basah", "Sumber tidak diketahui"], answer: 0, explanation: "Kategori dan rentang alat ukur harus sesuai dengan pengukuran." },
          { id: "e-k-3", kind: "true-false", label: "Benar atau salah", prompt: "Area kerja kelistrikan harus kering dan rapi.", options: ["Benar", "Salah"], answer: 0, explanation: "Area kering dan rapi membantu mengurangi risiko tersandung dan sengatan." },
        ],
      },
    ],
  },
  {
    slug: "teknik-otomotif",
    name: "Teknik Otomotif",
    shortName: "Teknik Otomotif",
    summary: "Inspeksi kendaraan, sistem mesin, diagnosis, dan keselamatan bengkel.",
    icon: "auto",
    accent: "#275fbd",
    soft: "#eaf1ff",
    image: images.auto,
    exercises: [
      {
        slug: "inspeksi-harian",
        title: "Inspeksi sebelum melaju",
        description: "Periksa ruang mesin dengan urutan aman dan catat temuan penting.",
        format: "Visual + prosedur",
        duration: 5,
        xp: 105,
        questions: [
          { id: "a-i-1", kind: "visual", label: "Amati gambar", prompt: "Pemeriksaan ruang mesin paling aman dilakukan ketika...", image: images.auto, options: ["Mesin sangat panas", "Mesin dingin dan kendaraan rata", "Kendaraan berjalan", "Rem parkir dilepas"], answer: 1, explanation: "Mesin perlu dingin, kendaraan rata, dan rem parkir aktif." },
          { id: "a-i-2", kind: "sequence", label: "Susun prosedur", prompt: "Susun langkah awal inspeksi kendaraan.", items: ["Buka kap mesin", "Aktifkan rem parkir", "Catat temuan", "Pastikan mesin dingin"], answer: ["Aktifkan rem parkir", "Pastikan mesin dingin", "Buka kap mesin", "Catat temuan"], explanation: "Amankan kendaraan dan pastikan mesin dingin sebelum membuka kap." },
          { id: "a-i-3", kind: "choice", label: "Keputusan cepat", prompt: "Jika ditemukan kebocoran cairan yang tidak diketahui, kamu sebaiknya...", options: ["Tetap gunakan kendaraan", "Laporkan dan identifikasi dengan prosedur aman", "Sentuh cairan", "Bersihkan tanpa APD"], answer: 1, explanation: "Temuan perlu dilaporkan dan diperiksa sesuai prosedur keselamatan." },
        ],
      },
      {
        slug: "pelumasan-mesin",
        title: "Jaga napas mesin",
        description: "Pahami fungsi oli dan cara membaca kondisi pelumasan sederhana.",
        format: "Pilihan + urutan",
        duration: 4,
        xp: 90,
        questions: [
          { id: "a-p-1", kind: "choice", label: "Fungsi komponen", prompt: "Fungsi utama oli mesin adalah...", options: ["Menambah berat kendaraan", "Mengurangi gesekan komponen", "Mendinginkan kabin", "Membersihkan ban"], answer: 1, explanation: "Oli membantu mengurangi gesekan dan melindungi komponen bergerak." },
          { id: "a-p-2", kind: "true-false", label: "Benar atau salah", prompt: "Level oli dapat diperiksa akurat saat kendaraan berada di permukaan miring.", options: ["Benar", "Salah"], answer: 1, explanation: "Kendaraan perlu berada di permukaan rata agar pembacaan lebih akurat." },
          { id: "a-p-3", kind: "sequence", label: "Susun pemeriksaan", prompt: "Susun cara sederhana membaca dipstick oli.", items: ["Baca level", "Tarik dipstick", "Bersihkan", "Pasang lalu tarik kembali"], answer: ["Tarik dipstick", "Bersihkan", "Pasang lalu tarik kembali", "Baca level"], explanation: "Dipstick dibersihkan dan dimasukkan kembali sebelum level dibaca." },
        ],
      },
    ],
  },
];

export function getPracticeDepartment(slug: string) {
  return practiceDepartments.find((department) => department.slug === slug);
}
