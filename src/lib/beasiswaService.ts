import { Subject, from, BehaviorSubject } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';
import { supabase } from '../../database/supabaseClient'; // Pastikan path ke client Supabase-mu sudah benar

// Interface disamakan dengan stuktur asli di page.tsx kamu
export interface Beasiswa {
  id: number;
  nama: string;
  organizer: string;
  deadline: string;
  tipe: string;
  lokasi: string;
  deskripsi: string;
  path: string;
  tingkat: string;
}

// State RxJS untuk menampung data beasiswa hasil fetch
export const scholarships$ = new BehaviorSubject<Beasiswa[]>([]);
export const isBeasiswaLoading$ = new BehaviorSubject<boolean>(false);
export const beasiswaError$ = new BehaviorSubject<string | null>(null);

// Trigger Subject untuk memicu fetch data
const triggerFetch$ = new Subject<void>();

triggerFetch$.pipe(
  // 1. Set status loading menjadi true saat fetch dimulai
  tap(() => isBeasiswaLoading$.next(true)),
  
  // 2. Mengubah Promise Supabase menjadi Observable RxJS
  switchMap(() => 
    from(
      supabase
        .from('beasiswa') // Menggunakan nama tabel huruf kecil sesuai database Supabase kamu
        .select('*')
    )
  ),
  
  // 3. Tangani hasil data yang didapat dari database
  tap(({ data, error }) => {
    isBeasiswaLoading$.next(false);
    if (error) {
      beasiswaError$.next(error.message);
    } else {
      setScholarshipsData(data || []);
      beasiswaError$.next(null);
    }
  }),
  
  // 4. Mencegah stream putus total jika terjadi error network/database fatal
  catchError((err) => {
    isBeasiswaLoading$.next(false);
    beasiswaError$.next('Gagal terhubung ke server database.');
    console.error(err);
    return from([]);
  })
).subscribe();

// Helper untuk memformat data dengan aman agar tidak ada yang bernilai null/undefined
function setScholarshipsData(data: any[]) {
  const formattedData: Beasiswa[] = data.map((item) => ({
    id: item.id,
    nama: item.nama || '',
    organizer: item.organizer || '',
    deadline: item.deadline || '',
    tipe: item.tipe || '',
    lokasi: item.lokasi || '',
    deskripsi: item.deskripsi || '',
    path: item.path || '',
    tingkat: item.tingkat || ''
  }));
  scholarships$.next(formattedData);
}

// Fungsi utama yang dipanggil oleh komponen UI untuk memicu fetch data
export const loadAllScholarships = () => {
  triggerFetch$.next();
};