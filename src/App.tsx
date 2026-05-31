import React, { useState, useEffect, useMemo } from 'react';

// --- ICONOS SVG INCLUIDOS (Reemplazo de lucide-react para evitar errores de entorno) ---
const Icon = ({ path, className }: { path: string, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={path} />
  </svg>
);

const Activity = ({ className }: { className?: string }) => <Icon path="M22 12h-4l-3 9L9 3l-3 9H2" className={className} />;
const AlertTriangle = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
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
    <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7 2.99 7 2.99s-2.29 6.07-2.29 6.07A4.05 4.05 0 0 0 7 16.3z"/>
    <path d="M14 19.3c1.65 0 3-1.37 3-3.04 0-.87-.43-1.69-1.28-2.39S14 9.3 14 9.3s-1.72 4.56-1.72 4.56c-.85.7-1.28 1.52-1.28 2.39 0 1.67 1.35 3.04 3 3.04z"/>
  </svg>
);
const LayoutDashboard = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/>
  </svg>
);
const Settings = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
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


// --- 1. IMPORTACIONES DE FIREBASE ---
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithCustomToken, signInAnonymously, onAuthStateChanged, User as FirebaseAuthUser } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore';

// --- 2. CONFIGURACIÓN DE FIREBASE ---
// ⚠️ TUS CREDENCIALES REALES YA ESTÁN AQUÍ
const defaultFirebaseConfig = {
  apiKey: "AIzaSyDwvPOgiGz6kI0tTbXDL8wLTEHVXKP_tmE",
  authDomain: "mediroom-eb9ef.firebaseapp.com",
  databaseURL: "https://mediroom-eb9ef-default-rtdb.firebaseio.com",
  projectId: "mediroom-eb9ef",
  storageBucket: "mediroom-eb9ef.firebasestorage.app",
  messagingSenderId: "313648219875",
  appId: "1:313648219875:web:ad87f0fcc6c714844227d6"
};

const w = window as any;
const isLocalDev = !!w.__firebase_config;
const firebaseConfig = isLocalDev ? JSON.parse(w.__firebase_config) : defaultFirebaseConfig;

const rawAppId = w.__app_id || 'hospital-manager-app';
const safeAppId = rawAppId.split('_src')[0].split('/')[0];

let app: any, auth: any, db: any;
let firebaseError = false;

try {
  if (!firebaseConfig.apiKey || firebaseConfig.apiKey === "TU_API_KEY") {
    throw new Error("Por favor, configura Firebase para continuar.");
  }
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} catch (err) {
  console.error("No se pudo iniciar Firebase:", err);
  firebaseError = true;
}

const getColRef = (colName: string) => collection(db, 'artifacts', safeAppId, 'public', 'data', colName);
const getDocRef = (colName: string, docId: string) => doc(db, 'artifacts', safeAppId, 'public', 'data', colName, docId.toString());

// --- 3. INTERFACES TYPESCRIPT ---
interface AppUser {
  id: string;
  name: string;
  username: string;
  password?: string;
  dept: string;
  role: 'admin' | 'staff';
}

interface Room {
  id: string;
  name: string;
  area: string;
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

interface Slas {
  [key: string]: number;
}

// --- 4. CONSTANTES Y MOCKS ---
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

// NUEVO CHECKLIST BASADO EN EL FORMULARIO DE GOOGLE
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
  { id: '101', name: 'Habitación 101', area: 'Pediatría', status: ROOM_STATUS.OCUPADA },
  { id: '102', name: 'Habitación 102', area: 'Medicina', status: ROOM_STATUS.DISPONIBLE },
  { id: '103', name: 'Habitación 103', area: 'Cirugía', status: ROOM_STATUS.EVALUACION },
  { id: '201', name: 'Habitación 201', area: 'Intensivo', status: ROOM_STATUS.MANTENIMIENTO },
  { id: '202', name: 'Habitación 202', area: 'Maternidad', status: ROOM_STATUS.DISPONIBLE },
  { id: '203', name: 'Habitación 203', area: 'Pediatría', status: ROOM_STATUS.OCUPADA },
];

const INITIAL_USERS: AppUser[] = [
  { id: 'admin1', name: 'Supervisor (Admin)', username: 'admin', password: '123', dept: DEPARTMENTS.ADMIN, role: 'admin' },
  { id: 'u1', name: 'Carlos (Limpieza)', username: 'carlos', password: '123', dept: DEPARTMENTS.LIMPIEZA, role: 'staff' },
  { id: 'u2', name: 'Ana (Enfermería)', username: 'ana', password: '123', dept: DEPARTMENTS.ENFERMERIA, role: 'staff' },
  { id: 'u3', name: 'Luis (Mantenimiento)', username: 'luis', password: '123', dept: DEPARTMENTS.MANTENIMIENTO, role: 'staff' },
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
  const stats = useMemo(() => ({
    total: rooms.length,
    ocupadas: rooms.filter(r => r.status === ROOM_STATUS.OCUPADA).length,
    disponibles: rooms.filter(r => r.status === ROOM_STATUS.DISPONIBLE).length,
    evaluacion: rooms.filter(r => r.status === ROOM_STATUS.EVALUACION).length,
    mantenimiento: rooms.filter(r => r.status === ROOM_STATUS.MANTENIMIENTO).length,
  }), [rooms]);

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

      <h2 className="text-xl font-bold text-gray-800 flex items-center justify-between">
        <span>Mapa de Piso</span>
        <span className="flex items-center text-xs font-normal text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
           <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></div> En Vivo
        </span>
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {rooms.map(room => (
          <div 
            key={room.id} 
            onClick={() => onSelectRoom(room)}
            className={`p-5 rounded-xl border-l-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow bg-white ${getStatusColor(room.status).replace('bg-', 'border-').split(' ')[1]}`}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-lg text-gray-800">{room.name}</h3>
                <span className="text-xs text-gray-500 font-medium uppercase">{room.area}</span>
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
      </div>
    </div>
  );
};

const TaskColumn = ({ 
  deptName, icon, colorClass, tasks, users, currentUser, slas, onAssign, onComplete 
}: { 
  deptName: string, icon: React.ReactNode, colorClass: string, tasks: Task[], users: AppUser[], currentUser: AppUser, slas: Slas, onAssign: (id: string, uid: string) => void, onComplete: (id: string) => void 
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

const TasksTab = ({ tasks, users, currentUser, slas, onAssign, onComplete }: any) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h2 className="text-xl font-bold text-gray-800 flex items-center">
        <ListTodo className="w-6 h-6 mr-2 text-indigo-600"/> Tareas Activas y SLAs
      </h2>
      <div className="flex flex-col md:flex-row gap-6 overflow-x-auto pb-4">
        {currentUser?.role === 'admin' && (
          <TaskColumn deptName={DEPARTMENTS.ADMIN} icon={<AlertTriangle className="w-5 h-5"/>} colorClass="text-rose-500" tasks={tasks} users={users} currentUser={currentUser} slas={slas} onAssign={onAssign} onComplete={onComplete} />
        )}
        <TaskColumn deptName={DEPARTMENTS.LIMPIEZA} icon={<Droplets className="w-5 h-5"/>} colorClass="text-blue-500" tasks={tasks} users={users} currentUser={currentUser} slas={slas} onAssign={onAssign} onComplete={onComplete} />
        <TaskColumn deptName={DEPARTMENTS.MANTENIMIENTO} icon={<Wrench className="w-5 h-5"/>} colorClass="text-amber-500" tasks={tasks} users={users} currentUser={currentUser} slas={slas} onAssign={onAssign} onComplete={onComplete} />
        <TaskColumn deptName={DEPARTMENTS.ENFERMERIA} icon={<Activity className="w-5 h-5"/>} colorClass="text-indigo-500" tasks={tasks} users={users} currentUser={currentUser} slas={slas} onAssign={onAssign} onComplete={onComplete} />
      </div>
    </div>
  );
};

const ReportsTab = ({ tasks, users, slas }: { tasks: Task[], users: AppUser[], slas: Slas }) => {
  const completedTasks = tasks.filter(t => t.status === 'Completada');
  
  let totalSlaCumplido = 0;
  let totalSlaIncumplido = 0;

  const reportData = tasks.map(task => {
    const isCompleted = task.status === 'Completada';
    const timeTaken = isCompleted && task.completedAt ? getMinutesDifference(task.createdAt, task.completedAt) : null;
    const sla = slas[task.dept] || 0;
    const cumplioSla = isCompleted && timeTaken !== null && timeTaken <= sla;
    
    if (isCompleted) {
      if (cumplioSla) totalSlaCumplido++;
      else totalSlaIncumplido++;
    }
    return { ...task, timeTaken, sla, cumplioSla };
  });

  const totalFinalizadas = completedTasks.length;
  const slaPercent = totalFinalizadas > 0 ? Math.round((totalSlaCumplido / totalFinalizadas) * 100) : 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h2 className="text-xl font-bold text-gray-800 flex items-center">
        <BarChart className="w-6 h-6 mr-2 text-indigo-600"/> Bitácora y Estadísticas
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Creadas</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{tasks.length}</p>
          </div>
          <div className="bg-gray-100 p-3 rounded-lg"><FileText className="w-6 h-6 text-gray-600"/></div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">Completadas</p>
            <p className="text-2xl font-bold text-emerald-600 mt-1">{totalFinalizadas}</p>
          </div>
          <div className="bg-emerald-50 p-3 rounded-lg"><CheckCircle className="w-6 h-6 text-emerald-600"/></div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">Cumplimiento SLA</p>
            <p className={`text-2xl font-bold mt-1 ${slaPercent >= 80 ? 'text-emerald-600' : 'text-amber-600'}`}>{slaPercent}%</p>
          </div>
          <div className={`${slaPercent >= 80 ? 'bg-emerald-50' : 'bg-amber-50'} p-3 rounded-lg`}>
            <BarChart className={`w-6 h-6 ${slaPercent >= 80 ? 'text-emerald-600' : 'text-amber-600'}`}/>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">Fuera de SLA</p>
            <p className="text-2xl font-bold text-rose-600 mt-1">{totalSlaIncumplido}</p>
          </div>
          <div className="bg-rose-50 p-3 rounded-lg"><AlertTriangle className="w-6 h-6 text-rose-600"/></div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50">
          <h3 className="font-bold text-gray-700">Historial de Tareas</h3>
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
              {reportData.sort((a, b) => b.createdAt - a.createdAt).map(row => (
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
              {reportData.length === 0 && (
                <tr><td colSpan={7} className="p-6 text-center text-gray-500">No hay registros generados.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const ConfigTab = ({ 
  slas, rooms, users, checklistItems, currentUser,
  onUpdateSla, onAddRoom, onRemoveRoom, onAddUser, onRemoveUser, onAddChecklist, onRemoveChecklist
}: any) => {
  const [newQuestion, setNewQuestion] = useState('');
  const [newCategory, setNewCategory] = useState('Paredes');
  const [newDept, setNewDept] = useState(DEPARTMENTS.LIMPIEZA);
  
  const [newUserName, setNewUserName] = useState('');
  const [newUserLogin, setNewUserLogin] = useState('');
  const [newUserPass, setNewUserPass] = useState('');
  const [newUserDept, setNewUserDept] = useState(DEPARTMENTS.LIMPIEZA);
  const [newUserRole, setNewUserRole] = useState<'staff' | 'admin'>('staff');
  const [userFormError, setUserFormError] = useState('');
  
  const [newRoomId, setNewRoomId] = useState('');
  const [newRoomArea, setNewRoomArea] = useState('General');

  const categories = Array.from(new Set(checklistItems.map((i: ChecklistItem) => i.category || 'General')));

  const handleAddUser = () => {
    if (!newUserName.trim() || !newUserLogin.trim() || !newUserPass.trim()) {
      setUserFormError('Llena todos los campos (Nombre, Usuario y Contraseña).');
      return;
    }
    if (users.some((u: AppUser) => u.username === newUserLogin)) {
      setUserFormError('El usuario ya existe.');
      return;
    }
    onAddUser({ name: newUserName, username: newUserLogin, password: newUserPass, dept: newUserDept, role: newUserRole });
    setNewUserName(''); setNewUserLogin(''); setNewUserPass(''); setUserFormError('');
  };

  const groupedChecklist = checklistItems.reduce((acc: any, item: ChecklistItem) => {
    const cat = item.category || 'General';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  return (
    <div className="space-y-6 max-w-4xl animate-in fade-in duration-500">
      {/* SLAs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <Settings className="w-6 h-6 mr-2 text-gray-600"/> Configuración de SLAs (Tiempos máximos)
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(slas).map(([dept, time]: any) => (
            <div key={dept} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <span className="font-semibold text-gray-700 text-sm block mb-2">{dept}</span>
              <div className="flex items-center space-x-2">
                <input 
                  type="number" 
                  value={time}
                  onChange={(e) => onUpdateSla(dept, e.target.value)}
                  className="w-full text-right border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
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
          <input 
            type="text" placeholder="Número (ej. 301)..." value={newRoomId} onChange={(e) => setNewRoomId(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
          />
          <select value={newRoomArea} onChange={(e) => setNewRoomArea(e.target.value)} className="border border-gray-300 rounded-lg p-2 bg-white">
            {AREAS.map(area => <option key={area} value={area}>{area}</option>)}
          </select>
          <button onClick={() => { onAddRoom(newRoomId, newRoomArea); setNewRoomId(''); }} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
            Agregar
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {rooms.map((room: Room) => (
            <div key={room.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-3">
                <Bed className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium text-sm text-gray-800">{room.name}</p>
                  <p className="text-xs text-gray-500">{room.area}</p>
                </div>
              </div>
              <button onClick={() => onRemoveRoom(room.id)} className="text-rose-500 hover:text-rose-700 p-1.5 bg-rose-50 rounded-lg transition-colors">
                <X className="w-4 h-4"/>
              </button>
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
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">Nombre</label>
            <input type="text" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">Usuario</label>
            <input type="text" value={newUserLogin} onChange={(e) => setNewUserLogin(e.target.value)} className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">Contraseña</label>
            <input type="password" value={newUserPass} onChange={(e) => setNewUserPass(e.target.value)} className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">Departamento</label>
            <select value={newUserDept} onChange={(e) => setNewUserDept(e.target.value)} className="w-full border rounded-lg p-2 bg-white">
              {Object.values(DEPARTMENTS).map(dept => <option key={dept} value={dept}>{dept}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">Rol</label>
            <select value={newUserRole} onChange={(e) => setNewUserRole(e.target.value as any)} className="w-full border rounded-lg p-2 bg-white">
              <option value="staff">Operativo</option>
              <option value="admin">Supervisor</option>
            </select>
          </div>
          <div className="flex items-end">
            <button onClick={handleAddUser} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg">
              Añadir
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {users.map((user: AppUser) => (
            <div key={user.id} className="flex items-center justify-between p-4 bg-white rounded-lg border shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="bg-indigo-50 p-2.5 rounded-full"><User className="w-5 h-5 text-indigo-600" /></div>
                <div>
                  <p className="font-bold text-sm text-gray-800">{user.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">User: <span className="text-gray-700 font-medium">{user.username}</span></p>
                  <span className="text-[10px] font-bold text-indigo-600 uppercase mt-1 inline-block bg-indigo-50 px-2 py-0.5 rounded">
                    {user.dept} ({user.role})
                  </span>
                </div>
              </div>
              {user.id !== currentUser?.id && (
                <button onClick={() => onRemoveUser(user.id)} className="text-rose-500 hover:text-rose-700 p-2 bg-rose-50 rounded-lg">
                  <X className="w-4 h-4"/>
                </button>
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
          <button onClick={() => { onAddChecklist(newQuestion, newCategory, newDept); setNewQuestion(''); }} className="bg-indigo-600 text-white font-semibold py-2 px-6 rounded-lg">
            Añadir
          </button>
        </div>
        
        <div className="space-y-4">
          {Object.entries(groupedChecklist).map(([cat, items]: [string, any]) => (
             <details key={cat} className="group border border-gray-200 rounded-lg bg-gray-50">
               <summary className="flex cursor-pointer items-center justify-between p-4 font-semibold text-gray-800 marker:content-none">
                 {cat}
                 <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
               </summary>
               <div className="p-4 pt-0 space-y-2 bg-white border-t border-gray-200">
                 {items.map((item: ChecklistItem) => (
                   <div key={item.id} className="flex items-center justify-between p-2 border-b last:border-0">
                     <div>
                       <p className="text-sm text-gray-800">{item.question}</p>
                       <span className="text-[10px] font-bold text-indigo-600 uppercase">{item.dept}</span>
                     </div>
                     <button onClick={() => onRemoveChecklist(item.id)} className="text-rose-500 hover:text-rose-700 p-1.5 bg-rose-50 rounded-lg">
                       <X className="w-4 h-4"/>
                     </button>
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
        {/* Encabezado Fijo */}
        <div className="bg-amber-500 p-5 text-white flex justify-between items-center shrink-0">
          <div>
            <h3 className="font-bold text-xl flex items-center">
              <CheckSquare className="w-6 h-6 mr-2"/> CONTROL DE LIMPIEZA
            </h3>
            <p className="text-amber-100 text-sm font-medium mt-1">{selectedRoom.name} - {selectedRoom.area}</p>
          </div>
          <button onClick={onClose} className="hover:bg-amber-600 p-2 rounded-full transition-colors bg-amber-500/50">
            <X className="w-6 h-6"/>
          </button>
        </div>
        
        {/* Barra de Progreso */}
        <div className="bg-gray-100 h-2 w-full shrink-0">
          <div 
            className="bg-indigo-600 h-full transition-all duration-500 ease-out"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          ></div>
        </div>
        
        {/* Contenido Dinámico */}
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
                <textarea 
                  value={comentarios} 
                  onChange={e => setComentarios(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 min-h-[100px] bg-gray-50"
                  placeholder="Observaciones generales acerca de la habitación..."
                ></textarea>
              </div>
              <div className="bg-rose-50 p-5 rounded-2xl shadow-sm border border-rose-200">
                <label className="block text-sm font-bold text-rose-700 mb-2 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" /> 20. Evento Urgente de Atender
                </label>
                <textarea 
                  value={urgente} 
                  onChange={e => setUrgente(e.target.value)}
                  className="w-full border border-rose-300 bg-white rounded-xl p-3 focus:ring-2 focus:ring-rose-500 min-h-[100px]"
                  placeholder="Describa el problema crítico si lo hay (generará una tarea urgente para el supervisor)..."
                ></textarea>
              </div>
            </div>
          )}
        </div>

        {/* Navegación Inferior Fija */}
        <div className="p-5 border-t border-gray-200 bg-white flex justify-between items-center shrink-0">
          <button 
            onClick={handlePrev} 
            disabled={currentStep === 0}
            className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center ${currentStep === 0 ? 'text-gray-400 cursor-not-allowed opacity-50' : 'text-gray-700 hover:bg-gray-100 border border-gray-200'}`}
          >
            <ChevronLeft className="w-5 h-5 mr-1" /> Anterior
          </button>
          
          {!isFinalStep ? (
            <button 
              onClick={handleNext} 
              disabled={!isCurrentStepComplete}
              className={`px-6 py-3 rounded-xl font-bold text-white shadow-md transition-colors flex items-center ${!isCurrentStepComplete ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
            >
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
            <li><strong>Supervisor (Admin):</strong> Tiene acceso total. Puede ver el tablero general, configurar los tiempos límite (SLAs), registrar habitaciones, crear nuevos usuarios y administrar las preguntas del checklist. Es el único que puede hacer las evaluaciones iniciales.</li>
            <li><strong>Personal Operativo (Limpieza, Mantenimiento, Enfermería):</strong> Poseen una vista simplificada. Solo ven las tareas que han sido asignadas a su departamento y pueden marcarlas como completadas una vez finalizadas.</li>
          </ul>
        </section>
        <section>
          <h3 className="text-lg font-bold text-gray-800 mb-2 border-b pb-2">2. Flujo de las Habitaciones</h3>
          <ul className="list-decimal pl-5 space-y-2 mt-3">
            <li>Una habitación comienza su ciclo en color verde como <strong>Disponible</strong>.</li>
            <li>Al ingresar un paciente, el supervisor la marca como <strong>Ocupada</strong> (color rojo).</li>
            <li>Cuando el paciente es dado de alta, el sistema la pasa a <strong>Pendiente de Evaluación</strong> (color amarillo).</li>
            <li>El supervisor entra a la habitación y realiza el <strong>Control de Limpieza</strong>. Por cada elemento que marque con "✗ No Cumple", se genera una tarea automática dirigida al departamento responsable.</li>
            <li>La habitación cambia a <strong>En Mantenimiento</strong> (color azul) mientras haya al menos una tarea pendiente de resolver.</li>
            <li>Una vez que el personal completa <strong>TODAS</strong> las tareas, la habitación regresa automáticamente a <strong>Disponible</strong>.</li>
          </ul>
        </section>
        <section>
          <h3 className="text-lg font-bold text-gray-800 mb-2 border-b pb-2">3. Notificaciones y Tiempos de Respuesta (SLAs)</h3>
          <p className="mt-3">Cada tarea generada tiene un tiempo límite estipulado (SLA). Si una tarea toma más del tiempo acordado, se reflejará en color rojo (Fuera de SLA) en la pestaña de <strong>Bitácora</strong>.</p>
          <p className="mt-2">El icono de la campana (🔔) en la barra superior avisará en tiempo real al personal cuando se le asigne una nueva tarea de manera directa o cuando haya observaciones urgentes.</p>
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
  const [slas, setSlas] = useState<Slas>({ [DEPARTMENTS.LIMPIEZA]: 30, [DEPARTMENTS.MANTENIMIENTO]: 120, [DEPARTMENTS.ENFERMERIA]: 15, [DEPARTMENTS.ADMIN]: 60 });
  
  // UI Modal State
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isChecklistModalOpen, setIsChecklistModalOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  // Login State
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');

  // Inicializar Firebase Auth
  useEffect(() => {
    if (firebaseError) {
      setDbReady(true);
      return;
    }

    const initAuth = async () => {
      try {
        if (w.__initial_auth_token) {
          await signInWithCustomToken(auth, w.__initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
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
    try {
      const promises: Promise<void>[] = [];
      INITIAL_USERS.forEach(u => promises.push(setDoc(getDocRef('h_users', u.id), u)));
      INITIAL_ROOMS.forEach(r => promises.push(setDoc(getDocRef('h_rooms', r.id), r)));
      INITIAL_CHECKLIST.forEach(c => promises.push(setDoc(getDocRef('h_checklistItems', c.id), c)));
      promises.push(setDoc(getDocRef('h_slas', 'main'), slas));
      await Promise.all(promises);
    } catch (err) {
      console.error("Seed Error:", err);
    }
  };

  // Suscripciones Real-time a Firestore
  useEffect(() => {
    if (!authUser) return;

    const unsubs: (() => void)[] = [];
    const errHandler = (err: any) => console.error("Firebase Sync Error", err);

    unsubs.push(onSnapshot(getColRef('h_users'), (snapshot) => {
      if (snapshot.empty) { seedDatabase().then(() => setDbReady(true)); } 
      else { setUsers(snapshot.docs.map(d => ({id: d.id, ...d.data()} as AppUser))); setDbReady(true); }
    }, errHandler));

    // IMPORTANTE: Este bloque arregla el problema del "Formulario Incompleto" inyectando el PDF completo si tu base de datos estaba vacía o desactualizada
    unsubs.push(onSnapshot(getColRef('h_checklistItems'), (s) => {
      const items = s.docs.map(d => ({id: d.id, ...d.data()} as ChecklistItem));
      const needsUpdate = items.length < 10 || (items.length > 0 && !items[0].category);
      if (needsUpdate) {
        INITIAL_CHECKLIST.forEach(c => setDoc(getDocRef('h_checklistItems', c.id), c));
      } else {
        setChecklistItems(items);
      }
    }, errHandler));

    unsubs.push(onSnapshot(getColRef('h_rooms'), (s) => setRooms(s.docs.map(d => ({id: d.id, ...d.data()} as Room))), errHandler));
    unsubs.push(onSnapshot(getColRef('h_tasks'), (s) => setTasks(s.docs.map(d => ({id: d.id, ...d.data()} as Task))), errHandler));
    unsubs.push(onSnapshot(getColRef('h_notifications'), (s) => setNotifications(s.docs.map(d => ({id: d.id, ...d.data()} as Notification))), errHandler));
    unsubs.push(onSnapshot(getColRef('h_slas'), (s) => {
      if (!s.empty && s.docs[0].id === 'main') setSlas(s.docs[0].data() as Slas);
    }, errHandler));

    return () => unsubs.forEach(u => u());
  }, [authUser]);


  // --- MANEJADORES DE LÓGICA DE NEGOCIO ---
  const handleVacateRoom = async (roomId: string) => {
    await setDoc(getDocRef('h_rooms', roomId), { status: ROOM_STATUS.EVALUACION }, { merge: true });
    setSelectedRoom(null);
  };

  const handleOccupyRoom = async (roomId: string) => {
    await setDoc(getDocRef('h_rooms', roomId), { status: ROOM_STATUS.OCUPADA }, { merge: true });
    setSelectedRoom(null);
  };

  const handleCompleteTask = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if(!task) return;
    await setDoc(getDocRef('h_tasks', taskId), { status: 'Completada', completedAt: Date.now() }, { merge: true });
    
    // IMPORTANTE: Esto arregla el problema de "la habitación no regresa a la lista" verificando mediante room.id correctamente
    const pendingRoomTasks = tasks.filter(t => t.roomId === task.roomId && t.id !== taskId && t.status !== 'Completada');
    if (pendingRoomTasks.length === 0) {
      await setDoc(getDocRef('h_rooms', task.roomId), { status: ROOM_STATUS.DISPONIBLE }, { merge: true });
    }
  };

  const handleAssignTask = async (taskId: string, userId: string) => {
    await setDoc(getDocRef('h_tasks', taskId), { assignedTo: userId }, { merge: true });
    if (userId) {
      const taskObj = tasks.find(t => t.id === taskId);
      const notifId = Date.now().toString();
      await setDoc(getDocRef('h_notifications', notifId), {
        userId: userId, message: `Nueva tarea asignada en Hab. ${taskObj?.roomId}`, read: false, createdAt: Date.now()
      });
    }
  };

  const markNotificationsAsRead = async () => {
    if(!currentUser) return;
    const unread = notifications.filter(n => n.userId === currentUser.id && !n.read);
    const promises = unread.map(n => setDoc(getDocRef('h_notifications', n.id), { read: true }, { merge: true }));
    await Promise.all(promises);
  };

  const handleChecklistSubmit = async (answers: {[key: string]: boolean}, comentarios: string, urgente: string, room: Room) => {
    const promises: Promise<void>[] = [];
    let roomNeedsTasks = false;

    checklistItems.forEach(item => {
      if (answers[item.id] === false) { 
        const taskId = `t_${Date.now()}_${item.id}`;
        promises.push(setDoc(getDocRef('h_tasks', taskId), {
          id: taskId, roomId: room.id, // <-- CORRECCIÓN: Guardando room.id en lugar del nombre
          dept: item.dept, description: `Fallo detectado: ${item.question} (${item.category})`, status: 'Pendiente', createdAt: Date.now(), assignedTo: null
        }));
        roomNeedsTasks = true;
      }
    });

    if (comentarios.trim()) {
      const admins = users.filter(u => u.role === 'admin');
      admins.forEach((admin, index) => {
        const notifId = `n_${Date.now()}_${index}`;
        promises.push(setDoc(getDocRef('h_notifications', notifId), {
          id: notifId, userId: admin.id, message: `Comentario Hab. ${room.name}: "${comentarios}"`, read: false, createdAt: Date.now()
        }));
      });
    }

    if (urgente.trim()) {
      const taskId = `t_${Date.now()}_urgente`;
      promises.push(setDoc(getDocRef('h_tasks', taskId), {
        id: taskId, roomId: room.id, dept: DEPARTMENTS.ADMIN, description: `🚨 URGENTE: ${urgente}`, status: 'Pendiente', createdAt: Date.now(), assignedTo: null
      }));
      roomNeedsTasks = true;
    }

    promises.push(setDoc(getDocRef('h_rooms', room.id), { status: roomNeedsTasks ? ROOM_STATUS.MANTENIMIENTO : ROOM_STATUS.DISPONIBLE }, { merge: true }));
    
    await Promise.all(promises);
    setIsChecklistModalOpen(false);
    setSelectedRoom(null);
  };

  // --- LOGIN ---
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = users.find(u => u.username.toLowerCase() === loginUsername.trim().toLowerCase() && u.password === loginPassword.trim());
    if (user) {
      setCurrentUser(user);
      setActiveTab(user.role === 'admin' ? 'dashboard' : 'tasks');
      setLoginError(''); setLoginUsername(''); setLoginPassword(''); setResetSuccess('');
    } else { setLoginError('Usuario o contraseña incorrectos'); }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const userToReset = users.find(u => u.username.toLowerCase() === loginUsername.trim().toLowerCase());
    if (userToReset) {
      await setDoc(getDocRef('h_users', userToReset.id), { password: newPassword.trim() }, { merge: true });
      setLoginError(''); setResetSuccess('¡Contraseña actualizada! Ya puedes iniciar sesión.');
      setIsResettingPassword(false); setLoginPassword(''); setNewPassword('');
    } else {
      setLoginError('No se encontró ningún usuario con ese nombre de usuario.');
    }
  };

  // --- CARGA Y LOGIN UI ---
  if (firebaseError) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4">
        <AlertTriangle className="w-16 h-16 text-rose-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 text-center">Falta conectar la Base de Datos</h2>
        <p className="text-gray-600 text-center max-w-md mt-4 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          Has publicado la aplicación con éxito en Vercel, pero necesita un proyecto de <strong>Firebase</strong> real para guardar la información y sincronizarse en tiempo real.<br/><br/>
          Abre el archivo <code>App.tsx</code> y reemplaza los valores de <code>defaultFirebaseConfig</code> con las credenciales de tu propio proyecto.
        </p>
      </div>
    );
  }

  if (!authUser || !dbReady) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
        <h2 className="text-xl font-semibold text-gray-700">Sincronizando Sistema MediRoom...</h2>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-indigo-100 p-4 rounded-full mb-4"><Lock className="w-10 h-10 text-indigo-600" /></div>
            <h1 className="text-2xl font-bold text-gray-800">MediRoom Control</h1>
            <p className="text-sm text-gray-500 mt-1 flex items-center"><span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span> Sistema En Línea</p>
          </div>
          
          {!isResettingPassword ? (
            <form onSubmit={handleLoginSubmit} className="space-y-5">
              {loginError && <div className="bg-rose-50 text-rose-600 p-3 rounded-lg text-sm text-center font-medium border">{loginError}</div>}
              {resetSuccess && <div className="bg-emerald-50 text-emerald-600 p-3 rounded-lg text-sm text-center font-medium border">{resetSuccess}</div>}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Usuario</label>
                <input type="text" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 bg-gray-50" placeholder="Ej. admin" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Contraseña</label>
                <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 bg-gray-50" placeholder="••••••••" required />
              </div>
              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-colors">Iniciar Sesión</button>
              <div className="text-center mt-4">
                <button type="button" onClick={() => { setIsResettingPassword(true); setLoginError(''); setResetSuccess(''); }} className="text-sm text-indigo-600 font-medium">¿Olvidaste tu contraseña?</button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-5">
              <div className="text-center mb-4"><h3 className="text-lg font-bold">Restablecer Contraseña</h3></div>
              {loginError && <div className="bg-rose-50 text-rose-600 p-3 rounded-lg text-sm text-center font-medium">{loginError}</div>}
              <div>
                <label className="block text-sm font-semibold mb-1">Usuario</label>
                <input type="text" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} className="w-full border rounded-xl p-3 bg-gray-50 focus:ring-2 focus:ring-indigo-500" required />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Nueva Contraseña</label>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full border rounded-xl p-3 bg-gray-50 focus:ring-2 focus:ring-indigo-500" required minLength={3} />
              </div>
              <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-colors">Guardar</button>
              <div className="text-center mt-4">
                <button type="button" onClick={() => { setIsResettingPassword(false); setLoginError(''); }} className="text-sm text-gray-500 font-medium">Volver</button>
              </div>
            </form>
          )}

          {/* RESTAURACIÓN DEL MANUAL DE CUENTAS DE PRUEBA EN LOGIN */}
          <div className="mt-8 border-t border-gray-100 pt-5">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h4 className="text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide flex items-center">
                <Users className="w-4 h-4 mr-1.5 text-gray-500"/> Usuarios Registrados
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Supervisión (Admin): <strong className="text-indigo-600">admin</strong> / 123 <br/>
                Operativo Limpieza: <strong className="text-indigo-600">carlos</strong> / 123 <br/>
                Operativo Enfermería: <strong className="text-indigo-600">ana</strong> / 123 <br/>
                Operativo Mantenimiento: <strong className="text-indigo-600">luis</strong> / 123
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const userNotifs = notifications.filter(n => n.userId === currentUser.id);
  const unreadNotifs = userNotifs.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-10">
      <header className="bg-indigo-900 text-white shadow-md relative z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between h-auto md:h-16 py-3 md:py-0">
            <div className="flex items-center space-x-3 mb-3 md:mb-0">
              <Activity className="w-8 h-8 text-indigo-300" />
              <span className="font-bold text-xl tracking-tight">MediRoom Control</span>
            </div>
            
            <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4">
              <nav className="flex flex-wrap justify-center space-x-1">
                {currentUser.role === 'admin' && (
                  <button onClick={() => setActiveTab('dashboard')} className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center ${activeTab === 'dashboard' ? 'bg-indigo-800' : 'text-indigo-200 hover:bg-indigo-800/50'}`}>
                    <LayoutDashboard className="w-4 h-4 mr-1.5" /> Tablero
                  </button>
                )}
                <button onClick={() => setActiveTab('tasks')} className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center ${activeTab === 'tasks' ? 'bg-indigo-800' : 'text-indigo-200 hover:bg-indigo-800/50'}`}>
                  <ListTodo className="w-4 h-4 mr-1.5" /> Tareas
                </button>
                {currentUser.role === 'admin' && (
                  <>
                    <button onClick={() => setActiveTab('reports')} className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center ${activeTab === 'reports' ? 'bg-indigo-800' : 'text-indigo-200 hover:bg-indigo-800/50'}`}>
                      <BarChart className="w-4 h-4 mr-1.5" /> Bitácora
                    </button>
                    <button onClick={() => setActiveTab('config')} className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center ${activeTab === 'config' ? 'bg-indigo-800' : 'text-indigo-200 hover:bg-indigo-800/50'}`}>
                      <Settings className="w-4 h-4 mr-1.5" /> Config
                    </button>
                  </>
                )}
                {/* NUEVA PESTAÑA DE MANUAL */}
                <button onClick={() => setActiveTab('manual')} className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center ${activeTab === 'manual' ? 'bg-indigo-800' : 'text-indigo-200 hover:bg-indigo-800/50'}`}>
                  <FileText className="w-4 h-4 mr-1.5" /> Manual
                </button>
              </nav>

              <div className="flex items-center space-x-4 border-l border-indigo-700 pl-4">
                <div className="relative">
                  <button onClick={() => { setIsNotifOpen(!isNotifOpen); markNotificationsAsRead(); }} className="text-indigo-200 hover:text-white transition-colors relative">
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
                    <p className="font-bold text-white leading-tight">{currentUser.name}</p>
                    <p className="text-indigo-300 text-xs">{currentUser.role === 'admin' ? 'Supervisor' : currentUser.dept}</p>
                  </div>
                  <button onClick={() => setCurrentUser(null)} className="p-1.5 bg-indigo-800 hover:bg-rose-600 rounded-lg text-indigo-200 hover:text-white" title="Cerrar Sesión">
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
          <TasksTab tasks={tasks} users={users} currentUser={currentUser} slas={slas} onAssign={handleAssignTask} onComplete={handleCompleteTask} />
        )}
        {activeTab === 'reports' && currentUser.role === 'admin' && (
          <ReportsTab tasks={tasks} users={users} slas={slas} />
        )}
        {activeTab === 'config' && currentUser.role === 'admin' && (
          <ConfigTab slas={slas} rooms={rooms} users={users} checklistItems={checklistItems} currentUser={currentUser}
            onUpdateSla={async (dept: string, val: string) => setDoc(getDocRef('h_slas', 'main'), { [dept]: parseInt(val) || 0 }, { merge: true })}
            onAddRoom={async (id: string, area: string) => { if(id && !rooms.some(r=>r.id===id)) setDoc(getDocRef('h_rooms', id), { id, name: `Hab. ${id}`, area, status: ROOM_STATUS.DISPONIBLE }) }}
            onRemoveRoom={(id: string) => deleteDoc(getDocRef('h_rooms', id))}
            onAddUser={async (userData: any) => setDoc(getDocRef('h_users', `u_${Date.now()}`), { id: `u_${Date.now()}`, ...userData })}
            onRemoveUser={async (id: string) => { await deleteDoc(getDocRef('h_users', id)); await Promise.all(tasks.filter(t=>t.assignedTo===id).map(t=>setDoc(getDocRef('h_tasks', t.id), {assignedTo: null}, {merge:true}))) }}
            onAddChecklist={async (q: string, c: string, d: string) => { if(q) { const id=Date.now().toString(); setDoc(getDocRef('h_checklistItems', id), {id, category: c, question: q, dept: d}) } }}
            onRemoveChecklist={(id: string) => deleteDoc(getDocRef('h_checklistItems', id))}
          />
        )}
        {activeTab === 'manual' && <ManualTab />}
      </main>

      {/* Modal de Detalles de Habitación */}
      {selectedRoom && !isChecklistModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-40">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="bg-indigo-600 p-4 flex justify-between items-center text-white rounded-t-2xl">
              <h3 className="font-bold text-lg">{selectedRoom.name}</h3>
              <button onClick={() => setSelectedRoom(null)} className="hover:bg-indigo-700 p-1 rounded-full"><X className="w-5 h-5"/></button>
            </div>
            <div className="p-6 space-y-6">
              <div className="text-center">
                <span className="text-sm text-gray-500 uppercase tracking-wide font-bold">Estado Actual</span>
                <p className="text-lg font-semibold text-indigo-900 mt-1">{selectedRoom.status}</p>
                <p className="text-sm text-gray-600">{selectedRoom.area}</p>
              </div>
              <div className="flex flex-col gap-3">
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
                    <button onClick={() => { setSelectedRoom(null); setActiveTab('tasks'); }} className="mt-3 text-blue-700 text-sm font-bold underline hover:text-blue-900">Ver tareas</button>
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