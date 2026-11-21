import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { DEFAULT_SITE_CONTENT } from './src/data/defaultContent.js';
import type { SiteContent } from './src/types/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Allow up to 15mb for base64 image uploads in Admin Studio
app.use(express.json({ limit: '15mb' }));

// Database storage setup
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  service: string;
  need: string;
  propertyType: string;
  city: string;
  neighborhood: string;
  urgency: string;
  description: string;
  status: 'novo' | 'em_atendimento' | 'orcamento_enviado' | 'concluido' | 'arquivado';
  createdAt: string;
  source: 'whatsapp_wizard' | 'emergency_cta' | 'direct_contact';
}

interface CompanySettings {
  companyName: string;
  phone: string;
  phoneDisplay: string;
  whatsappNumber: string; // e.g. 5511981511548
  instagramUrl: string;
  city: string;
  state: string;
  coverageArea: string[];
  businessHours: {
    weekdays: string;
    saturday: string;
    emergency: string;
  };
  emergencyNotice: string;
  emergencyActive: boolean;
}

const DEFAULT_SETTINGS: CompanySettings = {
  companyName: "J'ENERGY Soluções Elétricas",
  phone: "11981511548",
  phoneDisplay: "(11) 98151-1548",
  whatsappNumber: "5511981511548",
  instagramUrl: "https://www.instagram.com/j.energy_solucoes/",
  city: "São Bernardo do Campo",
  state: "SP",
  coverageArea: [
    "São Bernardo do Campo",
    "Santo André",
    "São Caetano do Sul",
    "Diadema",
    "Mauá",
    "Ribeirão Pires",
    "São Paulo (Zona Sul e Leste)"
  ],
  businessHours: {
    weekdays: "07:30 às 18:30",
    saturday: "08:00 às 14:00",
    emergency: "Plantão Emergencial sob Consulta"
  },
  emergencyNotice: "Atendimento emergencial sujeito à confirmação de rota e disponibilidade do responsável técnico.",
  emergencyActive: true
};

const SEED_LEADS: Lead[] = [
  {
    id: "lead-1001",
    name: "Carlos Eduardo Silva",
    phone: "(11) 97123-4567",
    email: "carlos.silva@empresa.com.br",
    service: "Instalação Elétrica",
    need: "Instalação nova de quadro trifásico",
    propertyType: "Comercial",
    city: "São Bernardo do Campo",
    neighborhood: "Rudge Ramos",
    urgency: "Urgente",
    description: "Necessito de adequação de carga e montagem de novo quadro de distribuição para novo restaurante com equipamentos de 220V trifásicos.",
    status: "em_atendimento",
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    source: "whatsapp_wizard"
  },
  {
    id: "lead-1002",
    name: "Mariana Alencar",
    phone: "(11) 99876-5432",
    email: "mariana.alencar@gmail.com",
    service: "Energia Solar",
    need: "Estudo de viabilidade fotovoltaica",
    propertyType: "Residencial",
    city: "Santo André",
    neighborhood: "Campestre",
    urgency: "Orçamento",
    description: "Conta mensal média de R$ 750,00. Gostaria de projeto solar homologado com microinversores ou inversor string para telhado com boa orientação.",
    status: "novo",
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    source: "whatsapp_wizard"
  },
  {
    id: "lead-1003",
    name: "Roberto Mendes",
    phone: "(11) 98321-7788",
    email: "contato@logisticaabc.com.br",
    service: "Manutenção Elétrica",
    need: "Disjuntor principal desarmando e oscilação",
    propertyType: "Industrial",
    city: "São Bernardo do Campo",
    neighborhood: "Demarchi",
    urgency: "Emergência",
    description: "O disjuntor do setor fabril desarmou 3 vezes hoje sob carga moderada e notamos aquecimento nos barramentos. Precisamos de diagnóstico com termografia.",
    status: "orcamento_enviado",
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    source: "emergency_cta"
  }
];

interface DatabaseSchema {
  leads: Lead[];
  settings: CompanySettings;
  content: SiteContent;
}

function getDB(): DatabaseSchema {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      const initial: DatabaseSchema = { 
        leads: SEED_LEADS, 
        settings: DEFAULT_SETTINGS,
        content: DEFAULT_SITE_CONTENT
      };
      fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2));
      return initial;
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    
    // Ensure content exists
    if (!parsed.content) {
      parsed.content = DEFAULT_SITE_CONTENT;
      fs.writeFileSync(DB_FILE, JSON.stringify(parsed, null, 2));
    }
    if (!parsed.leads) parsed.leads = SEED_LEADS;
    if (!parsed.settings) parsed.settings = DEFAULT_SETTINGS;

    return parsed as DatabaseSchema;
  } catch (err) {
    console.error('Error reading db:', err);
    return { leads: SEED_LEADS, settings: DEFAULT_SETTINGS, content: DEFAULT_SITE_CONTENT };
  }
}

function saveDB(data: DatabaseSchema) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error saving db:', err);
  }
}

// API Routes
app.get('/api/settings', (req, res) => {
  const db = getDB();
  res.json({ success: true, settings: db.settings });
});

// Content API Routes (Public read, Authenticated write)
app.get('/api/content', (req, res) => {
  const db = getDB();
  res.json({ success: true, content: db.content || DEFAULT_SITE_CONTENT });
});

// Admin Authentication Check - Restrito exclusivamente aos e-mails autorizados
const AUTHORIZED_ADMIN_EMAILS = [
  'andreiaedaniel27@gmail.com',
  'matos.joao06@gmail.com'
];

const ADMIN_TOKEN_SECRET = "jenergy_admin_secure_token_abc2026";
const ADMIN_PASSCODE = "jenergy2026"; // Senha operacional do painel

function isValidAdminToken(token: string): boolean {
  if (!token) return false;
  if (token === ADMIN_TOKEN_SECRET) return true; // Legacy fallback
  if (!token.startsWith('jenergy_auth_')) return false;
  try {
    const parts = token.split('_');
    if (parts.length < 4) return false;
    const email = Buffer.from(parts[2], 'base64').toString('utf-8').toLowerCase();
    const secret = parts.slice(3).join('_');
    return AUTHORIZED_ADMIN_EMAILS.includes(email) && secret === ADMIN_TOKEN_SECRET;
  } catch {
    return false;
  }
}

function getEmailFromToken(token: string): string {
  if (!token || !token.startsWith('jenergy_auth_')) return AUTHORIZED_ADMIN_EMAILS[0];
  try {
    const parts = token.split('_');
    return Buffer.from(parts[2], 'base64').toString('utf-8').toLowerCase();
  } catch {
    return AUTHORIZED_ADMIN_EMAILS[0];
  }
}

function authenticateAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (token && isValidAdminToken(token)) {
    return next();
  }
  return res.status(401).json({ success: false, message: 'Acesso não autorizado' });
}

app.post('/api/admin/login', (req, res) => {
  const { email } = req.body;
  const normalizedEmail = (email || '').trim().toLowerCase();

  // Verificação estrita de e-mail autorizado - Acesso exclusivo para os 2 e-mails
  if (!normalizedEmail || !AUTHORIZED_ADMIN_EMAILS.includes(normalizedEmail)) {
    return res.status(403).json({
      success: false,
      message: 'Acesso restrito. E-mail não autorizado para administração.'
    });
  }

  const encodedEmail = Buffer.from(normalizedEmail).toString('base64');
  const sessionToken = `jenergy_auth_${encodedEmail}_${ADMIN_TOKEN_SECRET}`;

  return res.json({
    success: true,
    token: sessionToken,
    user: {
      email: normalizedEmail,
      name: normalizedEmail === 'matos.joao06@gmail.com' ? 'João Matos' : 'Administração J.ENERGY',
      role: normalizedEmail === 'matos.joao06@gmail.com' ? 'Responsável Técnico (CFT Ativo)' : 'Administrador Geral',
      company: "J.ENERGY Soluções Elétricas"
    }
  });
});

app.get('/api/admin/verify', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (token && isValidAdminToken(token)) {
    const email = getEmailFromToken(token);
    return res.json({
      success: true,
      valid: true,
      user: {
        email,
        name: email === 'matos.joao06@gmail.com' ? 'João Matos' : 'Administração J.ENERGY',
        role: email === 'matos.joao06@gmail.com' ? 'Responsável Técnico (CFT Ativo)' : 'Administrador Geral'
      }
    });
  }
  return res.status(401).json({ success: false, valid: false });
});

// Public Quote / Lead Registration
app.post('/api/leads', (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      service,
      need,
      propertyType,
      city,
      neighborhood,
      urgency,
      description,
      source = 'whatsapp_wizard'
    } = req.body;

    if (!name || !phone || !service) {
      return res.status(400).json({ success: false, message: 'Nome, telefone e serviço são obrigatórios.' });
    }

    const db = getDB();
    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      name: String(name).trim(),
      phone: String(phone).trim(),
      email: email ? String(email).trim() : undefined,
      service: String(service).trim(),
      need: need ? String(need).trim() : 'Não especificado',
      propertyType: propertyType ? String(propertyType).trim() : 'Residencial',
      city: city ? String(city).trim() : 'São Bernardo do Campo',
      neighborhood: neighborhood ? String(neighborhood).trim() : 'Centro',
      urgency: urgency ? String(urgency).trim() : 'Programado',
      description: description ? String(description).trim() : '',
      status: 'novo',
      createdAt: new Date().toISOString(),
      source
    };

    db.leads.unshift(newLead);
    saveDB(db);

    res.status(201).json({ success: true, lead: newLead });
  } catch (err) {
    console.error('Error creating lead:', err);
    res.status(500).json({ success: false, message: 'Erro ao registrar solicitação.' });
  }
});

// Admin Lead Management
app.get('/api/leads', authenticateAdmin, (req, res) => {
  const db = getDB();
  res.json({ success: true, leads: db.leads });
});

app.patch('/api/leads/:id', authenticateAdmin, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const db = getDB();
  const lead = db.leads.find(l => l.id === id);

  if (!lead) {
    return res.status(404).json({ success: false, message: 'Solicitação não encontrada' });
  }

  if (status) {
    lead.status = status;
  }
  saveDB(db);
  res.json({ success: true, lead });
});

app.delete('/api/leads/:id', authenticateAdmin, (req, res) => {
  const { id } = req.params;
  const db = getDB();
  const initialLen = db.leads.length;
  db.leads = db.leads.filter(l => l.id !== id);

  if (db.leads.length === initialLen) {
    return res.status(404).json({ success: false, message: 'Solicitação não encontrada' });
  }

  saveDB(db);
  res.json({ success: true, message: 'Solicitação excluída com sucesso.' });
});

// Admin Settings Update
app.put('/api/settings', authenticateAdmin, (req, res) => {
  try {
    const { settings } = req.body;
    if (!settings) {
      return res.status(400).json({ success: false, message: 'Dados inválidos' });
    }
    const db = getDB();
    db.settings = { ...db.settings, ...settings };
    saveDB(db);
    res.json({ success: true, settings: db.settings });
  } catch (err) {
    console.error('Error updating settings:', err);
    res.status(500).json({ success: false, message: 'Erro ao salvar configurações' });
  }
});

// Admin Content Update (Reescrever o que quiser, alterar imagens, patrocínios)
app.put('/api/content', authenticateAdmin, (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ success: false, message: 'Dados de conteúdo inválidos' });
    }
    const db = getDB();
    db.content = content;
    saveDB(db);
    res.json({ success: true, content: db.content });
  } catch (err) {
    console.error('Error updating content:', err);
    res.status(500).json({ success: false, message: 'Erro ao salvar conteúdo' });
  }
});

// Admin Reset Content to Defaults
app.post('/api/content/reset', authenticateAdmin, (req, res) => {
  try {
    const db = getDB();
    db.content = DEFAULT_SITE_CONTENT;
    saveDB(db);
    res.json({ success: true, content: db.content });
  } catch (err) {
    console.error('Error resetting content:', err);
    res.status(500).json({ success: false, message: 'Erro ao resetar conteúdo' });
  }
});

// Mounting Vite in development or static files in production
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`J'ENERGY server running on http://0.0.0.0:${PORT} (env: ${isProduction ? 'prod' : 'dev'})`);
  });
}

startServer();
