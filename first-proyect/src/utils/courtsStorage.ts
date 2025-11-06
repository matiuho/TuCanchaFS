import type { CanchaProps } from "../interfaces/cancha.interface";
import { mockCanchas } from "../mock-data/canchas.mock";

export const KEY_COURTS = 'tuCancha_courts';

export function readCourts(): CanchaProps[] {
    try {
        const raw = localStorage.getItem(KEY_COURTS);
        if (!raw) return mockCanchas;
        const parsed = JSON.parse(raw);
        const stored: CanchaProps[] = Array.isArray(parsed) ? parsed : mockCanchas;
        // Migración: asegurar campo fotos, mezclar fotos desde mocks y sincronizar portada
        const merged = stored.map((c) => {
            const base = mockCanchas.find(m => m.id === c.id);
            const storedFotos: string[] = Array.isArray(c.fotos) ? c.fotos : [];
            const mockFotos: string[] = Array.isArray(base?.fotos) ? (base?.fotos as string[]) : [];
            const all = [...storedFotos];
            for (const f of mockFotos) if (!all.includes(f)) all.push(f);
            const imagenUrl = (base && base.imagenUrl) ? base.imagenUrl : c.imagenUrl;
            let result: CanchaProps = { ...c, fotos: all, imagenUrl } as CanchaProps;
            // Limpiar URLs que ya no deben estar en ciertas canchas
            const toRemove = 'http://www.costanerasport.cl/images/reservas/05.jpg';
            if (Array.isArray(result.fotos)) {
                if (result.id === 4 || result.id === 2) {
                    result = { ...result, fotos: result.fotos.filter(u => u !== toRemove) };
                }
            }
            return result;
        });
        return merged;
    } catch {
        return mockCanchas;
    }
}

export function writeCourts(courts: CanchaProps[]) {
    localStorage.setItem(KEY_COURTS, JSON.stringify(courts));
}
