import React, { useState, useEffect, useMemo } from 'react';
import { 
  Activity, AlertTriangle, Bed, CheckCircle, Clock, 
  Droplets, LayoutDashboard, Settings, User, Wrench, X, 
  ListTodo, CheckSquare, Users, BarChart, Bell, LogOut, FileText, Lock, Loader2, Key, Download, Calendar
} from 'lucide-react';

// --- 1. IMPORTACIONES DE FIREBASE ---
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged, User as FirebaseAuthUser } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore';

// --- 2. TU CONFIGURACIÓN REAL DE FIREBASE ---
const firebaseConfig = {
  apiKey: "AIzaSyDwvPOgiGz6kI0tTbXDL8wLTEHVXKP_tmE",
  authDomain: "mediroom-eb9ef.firebaseapp.com",
  projectId: "mediroom-eb9ef",
  storageBucket: "mediroom-eb9ef.firebasestorage.app",
  messagingSenderId: "313648219875",
  appId: "1:313648219875:web:ad87f0fcc6c714844227d6"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const safeAppId = 'mediroom_db';
const getColRef = (colName: string) => collection(db, 'artifacts', safeAppId, 'public', 'data', colName);
const getDocRef = (colName: string, docId: string) => doc(db, 'artifacts', safeAppId, 'public', 'data', colName, docId.toString());

// --- 3. INTERFACES TYPESCRIPT ---
interface AppUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  dept: string;
  role: 'admin' | 'staff';
}

interface Room {
  id: string;
  name: string;
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

const INITIAL_CHECKLIST: ChecklistItem[] = [
  { id: '1', question: '¿Se retiró todo el material médico y punzocortante?', dept: DEPARTMENTS.ENFERMERIA },
  { id: '2', question: '¿La cama está limpia y con sábanas nuevas?', dept: DEPARTMENTS.LIMPIEZA },
  { id: '3', question: '¿El baño está desinfectado y abastecido?', dept: DEPARTMENTS.LIMPIEZA },
  { id: '4', question: '¿Los equipos médicos (monitores, tomas de O2) funcionan correctamente?', dept: DEPARTMENTS.MANTENIMIENTO },
  { id: '5', question: '¿La iluminación, TV y contactos eléctricos operan sin fallas?', dept: DEPARTMENTS.MANTENIMIENTO }
];

const INITIAL_ROOMS: Room[] = [
  { id: '101', name: 'Habitación 101', status: ROOM_STATUS.OCUPADA },
  { id: '102', name: 'Habitación 102', status: ROOM_STATUS.DISPONIBLE },
  { id: '103', name: 'Habitación 103', status: ROOM_STATUS.EVALUACION },
  { id: '201', name: 'Habitación 201', status: ROOM_STATUS.MANTENIMIENTO },
  { id: '202', name: 'Habitación 202', status: ROOM_STATUS.DISPONIBLE },
  { id: '203', name: 'Habitación 203', status: ROOM_STATUS.OCUPADA },
];

const INITIAL_USERS: AppUser[] = [
  { id: 'admin1', name: 'Supervisor (Admin)', email: 'admin@hospital.com', password: 'password', dept: DEPARTMENTS.ADMIN, role: 'admin' },
  { id: 'u1', name: 'Carlos (Limpieza)', email: 'carlos@hospital.com', password: '123', dept: DEPARTMENTS.LIMPIEZA, role: 'staff' },
  { id: 'u2', name: 'Ana (Enfermería)', email: 'ana@hospital.com', password: '123', dept: DEPARTMENTS.ENFERMERIA, role: 'staff' },
  { id: 'u3', name: 'Luis (Mantenimiento)', email: 'luis@hospital.com', password: '123', dept: DEPARTMENTS.MANTENIMIENTO, role: 'staff' },
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
              <h3 className="font-bold text-lg text-gray-800">{room.name}</h3>
              {getStatusIcon(room.status)}
            </div>
            
            <div className="space-y-2">
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
  
  if (currentUser?.role === 'staff' && currentUser?.dept !== deptName) return null;

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

            return (
              <div key={task.id} className={`p-4 rounded-lg shadow-sm border ${isMine ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-gray-100'}`}>
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-blue-600 text-sm">Hab. {task.roomId}</span>
                  <span className="flex items-center text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-md">
                    <Clock className="w-3 h-3 mr-1" /> SLA: {slaMinutes}m
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-4">{task.description}</p>
                
                <div className="mb-4">
                  {currentUser?.role === 'admin' ? (
                    <select 
                      value={task.assignedTo || ''}
                      onChange={(e) => onAssign(task.id, e.target.value)}
                      className={`w-full text-sm border rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none ${task.assignedTo ? 'bg-white border-indigo-200 text-indigo-700 font-medium' : 'border-gray-300 bg-gray-50 text-gray-500'}`}
                    >
                      <option value="">Sin responsable asignado</option>
                      {users.filter(u => u.dept === task.dept).map(u => (
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
        <TaskColumn deptName={DEPARTMENTS.LIMPIEZA} icon={<Droplets className="w-5 h-5"/>} colorClass="text-blue-500" tasks={tasks} users={users} currentUser={currentUser} slas={slas} onAssign={onAssign} onComplete={onComplete} />
        <TaskColumn deptName={DEPARTMENTS.MANTENIMIENTO} icon={<Wrench className="w-5 h-5"/>} colorClass="text-amber-500" tasks={tasks} users={users} currentUser={currentUser} slas={slas} onAssign={onAssign} onComplete={onComplete} />
        <TaskColumn deptName={DEPARTMENTS.ENFERMERIA} icon={<Activity className="w-5 h-5"/>} colorClass="text-rose-500" tasks={tasks} users={users} currentUser={currentUser} slas={slas} onAssign={onAssign} onComplete={onComplete} />
      </div>
    </div>
  );
};

// --- PESTAÑA DE BITÁCORAS ACTUALIZADA (CON FILTROS Y EXCEL) ---
const ReportsTab = ({ tasks, users, slas }: { tasks: Task[], users: AppUser[], slas: Slas }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // 1. Filtrar por fechas
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      let pass = true;
      if (startDate) {
        const start = new Date(startDate + 'T00:00:00').getTime();
        if (task.createdAt < start) pass = false;
      }
      if (endDate) {
        const end = new Date(endDate + 'T23:59:59').getTime();
        if (task.createdAt > end) pass = false;
      }
      return pass;
    });
  }, [tasks, startDate, endDate]);

  const completedTasks = filteredTasks.filter(t => t.status === 'Completada');
  
  let totalSlaCumplido = 0;
  let totalSlaIncumplido = 0;

  const reportData = filteredTasks.map(task => {
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

  // 2. Función para descargar en Excel (CSV)
  const handleExportCSV = () => {
    const headers = ["Habitacion", "Area", "Descripcion", "Responsable", "Fecha Creacion", "Fecha Cierre", "Minutos Tomados", "SLA (min)", "Cumplio SLA", "Estatus"];
    
    const rows = reportData.sort((a, b) => b.createdAt - a.createdAt).map(row => {
      const responsable = users.find(u => u.id === row.assignedTo)?.name || 'Sin Asignar';
      const fCreacion = new Date(row.createdAt).toLocaleString('es-ES');
      const fCierre = row.completedAt ? new Date(row.completedAt).toLocaleString('es-ES') : 'N/A';
      
      return [
        row.roomId,
        row.dept,
        `"${row.description.replace(/"/g, '""')}"`, // Evita errores si la descripción tiene comas
        `"${responsable}"`,
        `"${fCreacion}"`,
        `"${fCierre}"`,
        row.timeTaken !== null ? row.timeTaken : 'N/A',
        row.sla,
        row.status === 'Completada' ? (row.cumplioSla ? 'SI' : 'NO') : 'N/A',
        row.status
      ].join(',');
    });

    // \uFEFF asegura que Excel reconozca los acentos correctamente (UTF-8 BOM)
    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `MediRoom_Bitacora_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <BarChart className="w-6 h-6 mr-2 text-indigo-600"/> Bitácora y Estadísticas
        </h2>
        
        {/* Controles de Filtro y Exportación */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-500"/>
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="border rounded-md p-1.5 text-sm text-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none" title="Fecha de inicio" />
            <span className="text-gray-400 text-sm">a</span>
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="border rounded-md p-1.5 text-sm text-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none" title="Fecha de fin" />
            {(startDate || endDate) && (
              <button onClick={() => {setStartDate(''); setEndDate('');}} className="p-1.5 hover:bg-gray-100 rounded-full" title="Limpiar filtros">
                <X className="w-4 h-4 text-gray-500"/>
              </button>
            )}
          </div>
          <div className="hidden sm:block w-px h-8 bg-gray-200"></div>
          <button onClick={handleExportCSV} className="w-full sm:w-auto flex items-center justify-center bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold py-1.5 px-4 rounded-lg transition-colors border border-indigo-200">
            <Download className="w-4 h-4 mr-2"/> Exportar Excel
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Creadas</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{filteredTasks.length}</p>
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
                <tr><td colSpan={7} className="p-6 text-center text-gray-500">No hay registros generados en estas fechas.</td></tr>
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
  const [newDept, setNewDept] = useState(DEPARTMENTS.LIMPIEZA);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPass, setNewUserPass] = useState('');
  const [newUserDept, setNewUserDept] = useState(DEPARTMENTS.LIMPIEZA);
  const [newUserRole, setNewUserRole] = useState<'staff' | 'admin'>('staff');
  const [userFormError, setUserFormError] = useState('');
  const [newRoomId, setNewRoomId] = useState('');

  const handleAddUser = () => {
    if (!newUserName.trim() || !newUserEmail.trim() || !newUserPass.trim()) {
      setUserFormError('Llena todos los campos (Nombre, Correo y Contraseña).');
      return;
    }
    if (users.some((u: AppUser) => u.email.toLowerCase() === newUserEmail.toLowerCase())) {
      setUserFormError('El correo electrónico ya existe.');
      return;
    }
    onAddUser({ name: newUserName, email: newUserEmail.toLowerCase(), password: newUserPass, dept: newUserDept, role: newUserRole });
    setNewUserName(''); setNewUserEmail(''); setNewUserPass(''); setUserFormError('');
  };

  return (
    <div className="space-y-6 max-w-4xl animate-in fade-in duration-500">
      {/* SLAs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <Settings className="w-6 h-6 mr-2 text-gray-600"/> Configuración de SLAs (Minutos)
        </h2>
        <div className="space-y-4">
          {Object.entries(slas).map(([dept, time]: any) => (
            <div key={dept} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-3">
                {dept === DEPARTMENTS.LIMPIEZA && <Droplets className="w-5 h-5 text-blue-500"/>}
                {dept === DEPARTMENTS.MANTENIMIENTO && <Wrench className="w-5 h-5 text-amber-500"/>}
                {dept === DEPARTMENTS.ENFERMERIA && <Activity className="w-5 h-5 text-rose-500"/>}
                <span className="font-semibold text-gray-700">{dept}</span>
              </div>
              <div className="flex items-center space-x-2">
                <input 
                  type="number" 
                  value={time}
                  onChange={(e) => onUpdateSla(dept, e.target.value)}
                  className="w-24 text-right border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                <span className="text-gray-500 text-sm">min</span>
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
          <button onClick={() => { onAddRoom(newRoomId); setNewRoomId(''); }} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
            Agregar
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {rooms.map((room: Room) => (
            <div key={room.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-2">
                <Bed className="w-4 h-4 text-gray-400" />
                <p className="font-medium text-sm text-gray-800">{room.name}</p>
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
            <label className="text-xs font-semibold text-gray-600 mb-1 block">Correo Electrónico</label>
            <input type="email" value={newUserEmail} onChange={(e) => setNewUserEmail(e.target.value)} className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500" placeholder="ejemplo@hospital.com" />
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
                  <p className="text-xs text-gray-500 mt-0.5">Correo: <span className="text-gray-700 font-medium">{user.email}</span></p>
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
          <CheckSquare className="w-6 h-6 mr-2 text-gray-600"/> Gestión del Checklist
        </h2>
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <input type="text" placeholder="Nueva pregunta..." value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} className="flex-1 border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500" />
          <select value={newDept} onChange={(e) => setNewDept(e.target.value)} className="border rounded-lg p-2 bg-white">
            {Object.values(DEPARTMENTS).filter(d => d !== DEPARTMENTS.ADMIN).map(dept => <option key={dept} value={dept}>{dept}</option>)}
          </select>
          <button onClick={() => { onAddChecklist(newQuestion, newDept); setNewQuestion(''); }} className="bg-indigo-600 text-white font-semibold py-2 px-6 rounded-lg">
            Añadir
          </button>
        </div>
        <div className="space-y-3">
          {checklistItems.map((item: ChecklistItem) => (
            <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div>
                <p className="font-medium text-gray-800">{item.question}</p>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{item.dept}</span>
              </div>
              <button onClick={() => onRemoveChecklist(item.id)} className="text-rose-500 hover:text-rose-700 p-2 bg-rose-50 rounded-lg">
                <X className="w-5 h-5"/>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ChecklistModal = ({ 
  isOpen, onClose, selectedRoom, checklistItems, onSubmit 
}: { 
  isOpen: boolean, onClose: () => void, selectedRoom: Room | null, checklistItems: ChecklistItem[], onSubmit: (answers: {[key: string]: boolean}, room: Room) => void 
}) => {
  const [answers, setAnswers] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    if (isOpen) {
      setAnswers(checklistItems.reduce((acc, item) => ({ ...acc, [item.id]: true }), {}));
    }
  }, [isOpen, checklistItems]);

  if (!isOpen || !selectedRoom) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl my-8">
        <div className="bg-amber-500 p-4 rounded-t-2xl flex justify-between items-center text-white">
          <h3 className="font-bold text-lg flex items-center">
            <CheckSquare className="w-5 h-5 mr-2"/> Checklist Evaluación - Hab. {selectedRoom.name}
          </h3>
          <button onClick={onClose} className="hover:bg-amber-600 p-1 rounded-full"><X className="w-5 h-5"/></button>
        </div>
        <div className="p-6">
          <p className="text-sm text-gray-600 mb-6 bg-amber-50 p-3 rounded-lg border border-amber-100">
            Marque con "X" los elementos que <strong>no cumplan</strong>. Esto generará tareas automáticas para las áreas correspondientes.
          </p>
          <div className="space-y-4">
            {checklistItems.map(item => (
              <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg border gap-4">
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{item.question}</p>
                  <span className="text-xs font-bold text-indigo-600 uppercase mt-1 inline-block">{item.dept}</span>
                </div>
                <div className="flex bg-gray-200 rounded-lg p-1 shrink-0">
                  <button onClick={() => setAnswers({...answers, [item.id]: true})} className={`px-4 py-2 text-sm font-bold rounded-md transition-all ${answers[item.id] ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>✓ Bien</button>
                  <button onClick={() => setAnswers({...answers, [item.id]: false})} className={`px-4 py-2 text-sm font-bold rounded-md transition-all ${!answers[item.id] ? 'bg-white text-rose-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>✗ Falla</button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-end gap-3">
            <button onClick={onClose} className="px-6 py-2.5 rounded-xl font-semibold text-gray-600 hover:bg-gray-100 transition-colors">Cancelar</button>
            <button onClick={() => {
              // MEJORA: CIERRE INMEDIATO AL GUARDAR
              onClose();
              onSubmit(answers, selectedRoom);
            }} className="px-6 py-2.5 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-colors">
              Guardar y Asignar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

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
  const [slas, setSlas] = useState<Slas>({ [DEPARTMENTS.LIMPIEZA]: 30, [DEPARTMENTS.MANTENIMIENTO]: 120, [DEPARTMENTS.ENFERMERIA]: 15 });
  
  // UI Modal State
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isChecklistModalOpen, setIsChecklistModalOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [innerNewPassword, setInnerNewPassword] = useState('');

  // Login State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');

  // Inicializar Firebase Auth
  useEffect(() => {
    const initAuth = async () => {
      try {
        await signInAnonymously(auth);
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
      INITIAL_USERS.forEach(u => promises.push(setDoc(getDocRef('h_users_v2', u.id), u)));
      INITIAL_ROOMS.forEach(r => promises.push(setDoc(getDocRef('h_rooms', r.id), r)));
      INITIAL_CHECKLIST.forEach(c => promises.push(setDoc(getDocRef('h_checklistItems', c.id), c)));
      promises.push(setDoc(getDocRef('h_slas', 'main'), slas));
      
      const initialTasks: Task[] = [
        { id: 't0', roomId: '102', dept: DEPARTMENTS.LIMPIEZA, description: 'Limpieza profunda', status: 'Completada', createdAt: Date.now() - 3600000, completedAt: Date.now() - 1800000, assignedTo: 'u1' }
      ];
      initialTasks.forEach(t => promises.push(setDoc(getDocRef('h_tasks', t.id), t)));
      
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

    unsubs.push(onSnapshot(getColRef('h_users_v2'), (snapshot) => {
      if (snapshot.empty) { seedDatabase().then(() => setDbReady(true)); } 
      else { setUsers(snapshot.docs.map(d => ({id: d.id, ...d.data()} as AppUser))); setDbReady(true); }
    }, errHandler));

    unsubs.push(onSnapshot(getColRef('h_rooms'), (s) => setRooms(s.docs.map(d => ({id: d.id, ...d.data()} as Room))), errHandler));
    unsubs.push(onSnapshot(getColRef('h_tasks'), (s) => setTasks(s.docs.map(d => ({id: d.id, ...d.data()} as Task))), errHandler));
    unsubs.push(onSnapshot(getColRef('h_checklistItems'), (s) => setChecklistItems(s.docs.map(d => ({id: d.id, ...d.data()} as ChecklistItem))), errHandler));
    unsubs.push(onSnapshot(getColRef('h_notifications'), (s) => setNotifications(s.docs.map(d => ({id: d.id, ...d.data()} as Notification))), errHandler));
    unsubs.push(onSnapshot(getColRef('h_slas'), (s) => {
      if (!s.empty && s.docs[0].id === 'main') setSlas(s.docs[0].data() as Slas);
    }, errHandler));

    return () => unsubs.forEach(u => u());
  }, [authUser]);


  // --- MANEJADORES DE LÓGICA DE NEGOCIO ---
  const handleVacateRoom = (roomId: string) => {
    setSelectedRoom(null); // MEJORA: CIERRE INMEDIATO
    setDoc(getDocRef('h_rooms', roomId), { status: ROOM_STATUS.EVALUACION }, { merge: true });
  };

  const handleOccupyRoom = (roomId: string) => {
    setSelectedRoom(null); // MEJORA: CIERRE INMEDIATO
    setDoc(getDocRef('h_rooms', roomId), { status: ROOM_STATUS.OCUPADA }, { merge: true });
  };

  const handleCompleteTask = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if(!task) return;
    await setDoc(getDocRef('h_tasks', taskId), { status: 'Completada', completedAt: Date.now() }, { merge: true });
    
    // Liberación automática cuando no quedan tareas pendientes en la habitación
    const pendingRoomTasks = tasks.filter(t => t.roomId === task.roomId && t.id !== taskId && t.status !== 'Completada');
    if (pendingRoomTasks.length === 0) {
      await setDoc(getDocRef('h_rooms', task.roomId), { status: ROOM_STATUS.DISPONIBLE }, { merge: true });
      
      if(currentUser) {
        await setDoc(getDocRef('h_notifications', Date.now().toString()), {
          userId: currentUser.id, 
          message: `¡Habitación ${task.roomId} completamente lista y disponible!`, 
          read: false, 
          createdAt: Date.now()
        });
      }
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

  const handleChecklistSubmit = async (answers: {[key: string]: boolean}, room: Room) => {
    const promises: Promise<void>[] = [];
    let roomNeedsTasks = false;

    checklistItems.forEach(item => {
      if (answers[item.id] === false) { 
        const taskId = `t_${Date.now()}_${item.id}`;
        promises.push(setDoc(getDocRef('h_tasks', taskId), {
          id: taskId, roomId: room.id, dept: item.dept, description: `Revisar: ${item.question}`, status: 'Pendiente', createdAt: Date.now(), assignedTo: null
        }));
        roomNeedsTasks = true;
      }
    });

    promises.push(setDoc(getDocRef('h_rooms', room.id), { status: roomNeedsTasks ? ROOM_STATUS.MANTENIMIENTO : ROOM_STATUS.DISPONIBLE }, { merge: true }));
    await Promise.all(promises);
  };

  // --- CAMBIO DE CONTRASEÑA INTERNO ---
  const handleInnerPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    await setDoc(getDocRef('h_users_v2', currentUser.id), { password: innerNewPassword }, { merge: true });
    setIsChangingPassword(false);
    setInnerNewPassword('');
    alert('¡Tu contraseña ha sido actualizada con éxito!');
  };

  // --- LOGIN ---
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = users.find(u => u.email.toLowerCase() === loginEmail.trim().toLowerCase() && u.password === loginPassword.trim());
    if (user) {
      setCurrentUser(user);
      setActiveTab(user.role === 'admin' ? 'dashboard' : 'tasks');
      setLoginError(''); setLoginEmail(''); setLoginPassword(''); setResetSuccess('');
    } else { setLoginError('Correo o contraseña incorrectos'); }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const userToReset = users.find(u => u.email.toLowerCase() === loginEmail.trim().toLowerCase());
    if (userToReset) {
      await setDoc(getDocRef('h_users_v2', userToReset.id), { password: newPassword.trim() }, { merge: true });
      setLoginError(''); setResetSuccess('¡Contraseña actualizada! Ya puedes iniciar sesión.');
      setIsResettingPassword(false); setLoginPassword(''); setNewPassword('');
    } else {
      setLoginError('No se encontró ningún usuario con ese correo electrónico.');
    }
  };

  // --- CARGA Y LOGIN UI ---
  if (!authUser || !dbReady) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
        <h2 className="text-xl font-semibold text-gray-700">Iniciando plataforma segura...</h2>
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
                <label className="block text-sm font-semibold text-gray-700 mb-1">Correo Electrónico</label>
                <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 bg-gray-50" placeholder="ejemplo@hospital.com" required />
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
                <label className="block text-sm font-semibold mb-1">Correo Electrónico</label>
                <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="w-full border rounded-xl p-3 bg-gray-50 focus:ring-2 focus:ring-indigo-500" placeholder="ejemplo@hospital.com" required />
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
        </div>
      </div>
    );
  }

  const userNotifs = notifications.filter(n => n.userId === currentUser.id);
  const unreadNotifs = userNotifs.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <header className="bg-indigo-900 text-white shadow-md relative z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between h-auto md:h-16 py-3 md:py-0">
            {/* --- SECCIÓN DE BRANDING (LOGO Y URL) ACTUALIZADA --- */}
            <div className="flex items-center gap-4 mb-3 md:mb-0">
              {/* Contenedor del Logo con Placeholder instruccional */}
              <div className="flex items-center gap-3">
                {/* REEMPLAZA ESTE div CON TU LOGO REAL: <img src="path/to/logo.png" alt="Logo Hospital Herrera Llerandi" className="w-12 h-12 rounded-full" /> */}
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-1 text-indigo-900 font-bold border-2 border-white">
                  HL
                </div>
                <div className="flex flex-col">
                  {/* Asegúrate de que el URL y el nombre completo sean correctos */}
                  <span className="font-bold text-lg leading-tight text-white">Hospital Herrera Llerandi</span>
                  <a 
                    href="http://www.herrerallerandi.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xs text-indigo-300 hover:text-white transition-colors"
                  >
                    www.herrerallerandi.com
                  </a>
                </div>
              </div>
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
              </nav>

              <div className="flex items-center space-x-4 border-l border-indigo-700 pl-4">
                <div className="relative">
                  <button onClick={() => { setIsNotifOpen(!isNotifOpen); markNotificationsAsRead(); }} className="text-indigo-200 hover:text-white transition-colors relative">
                    <Bell className="w-6 h-6" />
                    {unreadNotifs > 0 && <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{unreadNotifs}</span>}
                  </button>
                  {isNotifOpen && (
                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden text-gray-800 z-50">
                      <div className="bg-gray-50 p-3 border-b font-bold text-sm flex justify-between items-center">
                        Notificaciones
                        <button onClick={() => setIsNotifOpen(false)} className="text-gray-400 hover:text-gray-600"><X className="w-4 h-4"/></button>
                      </div>
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
                  
                  {/* Botón de Cambiar Contraseña Interno */}
                  <button onClick={() => setIsChangingPassword(true)} className="p-1.5 bg-indigo-800 hover:bg-amber-500 rounded-lg text-indigo-200 hover:text-white transition-colors" title="Cambiar mi contraseña">
                    <Key className="w-5 h-5" />
                  </button>
                  
                  <button onClick={() => setCurrentUser(null)} className="p-1.5 bg-indigo-800 hover:bg-rose-600 rounded-lg text-indigo-200 hover:text-white transition-colors" title="Cerrar Sesión">
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
            onAddRoom={async (id: string) => { if(id && !rooms.some(r=>r.id===id)) setDoc(getDocRef('h_rooms', id), { id, name: `Habitación ${id}`, status: ROOM_STATUS.DISPONIBLE }) }}
            onRemoveRoom={(id: string) => deleteDoc(getDocRef('h_rooms', id))}
            onAddUser={async (userData: any) => setDoc(getDocRef('h_users_v2', `u_${Date.now()}`), { id: `u_${Date.now()}`, ...userData })}
            onRemoveUser={async (id: string) => { await deleteDoc(getDocRef('h_users_v2', id)); await Promise.all(tasks.filter(t=>t.assignedTo===id).map(t=>setDoc(getDocRef('h_tasks', t.id), {assignedTo: null}, {merge:true}))) }}
            onAddChecklist={async (q: string, d: string) => { if(q) { const id=Date.now().toString(); setDoc(getDocRef('h_checklistItems', id), {id, question: q, dept: d}) } }}
            onRemoveChecklist={(id: string) => deleteDoc(getDocRef('h_checklistItems', id))}
          />
        )}
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
                
                {/* Botón manual de liberación */}
                {selectedRoom.status === ROOM_STATUS.MANTENIMIENTO && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                    <Wrench className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <p className="text-blue-800 font-medium text-sm">Acondicionando habitación.</p>
                    
                    {tasks.filter(t => t.roomId === selectedRoom.id && t.status !== 'Completada').length === 0 ? (
                      <div className="mt-4 pt-4 border-t border-blue-200">
                        <p className="text-emerald-700 text-xs font-bold mb-2">✓ Ya no hay tareas pendientes en esta habitación</p>
                        <button onClick={() => {
                          setSelectedRoom(null); // MEJORA: CIERRE INMEDIATO
                          setDoc(getDocRef('h_rooms', selectedRoom.id), { status: ROOM_STATUS.DISPONIBLE }, { merge: true });
                        }} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-xl transition-colors shadow-sm">
                          Liberar Habitación
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => { setSelectedRoom(null); setActiveTab('tasks'); }} className="mt-3 text-blue-700 text-sm font-bold underline hover:text-blue-900">
                        Ir a Tareas Pendientes
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Checklist */}
      <ChecklistModal isOpen={isChecklistModalOpen} onClose={() => { setIsChecklistModalOpen(false); setSelectedRoom(null); }} selectedRoom={selectedRoom} checklistItems={checklistItems} onSubmit={handleChecklistSubmit} />

      {/* Modal de Cambio de Contraseña Interno */}
      {isChangingPassword && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-gray-800">Cambiar Contraseña</h3>
              <button onClick={() => setIsChangingPassword(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5"/></button>
            </div>
            <form onSubmit={handleInnerPasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nueva Contraseña</label>
                <input 
                  type="password" 
                  value={innerNewPassword} 
                  onChange={(e) => setInnerNewPassword(e.target.value)} 
                  className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 bg-gray-50" 
                  placeholder="Escribe tu nueva contraseña..." 
                  required 
                  minLength={4}
                />
              </div>
              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-colors">
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}