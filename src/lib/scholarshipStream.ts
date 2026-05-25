import { BehaviorSubject } from "rxjs"
import { supabase } from "../../database/supabaseClient"

export interface Scholarship {
  id: number
  nama: string
  organizer: string
  deadline: string
  tipe: string
  lokasi: string
  deskripsi: string
  path: string
  tingkat: string
  status?: string       // 'Dibuka' | 'Segera Tutup' | 'Ditutup'
  imageUrl?: string
  created_at?: string   // dipakai untuk hitung timeAgo relatif
}

export const scholarshipStream = new BehaviorSubject<Scholarship[]>([])

// Helper: ambil SEMUA data dari tabel, diurutkan terbaru dulu
async function fetchAll(): Promise<Scholarship[]> {
  const { data, error } = await supabase
    .from("Beasiswa")
    .select("*")
    .order("created_at", { ascending: false })   // terbaru di atas

  if (error) {
    console.error("[scholarshipStream] fetchAll error:", error)
    return []
  }
  return data ?? []
}

export async function initializeScholarshipStream() {
  // 1. Muat data awal → push ke semua subscriber
  const initial = await fetchAll()
  scholarshipStream.next(initial)

  // 2. Dengarkan perubahan realtime dari Supabase
  supabase
    .channel("beasiswa-realtime")
    .on(
      "postgres_changes",
      {
        event: "*",           // INSERT | UPDATE | DELETE
        schema: "public",
        table: "Beasiswa",
      },
      async () => {
        // Setiap ada perubahan apapun → fetch ulang semua → push
        // Ini memastikan urutan, status, dan data selalu konsisten
        const latest = await fetchAll()
        scholarshipStream.next(latest)
      }
    )
    .subscribe()
}