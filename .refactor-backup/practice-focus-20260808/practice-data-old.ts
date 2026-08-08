export type PracticeQuestion =
  | {
      id: string;
      kind: "choice" | "visual" | "true-false";
      eyebrow: string;
      prompt: string;
      options: string[];
      answer: number;
      explanation: string;
      image?: string;
    }
  | {
      id: string;
      kind: "sequence";
      eyebrow: string;
      prompt: string;
      items: string[];
      answer: string[];
      explanation: string;
    };

export interface PracticeSet {
  id: string;
  title: string;
  description: string;
  accent: string;
  soft: string;
  icon: "zap" | "image" | "list";
  duration: number;
  xp: number;
  questions: PracticeQuestion[];
}

const images = {
  code: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
  sport: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1200&q=80",
  electric: "https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?auto=format&fit=crop&w=1200&q=80",
  auto: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1200&q=80",
};

export const practiceSets: PracticeSet[] = [
  {
    id: "sprint-lintas-keahlian",
    title: "Sprint lintas keahlian",
    description: "Soal cepat campuran dengan pilihan teks, visual, urutan, dan benar atau salah.",
    accent: "#6657c7",
    soft: "#f0eefe",
    icon: "zap",
    duration: 6,
    xp: 120,
    questions: [
      {
        id: "sprint-1",
        kind: "choice",
        eyebrow: "Informatika · Pilihan cepat",
        prompt: "Ciri algoritma yang baik adalah...",
        options: ["Memiliki langkah yang jelas dan terurut", "Hanya dipahami pembuatnya", "Selalu menggunakan kode program", "Tidak perlu diuji kembali"],
        answer: 0,
        explanation: "Algoritma perlu jelas, terurut, dan dapat diuji agar orang lain memperoleh hasil yang konsisten.",
      },
      {
        id: "sprint-2",
        kind: "visual",
        eyebrow: "Otomotif · Tebak visual",
        prompt: "Aktivitas pada gambar paling tepat dilakukan ketika...",
        image: images.auto,
        options: ["Mesin sangat panas", "Mesin dingin dan kendaraan di permukaan rata", "Kendaraan sedang berjalan", "Rem parkir dilepas"],
        answer: 1,
        explanation: "Inspeksi ruang mesin lebih aman ketika mesin dingin, kendaraan rata, dan rem parkir aktif.",
      },
      {
        id: "sprint-3",
        kind: "sequence",
        eyebrow: "Keolahragaan · Susun urutan",
        prompt: "Susun pemanasan dari intensitas paling ringan menuju lebih aktif.",
        items: ["High knees ringan", "Jalan di tempat", "Rotasi bahu", "Lunge bergantian"],
        answer: ["Jalan di tempat", "Rotasi bahu", "Lunge bergantian", "High knees ringan"],
        explanation: "Pemanasan dimulai dari aktivitas ringan, mobilisasi sendi, lalu gerakan yang semakin aktif.",
      },
      {
        id: "sprint-4",
        kind: "true-false",
        eyebrow: "Teknik Elektro · Benar atau salah",
        prompt: "Rangkaian dengan sakelar terbuka tetap dapat mengalirkan arus ke lampu.",
        options: ["Benar", "Salah"],
        answer: 1,
        explanation: "Sakelar terbuka memutus jalur arus sehingga lampu tidak menyala.",
      },
    ],
  },
  {
    id: "tebak-visual",
    title: "Tebak dari visual",
    description: "Amati gambar, temukan petunjuk, lalu pilih jawaban yang paling sesuai.",
    accent: "#28758a",
    soft: "#e9f5f7",
    icon: "image",
    duration: 4,
    xp: 90,
    questions: [
      {
        id: "visual-1",
        kind: "visual",
        eyebrow: "Keolahragaan · Observasi",
        prompt: "Tujuan utama aktivitas pada gambar sebelum olahraga adalah...",
        image: images.sport,
        options: ["Membuat tubuh cepat lelah", "Menyiapkan sendi dan suhu tubuh", "Menggantikan latihan utama", "Menghilangkan kebutuhan istirahat"],
        answer: 1,
        explanation: "Pemanasan menyiapkan tubuh secara bertahap sebelum masuk ke aktivitas utama.",
      },
      {
        id: "visual-2",
        kind: "visual",
        eyebrow: "Teknik Elektro · Identifikasi",
        prompt: "Sebelum menyentuh rangkaian seperti pada gambar, tindakan pertama adalah...",
        image: images.electric,
        options: ["Memastikan sumber daya dimatikan", "Menyentuh kabel untuk menguji panas", "Mengganti komponen saat bertegangan", "Melepas alat pelindung"],
        answer: 0,
        explanation: "Sumber daya harus dimatikan dan kondisi alat diperiksa sebelum praktik kelistrikan.",
      },
      {
        id: "visual-3",
        kind: "visual",
        eyebrow: "Informatika · Observasi",
        prompt: "Baris-baris pada gambar merupakan contoh instruksi yang perlu...",
        image: images.code,
        options: ["Dijalankan tanpa pengujian", "Disusun logis dan diperiksa hasilnya", "Dihafalkan tanpa dipahami", "Dibuat sepanjang mungkin"],
        answer: 1,
        explanation: "Instruksi program perlu tersusun logis dan diuji untuk memastikan hasilnya benar.",
      },
    ],
  },
  {
    id: "susun-langkah",
    title: "Susun langkah",
    description: "Bangun jawaban dengan memilih langkah satu per satu dalam urutan yang tepat.",
    accent: "#b76b34",
    soft: "#fbf0e8",
    icon: "list",
    duration: 5,
    xp: 100,
    questions: [
      {
        id: "order-1",
        kind: "sequence",
        eyebrow: "Informatika · Algoritma",
        prompt: "Susun alur sederhana membuat teh hangat.",
        items: ["Tuang air", "Selesai", "Panaskan air", "Siapkan teh"],
        answer: ["Panaskan air", "Siapkan teh", "Tuang air", "Selesai"],
        explanation: "Urutan perlu dimulai dari menyiapkan kebutuhan hingga hasil akhirnya siap.",
      },
      {
        id: "order-2",
        kind: "sequence",
        eyebrow: "Teknik Otomotif · Prosedur",
        prompt: "Susun langkah awal inspeksi kendaraan yang aman.",
        items: ["Buka kap mesin", "Aktifkan rem parkir", "Catat temuan", "Pastikan mesin dingin"],
        answer: ["Aktifkan rem parkir", "Pastikan mesin dingin", "Buka kap mesin", "Catat temuan"],
        explanation: "Amankan kendaraan dan pastikan mesin dingin sebelum membuka kap serta mencatat temuan.",
      },
      {
        id: "order-3",
        kind: "sequence",
        eyebrow: "Bimbingan Konseling · Rencana diri",
        prompt: "Susun proses sederhana mengembangkan satu kekuatan diri.",
        items: ["Minta umpan balik", "Pilih kekuatan", "Catat kemajuan", "Buat target kecil"],
        answer: ["Pilih kekuatan", "Buat target kecil", "Minta umpan balik", "Catat kemajuan"],
        explanation: "Mulai dari kekuatan yang dipilih, ubah menjadi target, cari umpan balik, lalu catat perkembangan.",
      },
    ],
  },
];
