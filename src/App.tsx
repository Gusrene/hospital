import React, { useState, useEffect, useMemo } from 'react';

// --- ICONOS SVG INCLUIDOS ---
const Icon = ({ path, className }: { path: string, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={path} />
  </svg>
);

const Activity = ({ className }: { className?: string }) => <Icon path="M22 12h-4l-3 9L9 3l-3 9H2" className={className} />;
const AlertTriangle = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);
const Bed = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/>
  </svg>
);
const CheckCircle = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);
const Clock = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const Droplets = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7 2.99 7 2.99s-2.29 6.07-2.29 6.07A4.05 4.05 0 0 0 7 16.3z"/><path d="M14 19.3c1.65 0 3-1.37 3-3.04 0-.87-.43-1.69-1.28-2.39S14 9.3 14 9.3s-1.72 4.56-1.72 4.56c-.85.7-1.28 1.52-1.28 2.39 0 1.67 1.35 3.04 3 3.04z"/>
  </svg>
);
const LayoutDashboard = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/>
  </svg>
);
const Settings = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);
const User = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const Wrench = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
  </svg>
);
const X = ({ className }: { className?: string }) => <Icon path="M18 6L6 18M6 6l12 12" className={className} />;
const ListTodo = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 6h11M9 12h11M9 18h11M5 6v.01M5 12v.01M5 18v.01"/>
  </svg>
);
const CheckSquare = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
  </svg>
);
const Users = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const BarChart = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
);
const Bell = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);
const LogOut = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);
const FileText = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
  </svg>
);
const Lock = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);
const Loader2 = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${className || ''} animate-spin`}>
    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
  </svg>
);
const ChevronDown = ({ className }: { className?: string }) => <Icon path="M6 9l6 6 6-6" className={className} />;
const ChevronRight = ({ className }: { className?: string }) => <Icon path="M9 18l6-6-6-6" className={className} />;
const ChevronLeft = ({ className }: { className?: string }) => <Icon path="M15 18l-6-6 6-6" className={className} />;
const Building = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 22V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v18" /><path d="M4 22h16" /><path d="M10 22v-4a2 2 0 0 1 4 0v4" />
    <path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M12 6h.01" /><path d="M12 10h.01" /><path d="M16 10h.01" /><path d="M8 10h.01" />
    <path d="M8 14h.01" /><path d="M12 14h.01" /><path d="M16 14h.01" />
  </svg>
);
const FilterIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);
const ShieldCheck = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>
  </svg>
);


// --- 1. IMPORTACIONES DE FIREBASE ---
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithCustomToken, signInAnonymously, onAuthStateChanged, User as FirebaseAuthUser } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore';

// --- 2. CONFIGURACIÓN DE FIREBASE ---
const defaultFirebaseConfig = {
  apiKey: "AIzaSyDwvPOgiGz6kI0tTbXDL8wLTEHVXKP_tmE",
  authDomain: "mediroom-eb9ef.firebaseapp.com",
  databaseURL: "https://mediroom-eb9ef-default-rtdb.firebaseio.com",
  projectId: "mediroom-eb9ef",
  storageBucket: "mediroom-eb9ef.firebasestorage.app",
  messagingSenderId: "313648219875",
  appId: "1:313648219875:web:ad87f0fcc6c714844227d6"
};

const w = typeof window !== 'undefined' ? (window as any) : {} as any;

const getFirebaseConfig = () => {
  if (w && w.__firebase_config) {
    if (typeof w.__firebase_config === 'object') return w.__firebase_config;
    try { return JSON.parse(w.__firebase_config); } catch (e) { console.error("Error __firebase_config:", e); }
  }
  return defaultFirebaseConfig;
};

const getSafeAppId = () => {
  const rawAppId = (w && w.__app_id) || 'hospital-manager-app';
  if (typeof rawAppId === 'string') return rawAppId.split('_src')[0].split('/')[0];
  return 'hospital-manager-app';
};

const firebaseConfig = getFirebaseConfig();
const safeAppId = getSafeAppId();

let app: any = null, auth: any = null, db: any = null;
let firebaseError = false;

try {
  if (!firebaseConfig || !firebaseConfig.apiKey || firebaseConfig.apiKey === "TU_API_KEY") throw new Error("Por favor, configura Firebase.");
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} catch (err) {
  console.error("No se pudo iniciar Firebase:", err);
  firebaseError = true;
}

const getColRef = (colName: string) => {
  if (!db) return null;
  return collection(db, 'artifacts', safeAppId, 'public', 'data', colName);
};

const getDocRef = (colName: string, docId: string) => {
  if (!db) return null;
  return doc(db, 'artifacts', safeAppId, 'public', 'data', colName, docId.toString());
};

// --- 3. INTERFACES TYPESCRIPT ---
interface AppUser {
  id: string;
  name: string;
  username: string;
  password?: string;
  dept: string;
  role: 'admin' | 'staff';
  currentStatus?: string;
}

interface Room {
  id: string;
  name: string;
  area: string;
  clinic: string;
  status: string;
}

interface Task {
  id: string;
  roomId: string;
  dept: string;
  description: string;
  status: 'Pendiente' | 'Completada';
  createdAt: number;
  completedAt?: number;
  assignedTo: string | null;
}

interface ChecklistItem {
  id: string;
  category: string;
  question: string;
  dept: string;
}

interface Notification {
  id: string;
  userId: string;
  message: string;
  read: boolean;
  createdAt: number;
}

interface AppSettings {
  appName: string;
  logoUrl: string;
  clinics: string[];
  breakTypes: { id: string, name: string, duration: number }[];
}

interface UserLog {
  id: string;
  userId: string;
  action: string; 
  timestamp: number;
}

// NUEVA INTERFAZ PARA AUDITORÍA DEL SISTEMA
interface SystemLog {
  id: string;
  userId: string;
  actionCategory: string;
  details: string;
  timestamp: number;
}

// --- 4. CONSTANTES Y CONFIGURACIONES ---
const DEPARTMENTS = {
  ADMIN: 'Administración',
  LIMPIEZA: 'Limpieza',
  MANTENIMIENTO: 'Mantenimiento',
  ENFERMERIA: 'Enfermería'
};

const ROOM_STATUS = {
  DISPONIBLE: 'Disponible',
  OCUPADA: 'Ocupada',
  EVALUACION: 'Pendiente de Evaluación',
  MANTENIMIENTO: 'En Mantenimiento / Limpieza'
};

const AREAS = ['Pediatría', 'Medicina', 'Cirugía', 'Intensivo', 'Maternidad', 'General'];

const INITIAL_SETTINGS: AppSettings = {
  appName: 'MediRoom Control',
  logoUrl: '',
  clinics: ['Sede Central', 'Clínica Norte'],
  breakTypes: [
    { id: 'b1', name: 'Almuerzo', duration: 60 },
    { id: 'b2', name: 'Descanso / Pausa', duration: 15 }
  ]
};

const INITIAL_SLAS: Record<string, number> = { [DEPARTMENTS.LIMPIEZA]: 30, [DEPARTMENTS.MANTENIMIENTO]: 120, [DEPARTMENTS.ENFERMERIA]: 15, [DEPARTMENTS.ADMIN]: 60 };

const INITIAL_CHECKLIST: ChecklistItem[] = [
  { id: 'p1', category: 'Paredes', question: 'Sin suciedad', dept: DEPARTMENTS.LIMPIEZA },
  { id: 'p2', category: 'Paredes', question: 'Pintura en buen estado', dept: DEPARTMENTS.MANTENIMIENTO },
  { id: 'p3', category: 'Paredes', question: 'Sin grietas', dept: DEPARTMENTS.MANTENIMIENTO },
  { id: 'p4', category: 'Paredes', question: 'Sin humedad', dept: DEPARTMENTS.MANTENIMIENTO },
  { id: 'pu1', category: 'Puertas', question: 'Sin daños', dept: DEPARTMENTS.MANTENIMIENTO },
  { id: 'pu2', category: 'Puertas', question: 'Limpias', dept: DEPARTMENTS.LIMPIEZA },
  { id: 'pu3', category: 'Puertas', question: 'Sin desgaste excesivo', dept: DEPARTMENTS.MANTENIMIENTO },
  { id: 'z1', category: 'Zócalos y Scrach', question: 'Limpios', dept: DEPARTMENTS.LIMPIEZA },
  { id: 'z2', category: 'Zócalos y Scrach', question: 'Sin rajaduras', dept: DEPARTMENTS.MANTENIMIENTO },
  { id: 'z3', category: 'Zócalos y Scrach', question: 'Pintura en buen estado', dept: DEPARTMENTS.MANTENIMIENTO },
  { id: 'e1', category: 'Sistema Eléctrico', question: 'Luces funcionando', dept: DEPARTMENTS.MANTENIMIENTO },
  { id: 'e2', category: 'Sistema Eléctrico', question: 'Tomacorrientes funcionando', dept: DEPARTMENTS.MANTENIMIENTO },
  { id: 'e3', category: 'Sistema Eléctrico', question: 'Switches funcionando', dept: DEPARTMENTS.MANTENIMIENTO },
  { id: 'e4', category: 'Sistema Eléctrico', question: 'Pera de llamado funcionando', dept: DEPARTMENTS.ENFERMERIA },
  { id: 'pi1', category: 'Piso Habitación y Baño', question: 'Sin manchas', dept: DEPARTMENTS.LIMPIEZA },
  { id: 'pi2', category: 'Piso Habitación y Baño', question: 'Sin rayones', dept: DEPARTMENTS.MANTENIMIENTO },
  { id: 'pi3', category: 'Piso Habitación y Baño', question: 'Limpio', dept: DEPARTMENTS.LIMPIEZA },
  { id: 'pi4', category: 'Piso Habitación y Baño', question: 'Sin cerámicas quebradas', dept: DEPARTMENTS.MANTENIMIENTO },
  { id: 'pi5', category: 'Piso Habitación y Baño', question: 'Sin humedad', dept: DEPARTMENTS.MANTENIMIENTO },
  { id: 'v1', category: 'Vidrios / Cedazos', question: 'Limpios', dept: DEPARTMENTS.LIMPIEZA },
  { id: 'v2', category: 'Vidrios / Cedazos', question: 'Sin daños', dept: DEPARTMENTS.MANTENIMIENTO },
  { id: 'v3', category: 'Vidrios / Cedazos', question: 'Sin rajaduras', dept: DEPARTMENTS.MANTENIMIENTO },
  { id: 's1', category: 'Sillones y Sillas', question: 'Limpias', dept: DEPARTMENTS.LIMPIEZA },
  { id: 's2', category: 'Sillones y Sillas', question: 'Sin manchas', dept: DEPARTMENTS.LIMPIEZA },
  { id: 's3', category: 'Sillones y Sillas', question: 'Tapicería en buen estado', dept: DEPARTMENTS.MANTENIMIENTO },
  { id: 's4', category: 'Sillones y Sillas', question: 'Madera en buen estado', dept: DEPARTMENTS.MANTENIMIENTO },
  { id: 'c1', category: 'Cuadro', question: 'Está limpio', dept: DEPARTMENTS.LIMPIEZA },
  { id: 'c2', category: 'Cuadro', question: 'Está alineado', dept: DEPARTMENTS.LIMPIEZA },
  { id: 't1', category: 'Teléfono', question: 'Limpieza general', dept: DEPARTMENTS.LIMPIEZA },
  { id: 't2', category: 'Teléfono', question: 'Estructura limpia', dept: DEPARTMENTS.LIMPIEZA },
  { id: 't3', category: 'Teléfono', question: 'Base en buen estado', dept: DEPARTMENTS.MANTENIMIENTO },
  { id: 'tv1', category: 'Televisores y Controles', question: 'Funciona', dept: DEPARTMENTS.MANTENIMIENTO },
  { id: 'tv2', category: 'Televisores y Controles', question: 'Tiene control remoto', dept: DEPARTMENTS.ENFERMERIA },
  { id: 'tv3', category: 'Televisores y Controles', question: 'Acceso a cable', dept: DEPARTMENTS.MANTENIMIENTO },
  { id: 'b1', category: 'Limpieza de Baño', question: 'Grifería limpia y sin sarro', dept: DEPARTMENTS.LIMPIEZA },
  { id: 'b2', category: 'Limpieza de Baño', question: 'Espejo limpio', dept: DEPARTMENTS.LIMPIEZA },
  { id: 'b3', category: 'Limpieza de Baño', question: 'Cortina limpia', dept: DEPARTMENTS.LIMPIEZA },
  { id: 'b4', category: 'Limpieza de Baño', question: 'Antiresbalante en buen estado', dept: DEPARTMENTS.LIMPIEZA },
  { id: 'b5', category: 'Limpieza de Baño', question: 'Sin fugas de agua', dept: DEPARTMENTS.MANTENIMIENTO },
  { id: 'b6', category: 'Limpieza de Baño', question: 'Limpieza general de blancos', dept: DEPARTMENTS.LIMPIEZA },
  { id: 'in1', category: 'Insumos de Baño', question: 'Hay Papel Higiénico', dept: DEPARTMENTS.LIMPIEZA },
  { id: 'in2', category: 'Insumos de Baño', question: 'Hay Servilletas de mano', dept: DEPARTMENTS.LIMPIEZA },
  { id: 'in3', category: 'Insumos de Baño', question: 'Hay Jabón', dept: DEPARTMENTS.LIMPIEZA },
  { id: 'in4', category: 'Insumos de Baño', question: 'Hay Serchas', dept: DEPARTMENTS.LIMPIEZA },
  { id: 'in5', category: 'Insumos de Baño', question: 'Hay Ambientador', dept: DEPARTMENTS.LIMPIEZA },
  { id: 'bio1', category: 'Bolsa de Bioseguridad', question: 'Bolsa Roja colocada', dept: DEPARTMENTS.LIMPIEZA },
  { id: 'bio2', category: 'Bolsa de Bioseguridad', question: 'Bolsa Negra colocada', dept: DEPARTMENTS.LIMPIEZA },
  { id: 'bio3', category: 'Bolsa de Bioseguridad', question: 'Basureros en buen estado', dept: DEPARTMENTS.MANTENIMIENTO },
  { id: 'a1', category: 'Aire Acondicionado', question: 'Limpieza de rejillas/equipo', dept: DEPARTMENTS.LIMPIEZA },
  { id: 'a2', category: 'Aire Acondicionado', question: 'Funciona', dept: DEPARTMENTS.MANTENIMIENTO },
  { id: 'a3', category: 'Aire Acondicionado', question: 'Cuenta con control remoto', dept: DEPARTMENTS.ENFERMERIA },
  { id: 'm1', category: 'Muebles', question: 'Limpios', dept: DEPARTMENTS.LIMPIEZA },
  { id: 'm2', category: 'Muebles', question: 'Pintura/Barniz sin falta de retoque', dept: DEPARTMENTS.MANTENIMIENTO },
  { id: 'm3', category: 'Muebles', question: 'Sin daños estructurales', dept: DEPARTMENTS.MANTENIMIENTO },
  { id: 'caj1', category: 'Cajilla de Seguridad', question: 'Funciona correctamente', dept: DEPARTMENTS.MANTENIMIENTO },
];

const INITIAL_ROOMS: Room[] = [
  { id: '101', name: 'Habitación 101', area: 'Pediatría', clinic: 'Sede Central', status: ROOM_STATUS.OCUPADA },
  { id: '102', name: 'Habitación 102', area: 'Medicina', clinic: 'Sede Central', status: ROOM_STATUS.DISPONIBLE },
  { id: '103', name: 'Habitación 103', area: 'Cirugía', clinic: 'Sede Central', status: ROOM_STATUS.EVALUACION },
  { id: '201', name: 'Habitación 201', area: 'Intensivo', clinic: 'Clínica Norte', status: ROOM_STATUS.MANTENIMIENTO },
];

const INITIAL_USERS: AppUser[] = [
  { id: 'admin1', name: 'Supervisor (Admin)', username: 'admin', password: '123', dept: DEPARTMENTS.ADMIN, role: 'admin', currentStatus: 'Desconectado' },
  { id: 'u1', name: 'Carlos (Limpieza)', username: 'carlos', password: '123', dept: DEPARTMENTS.LIMPIEZA, role: 'staff', currentStatus: 'Desconectado' },
  { id: 'u2', name: 'Ana (Enfermería)', username: 'ana', password: '123', dept: DEPARTMENTS.ENFERMERIA, role: 'staff', currentStatus: 'Desconectado' },
  { id: 'u3', name: 'Luis (Mantenimiento)', username: 'luis', password: '123', dept: DEPARTMENTS.MANTENIMIENTO, role: 'staff', currentStatus: 'Desconectado' },
];

// --- 5. COMPONENTES EXTRAÍDOS ---

const getMinutesDifference = (start: number, end: number) => {
  if (!start || !end) return 0;
  return Math.round((end - start) / 60000);
};

const formatTime = (timestamp: number) => {
  if (!timestamp) return '-';
  return new Intl.DateTimeFormat('es-ES', { hour: '2-digit', minute: '2-digit' }).format(new Date(timestamp));
};

const DashboardTab = ({ 
  rooms, tasks, currentUser, onSelectRoom, onOpenChecklist 
}: { 
  rooms: Room[], tasks: Task[], currentUser: AppUser, onSelectRoom: (r: Room) => void, onOpenChecklist: () => void 
}) => {
  const [filterClinic, setFilterClinic] = useState('Todas');
  
  const clinicsList = useMemo(() => Array.from(new Set(rooms.map(r => r.clinic || 'Sede Central'))), [rooms]);
  const filteredRooms = useMemo(() => filterClinic === 'Todas' ? rooms : rooms.filter(r => r.clinic === filterClinic), [rooms, filterClinic]);

  const stats = useMemo(() => ({
    total: filteredRooms.length,
    ocupadas: filteredRooms.filter(r => r.status === ROOM_STATUS.OCUPADA).length,
    disponibles: filteredRooms.filter(r => r.status === ROOM_STATUS.DISPONIBLE).length,
    evaluacion: filteredRooms.filter(r => r.status === ROOM_STATUS.EVALUACION).length,
    mantenimiento: filteredRooms.filter(r => r.status === ROOM_STATUS.MANTENIMIENTO).length,
  }), [filteredRooms]);

  const getStatusColor = (status: string) => {
    switch(status) {
      case ROOM_STATUS.DISPONIBLE: return 'bg-emerald-100 border-emerald-500 text-emerald-800';
      case ROOM_STATUS.OCUPADA: return 'bg-rose-100 border-rose-500 text-rose-800';
      case ROOM_STATUS.EVALUACION: return 'bg-amber-100 border-amber-500 text-amber-800';
      case ROOM_STATUS.MANTENIMIENTO: return 'bg-blue-100 border-blue-500 text-blue-800';
      default: return 'bg-gray-100 border-gray-500 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case ROOM_STATUS.DISPONIBLE: return <CheckCircle className="w-6 h-6 text-emerald-600" />;
      case ROOM_STATUS.OCUPADA: return <User className="w-6 h-6 text-rose-600" />;
      case ROOM_STATUS.EVALUACION: return <CheckSquare className="w-6 h-6 text-amber-600" />;
      case ROOM_STATUS.MANTENIMIENTO: return <Wrench className="w-6 h-6 text-blue-600" />;
      default: return <Bed className="w-6 h-6 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <LayoutDashboard className="w-6 h-6 mr-2 text-indigo-600"/> Tablero General
        </h2>
        <div className="flex items-center space-x-2">
          <Building className="w-5 h-5 text-gray-500" />
          <select value={filterClinic} onChange={e => setFilterClinic(e.target.value)} className="border border-gray-300 rounded-lg p-2 text-sm bg-white font-medium text-gray-700 outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="Todas">Todas las Clínicas</option>
            {clinicsList.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 font-medium">Total Habitaciones</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">{stats.total}</p>
        </div>
        <div className="bg-emerald-50 p-4 rounded-xl shadow-sm border border-emerald-100">
          <p className="text-sm text-emerald-600 font-medium">Disponibles</p>
          <p className="text-3xl font-bold text-emerald-700 mt-1">{stats.disponibles}</p>
        </div>
        <div className="bg-rose-50 p-4 rounded-xl shadow-sm border border-rose-100">
          <p className="text-sm text-rose-600 font-medium">Ocupadas</p>
          <p className="text-3xl font-bold text-rose-700 mt-1">{stats.ocupadas}</p>
        </div>
        <div className="bg-amber-50 p-4 rounded-xl shadow-sm border border-amber-100">
          <p className="text-sm text-amber-600 font-medium">Por Evaluar</p>
          <p className="text-3xl font-bold text-amber-700 mt-1">{stats.evaluacion}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-xl shadow-sm border border-blue-100">
          <p className="text-sm text-blue-600 font-medium">En Tareas</p>
          <p className="text-3xl font-bold text-blue-700 mt-1">{stats.mantenimiento}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {filteredRooms.map(room => (
          <div 
            key={room.id} 
            onClick={() => onSelectRoom(room)}
            className={`p-5 rounded-xl border-l-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow bg-white ${getStatusColor(room.status).replace('bg-', 'border-').split(' ')[1]}`}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-lg text-gray-800">{room.name}</h3>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">{room.clinic}</span>
                <span className="text-xs text-indigo-500 font-medium">{room.area}</span>
              </div>
              {getStatusIcon(room.status)}
            </div>
            
            <div className="space-y-2 mt-4">
              <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(room.status)}`}>
                {room.status}
              </span>
              
              {room.status === ROOM_STATUS.MANTENIMIENTO && (
                <p className="text-sm font-medium text-blue-600 mt-2">
                  {tasks.filter(t => t.roomId === room.id && t.status !== 'Completada').length} tareas pendientes
                </p>
              )}

              {room.status === ROOM_STATUS.EVALUACION && currentUser?.role === 'admin' && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectRoom(room);
                    onOpenChecklist();
                  }}
                  className="mt-3 w-full bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold py-2 rounded-lg shadow-sm transition-colors flex justify-center items-center"
                >
                  <CheckSquare className="w-4 h-4 mr-2"/> Llenar Checklist
                </button>
              )}
            </div>
          </div>
        ))}
        {filteredRooms.length === 0 && <p className="text-gray-500 col-span-full">No hay habitaciones registradas en esta clínica.</p>}
      </div>
    </div>
  );
};

const TaskColumn = ({ 
  deptName, icon, colorClass, tasks, users, currentUser, slas, onAssign, onComplete 
}: { 
  deptName: string, icon: React.ReactNode, colorClass: string, tasks: Task[], users: AppUser[], currentUser: AppUser, slas: Record<string, number>, onAssign: (id: string, uid: string) => void, onComplete: (id: string) => void 
}) => {
  const pendingTasks = tasks.filter(t => t.status !== 'Completada');
  const deptTasks = pendingTasks.filter(t => t.dept === deptName);
  
  if (currentUser?.role === 'staff' && currentUser?.dept !== deptName && currentUser?.dept !== DEPARTMENTS.ADMIN) return null;

  return (
    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex-1 min-w-[300px]">
      <div className="flex items-center space-x-2 mb-4 border-b pb-2">
        <span className={colorClass}>{icon}</span>
        <h3 className="font-bold text-gray-700">{deptName}</h3>
        <span className="bg-gray-200 text-gray-700 py-0.5 px-2 rounded-full text-xs font-bold">
          {deptTasks.length}
        </span>
      </div>
      
      <div className="space-y-3">
        {deptTasks.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">Sin tareas pendientes</p>
        ) : (
          deptTasks.map(task => {
            const slaMinutes = slas[task.dept] || 0;
            const isMine = task.assignedTo === currentUser?.id;
            const isUrgent = task.description.includes('URGENTE:');

            return (
              <div key={task.id} className={`p-4 rounded-lg shadow-sm border ${isUrgent ? 'bg-rose-50 border-rose-200' : isMine ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-gray-100'}`}>
                <div className="flex justify-between items-start mb-2">
                  <span className={`font-bold text-sm ${isUrgent ? 'text-rose-600' : 'text-blue-600'}`}>Hab. {task.roomId}</span>
                  <span className="flex items-center text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-md">
                    <Clock className="w-3 h-3 mr-1" /> SLA: {slaMinutes}m
                  </span>
                </div>
                <p className={`text-sm mb-4 ${isUrgent ? 'font-bold text-rose-800' : 'text-gray-700'}`}>{task.description}</p>
                
                <div className="mb-4">
                  {currentUser?.role === 'admin' ? (
                    <select 
                      value={task.assignedTo || ''}
                      onChange={(e) => onAssign(task.id, e.target.value)}
                      className={`w-full text-sm border rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none ${task.assignedTo ? 'bg-white border-indigo-200 text-indigo-700 font-medium' : 'border-gray-300 bg-gray-50 text-gray-500'}`}
                    >
                      <option value="">Sin responsable asignado</option>
                      {users.filter(u => u.dept === task.dept || u.role === 'admin').map(u => (
                        <option key={u.id} value={u.id}>{u.name}</option>
                      ))}
                    </select>
                  ) : (
                    <p className="text-sm font-medium text-indigo-700 bg-white p-2 rounded border border-indigo-100">
                      Responsable: {users.find(u => u.id === task.assignedTo)?.name || 'Sin asignar'}
                    </p>
                  )}
                </div>

                {(isMine || currentUser?.role === 'admin') && (
                  <button 
                    onClick={() => onComplete(task.id)}
                    className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-sm font-semibold py-2 rounded-lg transition-colors flex items-center justify-center"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" /> Marcar Completada
                  </button>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  );
};

const TasksTab = ({ tasks, rooms, users, currentUser, slas, onAssign, onComplete }: any) => {
  const [filterClinic, setFilterClinic] = useState('Todas');
  const [filterUser, setFilterUser] = useState('Todos');
  const [searchRoom, setSearchRoom] = useState('');

  const clinicsList = useMemo(() => Array.from(new Set(rooms.map((r: any) => r.clinic || 'Sede Central'))), [rooms]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task: Task) => {
      const room = rooms.find((r: Room) => r.id === task.roomId);
      const matchesClinic = filterClinic === 'Todas' || (room && room.clinic === filterClinic);
      const matchesUser = filterUser === 'Todos' || task.assignedTo === filterUser || (filterUser === 'unassigned' && !task.assignedTo);
      const matchesRoom = !searchRoom.trim() || task.roomId.toLowerCase().includes(searchRoom.toLowerCase().trim());
      
      return matchesClinic && matchesUser && matchesRoom;
    });
  }, [tasks, rooms, filterClinic, filterUser, searchRoom]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <ListTodo className="w-6 h-6 mr-2 text-indigo-600"/> Tareas Activas y SLAs
        </h2>
        
        <div className="flex flex-wrap items-center gap-3 bg-white p-2.5 rounded-xl border border-gray-200 shadow-sm text-sm">
          <div className="flex items-center space-x-1">
            <FilterIcon className="w-4 h-4 text-gray-400" />
            <span className="text-xs font-bold text-gray-500 uppercase">Filtros:</span>
          </div>
          <select value={filterClinic} onChange={e => setFilterClinic(e.target.value)} className="border-gray-200 border rounded-lg p-1.5 bg-gray-50 text-gray-700 outline-none font-medium focus:ring-1 focus:ring-indigo-500">
            <option value="Todas">Todas las Clínicas</option>
            {clinicsList.map((c: any) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={filterUser} onChange={e => setFilterUser(e.target.value)} className="border-gray-200 border rounded-lg p-1.5 bg-gray-50 text-gray-700 outline-none font-medium focus:ring-1 focus:ring-indigo-500">
            <option value="Todos">Todos los Responsables</option>
            <option value="unassigned">Sin Asignar</option>
            {users.map((u: any) => <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
          <input type="text" placeholder="Habitación (ej. 101)" value={searchRoom} onChange={e => setSearchRoom(e.target.value)} className="border-gray-200 border rounded-lg p-1.5 bg-gray-50 text-gray-700 outline-none placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 w-36" />
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6 overflow-x-auto pb-4">
        {currentUser?.role === 'admin' && (
          <TaskColumn deptName={DEPARTMENTS.ADMIN} icon={<AlertTriangle className="w-5 h-5"/>} colorClass="text-rose-500" tasks={filteredTasks} users={users} currentUser={currentUser} slas={slas} onAssign={onAssign} onComplete={onComplete} />
        )}
        <TaskColumn deptName={DEPARTMENTS.LIMPIEZA} icon={<Droplets className="w-5 h-5"/>} colorClass="text-blue-500" tasks={filteredTasks} users={users} currentUser={currentUser} slas={slas} onAssign={onAssign} onComplete={onComplete} />
        <TaskColumn deptName={DEPARTMENTS.MANTENIMIENTO} icon={<Wrench className="w-5 h-5"/>} colorClass="text-amber-500" tasks={filteredTasks} users={users} currentUser={currentUser} slas={slas} onAssign={onAssign} onComplete={onComplete} />
        <TaskColumn deptName={DEPARTMENTS.ENFERMERIA} icon={<Activity className="w-5 h-5"/>} colorClass="text-indigo-500" tasks={filteredTasks} users={users} currentUser={currentUser} slas={slas} onAssign={onAssign} onComplete={onComplete} />
      </div>
    </div>
  );
};

const ReportsTab = ({ tasks, rooms, users, slas, userLogs, systemLogs }: { tasks: Task[], rooms: Room[], users: AppUser[], slas: Record<string, number>, userLogs: UserLog[], systemLogs: SystemLog[] }) => {
  const [reportView, setReportView] = useState<'tareas' | 'asistencia' | 'sistema'>('tareas');
  
  // FILTROS DE TAREAS
  const [taskClinic, setTaskClinic] = useState('Todas');
  const [taskDept, setTaskDept] = useState('Todos');
  const [taskUser, setTaskUser] = useState('Todos');
  const [taskSlaFilter, setTaskSlaFilter] = useState('Todos'); 
  const [taskMonth, setTaskMonth] = useState('Todos');
  const [taskStartDate, setTaskStartDate] = useState('');
  const [taskEndDate, setTaskEndDate] = useState('');

  // FILTROS DE ASISTENCIA
  const [asistenciaUser, setAsistenciaUser] = useState('Todos');
  const [asistenciaAction, setAsistenciaAction] = useState('Todos');
  const [asistenciaMonth, setAsistenciaMonth] = useState('Todos');
  const [asistenciaStartDate, setAsistenciaStartDate] = useState('');
  const [asistenciaEndDate, setAsistenciaEndDate] = useState('');

  // FILTROS DE AUDITORÍA DE SISTEMA
  const [sysLogUser, setSysLogUser] = useState('Todos');
  const [sysLogCategory, setSysLogCategory] = useState('Todas');
  const [sysMonth, setSysMonth] = useState('Todos');
  const [sysStartDate, setSysStartDate] = useState('');
  const [sysEndDate, setSysEndDate] = useState('');

  const monthsList = [
    { val: '0', label: 'Enero' }, { val: '1', label: 'Febrero' }, { val: '2', label: 'Marzo' }, { val: '3', label: 'Abril' },
    { val: '4', label: 'Mayo' }, { val: '5', label: 'Junio' }, { val: '6', label: 'Julio' }, { val: '7', label: 'Agosto' },
    { val: '8', label: 'Septiembre' }, { val: '9', label: 'Octubre' }, { val: '10', label: 'Noviembre' }, { val: '11', label: 'Diciembre' },
  ];

  const clinicsList = useMemo(() => Array.from(new Set(rooms.map(r => r.clinic || 'Sede Central'))), [rooms]);

  const rawReportData = useMemo(() => {
    return tasks.map(task => {
      const isCompleted = task.status === 'Completada';
      const timeTaken = isCompleted && task.completedAt ? getMinutesDifference(task.createdAt, task.completedAt) : null;
      const sla = slas[task.dept] || 0;
      const cumplioSla = isCompleted && timeTaken !== null && timeTaken <= sla;
      return { ...task, timeTaken, sla, cumplioSla };
    });
  }, [tasks, slas]);

  const filteredReportData = useMemo(() => {
    return rawReportData.filter(row => {
      const room = rooms.find(r => r.id === row.roomId);
      const matchesClinic = taskClinic === 'Todas' || (room && room.clinic === taskClinic);
      const matchesDept = taskDept === 'Todos' || row.dept === taskDept;
      const matchesUser = taskUser === 'Todos' || row.assignedTo === taskUser;
      
      let matchesSla = true;
      if (taskSlaFilter === 'Cumplio') matchesSla = row.status === 'Completada' && row.cumplioSla === true;
      else if (taskSlaFilter === 'Fallo') matchesSla = row.status === 'Completada' && row.cumplioSla === false;
      else if (taskSlaFilter === 'Pendiente') matchesSla = row.status === 'Pendiente';

      const taskDate = new Date(row.createdAt);
      const matchesMonth = taskMonth === 'Todos' || taskDate.getMonth().toString() === taskMonth;

      let matchesRange = true;
      if (taskStartDate) {
        const start = new Date(taskStartDate + 'T00:00:00').getTime();
        if (row.createdAt < start) matchesRange = false;
      }
      if (taskEndDate) {
        const end = new Date(taskEndDate + 'T23:59:59').getTime();
        if (row.createdAt > end) matchesRange = false;
      }

      return matchesClinic && matchesDept && matchesUser && matchesSla && matchesMonth && matchesRange;
    });
  }, [rawReportData, rooms, taskClinic, taskDept, taskUser, taskSlaFilter, taskMonth, taskStartDate, taskEndDate]);

  const taskKPIs = useMemo(() => {
    let creadas = filteredReportData.length;
    let completadas = filteredReportData.filter(r => r.status === 'Completada').length;
    let dentroSla = filteredReportData.filter(r => r.status === 'Completada' && r.cumplioSla === true).length;
    let fueraSla = filteredReportData.filter(r => r.status === 'Completada' && r.cumplioSla === false).length;
    const porcenSla = completadas > 0 ? Math.round((dentroSla / completadas) * 100) : 0;
    return { creadas, completadas, porcenSla, fueraSla };
  }, [filteredReportData]);

  const filteredUserLogs = useMemo(() => {
    return userLogs.filter(log => {
      const matchesUser = asistenciaUser === 'Todos' || log.userId === asistenciaUser;
      const matchesAction = asistenciaAction === 'Todos' || log.action === asistenciaAction;

      const logDate = new Date(log.timestamp);
      const matchesMonth = asistenciaMonth === 'Todos' || logDate.getMonth().toString() === asistenciaMonth;

      let matchesRange = true;
      if (asistenciaStartDate) {
        const start = new Date(asistenciaStartDate + 'T00:00:00').getTime();
        if (log.timestamp < start) matchesRange = false;
      }
      if (asistenciaEndDate) {
        const end = new Date(asistenciaEndDate + 'T23:59:59').getTime();
        if (log.timestamp > end) matchesRange = false;
      }

      return matchesUser && matchesAction && matchesMonth && matchesRange;
    });
  }, [userLogs, asistenciaUser, asistenciaAction, asistenciaMonth, asistenciaStartDate, asistenciaEndDate]);

  const attendanceStats = useMemo(() => {
    const totalRegistered = users.length;
    const activos = users.filter(u => u.currentStatus && u.currentStatus !== 'Desconectado').length;
    const disponibles = users.filter(u => u.currentStatus === 'Disponible').length;
    const descansos = users.filter(u => u.currentStatus && u.currentStatus !== 'Disponible' && u.currentStatus !== 'Desconectado').length;
    const offline = users.filter(u => !u.currentStatus || u.currentStatus === 'Desconectado').length;

    return { totalRegistered, activos, disponibles, descansos, offline };
  }, [users]);

  const uniqueLogActions = useMemo(() => Array.from(new Set(userLogs.map(l => l.action))), [userLogs]);

  // Auditoría del Sistema Filtrado
  const filteredSystemLogs = useMemo(() => {
    return systemLogs.filter(log => {
      const matchesUser = sysLogUser === 'Todos' || log.userId === sysLogUser;
      const matchesCategory = sysLogCategory === 'Todas' || log.actionCategory === sysLogCategory;
      
      const logDate = new Date(log.timestamp);
      const matchesMonth = sysMonth === 'Todos' || logDate.getMonth().toString() === sysMonth;

      let matchesRange = true;
      if (sysStartDate) {
        const start = new Date(sysStartDate + 'T00:00:00').getTime();
        if (log.timestamp < start) matchesRange = false;
      }
      if (sysEndDate) {
        const end = new Date(sysEndDate + 'T23:59:59').getTime();
        if (log.timestamp > end) matchesRange = false;
      }

      return matchesUser && matchesCategory && matchesMonth && matchesRange;
    });
  }, [systemLogs, sysLogUser, sysLogCategory, sysMonth, sysStartDate, sysEndDate]);

  const uniqueSystemCategories = useMemo(() => Array.from(new Set(systemLogs.map(l => l.actionCategory))), [systemLogs]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <BarChart className="w-6 h-6 mr-2 text-indigo-600"/> Módulo de Reportes y Bitácoras
        </h2>
        <div className="flex bg-gray-200 p-1 rounded-xl">
          <button onClick={() => setReportView('tareas')} className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${reportView === 'tareas' ? 'bg-white text-indigo-700 shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}>Productividad</button>
          <button onClick={() => setReportView('asistencia')} className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${reportView === 'asistencia' ? 'bg-white text-indigo-700 shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}>Asistencia</button>
          <button onClick={() => setReportView('sistema')} className={`px-4 py-2 text-sm font-bold flex items-center rounded-lg transition-all ${reportView === 'sistema' ? 'bg-white text-indigo-700 shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}>
            <ShieldCheck className="w-4 h-4 mr-1.5" /> Auditoría
          </button>
        </div>
      </div>

      {reportView === 'tareas' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Creadas</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{taskKPIs.creadas}</p>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg"><FileText className="w-6 h-6 text-gray-600"/></div>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Completadas</p>
                <p className="text-2xl font-bold text-emerald-600 mt-1">{taskKPIs.completadas}</p>
              </div>
              <div className="bg-emerald-50 p-3 rounded-lg"><CheckCircle className="w-6 h-6 text-emerald-600"/></div>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Cumplimiento SLA</p>
                <p className={`text-2xl font-bold mt-1 ${taskKPIs.porcenSla >= 80 ? 'text-emerald-600' : 'text-amber-600'}`}>{taskKPIs.porcenSla}%</p>
              </div>
              <div className={`${taskKPIs.porcenSla >= 80 ? 'bg-emerald-50' : 'bg-amber-50'} p-3 rounded-lg`}>
                <BarChart className={`w-6 h-6 ${taskKPIs.porcenSla >= 80 ? 'text-emerald-600' : 'text-amber-600'}`}/>
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Fuera de SLA</p>
                <p className="text-2xl font-bold text-rose-600 mt-1">{taskKPIs.fueraSla}</p>
              </div>
              <div className="bg-rose-50 p-3 rounded-lg"><AlertTriangle className="w-6 h-6 text-rose-600"/></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center">
              <FilterIcon className="w-4 h-4 mr-1.5" /> Filtrar Historial de Tareas
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Clínica / Sede</label>
                <select value={taskClinic} onChange={e => setTaskClinic(e.target.value)} className="w-full border rounded-lg p-2 bg-gray-50 outline-none">
                  <option value="Todas">Todas las Clínicas</option>
                  {clinicsList.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Departamento</label>
                <select value={taskDept} onChange={e => setTaskDept(e.target.value)} className="w-full border rounded-lg p-2 bg-gray-50 outline-none">
                  <option value="Todos">Todos los Departamentos</option>
                  {Object.values(DEPARTMENTS).map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Responsable</label>
                <select value={taskUser} onChange={e => setTaskUser(e.target.value)} className="w-full border rounded-lg p-2 bg-gray-50 outline-none">
                  <option value="Todos">Todos</option>
                  {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Estatus SLA / Proceso</label>
                <select value={taskSlaFilter} onChange={e => setTaskSlaFilter(e.target.value)} className="w-full border rounded-lg p-2 bg-gray-50 outline-none">
                  <option value="Todos">Ver Todos</option>
                  <option value="Cumplio">Cumplió SLA</option>
                  <option value="Fallo">Fuera de SLA</option>
                  <option value="Pendiente">Pendiente de Ejecución</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Filtrar por Mes</label>
                <select value={taskMonth} onChange={e => setTaskMonth(e.target.value)} className="w-full border rounded-lg p-2 bg-gray-50 outline-none">
                  <option value="Todos">Todos los meses</option>
                  {monthsList.map(m => <option key={m.val} value={m.val}>{m.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Rango de Días (Desde / Hasta)</label>
                <div className="flex items-center space-x-2">
                  <input type="date" value={taskStartDate} onChange={e => setTaskStartDate(e.target.value)} className="border rounded-lg p-1.5 bg-gray-50 outline-none w-full text-xs" />
                  <span className="text-gray-400 font-bold">-</span>
                  <input type="date" value={taskEndDate} onChange={e => setTaskEndDate(e.target.value)} className="border rounded-lg p-1.5 bg-gray-50 outline-none w-full text-xs" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
              <h3 className="font-bold text-gray-700">Historial de Tareas</h3>
              <span className="text-xs bg-indigo-50 text-indigo-700 font-bold px-3 py-1 rounded-full border border-indigo-200">{filteredReportData.length} resultados</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm min-w-[800px]">
                <thead className="bg-white border-b">
                  <tr>
                    <th className="p-4 font-semibold text-gray-600">Hab.</th>
                    <th className="p-4 font-semibold text-gray-600">Área</th>
                    <th className="p-4 font-semibold text-gray-600">Descripción</th>
                    <th className="p-4 font-semibold text-gray-600">Responsable</th>
                    <th className="p-4 font-semibold text-gray-600">Tiempos</th>
                    <th className="p-4 font-semibold text-gray-600">SLA</th>
                    <th className="p-4 font-semibold text-gray-600">Estatus</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReportData.sort((a, b) => b.createdAt - a.createdAt).map(row => (
                    <tr key={row.id} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-bold text-gray-800">{row.roomId}</td>
                      <td className="p-4 text-gray-600">{row.dept}</td>
                      <td className="p-4 text-gray-700 max-w-xs truncate" title={row.description}>{row.description}</td>
                      <td className="p-4 text-gray-600">
                        {users.find(u => u.id === row.assignedTo)?.name || '-'}
                      </td>
                      <td className="p-4">
                        <div className="text-xs text-gray-500">
                          Creada: {formatTime(row.createdAt)} <br/>
                          {row.status === 'Completada' && row.completedAt && <>Cierre: {formatTime(row.completedAt)}</>}
                        </div>
                      </td>
                      <td className="p-4">
                        {row.status === 'Completada' ? (
                          <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold ${row.cumplioSla ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                            {row.timeTaken} / {row.sla}m
                          </span>
                        ) : (
                          <span className="text-gray-400 text-xs">SLA: {row.sla}m</span>
                        )}
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${row.status === 'Completada' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filteredReportData.length === 0 && (
                    <tr><td colSpan={7} className="p-6 text-center text-gray-500">No se encontraron tareas con los filtros aplicados.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {reportView === 'asistencia' && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-gray-400 uppercase">Activos Hoy</span>
                <p className="text-3xl font-extrabold text-indigo-600 mt-1">{attendanceStats.activos}</p>
                <p className="text-xs text-gray-400 mt-1">Registrados: {attendanceStats.totalRegistered}</p>
              </div>
              <div className="bg-indigo-50 p-3 rounded-xl text-indigo-600"><Users className="w-6 h-6"/></div>
            </div>
            <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-100 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-emerald-600 uppercase">Disponibles Ahora</span>
                <p className="text-3xl font-extrabold text-emerald-700 mt-1">{attendanceStats.disponibles}</p>
                <p className="text-xs text-emerald-600/80 mt-1">Listos para tareas</p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-xl text-emerald-700"><CheckCircle className="w-6 h-6"/></div>
            </div>
            <div className="bg-amber-50 p-5 rounded-2xl border border-amber-100 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-amber-600 uppercase">En Descanso / Receso</span>
                <p className="text-3xl font-extrabold text-amber-700 mt-1">{attendanceStats.descansos}</p>
                <p className="text-xs text-amber-600/80 mt-1">En pausa temporal</p>
              </div>
              <div className="bg-amber-100 p-3 rounded-xl text-amber-700"><Clock className="w-6 h-6"/></div>
            </div>
            <div className="bg-slate-100 p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase">Desconectados</span>
                <p className="text-3xl font-extrabold text-slate-700 mt-1">{attendanceStats.offline}</p>
                <p className="text-xs text-slate-500/80 mt-1">Fuera de turno</p>
              </div>
              <div className="bg-slate-200 p-3 rounded-xl text-slate-700"><LogOut className="w-6 h-6" /></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
              <div>
                <h3 className="font-bold text-gray-800 text-lg flex items-center">
                  <Users className="w-6 h-6 text-indigo-600 mr-2" /> Monitor de Asistencia de Personal
                </h3>
                <p className="text-xs text-gray-500 mt-1">Estados del turno del personal operativo en vivo</p>
              </div>
              <span className="inline-flex items-center text-xs font-normal text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-ping"></div> En tiempo real
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {users.map(u => {
                const isOnline = u.currentStatus && u.currentStatus !== 'Desconectado';
                const isAvailable = u.currentStatus === 'Disponible';
                const isBreak = isOnline && !isAvailable;

                return (
                  <div key={u.id} className={`p-4 rounded-2xl border transition-all shadow-sm bg-gradient-to-br ${isAvailable ? 'from-emerald-50/50 to-white border-emerald-200' : isBreak ? 'from-amber-50/50 to-white border-amber-200' : 'from-slate-50/50 to-white border-slate-200'}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`relative p-2.5 rounded-full ${isAvailable ? 'bg-emerald-100 text-emerald-700' : isBreak ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-700'}`}>
                          <User className="w-5 h-5" />
                          <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${isAvailable ? 'bg-emerald-500 animate-pulse' : isOnline ? 'bg-amber-500' : 'bg-gray-400'}`}></span>
                        </div>
                        <div>
                          <p className="font-bold text-gray-800 text-sm">{u.name}</p>
                          <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 uppercase mt-1 w-max block">{u.dept}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                      <span className="text-gray-500">Estado:</span>
                      <span className={`font-bold uppercase tracking-wider px-2.5 py-1 rounded-md text-[10px] ${isAvailable ? 'bg-emerald-100 text-emerald-800' : isOnline ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-700'}`}>
                        {u.currentStatus || 'Desconectado'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center">
              <FilterIcon className="w-4 h-4 mr-1.5" /> Filtrar Bitácora de Asistencia
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Usuario</label>
                <select value={asistenciaUser} onChange={e => setAsistenciaUser(e.target.value)} className="w-full border rounded-lg p-2 bg-gray-50 outline-none">
                  <option value="Todos">Todos</option>
                  {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Tipo de Evento</label>
                <select value={asistenciaAction} onChange={e => setAsistenciaAction(e.target.value)} className="w-full border rounded-lg p-2 bg-gray-50 outline-none">
                  <option value="Todos">Todos</option>
                  <option value="Disponible">Disponible (Inició Turno)</option>
                  <option value="Desconectado">Desconectado (Terminó Turno)</option>
                  {uniqueLogActions.filter(act => act !== 'Disponible' && act !== 'Desconectado').map(act => (
                    <option key={act} value={act}>{act}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Mes</label>
                <select value={asistenciaMonth} onChange={e => setAsistenciaMonth(e.target.value)} className="w-full border rounded-lg p-2 bg-gray-50 outline-none">
                  <option value="Todos">Todos</option>
                  {monthsList.map(m => <option key={m.val} value={m.val}>{m.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Rango (Desde / Hasta)</label>
                <div className="flex items-center space-x-2">
                  <input type="date" value={asistenciaStartDate} onChange={e => setAsistenciaStartDate(e.target.value)} className="border rounded-lg p-1.5 bg-gray-50 outline-none w-full text-xs" />
                  <span className="text-gray-400 font-bold">-</span>
                  <input type="date" value={asistenciaEndDate} onChange={e => setAsistenciaEndDate(e.target.value)} className="border rounded-lg p-1.5 bg-gray-50 outline-none w-full text-xs" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
              <h3 className="font-bold text-gray-700">Bitácora Histórica</h3>
              <span className="text-xs bg-indigo-50 text-indigo-700 font-bold px-3 py-1 rounded-full border border-indigo-200">{filteredUserLogs.length} eventos</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm min-w-[600px]">
                <thead className="bg-white border-b">
                  <tr>
                    <th className="p-4 font-semibold text-gray-600">Fecha y Hora</th>
                    <th className="p-4 font-semibold text-gray-600">Usuario</th>
                    <th className="p-4 font-semibold text-gray-600">Rol / Depto</th>
                    <th className="p-4 font-semibold text-gray-600">Acción Registrada</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUserLogs.sort((a,b) => b.timestamp - a.timestamp).map(log => {
                    const u = users.find(x => x.id === log.userId);
                    const isOnline = log.action === 'Disponible';
                    const isOffline = log.action === 'Desconectado';
                    return (
                      <tr key={log.id} className="border-b hover:bg-gray-50">
                        <td className="p-4 text-gray-600 font-medium">
                          {new Date(log.timestamp).toLocaleDateString('es-ES')} - {formatTime(log.timestamp)}
                        </td>
                        <td className="p-4 font-bold text-gray-800">{u?.name || 'Usuario Desconocido'}</td>
                        <td className="p-4 text-gray-600">{u?.role === 'admin' ? 'Supervisor' : u?.dept}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${isOnline ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : isOffline ? 'bg-gray-100 text-gray-700 border' : 'bg-amber-100 text-amber-700 border border-amber-200'}`}>
                            {log.action}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredUserLogs.length === 0 && (
                    <tr><td colSpan={4} className="p-6 text-center text-gray-500">No se encontraron eventos de asistencia.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {reportView === 'sistema' && (
        <>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center">
              <FilterIcon className="w-4 h-4 mr-1.5" /> Filtrar Auditoría de Sistema
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Usuario Admin.</label>
                <select value={sysLogUser} onChange={e => setSysLogUser(e.target.value)} className="w-full border rounded-lg p-2 bg-gray-50 outline-none">
                  <option value="Todos">Todos</option>
                  {users.filter(u => u.role === 'admin').map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Categoría</label>
                <select value={sysLogCategory} onChange={e => setSysLogCategory(e.target.value)} className="w-full border rounded-lg p-2 bg-gray-50 outline-none">
                  <option value="Todas">Todas</option>
                  {uniqueSystemCategories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Mes</label>
                <select value={sysMonth} onChange={e => setSysMonth(e.target.value)} className="w-full border rounded-lg p-2 bg-gray-50 outline-none">
                  <option value="Todos">Todos</option>
                  {monthsList.map(m => <option key={m.val} value={m.val}>{m.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Rango (Desde / Hasta)</label>
                <div className="flex items-center space-x-2">
                  <input type="date" value={sysStartDate} onChange={e => setSysStartDate(e.target.value)} className="border rounded-lg p-1.5 bg-gray-50 outline-none w-full text-xs" />
                  <span className="text-gray-400 font-bold">-</span>
                  <input type="date" value={sysEndDate} onChange={e => setSysEndDate(e.target.value)} className="border rounded-lg p-1.5 bg-gray-50 outline-none w-full text-xs" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
              <h3 className="font-bold text-gray-700">Historial de Modificaciones del Sistema</h3>
              <span className="text-xs bg-indigo-50 text-indigo-700 font-bold px-3 py-1 rounded-full border border-indigo-200">{filteredSystemLogs.length} registros</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm min-w-[700px]">
                <thead className="bg-white border-b">
                  <tr>
                    <th className="p-4 font-semibold text-gray-600">Fecha y Hora</th>
                    <th className="p-4 font-semibold text-gray-600">Usuario Responsable</th>
                    <th className="p-4 font-semibold text-gray-600">Categoría</th>
                    <th className="p-4 font-semibold text-gray-600">Detalles de la Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSystemLogs.sort((a,b) => b.timestamp - a.timestamp).map(log => {
                    const u = users.find(x => x.id === log.userId);
                    return (
                      <tr key={log.id} className="border-b hover:bg-gray-50">
                        <td className="p-4 text-gray-600 font-medium">
                          {new Date(log.timestamp).toLocaleDateString('es-ES')} - {formatTime(log.timestamp)}
                        </td>
                        <td className="p-4 font-bold text-gray-800">{u?.name || 'Sistema / Desconocido'}</td>
                        <td className="p-4">
                          <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 uppercase tracking-wider border border-slate-200">
                            {log.actionCategory}
                          </span>
                        </td>
                        <td className="p-4 text-gray-700">{log.details}</td>
                      </tr>
                    );
                  })}
                  {filteredSystemLogs.length === 0 && (
                    <tr><td colSpan={4} className="p-6 text-center text-gray-500">No hay registros de auditoría en el sistema aún.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const ConfigTab = ({ 
  slas, rooms, users, checklistItems, appSettings, currentUser,
  onUpdateSla, onAddRoom, onRemoveRoom, onAddUser, onRemoveUser, onUpdateUser, onAddChecklist, onRemoveChecklist, onUpdateUserPassword, onUpdateSettings
}: any) => {
  // Estados para Habitaciones
  const [newRoomId, setNewRoomId] = useState('');
  const [newRoomArea, setNewRoomArea] = useState('General');
  const [newRoomClinic, setNewRoomClinic] = useState(appSettings?.clinics?.[0] || 'Sede Central');
  
  // Estados para Usuarios
  const [newUserName, setNewUserName] = useState('');
  const [newUserLogin, setNewUserLogin] = useState('');
  const [newUserPass, setNewUserPass] = useState('');
  const [newUserDept, setNewUserDept] = useState(DEPARTMENTS.LIMPIEZA);
  const [newUserRole, setNewUserRole] = useState<'staff' | 'admin'>('staff');
  const [userFormError, setUserFormError] = useState('');
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editPasswordValue, setEditPasswordValue] = useState('');

  // Modos de Edición de usuario
  const [activeEditMode, setActiveEditMode] = useState<'password' | 'profile' | null>(null);
  const [editProfileData, setEditProfileData] = useState({ name: '', username: '', dept: '', role: 'staff' });

  // Estados para Checklist
  const [newQuestion, setNewQuestion] = useState('');
  const [newCategory, setNewCategory] = useState('Paredes');
  const [newDept, setNewDept] = useState(DEPARTMENTS.LIMPIEZA);
  
  // Estados para App Settings
  const [appName, setAppName] = useState(appSettings?.appName || 'MediRoom Control');
  const [appLogo, setAppLogo] = useState(appSettings?.logoUrl || '');
  const [newClinic, setNewClinic] = useState('');
  
  // Estados para Descansos
  const [newBreakName, setNewBreakName] = useState('');
  const [newBreakDuration, setNewBreakDuration] = useState('30');

  const categories = Array.from(new Set(checklistItems.map((i: ChecklistItem) => i.category || 'General')));
  const clinics = appSettings?.clinics || ['Sede Central'];
  const breakTypes = appSettings?.breakTypes || [];

  const handleSaveSettings = () => {
    onUpdateSettings({ ...appSettings, appName, logoUrl: appLogo });
    alert('Configuración guardada correctamente.');
  };

  const handleAddClinic = () => {
    if(newClinic.trim() && !clinics.includes(newClinic.trim())) {
      onUpdateSettings({ ...appSettings, clinics: [...clinics, newClinic.trim()] });
      setNewClinic('');
    }
  };

  const handleRemoveClinic = (cToRemove: string) => {
    onUpdateSettings({ ...appSettings, clinics: clinics.filter((c: string) => c !== cToRemove) });
  };

  const handleAddBreak = () => {
    if(newBreakName.trim() && newBreakDuration) {
      const newBreak = { id: `b_${Date.now()}`, name: newBreakName.trim(), duration: parseInt(newBreakDuration) };
      onUpdateSettings({ ...appSettings, breakTypes: [...breakTypes, newBreak] });
      setNewBreakName(''); setNewBreakDuration('30');
    }
  };

  const handleRemoveBreak = (idToRemove: string) => {
    onUpdateSettings({ ...appSettings, breakTypes: breakTypes.filter((b: any) => b.id !== idToRemove) });
  };

  const handleAddUser = () => {
    if (!newUserName.trim() || !newUserLogin.trim() || !newUserPass.trim()) {
      setUserFormError('Llena todos los campos (Nombre, Usuario y Contraseña).');
      return;
    }
    if (users.some((u: AppUser) => u.username === newUserLogin)) {
      setUserFormError('El usuario ya existe.');
      return;
    }
    onAddUser({ name: newUserName, username: newUserLogin, password: newUserPass, dept: newUserDept, role: newUserRole, currentStatus: 'Desconectado' });
    setNewUserName(''); setNewUserLogin(''); setNewUserPass(''); setUserFormError('');
  };

  const handleSavePassword = (userId: string) => {
    if (onUpdateUserPassword) {
      onUpdateUserPassword(userId, editPasswordValue);
    }
    setEditingUserId(null);
    setActiveEditMode(null);
  };

  const handleSaveProfile = (userId: string) => {
    if (!editProfileData.name.trim() || !editProfileData.username.trim()) {
      alert("El nombre y el usuario no pueden estar vacíos.");
      return;
    }
    // Protección para no quedarse sin administradores
    if (editProfileData.role === 'staff') {
      const userToEdit = users.find((u: AppUser) => u.id === userId);
      const totalAdmins = users.filter((u: AppUser) => u.role === 'admin').length;
      if (userToEdit && userToEdit.role === 'admin' && totalAdmins <= 1) {
        alert("No puedes quitarle el rol de Administrador a este usuario porque es el único que queda en el sistema.");
        return;
      }
    }
    onUpdateUser(userId, {
      name: editProfileData.name,
      username: editProfileData.username,
      dept: editProfileData.dept,
      role: editProfileData.role
    });
    setEditingUserId(null);
    setActiveEditMode(null);
  };

  const handleOpenEditProfile = (user: AppUser) => {
    setEditingUserId(user.id);
    setActiveEditMode('profile');
    setEditProfileData({ name: user.name, username: user.username, dept: user.dept, role: user.role });
  };

  const groupedChecklist = checklistItems.reduce((acc: any, item: ChecklistItem) => {
    const cat = item.category || 'General';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  return (
    <div className="space-y-6 max-w-4xl animate-in fade-in duration-500">
      
      {/* PERSONALIZACIÓN Y CLÍNICAS */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <Settings className="w-6 h-6 mr-2 text-gray-600"/> Personalización del Sistema
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="text-sm font-semibold text-gray-600 mb-1 block">Nombre de la Aplicación</label>
            <input type="text" value={appName} onChange={(e) => setAppName(e.target.value)} className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500" placeholder="Ej. Hospital San José" />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-600 mb-1 block">URL del Logotipo (Opcional)</label>
            <input type="text" value={appLogo} onChange={(e) => setAppLogo(e.target.value)} className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500" placeholder="https://mi-web.com/logo.png" />
          </div>
        </div>
        <button onClick={handleSaveSettings} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors mb-8">Guardar Personalización</button>

        <div className="border-t pt-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center"><Building className="w-5 h-5 mr-2 text-gray-500"/> Gestión de Clínicas / Sucursales</h3>
          <div className="flex gap-3 mb-4">
            <input type="text" placeholder="Nueva clínica..." value={newClinic} onChange={(e) => setNewClinic(e.target.value)} className="flex-1 border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500" />
            <button onClick={handleAddClinic} className="bg-indigo-600 text-white font-semibold py-2 px-6 rounded-lg">Añadir</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {clinics.map((c: string) => (
              <span key={c} className="bg-gray-100 text-gray-800 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center border border-gray-200">
                {c} 
                {clinics.length > 1 && <button onClick={() => handleRemoveClinic(c)} className="ml-2 text-rose-500 hover:text-rose-700"><X className="w-3 h-3"/></button>}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* CONFIGURACIÓN DE DESCANSOS */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <Clock className="w-6 h-6 mr-2 text-gray-600"/> Tipos de Descanso (Control de Asistencia)
        </h2>
        <p className="text-sm text-gray-500 mb-6">Configura las pausas permitidas para el personal. Estas opciones aparecerán en su Status Bar.</p>
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <input type="text" placeholder="Ej. Hora de Almuerzo" value={newBreakName} onChange={(e) => setNewBreakName(e.target.value)} className="flex-1 border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500" />
          <div className="flex items-center">
            <input type="number" placeholder="Minutos" value={newBreakDuration} onChange={(e) => setNewBreakDuration(e.target.value)} className="w-24 border rounded-l-lg p-2 focus:ring-2 focus:ring-indigo-500 border-r-0" />
            <span className="bg-gray-100 border border-gray-300 border-l-0 px-3 py-2 rounded-r-lg text-gray-500 text-sm font-medium">min</span>
          </div>
          <button onClick={handleAddBreak} className="bg-indigo-600 text-white font-semibold py-2 px-6 rounded-lg">Añadir</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {breakTypes.map((b: any) => (
            <div key={b.id} className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-100">
              <div>
                <p className="font-bold text-sm text-amber-900">{b.name}</p>
                <p className="text-xs text-amber-700">Duración: {b.duration} min</p>
              </div>
              <button onClick={() => handleRemoveBreak(b.id)} className="text-rose-500 hover:text-rose-700 p-1.5"><X className="w-4 h-4"/></button>
            </div>
          ))}
          {breakTypes.length === 0 && <p className="text-gray-500 text-sm col-span-full">No hay descansos configurados.</p>}
        </div>
      </div>

      {/* SLAs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <AlertTriangle className="w-6 h-6 mr-2 text-gray-600"/> Tiempos Máximos de Tarea (SLAs)
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(slas).map(([dept, time]: any) => (
            <div key={dept} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <span className="font-semibold text-gray-700 text-sm block mb-2">{dept}</span>
              <div className="flex items-center space-x-2">
                <input type="number" value={time} onChange={(e) => onUpdateSla(dept, e.target.value)} className="w-full text-right border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"/>
                <span className="text-gray-500 text-sm font-medium">min</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Habitaciones */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <Bed className="w-6 h-6 mr-2 text-gray-600"/> Gestión de Habitaciones
        </h2>
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <input type="text" placeholder="Número (ej. 301)..." value={newRoomId} onChange={(e) => setNewRoomId(e.target.value)} className="flex-1 border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500" />
          <select value={newRoomArea} onChange={(e) => setNewRoomArea(e.target.value)} className="border rounded-lg p-2 bg-white">
            {AREAS.map(area => <option key={area} value={area}>{area}</option>)}
          </select>
          <select value={newRoomClinic} onChange={(e) => setNewRoomClinic(e.target.value)} className="border rounded-lg p-2 bg-white text-indigo-700 font-semibold">
            {clinics.map((c: string) => <option key={c} value={c}>{c}</option>)}
          </select>
          <button onClick={() => { onAddRoom(newRoomId, newRoomArea, newRoomClinic); setNewRoomId(''); }} className="bg-indigo-600 text-white font-semibold py-2 px-6 rounded-lg">
            Agregar
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {rooms.map((room: Room) => (
            <div key={room.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-3">
                <Bed className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-bold text-sm text-gray-800">{room.name}</p>
                  <p className="text-[10px] text-gray-500 uppercase">{room.clinic} - {room.area}</p>
                </div>
              </div>
              <button onClick={() => onRemoveRoom(room.id)} className="text-rose-500 hover:text-rose-700 p-1.5 bg-rose-50 rounded-lg transition-colors"><X className="w-4 h-4"/></button>
            </div>
          ))}
        </div>
      </div>

      {/* Usuarios */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <Users className="w-6 h-6 mr-2 text-gray-600"/> Gestión de Personal
        </h2>
        {userFormError && <div className="bg-rose-50 text-rose-600 p-3 rounded-lg text-sm font-medium mb-4">{userFormError}</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 bg-gray-50 p-5 rounded-xl border">
          <div><label className="text-xs font-semibold text-gray-600 mb-1 block">Nombre</label><input type="text" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500" /></div>
          <div><label className="text-xs font-semibold text-gray-600 mb-1 block">Usuario</label><input type="text" value={newUserLogin} onChange={(e) => setNewUserLogin(e.target.value)} className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500" /></div>
          <div><label className="text-xs font-semibold text-gray-600 mb-1 block">Contraseña</label><input type="password" value={newUserPass} onChange={(e) => setNewUserPass(e.target.value)} className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500" /></div>
          <div><label className="text-xs font-semibold text-gray-600 mb-1 block">Departamento</label>
            <select value={newUserDept} onChange={(e) => setNewUserDept(e.target.value)} className="w-full border rounded-lg p-2 bg-white">
              {Object.values(DEPARTMENTS).map(dept => <option key={dept} value={dept}>{dept}</option>)}
            </select>
          </div>
          <div><label className="text-xs font-semibold text-gray-600 mb-1 block">Rol</label>
            <select value={newUserRole} onChange={(e) => setNewUserRole(e.target.value as any)} className="w-full border rounded-lg p-2 bg-white">
              <option value="staff">Operativo</option>
              <option value="admin">Supervisor</option>
            </select>
          </div>
          <div className="flex items-end"><button onClick={handleAddUser} className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg">Añadir</button></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {users.map((user: AppUser) => (
            <div key={user.id} className={`flex flex-col p-4 bg-white rounded-xl border shadow-sm transition-all ${user.role === 'admin' ? 'border-indigo-200 shadow-indigo-100/50' : 'border-gray-200'}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2.5 rounded-full ${user.role === 'admin' ? 'bg-indigo-600 text-white shadow-md' : 'bg-indigo-50 text-indigo-600'}`}>
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-800 flex items-center">
                      {user.name} 
                      {user.id === currentUser?.id && <span className="ml-2 text-[9px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">Tú</span>}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">Login: <span className="text-gray-700 font-medium">{user.username}</span></p>
                    <div className="flex gap-2 mt-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${user.role === 'admin' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'}`}>
                        {user.role === 'admin' ? 'Admin / Supervisor' : 'Operativo (Staff)'}
                      </span>
                      <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded uppercase">
                        {user.dept}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button onClick={() => handleOpenEditProfile(user)} className="text-blue-500 hover:text-blue-700 p-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors" title="Editar Perfil y Permisos">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                  </button>
                  <button onClick={() => { setEditingUserId(user.id); setActiveEditMode('password'); setEditPasswordValue(''); }} className="text-amber-500 hover:text-amber-700 p-2 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors" title="Cambiar Contraseña">
                    <Lock className="w-4 h-4"/>
                  </button>
                  {user.id !== currentUser?.id && (
                    <button 
                      onClick={() => {
                        if (user.role === 'admin' && users.filter((u: AppUser) => u.role === 'admin').length <= 1) {
                          alert("No puedes eliminar al único administrador del sistema.");
                          return;
                        }
                        if (window.confirm(`¿Estás seguro de eliminar al usuario ${user.name}?`)) {
                          onRemoveUser(user.id);
                        }
                      }} 
                      className="text-rose-500 hover:text-rose-700 p-2 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors" title="Eliminar Usuario"
                    >
                      <X className="w-4 h-4"/>
                    </button>
                  )}
                </div>
              </div>
              
              {/* Formulario para editar contraseña */}
              {editingUserId === user.id && activeEditMode === 'password' && (
                <div className="mt-4 p-4 bg-amber-50/50 border border-amber-200 rounded-xl animate-in fade-in slide-in-from-top-2 duration-200">
                  <label className="text-xs font-bold text-amber-800 mb-2 block">Nueva Contraseña para {user.name}</label>
                  <div className="flex items-center space-x-2">
                    <input type="text" placeholder="Escribe la nueva clave..." value={editPasswordValue} onChange={(e) => setEditPasswordValue(e.target.value)} className="flex-1 border border-amber-300 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-amber-500" />
                    <button onClick={() => handleSavePassword(user.id)} className="bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-amber-700 transition-colors">Guardar Clave</button>
                    <button onClick={() => {setEditingUserId(null); setActiveEditMode(null);}} className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors">Cancelar</button>
                  </div>
                </div>
              )}

              {/* Formulario para editar Perfil y Permisos */}
              {editingUserId === user.id && activeEditMode === 'profile' && (
                <div className="mt-4 p-5 bg-blue-50/50 border border-blue-200 rounded-xl animate-in fade-in slide-in-from-top-2 duration-200">
                  <h4 className="text-sm font-bold text-blue-900 mb-4 border-b border-blue-200 pb-2">Modificar Perfil y Privilegios</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-xs font-semibold text-blue-800 mb-1 block">Nombre Completo</label>
                      <input type="text" value={editProfileData.name} onChange={(e) => setEditProfileData({...editProfileData, name: e.target.value})} className="w-full border border-blue-300 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-blue-800 mb-1 block">Usuario (Login)</label>
                      <input type="text" value={editProfileData.username} onChange={(e) => setEditProfileData({...editProfileData, username: e.target.value})} className="w-full border border-blue-300 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-blue-800 mb-1 block">Departamento</label>
                      <select value={editProfileData.dept} onChange={(e) => setEditProfileData({...editProfileData, dept: e.target.value})} className="w-full border border-blue-300 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                        {Object.values(DEPARTMENTS).map(dept => <option key={dept} value={dept}>{dept}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-blue-800 mb-1 block">Nivel de Acceso (Rol)</label>
                      <select 
                        value={editProfileData.role} 
                        onChange={(e) => setEditProfileData({...editProfileData, role: e.target.value as any})} 
                        className={`w-full border rounded-lg p-2 text-sm outline-none focus:ring-2 font-bold ${editProfileData.role === 'admin' ? 'bg-indigo-50 border-indigo-300 text-indigo-800 focus:ring-indigo-500' : 'bg-white border-blue-300 text-gray-700 focus:ring-blue-500'}`}
                      >
                        <option value="staff">Operativo (Solo lectura y tareas)</option>
                        <option value="admin">Supervisor (Control Total)</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-2 border-t border-blue-200">
                    <button onClick={() => {setEditingUserId(null); setActiveEditMode(null);}} className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors">Cancelar</button>
                    <button onClick={() => handleSaveProfile(user.id)} className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-blue-700 transition-colors">Guardar Cambios</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Checklist */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <CheckSquare className="w-6 h-6 mr-2 text-gray-600"/> Gestión del Checklist (Formulario)
        </h2>
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="border rounded-lg p-2 bg-white md:w-48">
            {categories.map(cat => <option key={cat as string} value={cat as string}>{cat as string}</option>)}
          </select>
          <input type="text" placeholder="Nueva pregunta..." value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} className="flex-1 border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500" />
          <select value={newDept} onChange={(e) => setNewDept(e.target.value)} className="border rounded-lg p-2 bg-white md:w-40">
            {Object.values(DEPARTMENTS).filter(d => d !== DEPARTMENTS.ADMIN).map(dept => <option key={dept} value={dept}>{dept}</option>)}
          </select>
          <button onClick={() => { onAddChecklist(newQuestion, newCategory, newDept); setNewQuestion(''); }} className="bg-indigo-600 text-white font-semibold py-2 px-6 rounded-lg">Añadir</button>
        </div>
        
        <div className="space-y-4">
          {Object.entries(groupedChecklist).map(([cat, items]: [string, any]) => (
             <details key={cat} className="group border border-gray-200 rounded-lg bg-gray-50">
               <summary className="flex cursor-pointer items-center justify-between p-4 font-semibold text-gray-800 marker:content-none">
                 {cat} <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
               </summary>
               <div className="p-4 pt-0 space-y-2 bg-white border-t border-gray-200">
                 {items.map((item: ChecklistItem) => (
                   <div key={item.id} className="flex items-center justify-between p-2 border-b last:border-0">
                     <div><p className="text-sm text-gray-800">{item.question}</p><span className="text-[10px] font-bold text-indigo-600 uppercase">{item.dept}</span></div>
                     <button onClick={() => onRemoveChecklist(item.id)} className="text-rose-500 hover:text-rose-700 p-1.5 bg-rose-50 rounded-lg"><X className="w-4 h-4"/></button>
                   </div>
                 ))}
               </div>
             </details>
          ))}
        </div>
      </div>
    </div>
  );
};

// === WIZARD DEL FORMULARIO DE CHECKLIST ===
const ChecklistModal = ({ 
  isOpen, onClose, selectedRoom, checklistItems, onSubmit 
}: { 
  isOpen: boolean, onClose: () => void, selectedRoom: Room | null, checklistItems: ChecklistItem[], onSubmit: (answers: {[key: string]: boolean}, comentarios: string, urgente: string, room: Room) => void 
}) => {
  const [answers, setAnswers] = useState<{[key: string]: boolean}>({});
  const [comentarios, setComentarios] = useState('');
  const [urgente, setUrgente] = useState('');
  const [currentStep, setCurrentStep] = useState(0);

  const categories = Array.from(new Set(checklistItems.map((i: ChecklistItem) => i.category || 'General')));
  const totalSteps = categories.length + 1; // +1 para la pestaña final de comentarios

  useEffect(() => {
    if (isOpen) {
      setAnswers({}); 
      setComentarios('');
      setUrgente('');
      setCurrentStep(0); 
    }
  }, [isOpen, checklistItems]);

  if (!isOpen || !selectedRoom) return null;

  const isFinalStep = currentStep === categories.length;
  const currentCategory = isFinalStep ? 'Observaciones Finales' : categories[currentStep];
  const currentItems = isFinalStep ? [] : checklistItems.filter(item => (item.category || 'General') === currentCategory);

  const isCurrentStepComplete = isFinalStep || currentItems.every(item => answers[item.id] !== undefined);

  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1));
  const handlePrev = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        <div className="bg-amber-500 p-5 text-white flex justify-between items-center shrink-0">
          <div>
            <h3 className="font-bold text-xl flex items-center"><CheckSquare className="w-6 h-6 mr-2"/> CONTROL DE LIMPIEZA</h3>
            <p className="text-amber-100 text-sm font-medium mt-1">{selectedRoom.name} - {selectedRoom.area}</p>
          </div>
          <button onClick={onClose} className="hover:bg-amber-600 p-2 rounded-full transition-colors bg-amber-500/50"><X className="w-6 h-6"/></button>
        </div>
        
        <div className="bg-gray-100 h-2 w-full shrink-0">
          <div className="bg-indigo-600 h-full transition-all duration-500 ease-out" style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}></div>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1 bg-slate-50">
          <div className="flex justify-between items-end mb-6 border-b border-gray-200 pb-4">
            <h4 className="text-2xl font-bold text-gray-800">{currentCategory as string}</h4>
            <span className="text-sm font-bold text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full border border-indigo-200">
              Paso {currentStep + 1} de {totalSteps}
            </span>
          </div>

          {!isFinalStep ? (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <p className="text-sm text-blue-800 mb-4 bg-blue-50 p-4 rounded-xl border border-blue-200 font-medium shadow-sm">
                Debe evaluar <strong>todos los elementos</strong> para continuar. Marque explícitamente "✓ Cumple" o "✗ No Cumple" según corresponda.
              </p>
              
              {currentItems.map((item: ChecklistItem) => (
                <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-xl border border-gray-200 gap-4 shadow-sm transition-all hover:border-indigo-300">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 text-base">{item.question}</p>
                    <span className="text-[10px] font-bold text-indigo-600 uppercase mt-1 inline-block bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">{item.dept}</span>
                  </div>
                  <div className="flex bg-gray-100 rounded-lg p-1 shrink-0 border border-gray-200">
                    <button onClick={() => setAnswers({...answers, [item.id]: true})} className={`px-4 py-2 text-sm font-bold rounded-md transition-all ${answers[item.id] === true ? 'bg-white text-emerald-600 shadow-sm border border-gray-200' : 'text-gray-500 hover:text-gray-700'}`}>✓ Cumple</button>
                    <button onClick={() => setAnswers({...answers, [item.id]: false})} className={`px-4 py-2 text-sm font-bold rounded-md transition-all ${answers[item.id] === false ? 'bg-white text-rose-600 shadow-sm border border-gray-200' : 'text-gray-500 hover:text-gray-700'}`}>✗ No Cumple</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
                <label className="block text-sm font-bold text-gray-700 mb-2">19. Comentario Adicional</label>
                <textarea value={comentarios} onChange={e => setComentarios(e.target.value)} className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 min-h-[100px] bg-gray-50" placeholder="Observaciones generales acerca de la habitación..."></textarea>
              </div>
              <div className="bg-rose-50 p-5 rounded-2xl shadow-sm border border-rose-200">
                <label className="block text-sm font-bold text-rose-700 mb-2 flex items-center"><AlertTriangle className="w-5 h-5 mr-2" /> 20. Evento Urgente de Atender</label>
                <textarea value={urgente} onChange={e => setUrgente(e.target.value)} className="w-full border border-rose-300 bg-white rounded-xl p-3 focus:ring-2 focus:ring-rose-500 min-h-[100px]" placeholder="Describa el problema crítico si lo hay (generará una tarea urgente para el supervisor)..."></textarea>
              </div>
            </div>
          )}
        </div>

        <div className="p-5 border-t border-gray-200 bg-white flex justify-between items-center shrink-0">
          <button onClick={handlePrev} disabled={currentStep === 0} className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center ${currentStep === 0 ? 'text-gray-400 cursor-not-allowed opacity-50' : 'text-gray-700 hover:bg-gray-100 border border-gray-200'}`}>
            <ChevronLeft className="w-5 h-5 mr-1" /> Anterior
          </button>
          
          {!isFinalStep ? (
            <button onClick={handleNext} disabled={!isCurrentStepComplete} className={`px-6 py-3 rounded-xl font-bold text-white shadow-md transition-colors flex items-center ${!isCurrentStepComplete ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}>
              Siguiente <ChevronRight className="w-5 h-5 ml-1" />
            </button>
          ) : (
            <button onClick={() => onSubmit(answers, comentarios, urgente, selectedRoom)} className="px-6 py-3 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-colors flex items-center">
              <CheckCircle className="w-5 h-5 mr-2"/> Finalizar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// === NUEVA PESTAÑA DE MANUAL DE USUARIO ===
const ManualTab = () => (
  <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl mx-auto">
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <FileText className="w-7 h-7 mr-3 text-indigo-600" /> Manual de Usuario y Operación
      </h2>
      <div className="space-y-6 text-gray-700">
        <section>
          <h3 className="text-lg font-bold text-gray-800 mb-2 border-b pb-2">1. Roles del Sistema</h3>
          <ul className="list-disc pl-5 space-y-2 mt-3">
            <li><strong>Supervisor (Admin):</strong> Tiene acceso total. Puede ver el tablero general, configurar tiempos límite, registrar habitaciones, gestionar clínicas y administrar las preguntas del checklist. Es el único que puede hacer las evaluaciones de habitaciones.</li>
            <li><strong>Personal Operativo (Limpieza, Mantenimiento, Enfermería):</strong> Poseen una vista simplificada. Solo ven las tareas que han sido asignadas a su departamento.</li>
          </ul>
        </section>
        <section>
          <h3 className="text-lg font-bold text-gray-800 mb-2 border-b pb-2">2. Flujo de las Habitaciones</h3>
          <ul className="list-decimal pl-5 space-y-2 mt-3">
            <li>Una habitación comienza su ciclo en color verde como <strong>Disponible</strong>.</li>
            <li>Al ingresar un paciente, el supervisor la marca como <strong>Ocupada</strong> (color rojo).</li>
            <li>Cuando el paciente es dado de alta, el sistema la pasa a <strong>Pendiente de Evaluación</strong> (color amarillo).</li>
            <li>El supervisor entra a la habitación y realiza el <strong>Control de Limpieza</strong>.</li>
            <li>La habitación cambia a <strong>En Tareas</strong> (color azul) mientras haya al menos una tarea pendiente de resolver.</li>
            <li>Una vez completadas todas las tareas, la habitación regresa a <strong>Disponible</strong>.</li>
          </ul>
        </section>
        <section>
          <h3 className="text-lg font-bold text-gray-800 mb-2 border-b pb-2">3. Control de Asistencia y Tiempos</h3>
          <p className="mt-3">El personal debe utilizar la barra superior para indicar en qué momento inician un descanso autorizado (ej. Almuerzo). Esto se refleja en la bitácora de asistencia que el Administrador puede revisar.</p>
        </section>
      </div>
    </div>
  </div>
);

// --- 6. COMPONENTE PRINCIPAL (APP) ---
export default function App() {
  const [authUser, setAuthUser] = useState<FirebaseAuthUser | null>(null);
  const [dbReady, setDbReady] = useState(false);

  // Estados de aplicación
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Datos Firebase
  const [rooms, setRooms] = useState<Room[]>([]);
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([]);
  const [users, setUsers] = useState<AppUser[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [slas, setSlas] = useState<Record<string, number>>(INITIAL_SLAS);
  const [appSettings, setAppSettings] = useState<AppSettings>(INITIAL_SETTINGS);
  const [userLogs, setUserLogs] = useState<UserLog[]>([]);
  const [systemLogs, setSystemLogs] = useState<SystemLog[]>([]);
  
  // UI Modal State
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isChecklistModalOpen, setIsChecklistModalOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  // Login State
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Inicializar Firebase Auth
  useEffect(() => {
    if (firebaseError) { setDbReady(true); return; }
    const initAuth = async () => {
      try {
        if (w.__initial_auth_token) await signInWithCustomToken(auth, w.__initial_auth_token);
        else await signInAnonymously(auth);
      } catch (err) {
        console.error("Auth Error:", err);
        setDbReady(true);
        setUsers(INITIAL_USERS);
        setRooms(INITIAL_ROOMS);
        setChecklistItems(INITIAL_CHECKLIST);
      }
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, setAuthUser);
    return () => unsubscribe();
  }, []);

  const seedDatabase = async () => {
    if (!db) return;
    try {
      const promises: Promise<void>[] = [];
      INITIAL_USERS.forEach(u => promises.push(setDoc(getDocRef('h_users', u.id)!, u)));
      INITIAL_ROOMS.forEach(r => promises.push(setDoc(getDocRef('h_rooms', r.id)!, r)));
      INITIAL_CHECKLIST.forEach(c => promises.push(setDoc(getDocRef('h_checklistItems', c.id)!, c)));
      promises.push(setDoc(getDocRef('h_slas', 'main')!, slas));
      promises.push(setDoc(getDocRef('h_settings', 'main')!, INITIAL_SETTINGS));
      await Promise.all(promises);
    } catch (err) { console.error("Seed Error:", err); }
  };

  // Suscripciones Real-time a Firestore
  useEffect(() => {
    if (!authUser || !db) {
      if (authUser && !db) {
        setDbReady(true);
        setUsers(INITIAL_USERS);
        setRooms(INITIAL_ROOMS);
        setChecklistItems(INITIAL_CHECKLIST);
      }
      return;
    }
    const unsubs: (() => void)[] = [];
    const errHandler = (err: any) => console.error("Firebase Sync Error", err);

    unsubs.push(onSnapshot(getColRef('h_users')!, (snapshot) => {
      if (snapshot.empty) { seedDatabase().then(() => setDbReady(true)); } 
      else { setUsers(snapshot.docs.map(d => ({id: d.id, ...d.data()} as AppUser))); setDbReady(true); }
    }, errHandler));

    unsubs.push(onSnapshot(getDocRef('h_settings', 'main')!, (docSnap) => {
      if (docSnap.exists()) setAppSettings(docSnap.data() as AppSettings);
    }, errHandler));

    unsubs.push(onSnapshot(getColRef('h_user_logs')!, (s) => {
      setUserLogs(s.docs.map(d => ({id: d.id, ...d.data()} as UserLog)));
    }, errHandler));

    unsubs.push(onSnapshot(getColRef('h_system_logs')!, (s) => {
      setSystemLogs(s.docs.map(d => ({id: d.id, ...d.data()} as SystemLog)));
    }, errHandler));

    unsubs.push(onSnapshot(getColRef('h_checklistItems')!, (s) => {
      const items = s.docs.map(d => ({id: d.id, ...d.data()} as ChecklistItem));
      if (items.length < 10) INITIAL_CHECKLIST.forEach(c => { setDoc(getDocRef('h_checklistItems', c.id)!, c); });
      else setChecklistItems(items);
    }, errHandler));

    unsubs.push(onSnapshot(getColRef('h_rooms')!, (s) => setRooms(s.docs.map(d => ({id: d.id, ...d.data()} as Room))), errHandler));
    unsubs.push(onSnapshot(getColRef('h_tasks')!, (s) => setTasks(s.docs.map(d => ({id: d.id, ...d.data()} as Task))), errHandler));
    unsubs.push(onSnapshot(getColRef('h_notifications')!, (s) => setNotifications(s.docs.map(d => ({id: d.id, ...d.data()} as Notification))), errHandler));
    unsubs.push(onSnapshot(getDocRef('h_slas', 'main')!, (docSnap) => { if (docSnap.exists()) setSlas(docSnap.data() as Record<string, number>); }, errHandler));

    return () => unsubs.forEach(u => u());
  }, [authUser]);

  // --- MOTOR DE AUDITORÍA DE SISTEMA ---
  const logSystemAction = async (actionCategory: string, details: string) => {
    if (!db || !currentUser?.id) return;
    const logId = `sys_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    const logRef = getDocRef('h_system_logs', logId);
    if (logRef) {
      await setDoc(logRef, { id: logId, userId: currentUser.id, actionCategory, details, timestamp: Date.now() });
    }
  };

  // --- LOGICA DE CONTROL DE HORAS ---
  const handleUserStatusChange = async (userId: string, newStatus: string) => {
    if (!db) return;
    const userRef = getDocRef('h_users', userId);
    if (userRef) await setDoc(userRef, { currentStatus: newStatus }, { merge: true });
    
    const logId = `log_${Date.now()}_${userId}`;
    const logRef = getDocRef('h_user_logs', logId);
    if (logRef) {
      await setDoc(logRef, { id: logId, userId: userId, action: newStatus, timestamp: Date.now() });
    }
  };

  const handleUpdateUserPassword = async (userId: string, newPass: string) => {
    if (!newPass.trim() || !db) return;
    const userRef = getDocRef('h_users', userId);
    if (userRef) {
      await setDoc(userRef, { password: newPass.trim() }, { merge: true });
      await logSystemAction('Usuarios', `Modificó la contraseña del usuario ${userId}`);
    }
  };

  // --- MANEJADORES DE LÓGICA DE NEGOCIO ---
  const handleVacateRoom = async (roomId: string) => { 
    if (!db) return;
    await setDoc(getDocRef('h_rooms', roomId)!, { status: ROOM_STATUS.EVALUACION }, { merge: true }); 
    await logSystemAction('Habitaciones', `Marcó la Hab. ${roomId} para evaluación (Desocupada)`);
    setSelectedRoom(null); 
  };

  const handleOccupyRoom = async (roomId: string) => { 
    if (!db) return;
    await setDoc(getDocRef('h_rooms', roomId)!, { status: ROOM_STATUS.OCUPADA }, { merge: true }); 
    await logSystemAction('Habitaciones', `Marcó la Hab. ${roomId} como ocupada`);
    setSelectedRoom(null); 
  };

  const handleCompleteTask = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if(!task || !db) return;
    await setDoc(getDocRef('h_tasks', taskId)!, { status: 'Completada', completedAt: Date.now() }, { merge: true });
    await logSystemAction('Tareas', `Marcó como completada la tarea en Hab. ${task.roomId}`);
    
    const pendingRoomTasks = tasks.filter(t => t.roomId === task.roomId && t.id !== taskId && t.status !== 'Completada');
    if (pendingRoomTasks.length === 0) { 
      const targetRoom = rooms.find(r => r.id === task.roomId || r.name === task.roomId);
      if (targetRoom) {
        await setDoc(getDocRef('h_rooms', targetRoom.id)!, { status: ROOM_STATUS.DISPONIBLE }, { merge: true }); 
        await logSystemAction('Habitaciones', `La Hab. ${targetRoom.id} volvió a estar Disponible tras completar tareas`);
      }
    }
  };

  const handleAssignTask = async (taskId: string, userId: string) => {
    if (!db) return;
    await setDoc(getDocRef('h_tasks', taskId)!, { assignedTo: userId }, { merge: true });
    await logSystemAction('Tareas', `Asignó tarea ${taskId} al usuario ${userId}`);
    if (userId) {
      const taskObj = tasks.find(t => t.id === taskId);
      await setDoc(getDocRef('h_notifications', Date.now().toString())!, { userId: userId, message: `Nueva tarea asignada en Hab. ${taskObj?.roomId}`, read: false, createdAt: Date.now() });
    }
  };

  const markNotificationsAsRead = async () => {
    if(!currentUser || !db) return;
    const promises = notifications
      .filter(n => n.userId === currentUser.id && !n.read)
      .map(n => setDoc(getDocRef('h_notifications', n.id)!, { read: true }, { merge: true }));
    await Promise.all(promises);
  };

  const handleChecklistSubmit = async (answers: {[key: string]: boolean}, comentarios: string, urgente: string, room: Room) => {
    if (!db) return;
    const promises: Promise<void>[] = [];
    let roomNeedsTasks = false;

    checklistItems.forEach(item => {
      if (answers[item.id] === false) { 
        const taskId = `t_${Date.now()}_${item.id}`;
        promises.push(setDoc(getDocRef('h_tasks', taskId)!, {
          id: taskId, roomId: room.id, dept: item.dept, description: `Fallo detectado: ${item.question} (${item.category})`, status: 'Pendiente', createdAt: Date.now(), assignedTo: null
        }));
        roomNeedsTasks = true;
      }
    });

    if (comentarios.trim()) {
      users.filter(u => u.role === 'admin').forEach((admin, i) => {
        promises.push(setDoc(getDocRef('h_notifications', `n_${Date.now()}_${i}`)!, { id: `n_${Date.now()}_${i}`, userId: admin.id, message: `Comentario Hab. ${room.name}: "${comentarios}"`, read: false, createdAt: Date.now() }));
      });
    }

    if (urgente.trim()) {
      promises.push(setDoc(getDocRef('h_tasks', `t_${Date.now()}_u`)!, { id: `t_${Date.now()}_u`, roomId: room.id, dept: DEPARTMENTS.ADMIN, description: `🚨 URGENTE: ${urgente}`, status: 'Pendiente', createdAt: Date.now(), assignedTo: null }));
      roomNeedsTasks = true;
    }

    promises.push(setDoc(getDocRef('h_rooms', room.id)!, { status: roomNeedsTasks ? ROOM_STATUS.MANTENIMIENTO : ROOM_STATUS.DISPONIBLE }, { merge: true }));
    await Promise.all(promises);
    
    await logSystemAction('Checklist', `Envió evaluación de limpieza de Hab. ${room.id} (${roomNeedsTasks ? 'Generó Tareas' : 'Aprobada'})`);
    setIsChecklistModalOpen(false);
    setSelectedRoom(null);
  };

  // --- LOGIN Y LOGOUT ---
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = users.find(u => u.username.toLowerCase() === loginUsername.trim().toLowerCase() && u.password === loginPassword.trim());
    if (user) {
      setCurrentUser(user);
      setActiveTab(user.role === 'admin' ? 'dashboard' : 'tasks');
      setLoginError(''); setLoginUsername(''); setLoginPassword('');
      await handleUserStatusChange(user.id, 'Disponible');
    } else { setLoginError('Usuario o contraseña incorrectos'); }
  };

  const handleLogout = async () => {
    if (currentUser) {
      await handleUserStatusChange(currentUser.id, 'Desconectado');
    }
    setCurrentUser(null);
  };

  // --- CARGA Y LOGIN UI ---
  if (firebaseError) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4">
        <AlertTriangle className="w-16 h-16 text-rose-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 text-center">Falta conectar la Base de Datos</h2>
        <p className="text-gray-600 text-center max-w-md mt-4 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          Has publicado la aplicación con éxito en Vercel, pero necesita un proyecto de <strong>Firebase</strong> real.
        </p>
      </div>
    );
  }

  if (!authUser || !dbReady) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
        <h2 className="text-xl font-semibold text-gray-700">Iniciando sistema...</h2>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4" style={{ backgroundImage: 'linear-gradient(to bottom right, #f8fafc, #e2e8f0)' }}>
        <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-10 border border-gray-100">
          <div className="flex flex-col items-center mb-8">
            {appSettings.logoUrl ? (
              <img src={appSettings.logoUrl} alt="Logo" className="h-20 object-contain mb-4" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            ) : (
              <div className="bg-indigo-100 p-4 rounded-2xl mb-4"><Lock className="w-10 h-10 text-indigo-600" /></div>
            )}
            <h1 className="text-2xl font-bold text-gray-800 text-center">{appSettings.appName}</h1>
            <p className="text-sm text-gray-500 mt-2 flex items-center bg-gray-50 px-3 py-1 rounded-full"><span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span> Sistema En Línea</p>
          </div>
          
          <form onSubmit={handleLoginSubmit} className="space-y-5">
            {loginError && <div className="bg-rose-50 text-rose-600 p-3 rounded-lg text-sm text-center font-medium border border-rose-100">{loginError}</div>}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Usuario</label>
              <input type="text" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 bg-gray-50 outline-none" placeholder="Tu nombre de usuario" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Contraseña</label>
              <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 bg-gray-50 outline-none" placeholder="••••••••" required />
            </div>
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-colors mt-2">Iniciar Sesión Segura</button>
          </form>
        </div>
      </div>
    );
  }

  const userNotifs = notifications.filter(n => n.userId === currentUser.id);
  const unreadNotifs = userNotifs.filter(n => !n.read).length;
  const realCurrentUser = users.find(u => u.id === currentUser.id) || currentUser;

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-10">
      <header className="bg-white text-gray-800 shadow-sm border-b border-gray-200 relative z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between h-auto md:h-16 py-3 md:py-0">
            
            <div className="flex items-center space-x-3 mb-3 md:mb-0">
              {appSettings.logoUrl ? (
                <img src={appSettings.logoUrl} alt="Logo" className="h-8 object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              ) : (
                <Activity className="w-8 h-8 text-indigo-600" />
              )}
              <span className="font-bold text-xl tracking-tight text-indigo-900 hidden sm:block">{appSettings.appName}</span>
            </div>
            
            <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4">
              <nav className="flex flex-wrap justify-center space-x-1">
                {currentUser.role === 'admin' && (
                  <button onClick={() => setActiveTab('dashboard')} className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center ${activeTab === 'dashboard' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                    <LayoutDashboard className="w-4 h-4 mr-1.5" /> Tablero
                  </button>
                )}
                <button onClick={() => setActiveTab('tasks')} className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center ${activeTab === 'tasks' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                  <ListTodo className="w-4 h-4 mr-1.5" /> Tareas
                </button>
                {currentUser.role === 'admin' && (
                  <>
                    <button onClick={() => setActiveTab('reports')} className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center ${activeTab === 'reports' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                      <BarChart className="w-4 h-4 mr-1.5" /> Bitácora
                    </button>
                    <button onClick={() => setActiveTab('config')} className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center ${activeTab === 'config' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                      <Settings className="w-4 h-4 mr-1.5" /> Config
                    </button>
                  </>
                )}
                <button onClick={() => setActiveTab('manual')} className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center ${activeTab === 'manual' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                  <FileText className="w-4 h-4 mr-1.5" /> Manual
                </button>
              </nav>

              <div className="flex items-center space-x-4 border-l border-gray-200 pl-4">
                
                {/* STATUS BAR (Control de Horas) */}
                <div className="flex items-center bg-gray-50 rounded-full p-1 border border-gray-200">
                  <div className={`w-2 h-2 rounded-full ml-2 ${realCurrentUser.currentStatus === 'Disponible' ? 'bg-emerald-500' : realCurrentUser.currentStatus === 'Desconectado' ? 'bg-gray-400' : 'bg-amber-500'}`}></div>
                  <select 
                    value={realCurrentUser.currentStatus || 'Disponible'} 
                    onChange={(e) => handleUserStatusChange(currentUser.id, e.target.value)}
                    className="bg-transparent border-none text-xs font-bold text-gray-700 focus:ring-0 cursor-pointer outline-none pl-1 pr-2"
                  >
                    <option value="Disponible">Disponible</option>
                    {appSettings.breakTypes?.map(b => (
                      <option key={b.id} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                </div>

                <div className="relative">
                  <button onClick={() => { setIsNotifOpen(!isNotifOpen); markNotificationsAsRead(); }} className="text-gray-500 hover:text-indigo-600 transition-colors relative">
                    <Bell className="w-6 h-6" />
                    {unreadNotifs > 0 && <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{unreadNotifs}</span>}
                  </button>
                  {isNotifOpen && (
                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden text-gray-800 z-50">
                      <div className="bg-gray-50 p-3 border-b font-bold text-sm">Notificaciones</div>
                      <div className="max-h-64 overflow-y-auto">
                        {userNotifs.length === 0 ? <div className="p-4 text-sm text-gray-500 text-center">Sin notificaciones</div> : 
                          userNotifs.sort((a,b) => b.createdAt - a.createdAt).map(n => (
                            <div key={n.id} className={`p-3 border-b text-sm ${!n.read ? 'bg-indigo-50/50 font-semibold' : 'text-gray-600'}`}>
                              <p>{n.message}</p><span className="text-[10px] text-gray-400 mt-1 block">{formatTime(n.createdAt)}</span>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-3 text-sm">
                  <div className="text-right hidden sm:block">
                    <p className="font-bold text-gray-800 leading-tight">{currentUser.name}</p>
                    <p className="text-gray-500 text-xs">{currentUser.role === 'admin' ? 'Supervisor' : currentUser.dept}</p>
                  </div>
                  <button onClick={handleLogout} className="p-2 bg-gray-100 hover:bg-rose-100 text-gray-600 hover:text-rose-600 rounded-lg transition-colors" title="Cerrar Sesión">
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && currentUser.role === 'admin' && (
          <DashboardTab rooms={rooms} tasks={tasks} currentUser={currentUser} onSelectRoom={setSelectedRoom} onOpenChecklist={() => setIsChecklistModalOpen(true)} />
        )}
        {activeTab === 'tasks' && (
          <TasksTab tasks={tasks} rooms={rooms} users={users} currentUser={currentUser} slas={slas} onAssign={handleAssignTask} onComplete={handleCompleteTask} />
        )}
        {activeTab === 'reports' && currentUser.role === 'admin' && (
          <ReportsTab tasks={tasks} rooms={rooms} users={users} slas={slas} userLogs={userLogs} systemLogs={systemLogs} />
        )}
        {activeTab === 'config' && currentUser.role === 'admin' && (
          <ConfigTab slas={slas} rooms={rooms} users={users} checklistItems={checklistItems} appSettings={appSettings} currentUser={currentUser}
            onUpdateSla={async (dept: string, val: string) => { 
              if (db) {
                await setDoc(getDocRef('h_slas', 'main')!, { [dept]: parseInt(val) || 0 }, { merge: true }); 
                await logSystemAction('Configuración', `Actualizó SLA de ${dept} a ${val} min`);
              }
            }}
            onAddRoom={async (id: string, area: string, clinic: string) => { 
              if(id && db && !rooms.some(r=>r.id===id)) {
                await setDoc(getDocRef('h_rooms', id)!, { id, name: `Hab. ${id}`, area, clinic, status: ROOM_STATUS.DISPONIBLE });
                await logSystemAction('Habitaciones', `Añadió la Habitación ${id} en ${clinic} (${area})`);
              }
            }}
            onRemoveRoom={async (id: string) => { 
              if (db) {
                await deleteDoc(getDocRef('h_rooms', id)!); 
                await logSystemAction('Habitaciones', `Eliminó la Habitación ${id} del sistema`);
              }
            }}
            onAddUser={async (userData: any) => { 
              if (db) {
                await setDoc(getDocRef('h_users', `u_${Date.now()}`)!, { id: `u_${Date.now()}`, ...userData });
                await logSystemAction('Usuarios', `Creó el usuario ${userData.username} (${userData.role}) para ${userData.dept}`);
              }
            }}
            onRemoveUser={async (id: string) => { 
              if (db) { 
                const u = users.find(x => x.id === id);
                await deleteDoc(getDocRef('h_users', id)!); 
                await Promise.all(tasks.filter(t=>t.assignedTo===id).map(t=>{ const tR = getDocRef('h_tasks', t.id); return tR ? setDoc(tR, {assignedTo: null}, {merge:true}) : Promise.resolve() }));
                await logSystemAction('Usuarios', `Eliminó al usuario ${u?.username || id} del sistema`);
              } 
            }}
            onUpdateUser={async (userId: string, updatedData: any) => { 
              if (db) {
                await setDoc(getDocRef('h_users', userId)!, updatedData, { merge: true }); 
                await logSystemAction('Usuarios', `Actualizó el perfil/rol del usuario ${updatedData.username}`);
              }
            }}
            onAddChecklist={async (q: string, c: string, d: string) => { 
              if(q && db) { 
                const id=Date.now().toString(); 
                await setDoc(getDocRef('h_checklistItems', id)!, {id, category: c, question: q, dept: d});
                await logSystemAction('Checklist', `Añadió pregunta "${q}" a la categoría ${c}`);
              } 
            }}
            onRemoveChecklist={async (id: string) => { 
              if (db) {
                const item = checklistItems.find(i => i.id === id);
                await deleteDoc(getDocRef('h_checklistItems', id)!); 
                await logSystemAction('Checklist', `Eliminó la pregunta "${item?.question || id}" del formulario`);
              }
            }}
            onUpdateUserPassword={handleUpdateUserPassword}
            onUpdateSettings={async (settings: any) => { 
              if (db) {
                await setDoc(getDocRef('h_settings', 'main')!, settings, {merge:true});
                await logSystemAction('Configuración', `Modificó ajustes generales (Nombre, Logo o Descansos)`);
              }
            }}
          />
        )}
        {activeTab === 'manual' && <ManualTab />}
      </main>

      {/* Modal de Detalles de Habitación */}
      {selectedRoom && !isChecklistModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-40">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="bg-indigo-600 p-4 flex justify-between items-center text-white">
              <h3 className="font-bold text-lg">{selectedRoom.name}</h3>
              <button onClick={() => setSelectedRoom(null)} className="hover:bg-indigo-700 p-1 rounded-full"><X className="w-5 h-5"/></button>
            </div>
            <div className="p-6 space-y-6">
              <div className="text-center">
                <span className="text-sm text-gray-500 uppercase tracking-wide font-bold">Estado Actual</span>
                <p className="text-xl font-bold text-indigo-900 mt-1">{selectedRoom.status}</p>
                <p className="text-sm text-gray-600 mt-1">{selectedRoom.clinic} - {selectedRoom.area}</p>
              </div>
              <div className="flex flex-col gap-3 pt-4 border-t">
                {selectedRoom.status === ROOM_STATUS.OCUPADA && (
                  <button onClick={() => handleVacateRoom(selectedRoom.id)} className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 rounded-xl shadow-sm">Desocupar Habitación</button>
                )}
                {selectedRoom.status === ROOM_STATUS.EVALUACION && (
                  <button onClick={() => setIsChecklistModalOpen(true)} className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-xl flex justify-center items-center"><CheckSquare className="w-5 h-5 mr-2"/> Iniciar Evaluación</button>
                )}
                {selectedRoom.status === ROOM_STATUS.DISPONIBLE && (
                  <button onClick={() => handleOccupyRoom(selectedRoom.id)} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl">Marcar como Ocupada</button>
                )}
                {selectedRoom.status === ROOM_STATUS.MANTENIMIENTO && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                    <Wrench className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <p className="text-blue-800 font-medium text-sm">Acondicionando habitación.</p>
                    <button onClick={() => { setSelectedRoom(null); setActiveTab('tasks'); }} className="mt-3 text-blue-700 text-sm font-bold underline hover:text-blue-900 block w-full">Ver tareas en curso</button>
                    
                    {/* BOTÓN DE RESPALDO PARA ADMIN */}
                    {currentUser?.role === 'admin' && (
                      <button 
                        onClick={async () => {
                          const rRef = getDocRef('h_rooms', selectedRoom.id);
                          if (rRef) {
                            await setDoc(rRef, { status: ROOM_STATUS.DISPONIBLE }, { merge: true });
                            await logSystemAction('Habitaciones', `Forzó el desbloqueo a Disponible de la Hab. ${selectedRoom.id}`);
                          }
                          setSelectedRoom(null);
                        }} 
                        className="mt-4 w-full bg-white border border-blue-300 hover:bg-blue-100 text-blue-700 text-sm font-bold py-2 rounded-lg transition-colors"
                      >
                        Forzar Desbloqueo (Admin)
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Checklist Completado (WIZARD) */}
      <ChecklistModal isOpen={isChecklistModalOpen} onClose={() => { setIsChecklistModalOpen(false); setSelectedRoom(null); }} selectedRoom={selectedRoom} checklistItems={checklistItems} onSubmit={handleChecklistSubmit} />
    </div>
  );
}